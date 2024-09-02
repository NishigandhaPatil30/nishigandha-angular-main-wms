import { Component,OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { StudentsService } from '../students.service';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import{Router} from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-usermaster',
  templateUrl: './usermaster.component.html',
  styleUrls: ['./usermaster.component.scss'],
  providers:[MessageService]
})
export class UsermasterComponent implements OnInit{
  hide = true;
  constructor(private formBuilder:FormBuilder,
            private studentsService1:StudentsService,
            private router:Router,
            private messageService: MessageService
            ){
  this.form1=this.formBuilder.group({
    image:[null]
  })
  }
  addForm:any;
  form1:any;
  
   ngOnInit(){
        this.addForm=this.formBuilder.group({     
          Username: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
          Password:['',Validators.required],
           Firstname: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
           Middlename: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
           Lastname: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],     
          Dateofbirth:['',Validators.required],
          Aadharnumber: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]],
          Pannumber: ['', [Validators.required, Validators.pattern(/^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/)]],
          Address:['',Validators.required],
          Contactnumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
           Personalmailid: ['', [Validators.required, Validators.email]],
          Education:['',Validators.required],
          Access:['',Validators.required],
          clientcode:['',Validators.required],
          WarehouseCode:['',Validators.required]
        });
   }
  

  onSubmit() {
    const formData = this.addForm.value;
  
    // Check if any of the form fields are empty
    const anyFieldIsEmpty = Object.values(formData).some(value => value === "");
  
    if (anyFieldIsEmpty) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Empty Fields are not allowed' });
    } else {
      // Call the createclientmaster service to submit form data
      this.studentsService1.createusermaster(formData)
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
              this.router.navigate(['modules/usermaster/usermasterview']);
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
    this.studentsService1.usermasterexcelasheet(this.form1.value.image).subscribe(
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
      this.router.navigate(['modules/usermaster/usermasterview']);
    }
  }
  