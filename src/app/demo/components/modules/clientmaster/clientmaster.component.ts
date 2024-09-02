import { Component,OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { StudentsService } from '../students.service';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import{Router} from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-clientmaster',
  templateUrl: './clientmaster.component.html',
  styleUrls: ['./clientmaster.component.scss'],
  providers:[MessageService]

})
export class ClientmasterComponent implements OnInit{
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
depot:any;
 ngOnInit(){
      this.addForm=this.formBuilder.group({     
        Username: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
        Password:['',Validators.required],
        ClientName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
        ContactPersonName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
        MobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        MailId: ['', [Validators.required, Validators.email]],
        Industry: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
        Address: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
        PinCode:['',Validators.required],
         GSTNumber:['',Validators.required],
        BillingCity: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
        ClientLocation: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
        ClientCode: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
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
    this.studentsService1.createclientmaster(formData)
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
            this.router.navigate(['modules/clientmaster/clinetmasterview']);
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


onInputChange() {
  const inputControl = this.addForm.get('Username');
  
  if (inputControl.value && !this.validateInput(inputControl.value)) {
    inputControl.setErrors({ invalidInput: true });
  } else {
    inputControl.setErrors(null);
  }
}

validateInput(value: string): boolean {
  const regex = /^[a-zA-Z0-9\s]*$/;
  return regex.test(value);
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
  this.studentsService1.clientmasterexcelasheet(this.form1.value.image).subscribe(
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
  this.router.navigate(['modules/clientmaster/clinetmasterview']);

}
}

