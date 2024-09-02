import { Component,OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { StudentsService } from '../students.service';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient, HttpParams,HttpHeaders  } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import{Router} from '@angular/router';
interface ApiResponse {
  Clientcode: string; // Define the interface for the API response object
}

@Component({
  selector: 'app-gridmaster',
  templateUrl: './gridmaster.component.html',
  styleUrls: ['./gridmaster.component.scss'],
  providers:[MessageService]
})
export class GridmasterComponent implements OnInit{
  searchText: string = '';
  filteredResults: string[] = [];
  searchText1: string = ''; 
  Warehauseno:any;
  ClientCode:any;
  warehouseCode:any;
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
form1:any;
depot:any;
ngOnInit(){
  this.addForm=this.formBuilder.group({     
    ClientCode:['',Validators.required],
    Warehauseno:['',Validators.required],
    Grid:['',Validators.required],
    Locationlenght: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    Locationwidth: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    Locationheight: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    Result:['',Validators.required]
  });
  const userInfoString = sessionStorage.getItem('userInfo');
  if (userInfoString) {
   const userInfo = JSON.parse(userInfoString);
   this.depot = userInfo.Depot;
   console.log(this.depot);
  }
}
 getWarehouseCode(clientCode: any) {
  console.log('Client Code:', clientCode);
  const url = `https://www.swatpro.co/getWarehouseInfo.php?ClientCode='WMS/PUNE/001'`;
  
  this.http.get(url).subscribe(
    (data: any) => {
      console.log('Response Data:', data);
      this.Warehauseno = data.WarehouseCode; // Update property name if needed
    },
    (error) => {
      console.log('Error:', error);
    }
  );
}


calculateResult1(): void {
  const Locationlenght = parseFloat(this.addForm.get('Locationlenght').value);
  const Locationwidth = parseFloat(this.addForm.get('Locationwidth').value);
  const Locationheight = parseFloat(this.addForm.get('Locationheight').value);
  // Check if both values are numeric before performing the multiplication
  if (!isNaN(Locationlenght) && !isNaN(Locationwidth) && !isNaN(Locationheight)) {
    this.multiplicationResult1 = Locationlenght * Locationwidth*Locationheight;
    this.addForm.patchValue({
      Result: this.multiplicationResult1.toFixed(2), // Update Net Weight input
    });
  } else {
    this.multiplicationResult1 = undefined;
    this.addForm.patchValue({
      Result: '', // Clear Net Weight input
    });
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
    this.studentsService1.creategridmaster(formData)
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
            this.router.navigate(['modules/gridmaster/gridmastermasterview']);
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
  const depot = this.depot;

  // Construct HttpParams with existing searchText and depot
  let params = new HttpParams()
    .set('term', this.searchText)
    .set('depot', depot);
  this.http
    .get<ApiResponse[]>('https://www.swatpro.co/getclientcode1depowise.php', { params })
    .subscribe(
      (data: ApiResponse[]) => {
        //console.log(data); // Debug: Check the received data format
        this.filteredResults = data
          .filter(item => item.Clientcode.toLowerCase().startsWith(this.searchText.toLowerCase()))
          .map(item => item.Clientcode);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
}
selectResult(result: string) {
  this.searchText = result;
}
uploadFile(event:any){
  const file = event.target.files ? event.target.files[0] : '';
//console.log(file);
this.form1.patchValue({
  image:file
});

this.form1.get('image')?.updateValueAndValidity()
}
showreport() {
  this.router.navigate(['modules/gridmaster/gridmastermasterview']);
  }

submitImage() {
  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File uploaded successfully' });
  this.studentsService1.gridmasterexcelasheet(this.form1.value.image).subscribe(
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
}


