import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from '../students.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
interface TableRow {
  Productcode: any;

  Batch: any;
  storageLocations: any;
  Gridnonew1: any;
  Quantity: any;
  NetWeight: any;
}


@Component({
  selector: 'app-internalwarehousestockshifting',
  templateUrl: './internalwarehousestockshifting.component.html',
  styleUrls: ['./internalwarehousestockshifting.component.scss'],
  providers:[MessageService]
})
export class InternalwarehousestockshiftingComponent implements OnInit {
  Brand: any;
  Hsncode: any;
  Productcode: any;
  NetWeight: any;
  storageLocations: any[] = [];
Gridnonew1:any;
Quantity:any;
cities: string[] = [];
selectedCity: string;
warehosueselect:boolean=false;
gridCubicFeetResponse:any;
  constructor(
    private formBuilder: FormBuilder,
    private studentsService1: StudentsService,
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {
    this.form1 = this.formBuilder.group({
      image: [null],
    });
  
  }
  validateInput(event: any) {
    const inputValue = event.target.value;
    const pattern = /^[0-9]*$/; // Only allows numeric values
    if (!pattern.test(inputValue)) {
      event.target.value = inputValue.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
      this.Quantity = event.target.value;
    }
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
      Date: ['', Validators.required],
      ConsigneeName: ['', Validators.required],
    });
    const userInfoString = sessionStorage.getItem('userInfo');
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      this.depot = userInfo.Depot;
      this.fetchClientCodes(this.depot);
    }
    this.dataSource.data = [
      {
        Productcode: '',
        Batch: '',
        storageLocations: '',
        Gridnonew1: '',
        Quantity: '',
        NetWeight: '',
      },
    ];
  }
  fetchClientCodes(depot: string): void {
    const url = `https://www.swatpro.co/getwarehouseinward.php?depot=${depot}`;
   // console.log('URL:', url); // Log the constructed URL
    this.http.get<string[]>(url)
      .subscribe((data) => {
        this.cities = data;
        //console.log('Response:', data); // Log the response data
      });
  }
  uploadFile(event: any) {
    const file = event.target.files ? event.target.files[0] : '';
    this.form1.patchValue({
      image: file,
    });

    this.form1.get('image')?.updateValueAndValidity();
  }
  onCityChange(event) {
    // Do something with the selected city
    console.log("Selected city:", this.selectedCity);
    this.warehosueselect=true;
  }
 
  submitImage() {
    this.studentsService1
      .clientmasterexcelasheet(this.form1.value.image)
      .subscribe(
        (data: any) => {
          //this.router.navigate(['modules/view']);
          console.log(data);
        },
        (error) => {}
      );
  }

  displayedColumns: string[] = [
    'Productcode',
    'Batch',
    'From Grid',
    'To Grid',
    'Quantity',
    'NetWeight',
    'addButton',
    'deleteButton',
  ];

  dataSource = new MatTableDataSource<TableRow>([]);

  addRow() {
    this.dataSource.data.push({
      Productcode: '',
      Batch: '',
      storageLocations: '',
      Gridnonew1: '',
      Quantity: '',
      NetWeight: '',
    });
    this.dataSource.data = [...this.dataSource.data];
  }

  removeRow(index: number) {
    this.dataSource.data.splice(index, 1);
    this.dataSource.data = [...this.dataSource.data];
  }

// Angular component
onInputChange(product: any) {
  // Assuming you have PHP backend endpoints to handle the form submission
  const urlForProductTransfer = 'https://www.swatpro.co/fetchproducttransfergridwarehouseadd.php';
  const urlForGridTransfer = 'https://www.swatpro.co/fetchgridtransfergrid1warehouseadd.php';

  // Create objects with Productcode and Batch for each request
  const requestDataProductTransfer = {
    Productcode: product.Productcode,
    Batch: product.Batch,
    selectedCity:this.selectedCity
  };
console.log(requestDataProductTransfer);
  const requestDataGridTransfer = {
    Productcode: product.Productcode,
    selectedCity:this.selectedCity
  };

  // Send first POST request to fetch product transfer storage locations
  this.http.post(urlForProductTransfer, requestDataProductTransfer).subscribe(
    (response: any) => {
      console.log('Product Transfer:', response);
      // Handle the response from the backend here (e.g., display product transfer storage location)
      product.productTransferStorageLocations = response.storageLocations;
    },
    (error) => {
      console.error('Product Transfer Error:', error);
    }
  );

  // Send second POST request to fetch grid transfer storage locations
  this.http.post(urlForGridTransfer, requestDataGridTransfer).subscribe(
    (response: any) => {
      console.log('Grid Transfer:', response);
      // Handle the response from the backend here (e.g., populate dropdown with grid transfer storage locations)
      product.gridTransferStorageLocations = response.storageLocations;
    },
    (error) => {
      console.error('Grid Transfer Error:', error);
    }
  );
}

getGridCubicFeet(Productcode: string, selectedStorageLocation: string, Quantity: any,product:any) {
  const data = { Productcode: Productcode, selectedStorageLocation: selectedStorageLocation };

  this.http.post<any>('https://www.swatpro.co/fetchgridresponsewarehosueadd.php', data).subscribe(
    (response) => {
      console.log(response);
      const parsedQuantity = parseFloat(Quantity);
      console.log(parsedQuantity);
      if (response < parsedQuantity) {
        this.messageService.add({
          severity: 'warn',
          summary: 'warning',
          detail: 'Available Boxes space in Grid.'
        });
        if (product) {
          product['Quantity'] = null;
        }
      } else {
        this.messageService.add({
          severity: 'info',
          summary: 'Available Boxes space in Grid.',
          detail: JSON.stringify(response)
        });
      }
    },
    (error) => {
      console.log(error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'An error occurred while fetching data.'
      });
    }
  );
}



onSubmit() {
  // Extract the data array from MatTableDataSource
  const dataToSend = this.dataSource.data;

  // Include the selected city in the data to send
  const dataWithCity = dataToSend.map(item => ({...item, selectedCity: this.selectedCity}));

  // Check if the data array is empty
  if (dataWithCity.length === 0) {
    return;
  }

  console.log(dataWithCity);

  // Send the data array to the PHP script using HTTP POST
  this.http.post('https://www.swatpro.co/producttreanfergridntry.php', dataWithCity).subscribe(
    (response) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record Successfully inserted' });
      // Empty the data array
      this.dataSource.data = [];

    },
    (error) => {
      console.error(error); // Handle errors, if any
    }
  );
}




  showreport() {
    this.router.navigate(['modules/internalwarehousestockshifting/internalwarehousestockshiftingview']);
  }

}

