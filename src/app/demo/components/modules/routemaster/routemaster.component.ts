import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import{Router} from '@angular/router';
import { StudentsService } from '../students.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-routemaster',
  templateUrl: './routemaster.component.html',
  styleUrls: ['./routemaster.component.scss'],
  providers:[MessageService]
})
export class RoutemasterComponent implements OnInit {
  rows: any[] = [];

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

form1:any;
depot: string;
  ngOnInit(): void {
    this.addRow();
    const userInfoString = sessionStorage.getItem('userInfo');
    if (userInfoString) {
     const userInfo = JSON.parse(userInfoString);
     this.depot = userInfo.Depot;
     console.log(this.depot);
    }
  }

  addRow(): void {
    const row = {
      SAPPartyCode: '',
      ConsigneeName: '',
      Status: '',
       DeliveryLocation: '',
        SequenceNo: '',
         Region: '',
          THCDepot: '',
           RouteNo: '',
            Kilometer: '',
             Adress: '',
              Tat: '',
               Slab1: '',
                Slab2: '',
                 Slab3: '',
                  Slab4: '',

    
    };
    this.rows.push(row);
  }

  deleteRow(index: number): void {
    this.rows.splice(index, 1);
  }

  submit(): void {
    const Depot=this.depot;
    this.http
      .post('https://www.swatpro.co/wmsroutemasterenrtydepowise.php', { data: this.rows, Depot: Depot })
      .subscribe((response: any) => {
        console.log(this.rows);
        alert("Record Inserted Successfully");
        this.router.navigate(['modules/routemaster/routemasterview']);
        this.rows = [];
      });
  }
  
  


  
  showreport(){
    this.router.navigate(['modules/routemaster/routemasterview']);
    
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
  this.studentsService1.routemasterexcelasheet(this.form1.value.image).subscribe(
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
