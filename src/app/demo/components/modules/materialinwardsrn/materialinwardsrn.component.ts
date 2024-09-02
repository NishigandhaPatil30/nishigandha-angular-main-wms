import { Component, OnInit, ElementRef ,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams,HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { StudentsService } from '../students.service';
import { MatDialog } from '@angular/material/dialog';
import { map, switchMap, catchError } from 'rxjs/operators';
import { throwError, forkJoin } from 'rxjs';
import { SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-materialinwardsrn',
  templateUrl: './materialinwardsrn.component.html',
  styleUrls: ['./materialinwardsrn.component.scss'],
  providers:[MessageService]
})
export class MaterialinwardsrnComponent implements OnInit {
  @ViewChild('dt1') dt1!: Table;
  showsave:boolean=false;
  total:boolean=false;
  RouteNo
  dialogQuantity:any;
  submitButtonDisabled: boolean = false; 
  totalSum: number = 0;
totalWeight2: number | null = null;
  totalCopiedQuantity: number = 0;
  totalWeight: number = 0;
  totalQuantity:number=0;
 showGrid: boolean = false;
 showGrid1: boolean = false;
 showGrid2: boolean = false;
 rows: any[] = [];
 albums: any[] = [];
 remarks: any[] = [];
 Productcode: any;
 Batch:any;
Manufacturingdates: Date = new Date();
 Expirydate:any;
 searchTerm: string = '';
 searchResults: any[] = [];
 searchText1: string = '';
 filteredResults1: string[] = [];
 Id:any;
 InwardDate:Date = new Date();
Weight:any;
Invoicequantity:any;
 Brand: any;
 Packing: any;
 UOM: any;
 Hsncode: any;
 NetWeight: any;
 value: any;
 Result: any;
 Remark: any;
 responseValue: any;
 customers!: any[];
 isGetqtypassweightCalled: boolean = false;
 representatives!: any[];
 statuses!: any[];
 depot:any;
  copiedQuantity: any[] = [];
    copiedWeight: any[] = [];
    copiedWeight1:any[]=[];
    copiedWeight2:any[]=[];
    copiedWeight3:any[]=[];
 activityValues: number[] = [0, 100];
 form1: any;
 cities: SelectItem[];
 selectedCity: string;
 warehosueselect:boolean=false;
 vehicleForm:any;
 constructor(
   private formBuilder: FormBuilder,
   private studentsService1: StudentsService,
   private router: Router,
   private http: HttpClient,
   public dialog: MatDialog,
   private messageService: MessageService

 ) {
   this.form1 = this.formBuilder.group({
     image: [null]
   });
   this.cities = [
    {label: 'WAREHOUSE 01(CP)', value: 'WAREHOUSE 01(CP)'},
    {label: 'WAREHOUSE 02(PGR)', value: 'WAREHOUSE 02(PGR)'}
  ];
   this.vehicleForm = this.formBuilder.group({
     vehicleNumber: [
       '',
       [Validators.required, Validators.pattern('^[A-Z0-9]*$'), Validators.minLength(6), Validators.maxLength(10)]
     ]
   });
 }

 myFilter = (d: Date | null): boolean => {
   const day = (d || new Date()).getDay();
   // Prevent Saturday and Sunday from being selected.
   return day !== 0 && day !== 6;
 };
 
 onCityChange(event) {
  // Do something with the selected city
  console.log("Selected city:", this.selectedCity);
  this.warehosueselect=true;
}
 ngOnInit(): void {
   this.addRow();
   const userInfoString = sessionStorage.getItem('userInfo');
   if (userInfoString) {
     const userInfo = JSON.parse(userInfoString);
     this.depot = userInfo.Depot;
   }
 
 }
clear(table: Table): void {
   table.clear();
 }
 
