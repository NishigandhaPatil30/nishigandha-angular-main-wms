import { Component ,OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { StudentsService } from '../students.service';
import{Router,Params,ActivatedRoute} from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-usermasteredit',
  templateUrl: './usermasteredit.component.html',
  styleUrls: ['./usermasteredit.component.scss'],
  providers:[MessageService]
})
export class UsermastereditComponent implements OnInit{
  constructor(private formBuilder:FormBuilder,
           private studentsService1:StudentsService,
            private router:Router,
            private routes:ActivatedRoute,
            private messageService: MessageService
            ){
  }
  
   hide = true;
    addForm:any;
   id:any;
   ngOnInit(){
    const routerParams=this.routes.snapshot.params;
    //console.log(routerParams);
    this.studentsService1.getusermasterById(routerParams['Id'])
    .subscribe((data:any)=>{  
     //console.log(data)
      this.addForm.patchValue(data);
    });
        this.addForm=this.formBuilder.group({
           Id:[''],
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
  
  //  update() {
  //   if (this.addForm.valid) {
  //     this.studentsService1.editusermaster(this.addForm.value).subscribe(
  //       () => {
  //         console.log("Record is successfully updated");
  //         alert("Record is successfully updated");
  //         // Redirect to another page
  //         // this.router.navigate(['dashboard/modules/clientmaster/clientmasterview']);
  //       },
  //       error => {
  //         console.error('Error updating record:', error);
  //         alert("Error updating record: " + error.message);
  //       }
  //     );
  //   }
  // }


  update() {
    const formData = this.addForm.value;
  
    // Check if any of the form fields are empty
    const anyFieldIsEmpty = Object.values(formData).some(value => value === "");
  
    if (anyFieldIsEmpty) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Empty Fields are not allowed' });
    } else {
      // Call the createclientmaster service to submit form data
      this.studentsService1.editusermaster(formData)
        .subscribe(
          data => {
            // Set a success flag
            const success = true;
  
            // Display the success message
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record successfully Updated' });
  
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
  
  }