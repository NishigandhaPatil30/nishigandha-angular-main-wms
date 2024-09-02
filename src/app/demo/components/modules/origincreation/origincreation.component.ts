import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { StudentsService } from '../students.service';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import{Router} from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-origincreation',
  templateUrl: './origincreation.component.html',
  styleUrls: ['./origincreation.component.scss'],
  providers:[MessageService]
})
export class OrigincreationComponent {
  constructor(private formBuilder:FormBuilder,
           private studentsService1:StudentsService,
           private router:Router,
           private messageService: MessageService
           ){
 
 }
 addForm:any;
  ngOnInit(){
       this.addForm=this.formBuilder.group({     
         originname:['',Validators.required],
           Gridno:['',Validators.required]
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
    this.studentsService1.createorigincreation(formData)
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
           // this.router.navigate(['modules/clientmaster/clinetmasterview']);
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
 
 
 