 dataToShow:any;
 dataToShow1:any;
 dataToShow2:any;
 dataToShow3:any;
 visible: boolean = false;
 showDialog(i: number, Remark: any,Quantity: any, Productcode: any,Packing:any,Batch:any,Brand:any,Result:any,copiedQuantity:any,totalQuantity:any,selectedCity:any) {
  if (this.rows[i] && this.rows[i].Remark && !this.showDialogDisabled[i]) {
    this.dialogQuantity = Quantity;
    const copiedQuantities = [];
    const copiedWeight1 = [];
    this.visible = true;
    if (Remark === 'SALABLE') {
      this.showGrid2 = true;
      this.isGetqtypassweightCalled = true;
      const params1 = new HttpParams()
        .set('Productcode', Productcode)
        .set('Packing', Packing)
        .set('Batch', Batch)
        .set('City', selectedCity)
        .set('Depot', this.depot);
     
 

        const url1 = 'https://www.swatpro.co/wmsinwardgridfetchwarehouseadd.php';
    
      this.http.get<any[]>(url1, { params: params1 }).subscribe(
        (response1: any[]) => {
          this.albums = response1.map((item: any) => ({
            Storagelocation: item.Storagelocation,
          }));
          const storagelocations = this.albums.map(item => item.Storagelocation);
    
            
          const params2 = new HttpParams()
            .set('Productcode', Productcode)
        .set('Packing', Packing)
        .set('Batch', Batch)
        .set('Brand', Brand)
        .set('City', selectedCity)
        .set('Depot', this.depot)
            .set('Result', JSON.stringify(this.albums));
            const url2 = 'https://www.swatpro.co/inwardfetchboxes111warehosueadd.php';    
          this.http.get<any[]>(url2, { params: params2 }).subscribe(
            
            (response2: any[]) => {
              if (Array.isArray(response2) && response2.length === this.albums.length) {
                let remainingQuantity = Quantity; // Track remaining quantity
                let totalQuantity = 0; // Track total quantity
                let totalWeight = 0; // Track total weight
            
                // Create an array of observables for weight calculations
               const weightCalculations = this.albums.map((album: any, index: number) => {
  album.Result = response2[index];
  if (album.Result > 0) {
    if (remainingQuantity >= album.Result) {
      album.copiedQuantity = album.Result;
      remainingQuantity -= album.Result;
    } else {
      album.copiedQuantity = remainingQuantity;
      remainingQuantity = 0;
    }
    totalQuantity += album.copiedQuantity;
    copiedQuantities.push(album.copiedQuantity);
    console.log(album.copiedQuantity);
    if (Quantity >= album.copiedQuantity) {
      this.isButtonEnabled = true;
  } if (Quantity < album.copiedQuantity) {
      this.isButtonEnabled = false;
  }

  }
                  return this.http.get('https://www.swatpro.co/inwardgetnetweight.php?Productcode=' + Productcode);
                });
forkJoin(weightCalculations).subscribe((responses: any[]) => {
  let totalWeight = 0; // Initialize total weight variable
  let totalQuantity = 0; // Initialize total quantity variable

  responses.forEach((response: any, i: number) => {
    const multipliedValue = this.albums[i].copiedQuantity * response.NetWeight;
    
    if (this.albums[i].copiedQuantity > 0) {
      this.copiedWeight1[i] = multipliedValue;
      totalWeight += multipliedValue; // Add to the total weight
      
      // Push copiedWeight1
      if (this.albums[i].copiedQuantity > 0) {
        totalQuantity += this.albums[i].copiedQuantity; // Add to the total quantity
      }
    } else {
      this.copiedWeight1[i] = 0;
    }
    copiedWeight1.push(multipliedValue); 
      console.log(copiedWeight1);
  });

  const newDataToShow = {

    storagelocations: storagelocations,
  };

  const newDataToShow1 = {
  
    copiedQuantities:copiedQuantities,

  };
  const newDataToShow2 = {
    
    copiedWeight1:copiedWeight1
  };
  if (typeof this.dataToShow === 'undefined') {
    this.dataToShow = [];
  }

  this.dataToShow.push(newDataToShow);

  if (typeof this.dataToShow1 === 'undefined') {
    this.dataToShow1 = [];
  }

  this.dataToShow1.push(newDataToShow1);

  if (typeof this.dataToShow2 === 'undefined') {
    this.dataToShow2 = [];
  }

  this.dataToShow2.push(newDataToShow2);
  this.totalWeight = totalWeight;
  this.totalQuantity = totalQuantity;
 
});


    
              } else {
                console.error('Invalid response from the second HTTP request.');
                this.showGrid2 = false;
              }
            },
            (error2) => {
              console.error('Second HTTP request error:', error2);
              this.showGrid2 = false;
            }
          );
        },
        (error1) => {
          console.error('First HTTP request error:', error1);
          this.showGrid2 = false;
        }
      );
    }
    
    
    

    
    
    if (Remark === 'DAMAGE') {
      this.showGrid = true;
      this.isGetqtypassweightCalled = true;
      this.http.get<string[]>('https://www.swatpro.co/wmsdamagegridfetch.php?Remark=' + Remark)
        .subscribe(
          (response: string[]) => {
            this.albums = response.map((item: string) => ({
              Storagelocation: '',
              Result: '',
              Gridno: item,
              Quantity: 0, // Add a Quantity property for each album
            }));
    
            const params = new HttpParams()
              .set('Productcode', Productcode)
              .set('Result', JSON.stringify(this.albums));
    
            forkJoin([
              this.http.get('https://www.swatpro.co/damagefetchboxes.php', { params })
            ]).subscribe(
              (data: any[]) => {
                const damageFetchData = data[0];
    
                if (Array.isArray(damageFetchData)) {
                  this.albums.forEach((album: any, index: number) => {
                    album.Result = damageFetchData[index];
                    console.log(album.Result);
                    console.log('Quantity:', Quantity);
                    // Calculate and split quantity if it's greater than damageFetchData
                    if (album.Result > 0) { // Check if there is a valid album.Result
                      if (Quantity >= album.Result) {
                        album.copiedQuantity = album.Result;
                        Quantity -= album.Result;
                      } else {
                        album.copiedQuantity = Quantity;
                        Quantity = 0;
                      }
                    } else {
                      console.log('Invalid album.Result:', album.Result);
                    }
    
                    // Update the Quantity property for the album
                    album.Quantity = album.copiedQuantity;
                  });
    
                  // Calculate weights for the albums
                  const weightCalculations = this.albums.map((album: any) => {
                    return this.http.get('https://www.swatpro.co/inwardgetnetweight.php?Productcode=' + Productcode);
                  });
    
                  // Wait for all weight calculation observables to complete
                  forkJoin(weightCalculations).subscribe((responses: any[]) => {
                    responses.forEach((response: any, i: number) => {
                      const multipliedValue = this.albums[i].copiedQuantity * response.NetWeight;
    
                      if (this.albums[i].copiedQuantity > 0) {
                        this.albums[i].copiedWeight2 = multipliedValue;
                      } else {
                        this.albums[i].copiedWeight2 = 0;
                      }
                    });
    
                    let totalWeight2 = 0;
                    let totalQuantity = 0; // Initialize totalQuantity
                    this.albums.forEach((album: any) => {
                      totalWeight2 += album.copiedWeight2 || 0;
                      totalQuantity += album.Quantity; // Add the Quantity to totalQuantity
                    });
    
                    this.totalWeight2 = totalWeight2; // Update totalWeight2 here
                    this.totalQuantity = totalQuantity; // Update totalQuantity here
    
                    console.log('Sum of copiedWeight2:', totalWeight2);
                    console.log('Total Quantity:', totalQuantity); // Log totalQuantity
                  });
    
                } else {
                  console.log('Invalid data format:', damageFetchData);
                }
              },
              (error: any) => {
                console.error('Error fetching boxes data:', error);
              }
            );
          },
          (error: any) => {
            console.error('Error fetching grid data:', error);
          }
        );
    } else {
      this.showGrid = false;
    }
    
    if (Remark === 'LEAKAGE') {
      this.showGrid1 = true;
      this.isGetqtypassweightCalled = true;
      this.http.get<string[]>('https://www.swatpro.co/wmsdamagegridfetch.php?Remark=' + Remark)
        .subscribe(
          (response: string[]) => {
            this.albums = response.map((item: string) => ({
              Storagelocation: '',
              Result: '',
              Gridno: item,
              Quantity: 0, // Add a Quantity property for each album
            }));
    
            const params = new HttpParams()
              .set('Productcode', Productcode)
              .set('Result', JSON.stringify(this.albums));
    
            forkJoin([
              this.http.get('https://www.swatpro.co/leakagefetchboxes.php', { params })
            ]).subscribe(
              (data: any[]) => {
                const damageFetchData = data[0];
    
                if (Array.isArray(damageFetchData)) {
                  this.albums.forEach((album: any, index: number) => {
                    album.Result = damageFetchData[index];
                    console.log(album.Result);
                    console.log('Quantity:', Quantity);
                    // Calculate and split quantity if it's greater than damageFetchData
                    if (album.Result > 0) { // Check if there is a valid album.Result
                      if (Quantity >= album.Result) {
                        album.copiedQuantity = album.Result;
                        Quantity -= album.Result;
                      } else {
                        album.copiedQuantity = Quantity;
                        Quantity = 0;
                      }
                    } else {
                      console.log('Invalid album.Result:', album.Result);
                    }
    
                    // Update the Quantity property for the album
                    album.Quantity = album.copiedQuantity;
                  });
    
                  // Calculate weights for the albums
                  const weightCalculations = this.albums.map((album: any) => {
                    return this.http.get('https://www.swatpro.co/inwardgetnetweight.php?Productcode=' + Productcode);
                  });
    
                  // Wait for all weight calculation observables to complete
                  forkJoin(weightCalculations).subscribe((responses: any[]) => {
                    responses.forEach((response: any, i: number) => {
                      const multipliedValue = this.albums[i].copiedQuantity * response.NetWeight;
    
                      if (this.albums[i].copiedQuantity > 0) {
                        this.albums[i].copiedWeight3 = multipliedValue;
                      } else {
                        this.albums[i].copiedWeight3 = 0;
                      }
                    });
    
                    let totalWeight2 = 0;
                    let totalQuantity = 0; // Initialize totalQuantity
                    this.albums.forEach((album: any) => {
                      totalWeight2 += album.copiedWeight3 || 0;
                      totalQuantity += album.Quantity || 0; // Add the Quantity to totalQuantity
                    });
    
                    this.totalWeight2 = totalWeight2; // Update totalWeight2 here
                    this.totalQuantity = totalQuantity; // Update totalQuantity here
    
                    console.log('Sum of copiedWeight3:', totalWeight2);
                    console.log('Total Quantity:', totalQuantity); // Log totalQuantity
                  });
    
                } else {
                  console.log('Invalid data format:', damageFetchData);
                }
              },
              (error: any) => {
                console.error('Error fetching boxes data:', error);
              }
            );
          },
          (error: any) => {
            console.error('Error fetching grid data:', error);
          }
        );
    } else {
      this.showGrid1 = false;
    }
    

    this.fetchCopiedWeight(Productcode,copiedQuantity,i,totalQuantity);
    this.getremarkwisegrid(Remark, i,Productcode,Brand,Packing,Batch,Quantity,Result);


  }
}



copiedQuantities: number[][] = [];
storedQuantities: any[] = [];
submitAllRows(i: number, Remark: any, Quantity: any, Productcode: any, Packing: any, Batch: any, Result: any, Brand: any, copiedQuantity: any, rowIndex: any) {
  console.log("Weights by RowId:", this.weightsByRowId);
  const storagelocations = this.dataToShow;
  const copiedQuantities = this.storedQuantities;
  const copiedweights = this.copiedWeight1;

  for (let i = 0; i < this.rows.length; i++) {
    const row = this.rows[i];
    const rowId = i;
    const manufacturingDate = new Date(row.Manufacturingdates);
    manufacturingDate.setDate(manufacturingDate.getDate() + 1);
    const Expirydate = new Date(row.Expirydate);
    Expirydate.setDate(Expirydate.getDate() + 1);
    const dataToInsert = {
      Productcode: row.Productcode,
      Batch: row.Batch,
      Manufacturingdates: manufacturingDate.toISOString(),
      Expirydate: Expirydate.toISOString(),
      InwardDate: row.InwardDate,
      Invoicequantity: row.Invoicequantity,
      Remark: row.Remark,
      Brand: row.Brand,
      Pack: row.Packing,
      NetWeight: row.NetWeight,
      UOM: row.UOM,
      Hsncode: row.Hsncode,
      storagelocations: storagelocations[i],
      Quantity: this.storedQuantities[i],
      Weight: this.weightsByRowId[rowId] || [],
      selectedCity: this.selectedCity, // Include the selected warehouse
      depot: this.depot
    };

    const jsonData = JSON.stringify(dataToInsert);
    console.log(jsonData);
    const insertUrl = 'https://www.swatpro.co/wmsgrnentrytest1123warehosueaddsrn.php';
    this.http.post(insertUrl, jsonData).subscribe(
      (insertResponse) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Records inserted successfully' });
      // console.log(insertResponse); // You probably want to log the response, not the JSON data
  const grnno = insertResponse['Grnno']; // Replace 'Grnno' with the actual key in your response
      this.router.navigate(['modules/materialinwardsrn/srngrnview', grnno]);
       
      },
      (error) => {
        console.error('HTTP POST Request Error', error);
      }
    );
  }

// else if(this.dataToShow1){
//   const  storagelocations=this.dataToShow;
//   const copiedQuantities11 =this.dataToShow1;
//    const  copiedweights=this.dataToShow2;
//     for (let i = 0; i < this.rows.length; i++) {
//       const row = this.rows[i]; // You need to access the correct row in the loop
//       const dataToInsert = {
//         Productcode: row.Productcode,
//         Batch: row.Batch,
//         Manufacturingdates: row.Manufacturingdates,
//         Expirydate: row.Expirydate,
//         InwardDate: row.InwardDate,
//         Invoicequantity: row.Invoicequantity,
//         Remark: row.Remark,
//         Brand: row.Brand,
//         Pack: row.Packing, // Make sure "Packing" property matches your data structure
//         NetWeight: row.NetWeight,
//         UOM: row.UOM,
//         Hsncode: row.Hsncode,
//         storagelocations: storagelocations[i], // You need to define storagelocations
//         Quantity: copiedQuantities11[i], // You need to define copiedQuantities
//         Weight: copiedweights[i], // You need to define copiedweights
//       };
      
  
//       const jsonData = JSON.stringify(dataToInsert);
//       console.log(jsonData);
//       const insertUrl = 'https://www.swatpro.co/wmsgrnentrytest1.php';
//       this.http.post(insertUrl, jsonData).subscribe(
//         (insertResponse) => {
//           this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Records inserted successfully' });
//         // console.log(insertResponse); // You probably want to log the response, not the JSON data
//        const grnno = insertResponse['Grnno']; // Replace 'Grnno' with the actual key in your response
//        this.router.navigate(['modules/materialinward/grnview', grnno]);
         
//         },
//         (error) => {
//           console.error('HTTP POST Request Error', error);
//         }
//       );
//     }
//   }
}






