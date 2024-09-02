import { Component ,OnInit,ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { StudentsService } from '../students.service';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import{Data, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-batchwisereport',
  templateUrl: './batchwisereport.component.html',
  styleUrls: ['./batchwisereport.component.scss']
})
export class BatchwisereportComponent implements OnInit{
  searchResults: any[] = [];
  searchTerm: any;
  data: any[] = []; 
  isLoading: boolean = false;
  dataFetched = false;
  depot:any;
  @ViewChild('dt1') dataTable!: Table;
  constructor(private formBuilder:FormBuilder,
    private studentsService1:StudentsService,
    private router:Router,
    private http: HttpClient
    ){
}
ngOnInit(): void {
  const userInfoString = sessionStorage.getItem('userInfo');
  if (userInfoString) {
    const userInfo = JSON.parse(userInfoString);
    this.depot = userInfo.Depot;
    
  }
}

search(event: any): void {
  const term = event.query;
  const depot = this.depot;
  console.log(term);
  this.http.get(`https://swatpro.co/searchbatchdepowise.php/?term=${term}&depot=${depot}`)
    .pipe(map((response: any) => response.data))
    .subscribe(data => {
      this.searchResults = data;
      this.fetchDataForReferenceDoNo(term,data);
    });
}

fetchDataForReferenceDoNo(DeliveryLocation: any, searchResults: any[]): void {
  const Batch = DeliveryLocation.value.Batch; // Assuming 'Grid' is the property containing the search term
  const depot = this.depot;
  const apiUrl = `https://www.swatpro.co/batchwisestockshowdepo.php?searchTerm=${encodeURIComponent(Batch)}&depot=${encodeURIComponent(depot)}`;
  console.log(apiUrl);

  this.isLoading = true;

  this.http.get<any[]>(apiUrl).subscribe(
    response => {
      this.data = response;
      this.isLoading = false;
      this.dataFetched = true;
    },
    error => {
      console.error('Error fetching data:', error);
      this.isLoading = false;
    }
  );
}


printTable(): void {
const printContents = this.dataTable.el.nativeElement.outerHTML;
const originalContents = document.body.innerHTML;
document.body.innerHTML = printContents;
window.print();
document.body.innerHTML = originalContents;
}
clear(table: Table): void {
table.clear();
}
exportToCSV(item: Data) {
  const selectedData = [item]; // Create an array with the selected row data
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(selectedData);

  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

  const excelBuffer: any = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  });

  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
  });

  saveAs(blob, `storageinwardreport_${item}.xlsx`);
}

exportToExcel() {
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);

  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

  saveAs(blob, 'storageinwardreport.xlsx');
}
}



