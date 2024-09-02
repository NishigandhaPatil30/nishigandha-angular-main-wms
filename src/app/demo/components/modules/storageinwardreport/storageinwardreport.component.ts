import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Table } from 'primeng/table';
import { Router } from '@angular/router'; 
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
interface RouteData {
  RouteNo: string;
  Quantity: number;
  Weight: number;
  Toplace: string;
  Date1: string;
  DeliveryLocation: string;
  Date: string;
  isPostLr?: boolean;
}


@Component({
  selector: 'app-storageinwardreport',
  templateUrl: './storageinwardreport.component.html',
  styleUrls: ['./storageinwardreport.component.css']
})
export class StorageinwardreportComponent implements OnInit {
  data: RouteData[] = [];
  isLoading: boolean = false;
  selectedDate: any;
  selectedDate1: any;
ReferenceDoNo: any;
vehicleNumber:any;
showbutton:boolean=false;
depot:any;
  constructor(private http: HttpClient,private router:Router) {}

  ngOnInit() {
    const userInfoString = sessionStorage.getItem('userInfo');
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      this.depot = userInfo.Depot;
    }
  }
  
  exportToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);
  
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
  
    saveAs(blob, 'storageinwardreport.xlsx');
  }
  
  fetchDataForReferenceDoNo() {
    this.showbutton=true;
    if (!this.selectedDate || !this.selectedDate1) {
      return;
    }

    const fromDate = this.formatDate(this.selectedDate);
    const toDate = this.formatDate(this.selectedDate1);
    const depot = this.depot;
    const apiUrl = `https://www.swatpro.co/storageinwarreporttestdepowise.php?datepick=${fromDate}&datepick1=${toDate}&depot=${depot}`;
         
    this.isLoading = true;

    this.http.get<RouteData[]>(apiUrl).subscribe(
      (data) => {
        this.data = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.isLoading = false;
      }
    );
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());
    return `${year}-${month}-${day}`;
  }

  private padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

 
  items: any[] = [
    // ... your item objects here
  ]
  clear(table: Table): void {
    table.clear();
  }
  printData(Invoicequantity: string) {
    const apiUrl = `https://www.swatpro.co/wmsinwardprint.php?Invoicequantity=${Invoicequantity}`;
    this.http.get(apiUrl, { responseType: 'text' }).subscribe(
      (htmlResponse) => {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(htmlResponse);
          printWindow.document.close();
          printWindow.print();
        } else {
          alert('Pop-up blocked. Please allow pop-ups for this website.');
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  exportToCSV(item: RouteData) {
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
  
}