showDialogDisabled: boolean[] = [];
private rowIdCounter :any;

addRow(): void {
  const row = {
    Productcode: '',
    Batch: '',
    Manufacturingdates: '',
    Expirydate: '',
    InwardDate: '',
    Quantity: '',
    Weight: '',
    Invoicequantity: '',
    Remark: '',
    Brand: '',
    Packing: '',
    UOM: '',
    Hsncode: '',
  };

  this.showDialogDisabled.forEach((_, index) => (this.showDialogDisabled[index] = true));
  this.rows.push(row);
  this.showDialogDisabled.push(false);

  this.rowIdCounter = this.rows.length - 1; // Assign the index to rowIdCounter

  this.rows.forEach((rowData, index) => {
    console.log(`${index}:`, rowData);
  });
}


loading: boolean = false;



// submit(Productcode, Batch, Weight, Invoicequantity, i, Remark, Brand, Packing, UOM, Hsncode, Storagelocation,copiedWeight1,Manufacturingdates,Expirydate,InwardDate): void {
//   this.loading = true;

//   setTimeout(() => {
//     this.loading = false;
//   }, 5000);

//   const formData = new FormData();

//   formData.append('Productcode', Productcode);
//   formData.append('Batch', Batch);

//   // Assuming this.Manufacturingdates is a Date object with the desired date
//   const formattedDate: string = `${Manufacturingdates.getFullYear()}-${(Manufacturingdates.getMonth() + 1).toString().padStart(2, '0')}-${Manufacturingdates.getDate().toString().padStart(2, '0')}`;
//   const formattedDate1: string = `${Expirydate.getFullYear()}-${(Expirydate.getMonth() + 1).toString().padStart(2, '0')}-${Expirydate.getDate().toString().padStart(2, '0')}`;
//   const formattedDate2: string = `${InwardDate.getFullYear()}-${(InwardDate.getMonth() + 1).toString().padStart(2, '0')}-${InwardDate.getDate().toString().padStart(2, '0')}`;

