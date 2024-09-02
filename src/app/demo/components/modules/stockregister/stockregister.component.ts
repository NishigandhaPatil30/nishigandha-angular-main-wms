import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Table } from 'primeng/table';
import { Router } from '@angular/router'; 
import { map } from 'rxjs/operators';
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
  selector: 'app-stockregister',
  templateUrl: './stockregister.component.html',
  styleUrls: ['./stockregister.component.scss']
})
export class StockregisterComponent implements OnInit {
  data: RouteData[] = [];
  searchResults: any[] = [];
  searchTerm: any;
  isLoading: boolean = false;
  selectedDate: any;
  selectedDate1: any;
ReferenceDoNo: any;
depot:any;
vehicleNumber:any;
  constructor(private http: HttpClient,private router:Router) {}

  ngOnInit() {
    const userInfoString = sessionStorage.getItem('userInfo');
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      this.depot = userInfo.Depot;
      
    }
  }

  fetchDataForReferenceDoNo() {
    if (!this.selectedDate || !this.selectedDate1) {
      return;
    }

    const fromDate = this.formatDate(this.selectedDate);
    const toDate = this.formatDate(this.selectedDate1);
    const depot=this.depot
    const apiUrl = `https://www.swatpro.co/stockregistershowdepowise.php?datepick=${fromDate}&datepick1=${toDate}&depot=${depot}`;
         
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
  search(event: any): void {
    const term = event.query;
    this.http.get(`https://swatpro.co/searchbrand.php/?term=${term}`)
      .pipe(map((response: any) => response.data))
      .subscribe(data => {
        this.searchResults = data;
        
      });
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
  
    saveAs(blob, `stockregisterreport${item}.xlsx`);
  }

  // exportToExcel() {
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);
  
  //   const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
  //   const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
  
  //   saveAs(blob, 'stockregisterreport.xlsx');
  // }

  exportToExcel() {
    // Assuming this.data is an array of objects with 'Batch' and 'Grid' as keys
  
    // Create a worksheet from the data
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);
  
    // Rename the 'J' column to 'Batch'
    const batchColumnIndex = this.getColumnName(worksheet, 'j');
    if (batchColumnIndex !== -1) {
      const newBatchColumnName = 'batch';
      const batchCellAddress = XLSX.utils.encode_cell({ r: 0, c: batchColumnIndex });
      worksheet[batchCellAddress] = { v: newBatchColumnName };
    }
  
    // Rename the 'r' column to 'Grid'
    const gridColumnIndex = this.getColumnName(worksheet, 'val');
    if (gridColumnIndex !== -1) {
      const newGridColumnName = 'sumof_inward_qty';
      const gridCellAddress = XLSX.utils.encode_cell({ r: 0, c: gridColumnIndex });
      worksheet[gridCellAddress] = { v: newGridColumnName };
    }
  
    // Rename the 'val' column to 'Stock Quantity'
    const gridColumnIndex1 = this.getColumnName(worksheet, 'val1');
    if (gridColumnIndex1 !== -1) {
      const newGridColumnName1 = 'sumof_inward_weight';
      const gridCellAddress1 = XLSX.utils.encode_cell({ r: 0, c: gridColumnIndex1 });
      worksheet[gridCellAddress1] = { v: newGridColumnName1 };
    }
    const gridColumnIndex2 = this.getColumnName(worksheet, 'Batch');
    if (gridColumnIndex2 !== -1) {
      const newGridColumnName2 = 'outward_batch';
      const gridCellAddress2 = XLSX.utils.encode_cell({ r: 0, c: gridColumnIndex2 });
      worksheet[gridCellAddress2] = { v: newGridColumnName2 };
    }
    const gridColumnIndex3 = this.getColumnName(worksheet, 'amountval');
    if (gridColumnIndex3 !== -1) {
      const newGridColumnName3 = 'sumof_outward_qty';
      const gridCellAddress3 = XLSX.utils.encode_cell({ r: 0, c: gridColumnIndex3 });
      worksheet[gridCellAddress3] = { v: newGridColumnName3 };
    }
    const gridColumnIndex4 = this.getColumnName(worksheet, 'amountval1');
    if (gridColumnIndex4 !== -1) {
      const newGridColumnName4 = 'sumof_outward_weight';
      const gridCellAddress4 = XLSX.utils.encode_cell({ r: 0, c: gridColumnIndex4 });
      worksheet[gridCellAddress4] = { v: newGridColumnName4 };
    }
    const gridColumnIndex5 = this.getColumnName(worksheet, 'Remain');
    if (gridColumnIndex5 !== -1) {
      const newGridColumnName5 = 'sumof(inqty-outqty)=remaining qty';
      const gridCellAddress5 = XLSX.utils.encode_cell({ r: 0, c: gridColumnIndex5});
      worksheet[gridCellAddress5] = { v: newGridColumnName5 };
    }
    const gridColumnIndex6 = this.getColumnName(worksheet, 'Remain1');
    if (gridColumnIndex6 !== -1) {
      const newGridColumnName6 = 'sumof(inweight-outweight)=remaining weight';
      const gridCellAddress6 = XLSX.utils.encode_cell({ r: 0, c: gridColumnIndex6 });
      worksheet[gridCellAddress6] = { v: newGridColumnName6 };
    }
    // Create a workbook with the modified worksheet
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  
    // Convert the workbook to an array buffer
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    // Create a Blob from the array buffer
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
  
    // Trigger a download for the Excel file
    saveAs(blob, 'stockregisterreport.xlsx');
  }
  
  getColumnName(sheet: XLSX.WorkSheet, targetColumnName: string): number {
    const headers = XLSX.utils.sheet_to_json(sheet, { header: 1 })[0];
  
    if (Array.isArray(headers)) {
      for (let i = 0; i < headers.length; i++) {
        if (headers[i] === targetColumnName) {
          return i;
        }
      }
    }
  
    return -1; // Column not found
  }
  
  
  printData(Productcode: string) {
    const apiUrl = `https://www.swatpro.co/stockregisetrtest.php?Productcode=${Productcode}`;
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
}



