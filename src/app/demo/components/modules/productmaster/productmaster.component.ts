import { Component,OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { StudentsService } from '../students.service';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import{Router} from '@angular/router';

import { MessageService } from 'primeng/api';
import { HttpClient, HttpParams,HttpHeaders  } from '@angular/common/http';
interface ApiResponse {
  Clientcode: string; // Define the interface for the API response object
}

@Component({
  selector: 'app-productmaster',
  templateUrl: './productmaster.component.html',
  styleUrls: ['./productmaster.component.scss'],
  providers:[MessageService]
})
export class ProductmasterComponent implements OnInit{
  
  selected = 'option2';
  searchText: string = '';
  filteredResults: string[] = [];
  searchText1: string = ''; 
  multiplicationResult: any;
  multiplicationResult1: any;
constructor(private formBuilder:FormBuilder,
         private studentsService1:StudentsService,
         private router:Router,
         private http: HttpClient,
         private messageService: MessageService

         ){
this.form1=this.formBuilder.group({
 image:[null]
})
}
addForm:any;
depot:any;
form1:any;
ngOnInit(){
     this.addForm=this.formBuilder.group({     
       ClientCode:['',Validators.required],
       Productcode: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        Hsncode: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        Brand: ['', [Validators.required, Validators.pattern('^[A-Z]*$')]],
        Packingsize: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        Subunit: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
       Net:['',Validators.required],
        Grossweight:['',Validators.required],
       Aliseproductname:['',Validators.required],
       Technicalname:['',Validators.required],
       Productlenght: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
       Productwidth: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
       Productheight: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
       Productcubic:['',Validators.required],
       UOM:['',Validators.required],
       Packing:['',Validators.required],
       Remark:['',Validators.required]
     });
     const userInfoString = sessionStorage.getItem('userInfo');
     if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      this.depot = userInfo.Depot;
      console.log(this.depot);
     }
}


onSubmit() {
  const formData = this.addForm.value;
  formData.Depot = this.depot;
  // Check if any of the form fields are empty
  const anyFieldIsEmpty = Object.values(formData).some(value => value === "");

  if (anyFieldIsEmpty) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Empty Fields are not allowed' });
  } else {
    // Call the createclientmaster service to submit form data
    this.studentsService1.createproductmaster(formData)
      .subscribe(
        data => {
          // Set a success flag
          const success = true;

          // Display the success message
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record successfully inserted' });

          // Reset the form (if needed)
          this.addForm.reset();

          // Navigate to the desired page after a short delay (e.g., 1 second)
          setTimeout(() => {
            this.router.navigate(['modules/productmaster/productmasterview']);
          }, 2000); // Adjust the delay as needed
        },
        error => {
          console.error("Error inserting record:", error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error inserting record' });
          // Optionally, display an error message to the user.
        }
      );
  }
}
search() {
  // Assuming this.depot contains the value you want to pass
  const depot = this.depot;

  // Construct HttpParams with existing searchText and depot
  let params = new HttpParams()
    .set('term', this.searchText)
    .set('depot', depot);
  console.log(params);
  this.http
    .get<ApiResponse[]>('https://www.swatpro.co/getclientcodedepowise.php', { params })
    .subscribe(
      (data: ApiResponse[]) => {
        console.log(data); // Debug: Check the received data format
        this.filteredResults = data
          .filter(item => item.Clientcode.toLowerCase().startsWith(this.searchText.toLowerCase()))
          .map(item => item.Clientcode);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
}
selectResult(result: any) {
  // Assuming result is an object with a Clientcode property
  if (result && result.Clientcode) {
    this.searchText = result.Clientcode;
  }
}


calculateResult(): void {
 const packingsize = parseFloat(this.addForm.get('Packingsize').value);
 const subunit = parseFloat(this.addForm.get('Subunit').value);

 // Check if both values are numeric before performing the multiplication
 if (!isNaN(packingsize) && !isNaN(subunit)) {
   this.multiplicationResult = packingsize * subunit;
   this.addForm.patchValue({
     Net: this.multiplicationResult.toFixed(2), // Update Net Weight input
   });
 } else {
   this.multiplicationResult = undefined;
   this.addForm.patchValue({
     Net: '', // Clear Net Weight input
   });
 }
}

calculateResult1(): void {
 const Productlenght = parseFloat(this.addForm.get('Productlenght').value);
 const Productwidth = parseFloat(this.addForm.get('Productwidth').value);
 const Productheight = parseFloat(this.addForm.get('Productheight').value);
 // Check if both values are numeric before performing the multiplication
 if (!isNaN(Productlenght) && !isNaN(Productwidth)  && !isNaN(Productheight)) {
   this.multiplicationResult1 = Productlenght * Productwidth * Productheight/1728;
   this.addForm.patchValue({
     Productcubic: this.multiplicationResult1.toFixed(2), // Update Net Weight input
   });
 } else {
   this.multiplicationResult1 = undefined;
   this.addForm.patchValue({
     Productcubic: '', // Clear Net Weight input
   });
 }
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
  this.studentsService1.productmasterexcelasheet(this.form1.value.image).subscribe(
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
   this.router.navigate(['modules/productmaster/productmasterview']);
 }
}