//   formData.append('Manufacturingdates', formattedDate);
//   formData.append('Expirydate', formattedDate1);
//   formData.append('InwardDate', formattedDate2);

//   formData.append('Weight', Weight);
//   formData.append('Invoicequantity', Invoicequantity);
//   formData.append('Remark', Remark);
//   formData.append('Brand', Brand);
//   formData.append('Packing', Packing);
//   formData.append('UOM', UOM);
//   formData.append('Hsncode', Hsncode);

//   const vehicleNumber = this.vehicleForm.get('vehicleNumber').value;

//   // Append the vehicle number to the formData
//   formData.append('VehicleNumber', vehicleNumber);

//   // Append Storagelocation and Quantity values
//   this.albums.forEach((album, index) => {
//     formData.append(`Storagelocation[${index}]`, album.Storagelocation);
//     formData.append(`Quantity[${index}]`, album.copiedQuantity);
//     formData.append(`copiedWeight[${index}]`, copiedWeight1[index]);

//     if (this.Remark === 'DAMAGE' || this.Remark === 'LEAKAGE') {
//       formData.append(`Storagelocation[${index}]`, String(album.Gridno));
//     }
//   });

//   const url = 'https://www.swatpro.co/wmsgrnentrytest.php';

//   const headers = new HttpHeaders();
//   headers.append('Content-Type', 'application/x-www-form-urlencoded');

