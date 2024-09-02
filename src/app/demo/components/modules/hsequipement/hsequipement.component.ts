import { Component ,OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { StudentsService } from '../students.service';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import{Router} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-hsequipement',
  templateUrl: './hsequipement.component.html',
  styleUrls: ['./hsequipement.component.scss'],
  providers:[MessageService]
})
export class HsequipementComponent implements OnInit{
  searchResults: any[] = [];
  searchTerm: any;
  Result:any;
  Grid:any;
  selectedBrand: any; // You can adjust the type based on the data type of 'response.Result'
  Assets:any;
  Gate:any;
  form1:any;
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
ngOnInit() {
  this.addForm = this.formBuilder.group({
    Grid: ['', Validators.required],
    Assets: ['', Validators.required],
    Gate: [''], // No Validators required for this field
  });
}
submit() {
  const formData = this.addForm.value;

  this.http.post('https://swatpro.co/assetallocationentry.php', formData)
    .subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record successfully inserted' });
        this.addForm.reset(); // Reset the form
        location.reload();
        
      },
      error => {
        // Handle error
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while inserting the record' });
      }
    );
}



uploadFile(event:any){
  const file = event.target.files ? event.target.files[0] : '';

this.form1.patchValue({
  image:file
});

this.form1.get('image')?.updateValueAndValidity()
}

submitImage() {
  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File uploaded successfully' });
  this.studentsService1.hseequpementmasterexcelasheet(this.form1.value.image).subscribe(
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
show(){
  this.router.navigate(['modules/hsequipement/hsequipementview']);
}
search(event: any): void {
  const term = event.query;
  this.http.get(`https://swatpro.co/search.php/?term=${term}`)
    .pipe(map((response: any) => response.data))
    .subscribe(data => {
      this.searchResults = data;
    });
}



}
