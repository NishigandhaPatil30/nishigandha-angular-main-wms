import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from '../students.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-compatibilitystoragemapping',
  templateUrl: './compatibilitystoragemapping.component.html',
  styleUrls: ['./compatibilitystoragemapping.component.scss'],
  providers:[MessageService]
})
export class CompatibilitystoragemappingComponent implements OnInit {
  
  searchData: string = '';
  searchResults: any[] = [];
  searchTerm: any;
  tableData: any[] = []; 
  showbutton:boolean=false;
  form1:any;
  constructor(
    private formBuilder: FormBuilder,
    private studentsService1: StudentsService,
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
    ){
      this.form1=this.formBuilder.group({
        image:[null]
      })
    }

  ngOnInit(): void {
   
  }
  search(event: any): void {
    const term = event.query;
    this.http.get(`https://swatpro.co/search.php/?term=${term}`)
      .pipe(map((response: any) => response.data))
      .subscribe(data => {
        //console.log(data);
        this.searchResults = data;
      });
  }
  search1(event: any): void {
    const term = event.query;
    this.http.get(`https://swatpro.co/compatibilityproductcodesearch.php/?term=${term}`)
      .pipe(map((response: any) => response.data))
      .subscribe(data => {
        //console.log(data);
        this.searchResults = data;
      });
  }

  row = { Gridno: '', Productcode: '' };
 
  addRow() {
    this.tableData.push({ Gridno: '', Productcode: '' });
    this.showbutton=true;
  }
  

  deleteRow(rowIndex: number) {
    this.tableData.splice(rowIndex, 1); // Remove the row at the specified index
  }
  submitData() {
    const insertUrl = 'https://swatpro.co/compatibilitysubmit_data.php';
    console.log(this.tableData); // Check the structure of this.tableData
  
    // Send JSON data to the PHP script
    this.http.post(insertUrl, this.tableData, { responseType: 'text' })
      .subscribe((response) => {
        console.log(response);
  
        // Display a PrimeNG message based on the response
        this.messageService.add({
          severity: 'success', // You can change this to 'error', 'info', or 'warn' as needed
          summary: 'Success', // Message summary
          detail: response, // Message detail (response from the server)
        });
  
        // Use setTimeout to close the message after 200 milliseconds (0.2 seconds)
        setTimeout(() => {
          this.messageService.clear(); // Clear the message after the timeout
          window.location.reload();
        }, 2000);
      });
  }
  
  
uploadFile(event:any){
  const file = event.target.files ? event.target.files[0] : '';
//console.log(file);
this.form1.patchValue({
  image:file
});

this.form1.get('image')?.updateValueAndValidity()
}

submitImage() {
  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File uploaded successfully' });
  this.studentsService1.compatibilitymasterexcelasheet(this.form1.value.image).subscribe(
    (data: any) => {
      // File upload success
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File uploaded successfully' });
      console.log(data);
    },
    (error) => {
      // Handle error
     // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'File upload failed' });
    }
  );
}
showreport() {
  this.router.navigate(['modules/compatibilitystoragemapping/compatibilitystoragemappingview']);
} 
}