//   // Convert FormData to string for logging purposes
//   let formDataString = '';
//   formData.forEach((value, key) => {
//     formDataString += `${key}=${value}&`;
//   });
//   formDataString = formDataString.slice(0, -1); // Remove the trailing '&'
//   console.log('FormData:', formDataString);

//   this.http.post(url, formData, { headers }).subscribe(
//     (response) => {
//       console.log('Response:', response);
//       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record Successfully Inserted' });
//       setTimeout(() => {
//         this.router.navigate(['modules/materialinward/inwardshowreport']);
//       }, 4000);
//       location.reload();
//     },
//     (error) => {
//       console.error('Error:', error);
//       this.messageService.add({
//         severity: 'error',
//         summary: 'Error Message',
//         detail: 'An error occurred while submitting the data.',
//       });
//     }
//   );
// }










 deleteRow(index: number): void {
   this.rows.splice(index, 1);
 }

validateInput(event: any) {
 const inputValue = event.target.value;
 const pattern = /^[0-9]*$/; // Only allows numeric values
 if (!pattern.test(inputValue)) {
   event.target.value = inputValue.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
   this.Quantity = event.target.value;
 }
}


 showreport() {
   this.router.navigate(['modules/materialinwardsrn/inwardsrnreport']);
 }

 uploadFile(event: any) {
   const file = event.target.files ? event.target.files[0] : '';
   
   this.form1.patchValue({
     image: file
   });
   this.form1.get('image')?.updateValueAndValidity();
 }


