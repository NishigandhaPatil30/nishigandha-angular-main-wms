import { Component, OnInit,ViewChild,ElementRef ,Renderer2, Inject  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from '../students.service';
import { HttpClient, HttpParams,HttpHeaders  } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs'; 
import { MessageService } from 'primeng/api';
import { map } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { tap, catchError } from 'rxjs/operators';
import { delay } from 'rxjs/operators';
import { BlockUI } from 'primeng/blockui';
import { Subscription } from 'rxjs';
import { SelectItem } from 'primeng/api';
interface TableRow {
  Productcode: any;
  Batch: any;
  storageLocations: any;
  Quantity: any;
  Expirydate: any;
  Brand: any;
  Pack: any;
  Remark: any;
  Hsncode: any;
  NetWeight :any;
}
@Component({
  selector: 'app-materialoutward',
  templateUrl: './materialoutward.component.html',
  styleUrls: ['./materialoutward.component.scss'],
  providers:[MessageService,ConfirmationService]
})
export class MaterialoutwardComponent implements OnInit {
  @ViewChild('productCodeInput') productCodeInput: ElementRef;
  searchTerm: string = '';
  searchResults: any[] = [];
  isSelectAllChecked: boolean = false;
  searchText1: string = '';
  filteredResults1: string[] = [];
  Brand:any;
  form: FormGroup;
  Hsncode:any;
  RouteNo: any;
  Productcode: any;
  NetWeight:any;
storageLocations: any[] = [];
remainingQuantityData: any[] = [];
ReferenceDoNo:any;
cities: string[] = [];
selectedCity: string;
warehosueselect:boolean=false;
deliveryForm: FormGroup; 
Date:Date = new Date();
constructor(
  private formBuilder: FormBuilder, // Use formBuilder consistently
  private studentsService1: StudentsService,
  private http: HttpClient,
  private router: Router,
  private messageService: MessageService,
  private renderer: Renderer2,
  private confirmationService: ConfirmationService
) {
  this.form1 = this.formBuilder.group({
    image: [null]
  });
 
  this.deliveryForm = this.formBuilder.group({ 
    RouteNo: ['']
  });
  
}

fetchClientCodes(depot: string): void {
  const url = `https://www.swatpro.co/getwarehouseinward.php?depot=${depot}`;
  this.http.get<string[]>(url)
    .subscribe((data) => {
      this.cities = data;
    });
}
onCityChange(event) {
  console.log("Selected city:", this.selectedCity);
  this.warehosueselect=true;
}
onFocus(event: any) {

}

  selected = 'None';
  addForm: any;
  form1: any;
  depot:any;
  ngOnInit() {
    
    this.addForm = this.formBuilder.group({
      ReferenceDoNo: ['', Validators.required],
      Gateno: ['', Validators.required],
      RouteNo: ['', Validators.required],
       Date: [new Date(), Validators.required],
       
        ConsigneeName: ['', Validators.required],
        DeliveryLocation: ['', Validators.required]
    });
    this.getBrand(this.addForm);
    const userInfoString = sessionStorage.getItem('userInfo');
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      this.depot = userInfo.Depot;
      this.fetchClientCodes(this.depot);
    }
  }
  uploadFile(event: any) {
    const file = event.target.files ? event.target.files[0] : '';
    this.form1.patchValue({
      image: file
    });

    this.form1.get('image')?.updateValueAndValidity();
  }
  onDateInputKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault(); // Prevent the default tab behavior
      this.renderer.selectRootElement(this.productCodeInput.nativeElement).focus();
    }
  }
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };
  remainingQuantityToDistribute: number;
  getAisleStyle(item: any): { [key: string]: string } {
    const style: { [key: string]: string } = {};

    if (item.LocationQuantityPairs) {
        const hasAisleLocation = item.LocationQuantityPairs.some(pair => pair.storageLocation === 'AISLE');

        if (hasAisleLocation && this.remainingQuantityToDistribute > 0 &&
            this.remainingQuantityToDistribute >= item.LocationQuantityPairs) {
            // Apply your style here
            style['background'] = 'linear-gradient(to right, #add8e6, #87ceeb)';
            style['color'] = '#333';
            style['border'] = '1px solid #ccc';
            style['box-shadow'] = '2px 2px 5px #888888';
            style['font-weight'] = 'bold';
            style['padding'] = '8px';
            style['text-align'] = 'center';
            style['pointer-events'] = 'none';
        } else if (this.remainingQuantityToDistribute <= item.LocationQuantityPairs) {
            style['background'] = 'white';
        }
    }

    return style;
}
  selectAll: boolean = false;
  selectedItems: any[] = [];
  onSelectAllChange() {
    const itemsToSelect = this.extractedData.filter(item => item.LocationQuantityPairs && item.LocationQuantityPairs.length > 0);
    itemsToSelect.forEach(item => item.isSelected = this.selectAll);
    this.selectedItems = itemsToSelect.filter(item => item.isSelected);

    // Adding this.depot to each selected item
    this.selectedItems.forEach(item => {
        item.depot = this.depot;
    });
}

