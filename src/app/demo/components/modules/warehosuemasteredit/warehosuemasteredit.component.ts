import { Component ,OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { StudentsService } from '../students.service';
import{Router,Params,ActivatedRoute} from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-warehosuemasteredit',
  templateUrl: './warehosuemasteredit.component.html',
  styleUrls: ['./warehosuemasteredit.component.scss'],
  providers:[MessageService]
})
export class WarehosuemastereditComponent implements OnInit{
  constructor(private formBuilder:FormBuilder,
           private studentsService1:StudentsService,
            private router:Router,
            private routes:ActivatedRoute,
            private messageService: MessageService
            ){
  }
   hide = true;
      selected = 'Branch Or Hub Office';
    addForm:any;
   id:any;
   ngOnInit(){
    const routerParams=this.routes.snapshot.params;
    //console.log(routerParams);
    this.studentsService1.getwarehousemasterById(routerParams['id'])
    .subscribe((data:any)=>{  
     // console.log(data)
      this.addForm.patchValue(data);
    });
        this.addForm=this.formBuilder.group({
           id:[''],
           Clientcode:['',Validators.required],
           ClientName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
           GSTNumber:['',Validators.required],
           PhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
            WarehouseCode:['',Validators.required],
           WarehouseAddress:['',Validators.required],
           WarehouseLength:['',Validators.required],
            WarehouseWidth:['',Validators.required],
            WarehouseLocation:['',Validators.required],
           OpertionalGate:['',Validators.required],
           EmergencyGate:['',Validators.required],
           WarehouseLongitude:['',Validators.required],
           WarehouseLatitude:['',Validators.required]
        });
   }
  
  

  
  update() {
    const formData = this.addForm.value;
  
    // Check if any of the form fields are empty
    const anyFieldIsEmpty = Object.values(formData).some(value => value === "");
  
    if (anyFieldIsEmpty) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Empty Fields are not allowed' });
    } else {
      // Call the createclientmaster service to submit form data
      this.studentsService1.editwarehousemaster(formData)
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
              this.router.navigate(['modules/warehousemaster/warehousemasterview']);
            }, 2000); // Adjust the delay as needed
          },
          error => {
            console.error("Error inserting record:", error);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record successfully Updated' });
            this.addForm.reset();
  
            // Navigate to the desired page after a short delay (e.g., 1 second)
            setTimeout(() => {
              this.router.navigate(['modules/warehousemaster/warehousemasterview']);
            }, 2000);
            // Optionally, display an error message to the user.
          }
        );
    }
  }
  }
  