submitImage() {
  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File uploaded successfully' });
  this.studentsService1.inwardmasterexcel(this.form1.value.image).subscribe(
    (data: any) => {
      // File upload success
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File uploaded successfully' });
      //console.log(data);
    },
    (error) => {
      // Handle error
     // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'File upload failed' });
    }
  );
}
getProductBrand(Productcode: any, rowIndex: any) {
  this.http.get('https://www.swatpro.co/inwardgetbrand.php?Productcode=' + Productcode)
    .subscribe((response: any) => {
      this.rows[rowIndex].Brand = response.Brand;
    });

  this.http.get('https://www.swatpro.co/inwardgetpack.php?Productcode=' + Productcode)
    .subscribe((response: any) => {
      this.rows[rowIndex].Packing = response.Packing;
    });
  this.http.get('https://www.swatpro.co/inwardgetuom.php?Productcode=' + Productcode)
    .subscribe((response: any) => {
      this.rows[rowIndex].UOM = response.UOM;
    });
  this.http.get('https://www.swatpro.co/inwardgethsncode.php?Productcode=' + Productcode)
    .subscribe((response: any) => {
      this.rows[rowIndex].Hsncode = response.Hsncode;
   
    });
  
}

 Quantity: number;
/*  copiedQuantity: number[] = [];*/
 remainingQuantity: number[] = [];
sumDistributedQty: number;
  sumCopiedWeight: number;

  getqtypassweight(Quantity: any, Productcode: any, rowIndex: number, Packing: any, Batch: any, Result: any, Brand: any) {
  
   // this.copiedQuantity = Array(this.numOfInputBoxes).fill(0);
   
 // Initialize the sum of copiedWeight
  
    this.http.get('https://www.swatpro.co/inwardgetnetweight.php?Productcode=' + Productcode)
      .subscribe(
        (response: any) => {
          if (this.rows[rowIndex]) {
            this.rows[rowIndex].NetWeight = response.NetWeight * Quantity;
          }
          
        });
  }
  