onCheckboxChange(event: any, item: any) {
  if (event.target.checked) {
    // Add the item to selectedItems if it's not already in the array
    if (!this.selectedItems.includes(item)) {
      this.selectedItems.push(item);
    }
  } else {
    // Remove the item from selectedItems
    const index = this.selectedItems.findIndex(selectedItem => selectedItem === item);
    if (index !== -1) {
      this.selectedItems.splice(index, 1);
    }
  }

  // Update selectAll status
  this.selectAll = this.extractedData.every(item => item.isSelected);

  // Log the selected items
  console.log('Selected Items:', this.selectedItems);
}

  isAisleLocation(item: any): boolean {
    return item && item.LocationQuantityPairs && item.LocationQuantityPairs.some(pair => pair.storageLocation === 'AISLE');
  }
  downloadExcel() {
    const headers = [
      'ReferenceDoNo', 'ProductCode', 'Batch', 
      'Quantity', 'Date','SAPPartyCode'
    ];
    const sapInstruction = [
      'FOR SAP USER RUN T CODE:-VL06o UPLOAD FILE AS IT IS TO GENERATE PICKING SLIP'
    ];
    const data: any[][] = [sapInstruction, headers];
    const csvContent = data.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    this.saveAsCSVFile(blob, 'outward_csv');
  }
  
  private saveAsCSVFile(blob: Blob, fileName: string): void {
    const a: HTMLAnchorElement = document.createElement('a');
    document.body.appendChild(a);
    a.href = window.URL.createObjectURL(blob);
    a.download = `${fileName}.csv`;
    a.click();
    document.body.removeChild(a);
  }
  

  submitData() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to submit the data?',
      accept: () => {
        const url = 'https://www.swatpro.co/outward.php';
        this.http.post(url, { data: this.selectedItems })
          .pipe(
            tap(response => {
              const sapPartyCodes = response['allSAPPartyCodes'];
              const referenceDoNos = response['ReferenceDoNo'];
              const sapPartyCodeToReferenceMap = new Map<string, string[]>();
              sapPartyCodes.forEach((sapPartyCode, index) => {
                const referenceDoNo = referenceDoNos[index];
                if (!sapPartyCodeToReferenceMap.has(sapPartyCode)) {
                  sapPartyCodeToReferenceMap.set(sapPartyCode, []);
                }
                sapPartyCodeToReferenceMap.get(sapPartyCode).push(referenceDoNo);
              });
              sapPartyCodeToReferenceMap.forEach((referenceDoNos, sapPartyCode) => {
                console.log(`SAP Party Code: ${sapPartyCode}, Reference Do Nos: ${referenceDoNos.join(', ')}`);
              });
  
              const pickingslipNos = Array.isArray(response['Pickingslip']) ? response['Pickingslip'] : [];
              const uniquePickingslipNos = Array.from(new Set(pickingslipNos));
              const totalQuantity = response['totalQuantity'];
              const sapPartyCodeString = sapPartyCodes.join(',');
  
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data submitted successfully.' });
              this.selectedItems = [];
  
              // Accumulate all referenceDoNoString values
              const allReferenceDoNoStrings = Array.from(sapPartyCodeToReferenceMap.values())
                .flatMap(referenceDoNos => referenceDoNos)
                .join(',');
  
              setTimeout(() => {
                this.router.navigate(['modules/materialoutward/pickingslipnumberexcel'], {
                  queryParams: {
                    pickingslip: pickingslipNos.join(','),
                    referenceDoNo: allReferenceDoNoStrings,
                    totalQuantity,
                    sapPartyCode: sapPartyCodeString
                  }
                });
              }, 2000);
            }),
            catchError(error => {
              console.error('Error submitting data:', error);
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error submitting data. Please try again.' });
              throw error;
            })
          )
          .subscribe();
      }
    });
  }
  
  loading: boolean = false;

  extractedData: any[] = [];
  showTable: boolean = false;
  totalQuantity: any;
  remainingQuantityDataArray: any[];
  getModifiedSAPPartyCodes(item: any): string {
    return item.modifiedSAPPartyCodes.join(', '); // Adjust the separator as needed
  }
  submitImage() {
    this.loading = true;
    this.studentsService1.outwardmasterexcel(this.form1.value.image).subscribe(
      (data: any) => {
      //  console.log(data);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data uploaded successfully' });
        const modifiedSAPPartyCodes = [];
        const requests = data.inserted_data.map(item => {
          const apiUrl = 'https://www.swatpro.co/getStorageLocationtestwarehouseadd.php?Productcode=' +
          item.ProductCode +
          '&Batch=' +
          item.Batch +
          '&selectedCity=' +
          encodeURIComponent(this.selectedCity);
          console.log(apiUrl);
            const modifiedSAPPartyCode = item.SAPPartyCode.replace(/\\r\\n/g, '');
            item.modifiedSAPPartyCode = modifiedSAPPartyCode;
          return this.http.get(apiUrl);
          
        });
        forkJoin(requests).subscribe(
          (storageLocationDataArray: any[]) => {
            this.extractedData = data.inserted_data.map((item, index) => {
              const storageLocationData = storageLocationDataArray[index];
              item.rowId = index + 1;
              item.Storagelocation = storageLocationData;
  
              const consigneeUrl = 'https://www.swatpro.co/consigneenameandtopalce.php?SAPPartyCode=' + item.modifiedSAPPartyCode;
              console.log(consigneeUrl);
      this.http.get(consigneeUrl).subscribe(
        (consigneeResponse: any) => {
          console.log(consigneeResponse);
          item.ConsigneeInfo = consigneeResponse;
          
        },
        (consigneeError) => {
          console.error('Error fetching consignee information:', consigneeError);
        }
      );
      const consigneeUrl1 = 'https://www.swatpro.co/consigneenameandtopalce1.php?SAPPartyCode=' + item.modifiedSAPPartyCode; 
      this.http.get(consigneeUrl1).subscribe(
        (consigneeResponse1: any) => {
          item.ConsigneeInfo1 = consigneeResponse1;
          const consigneeUrl2 = 'https://www.swatpro.co/consigneenameandtopalce2.php?ConsigneeInfo1=' + item.ConsigneeInfo1;
          this.http.get<any[]>(consigneeUrl2).subscribe(
            (consigneeResponse2: any) => {
              if (consigneeResponse2.data && consigneeResponse2.data.length > 0) {
                this.RouteNo = consigneeResponse2.data[0].RouteNo;
                item.RouteNo = this.RouteNo;
              } else {
                this.RouteNo = '';
              }
             console.log(consigneeResponse2);
            },
            (consigneeError2) => {
              console.error('Error fetching consignee information (second request):', consigneeError2);
            }
          );
        },
        (consigneeError1) => {
          console.error('Error fetching consignee information (first request):', consigneeError1);
        }
      );
              this.http.get('https://www.swatpro.co/inwardgetbrand1.php?Productcode=' + item.ProductCode)
                .subscribe((brandResponse: any) => {
                  item.Brand = brandResponse.Brand; 
                 
                }, (brandError) => {
                  console.error('Error fetching brand information:', brandError);
                });
                const observables = storageLocationData.map((location) =>
                this.http.get(
                  'https://www.swatpro.co/getRemainingQuantitytest.php?Productcode=' +
                  item.ProductCode +
                  '&Batch=' +
                  item.Batch +
                  '&Storagelocation=' +
                  location +
                  '&Quantity=' +
                  item.Quantity
                )
              );
  
              forkJoin(observables).subscribe(
                (remainingQuantityDataArray: any[]) => {
                  item.RemainingQuantityData = remainingQuantityDataArray;
                 // console.log('Remaining Quantity Data Array:', remainingQuantityDataArray);
                  this.splitQuantities(item);
                },
                (error) => {
                  console.error('Error fetching remaining quantity data:', error);
                });
  
              // Fetch batch information for each product
              this.http.get(
                'https://www.swatpro.co/getBatchInfotest.php?Productcode=' +
                  item.ProductCode +
                  '&Batch=' +
                  item.Batch
              ).subscribe((batchResponse: any) => {
                item.Expirydate = batchResponse.Expirydate;
                item.Pack = batchResponse.Pack;
                item.Remark = batchResponse.Remark;
               // console.log('Batch information for ProductCode ' + item.ProductCode + ':', batchResponse);
              }, (batchError) => {
                console.error('Error fetching batch information:', batchError);
              });
  
              // Fetch net weight information for each product
              this.http.get(
                'https://www.swatpro.co/inwardgetnetweight.php?Productcode=' +
                  item.ProductCode +
                  '&Quantity=' +
                  item.Quantity
              ).subscribe((netWeightResponse: any) => {
                item.NetWeight = netWeightResponse.NetWeight * item.Quantity;
                //console.log('Net Weight for ProductCode ' + item.ProductCode + ':', item.NetWeight);
              }, (netWeightError) => {
                console.error('Error fetching net weight information:', netWeightError);
              });
  
              return item;
            });
          
       
            const referenceProductItems = {};

            this.extractedData.forEach(item => {
                const key = item.ReferenceDoNo;
                const quantity = parseInt(item.Quantity); // Parse the quantity as an integer
                item.quantity = quantity; // Store the quantity directly on the item object
            
                // If the key doesn't exist in referenceProductItems, create it with an empty array
                if (!referenceProductItems[key]) {
                    referenceProductItems[key] = [];
                }
            
                // Push the item to the array for this key
                referenceProductItems[key].push(item);
            });
            
            // Calculate the total quantity for each ReferenceDoNo and store it within each item's details
            for (const key in referenceProductItems) {
                if (referenceProductItems.hasOwnProperty(key)) {
                    const items = referenceProductItems[key];
                    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
                    items.forEach(item => {
                        item.totalQuantity = totalQuantity; // Assign total quantity to each item
                    });
                }
            }
            
            console.log("Reference Product Items:", referenceProductItems);
            

            
            
            

            

            
          },
          (error) => {
            console.error('Error fetching storage location data:', error);
          }
        );
      },
      (error) => {
        this.loading = false;
        console.error('Error Response:', error);
      }
    );
  }
  
  
  splitQuantities(item: any) {
    // Create an array to hold storage location and quantity pairs
    const locationQuantityPairs = [];
  
    // Initialize the remaining quantity to be distributed
    let remainingQuantityToDistribute = item.Quantity;
  
    // Split quantities based on storage location and create input boxes
    item.Storagelocation.forEach((location, index) => {
      const availableQuantity = item.RemainingQuantityData[index];
  
      // Determine the quantity to be assigned to the current location
      let assignedQuantity;
  
      if (remainingQuantityToDistribute > 0) {
        // Assign the minimum of remaining quantity and available quantity
        assignedQuantity = Math.min(remainingQuantityToDistribute, availableQuantity);
  
        // Update the remaining quantity to distribute
        remainingQuantityToDistribute -= assignedQuantity;
      } else {
        // If remaining quantity is zero or negative, assign 0 to the location
        assignedQuantity = 0;
      }
  
      // Add storage location and quantity pair to the array
      locationQuantityPairs.push({
        storageLocation: location,
        quantity: assignedQuantity
      });
    });
  
    // Update the item with the new structure
    item.LocationQuantityPairs = locationQuantityPairs;
    console.log(item.LocationQuantityPairs);
  
    // If there is remaining quantity and it's greater than 0, show a message
    if (remainingQuantityToDistribute > 0) {
      item.remainingQuantityMessage = `Remaining quantity (${remainingQuantityToDistribute}) exceeds available storage.`;
      item.hasExcessQuantity = true;
    } else {
      item.remainingQuantityMessage = '';
      item.hasExcessQuantity = false;
    }
  }
  
  

  triggerAdditionalFunction() {
    this.showTable = true;
    // this.submitImage();
  }
  
  
  
  

  checkReferenceExists() {
    if (this.ReferenceDoNo) {
      //console.log(this.ReferenceDoNo);
  //
      const requestData = {
        ReferenceDoNo: this.ReferenceDoNo,
      };
     // console.log(requestData);
  
      this.http.post('https://www.swatpro.co/chekcrefrencedono.php', requestData)
        .subscribe(
          (response: any) => {
            //console.log(response);
  
            if (response.message === "ReferenceDoNo already exists in the database.") {
              this.messageService.add({
                severity: 'warn', // You can use 'error', 'info', or 'success' depending on your message type.
                summary: 'Warning',
                detail: 'ReferenceDoNo is already present.'
              });
              this.ReferenceDoNo=null;
              
              
            } else {
             // alert("ReferenceDoNo is available.");
            }
          },
          (error) => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
          }
        );
    }
  }
  
  
  
  
  


  displayedColumns: string[] = [
    'Productcode',
    'Batch',
    'storageLocations',
    'Quantity',
    'NetWeight',
    'Expirydate',
    'Brand',
    'Pack',
    'Remark',
    'Hsncode',
    'addButton',
    'deleteButton',
  ];

  dataSource = new MatTableDataSource<TableRow>([
    {
      Productcode: '',
      Batch: '',
      storageLocations: '',
      Quantity: '',
      NetWeight: '',
      Expirydate: '',
      Brand: '',
      Pack: '',
      Remark: '',
      Hsncode: ''
    }
  ]);

  addRow() {
    this.dataSource.data.push({
      Productcode: '',
      Batch: '',
      storageLocations: '',
      Quantity: '',
      NetWeight: '',
      Expirydate: '',
      Brand: '',
      Pack: '',
      Remark: '',
      Hsncode: ''
    });
    this.dataSource.data = [...this.dataSource.data];
  }

  removeRow(index: number) {
    this.dataSource.data.splice(index, 1);
    this.dataSource.data = [...this.dataSource.data];
  }
  onSubmit() {
    const formData = {
      ReferenceDoNo: this.addForm.value.ReferenceDoNo,
      Gateno: this.addForm.value.Gateno,
      RouteNo: this.addForm.value.RouteNo,
      Date: this.addForm.value.Date,
      ConsigneeName: this.addForm.value.ConsigneeName,
      DeliveryLocation: this.addForm.value.DeliveryLocation,
      products: this.dataSource.data,
      depot: this.depot
    };
  
    console.log(formData);
  
    this.confirmationService.confirm({
      message: 'Do you want to continue?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        // Insert data logic goes here
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
        });
  
        this.http
          .post<any>('https://www.swatpro.co/wmsgenetratepickingsipentrydepowise.php', formData, { headers })
          .subscribe(
            (response) => {
             // console.log(response);
              if (response.Pickingslip && response.ReferenceDoNo) {
                const pickingslipValue = response.Pickingslip;
                const referenceDoNoValue = response.ReferenceDoNo;
  
                this.messageService.add({
                  severity: 'info', summary: 'Confirmed',
                  detail: 'Record Successfully Inserted'
                });
  
                // Use setTimeout to delay the redirection by 2000 milliseconds (2 seconds)
                setTimeout(() => {
                  // Check if the totalQuantity is available in the response
                  if (response.totalQuantity) {
                    const totalQuantityValue = response.totalQuantity;
  
                    this.router.navigate(['modules/materialoutward/pickingslipnumber'], {
                      queryParams: {
                        pickingslip: pickingslipValue,
                        referenceDoNo: referenceDoNoValue,
                        totalQuantity: totalQuantityValue, // Pass the totalQuantity as a query parameter
                      }
                    });
                  } else {
                    //console.log('totalQuantity not found in the response');
                  }
                }, 1000); // 2000 milliseconds = 2 seconds
              } else {
                
                //console.log('Pickingslip or ReferenceDoNo not found in the response');
              }
            },
            (error) => {
              console.error(error);
              // Handle error here, e.g., show error message.
            }
          );
      },
      reject: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'canceled',
          detail: 'Data insertion canceled'
        });
        
      },
    });
  }

  search(event: any): void {
    const term = event.query;
    const depot = this.depot; // Assuming this.depot holds the depot value
    const apiUrl = `https://swatpro.co/consigneeautosearchdepowise.php/?term=${term}&depot=${depot}`;

    //console.log('API URL:', apiUrl);

    this.http.get(apiUrl).pipe(map((response: any) => response.data)).subscribe((data) => {
      this.searchResults = data;
    });
}


  selectResult(event: any) {
    const selectedConsigneeName = event.value.ConsigneeName;
    this.searchTerm = selectedConsigneeName;

    // You can also update the form control value if needed
    this.form.controls['ConsigneeName'].setValue(selectedConsigneeName);
  }
  search1(event: any): void {
    const term = event.query;
    const depot = this.depot; 
    this.http.get(`https://swatpro.co/develiverylocationautosaerchdepotwie.php/?term=${term}&depot=${depot}`)
      .pipe(map((response: any) => response.data))
      .subscribe(data => {
        this.filteredResults1 = data;
       // console.log(data);
        this.fetchDataForReferenceDoNo(term, data); // Pass 'term' as DeliveryLocation
      });
  }
  
  fetchDataForReferenceDoNo(eventValue: any, filteredResults1: any[]): void {
    const DeliveryLocation = eventValue.value.DeliveryLocation; // Extracting the value from the object
    const depot = this.depot; 
    const apiUrl = `https://www.swatpro.co/getroutenodepowise.php?searchTerm=${encodeURIComponent(DeliveryLocation)}&depot=${depot}`;
    this.http.get<any[]>(apiUrl).subscribe(
      (response: any) => {
        if (response.data && response.data.length > 0) {
          this.RouteNo = response.data[0].RouteNo;
        } else {
          this.RouteNo = '';
        }
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }


  
  

  
  

 
getBrand(product: TableRow) {
  this.http
    .get('https://www.swatpro.co/inwardgetbrand1.php?Productcode=' + product.Productcode)
    .subscribe((response: any) => {
      product.Brand = response.Brand;

      this.http
        .get(
          'https://www.swatpro.co/getBatchInfotest.php?Productcode=' +
            product.Productcode +
            '&Batch=' +
            product.Batch
        )
        .subscribe((batchResponse: any) => {
          product.Expirydate = batchResponse.Expirydate;
          product.Pack = batchResponse.Pack;
          product.Remark = batchResponse.Remark;
          product.Hsncode = batchResponse.Hsncode;

          this.http
            .get(
              'https://www.swatpro.co/getStorageLocationtestwarehouseadd1.php?Productcode=' +
                product.Productcode +
                '&Batch=' +
                product.Batch +
                '&selectedCity=' +
                encodeURIComponent(this.selectedCity)

            )
            .subscribe((storageResponse: any) => {
              product.storageLocations = storageResponse;
              this.storageLocations = storageResponse;
              console.log(storageResponse);
              this.http
                .get(
                  'https://www.swatpro.co/inwardgetnetweight.php?Productcode=' +
                    product.Productcode +
                    '&Quantity=' +
                    product.Quantity
                )
                .subscribe((netWeightResponse: any) => {
                  product.NetWeight = netWeightResponse.NetWeight * product.Quantity;

                  // Calculate remaining quantity here
                  if (this.storageLocations.length > 0) {
                    const observables = this.storageLocations.map((location) =>
                      this.http.get(
                        'https://www.swatpro.co/getRemainingQuantitytest.php?Productcode=' +
                          product.Productcode +
                          '&Batch=' +
                          product.Batch +
                          '&Storagelocation=' +
                          location +
                          '&Quantity=' +
                          product.Quantity
                          
                      )
                    );

           

                    forkJoin(observables).subscribe((responses: any[]) => {
                        responses.forEach((remainingQuantityResponse, index) => {
                            this.messageService.add({
                                severity: 'info', // Set severity to 'info' for an info message
                                summary: 'Stock Available Quantity', // Message summary
                                detail: `Stock Available Quantity for ${this.storageLocations[index]}: ${remainingQuantityResponse}`,
                            });

                            const remainingQuantity = parseFloat(remainingQuantityResponse); // Convert to number if it's a string
                            if (!isNaN(remainingQuantity) && parseFloat(product.Quantity) > remainingQuantity) {
                                this.messageService.add({
                                    severity: 'warn',
                                    summary: 'Stock Available Quantity',
                                    detail: `Stock Available Quantity for ${remainingQuantityResponse} is Greater Than Pass Quantity`,
                                });
                                product.Quantity = null; // Reset quantity
                            }
                        });
                    });
  
                  } else {
                    alert('Please select at least one storage location first.');
                  }
                });
            });
        });
    });
}

}
