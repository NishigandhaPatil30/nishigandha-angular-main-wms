import { Component,OnInit ,ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Data } from '@angular/router';

@Component({
  selector: 'app-productgridwisestock',
  templateUrl: './productgridwisestock.component.html',
  styleUrls: ['./productgridwisestock.component.scss']
})
export class ProductgridwisestockComponent implements OnInit{
  data: any[] = []; 
  depot:any;
    isLoading: boolean = false;
    isLoading1:boolean=false;
    @ViewChild('dt1') dataTable!: Table;
   constructor(private http: HttpClient) {}
  
    ngOnInit(): void {
      
      const userInfoString = sessionStorage.getItem('userInfo');
      if (userInfoString) {
        const userInfo = JSON.parse(userInfoString);
        this.depot = userInfo.Depot;
        this.fetchData(this.depot);
      }
    }
    
    fetchData(depot: string): void { // Accept depot as a parameter
      this.isLoading = true;
      const apiUrl = `https://www.swatpro.co/productgridwisestockdepowise.php?depot=${depot}`; // Include depot in the URL
      console.log(apiUrl);
      this.http.get<any[]>(apiUrl).subscribe(
        (data) => {
          // Modify the data array to remove 'Batch' and 'Storagelocation1' from each object
          const modifiedData = data.map(item => {
            const { ONE, Storagelocation1, ...rest } = item;
            return rest;
          });
    
          this.data = modifiedData;
          this.isLoading = false;
          this.isLoading1 = true;
        },
        (error) => {
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
    
      saveAs(blob, `productgridwisereport${item}.xlsx`);
    }
  
    exportToExcel() {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);
    
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    
      saveAs(blob, 'productgridwisereport.xlsx');
    }
  }
  