//   fetchCopiedWeight(Productcode: string, i: number,copiedQuantity:any,totalQuantity:any) {
//     this.http.get('https://www.swatpro.co/inwardgetnetweight.php?Productcode=' + Productcode)
//       .subscribe((response: any) => {
//         const a=  this.copiedWeight1[i] = response.NetWeight*copiedQuantity;
//         console.log(a);
//       });
//   }
// // Declare an array to store calculated weights
// Declare allWeights as a class member
weightsByRowId: { [key: string]: number[] } = {};
allWeights: number[] = [];

fetchCopiedWeight(Productcode: string, i: number, copiedQuantity: any, totalQuantity: any) {
  const rowid = this.rowIdCounter;
  console.log('Current rowId in calculateSum:', rowid);

  this.http.get('https://www.swatpro.co/inwardgetnetweight.php?Productcode=' + Productcode)
    .subscribe((response: any) => {
      // Calculate the weight
      const weight = response.NetWeight * copiedQuantity;

      // Check if the value is a valid number before storing
      if (!isNaN(weight)) {
        // Store the calculated weight in the array
        this.copiedWeight1[i] = weight;

        // Create or update an object to store weights based on rowId
        if (!this.weightsByRowId[rowid]) {
          this.weightsByRowId[rowid] = [];
        }

        // Check if the value is a valid number before storing
        if (!isNaN(weight)) {
          this.weightsByRowId[rowid][i] = weight;
        }

        // Store it in the allWeights array
        this.allWeights.push(weight);

        // Filter out 0 from copiedWeight1 at position i
        this.copiedWeight1[i] = this.copiedWeight1[i] !== 0 ? this.copiedWeight1[i] : undefined;
        this.copiedWeight1 = this.copiedWeight1.filter(value => value !== undefined);

        // Filter out 0 from weightsByRowId[rowid] at position i
        this.weightsByRowId[rowid][i] = this.weightsByRowId[rowid][i] !== 0 ? this.weightsByRowId[rowid][i] : undefined;
        this.weightsByRowId[rowid] = this.weightsByRowId[rowid].filter(value => value !== undefined);

        console.log("Edit Weights:-" + this.copiedWeight1);

        console.log("Weights by RowId:", this.weightsByRowId);
      }
    });
}





isButtonEnabled: boolean = true; 
calculateSum(copiedQuantity: number, rowIndex: number, i: number, Result: any, Quantity: any) {
  const rowid = this.rowIdCounter;
  console.log('Current rowId in calculateSum:', rowid);

  if (!this.storedQuantities[rowid]) {
    this.storedQuantities[rowid] = { copiedQuantities: [] };
  }

  while (this.storedQuantities[rowid].copiedQuantities.length <= rowIndex) {
    this.storedQuantities[rowid].copiedQuantities.push(0);
  }

  this.storedQuantities[rowid].copiedQuantities[rowIndex] = copiedQuantity;

  console.log('Updated storedQuantities:', this.storedQuantities);
  console.log('Rows after adding a new row:', this.rows);
}

search(event: any): void {
  const term = event.query;
  const apiUrl = `https://swatpro.co/consigneeautosearch.php/?term=${term}`;
  
  console.log('API URL:', apiUrl); // Log the URL to the console

  this.http.get(apiUrl)
    .pipe(map((response: any) => response.data))
    .subscribe(data => {   
      this.searchResults = data; 
    
    });
}

selectResult(event: any) {
  // Assuming ConsigneeName is within the value property
  const selectedConsigneeName = event.value.ConsigneeName;
  
  this.searchTerm = selectedConsigneeName;

}


search1(event: any): void {
  const term = event.query;
  this.http.get(`https://swatpro.co/develiverylocationautosaerch.php/?term=${term}`)
    .pipe(map((response: any) => response.data))
    .subscribe(data => {
      this.filteredResults1 = data;
      console.log(data);
      this.fetchDataForReferenceDoNo(term, data); // Pass 'term' as DeliveryLocation
    });
}

fetchDataForReferenceDoNo(eventValue: any, filteredResults1: any[]): void {
  const DeliveryLocation = eventValue.value.DeliveryLocation; // Extracting the value from the object
  const apiUrl = `https://www.swatpro.co/getrouteno.php?searchTerm=${encodeURIComponent(DeliveryLocation)}`;
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

getremarkwisegrid(Remark: any,Quantity: any, Productcode: any, rowIndex: number,Packing:any,Batch:any,Result:any,Brand:any) {   
 }

}
