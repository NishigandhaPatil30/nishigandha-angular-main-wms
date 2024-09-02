import { Component ,OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { StudentsService } from '../students.service';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import{Router} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-margincreation',
  templateUrl: './margincreation.component.html',
  styleUrls: ['./margincreation.component.scss'],
  providers:[MessageService]
})
export class MargincreationComponent implements OnInit{
  searchResults: any[] = [];
  searchTerm: any;
  Result:any;
  Grid:any;
  selectedBrand: any; // You can adjust the type based on the data type of 'response.Result'

  constructor(private formBuilder:FormBuilder,
          private studentsService1:StudentsService,
          private router:Router,
          private http: HttpClient,
          private messageService: MessageService
          ){

}
addForm:any;
 ngOnInit(){
      this.addForm=this.formBuilder.group({     
         Grid:['',Validators.required],

        Margin: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        Result:['',Validators.required],
        TotalAvailable:['',Validators.required]
    
      });
 }
 update() {
  const formData = this.addForm.value;
  formData.Margin = Number(formData.Margin);
  formData.TotalAvailable = Number(formData.TotalAvailable);

  // Check if any field is empty
  if (this.isAnyFieldEmpty(formData)) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Empty Fields are not allowed' });
    return; // Exit the function if fields are empty
  }

  // Send data to PHP script
  this.http.post<any>('https://swatpro.co/margincreationupdate.php', formData).subscribe(
    response => {
      // Handle response from PHP script (success or error)
      if (response.success) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record updated successfully' });
        this.addForm.reset(); // Reset the form
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Update failed: ' + response.error });
      }
    },
    error => {
      console.error(error);
    }
  );
}



// Function to check if any field is empty
isAnyFieldEmpty(formData) {
  for (const key in formData) {
    if (formData.hasOwnProperty(key) && !formData[key]) {
      return true;
    }
  }
  return false;
}


search(event: any): void {
  const term = event.query;
  this.http.get(`https://swatpro.co/search.php/?term=${term}`)
    .pipe(map((response: any) => response.data))
    .subscribe(data => {
      this.searchResults = data;
    });
}
getProductBrand() {
  const encodedSearchTerm = encodeURIComponent(this.searchTerm);
  const url = `https://www.swatpro.co/marginresultfetch.php?searchTerm=${encodedSearchTerm}`;
  console.log(url);

  this.http.get(url).subscribe(
    (response: any) => {
      console.log('Response from Server:', response); // Log the response
      this.Result = response.Result;
      this.selectedBrand = response.Result; // Update 'selectedBrand' with the appropriate property
    },
    (error: any) => {
      console.error(error);
    }
  );
  
}

onSelectBrand(event: any) {
  console.log('Selected Brand:', event); // Add this line to log the selected brand
  this.selectedBrand = event; // Update 'selectedBrand' with the appropriate property
}
  calculateTotalAvailable() {
    const n1 = parseFloat(this.addForm.get('Result').value);
    const n2 = parseFloat(this.addForm.get('Margin').value);
    const n3 = n1 / 100;
    const n4 = n3 * n2;
    const n5 = n1 - n4;
    this.addForm.get('TotalAvailable').setValue(n5);
  }

onInputChange(newValue: any) {
  // Your logic here
}
}



