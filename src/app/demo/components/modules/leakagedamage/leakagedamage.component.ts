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
  selector: 'app-leakagedamage',
  templateUrl: './leakagedamage.component.html',
  styleUrls: ['./leakagedamage.component.scss'],
  providers:[MessageService]
})
export class LeakagedamageComponent implements OnInit{
  searchResults: any[] = [];
  searchTerm: any;
  Grid:any;
  Assets:any;
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
    Assets: ['', Validators.required]
 
  });
}


submit() {
  const formData = this.addForm.value;
  const anyFieldIsEmpty = Object.values(formData).some(value => value === "");

  console.log(anyFieldIsEmpty);

  if (anyFieldIsEmpty) {
    alert("Empty Fields are not allowed");
  } else {
    // Insert data if no empty fields
    this.http.post('https://swatpro.co/lekagaedamageentry.php', formData)
      .subscribe(
        response => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record successfully inserted' });
          this.addForm.reset(); // Reset the form
          location.reload();
        },
        error => {
          // Handle error
        }
      );
  }
}

uploadFile(event:any){
  const file = event.target.files ? event.target.files[0] : '';

this.form1.patchValue({
  image:file
});

this.form1.get('image')?.updateValueAndValidity()
}
submitImage(){

this.studentsService1.leakagedamagemasterexcelasheet(

  this.form1.value.image).subscribe((data:any)=>{
    console.log(data);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File uploaded successfully' });
   //this.router.navigate(['modules/view']);
  //  console.log(data); 
  this.show();
  },
error=>{
  });

}

show(){
  this.router.navigate(['modules/leakagedamage/leakagedamageview']);
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
