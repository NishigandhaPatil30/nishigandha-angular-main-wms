import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Table } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
interface RouteData {
  Productcode: any;
  Brand: any;
  Pack: any;
  Batch: any;
  Manufacturingdates: any;
  Expirydate: any; // Property for Outward table
  Weight: any; // Property for Outward table
  Quantity: any;
  Invoicequantity:any;
  Storagelocation:any;
  UOM:any;
  Remark:any;
   // Optional property for identifying POST LR or PRE LR
}

@Component({
  selector: 'app-nearexpiryreport',
  templateUrl: './nearexpiryreport.component.html',
  styleUrls: ['./nearexpiryreport.component.scss']
})
export class NearexpiryreportComponent implements OnInit {
  data: RouteData[] = [];
  isLoading: boolean = false;
  selectedDate: Date=new Date();
  routeNo: any;
  depot:any;
  showgrid:boolean=false;
  constructor( private route: ActivatedRoute,
    private http: HttpClient) {}

  ngOnInit() {
    const userInfoString = sessionStorage.getItem('userInfo');
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      this.depot = userInfo.Depot;
      
    }
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

  saveAs(blob, `nearexpiryreport${item}.xlsx`);
}

exportToExcel() {
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);

  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

  saveAs(blob, 'nearexpiryreport.xlsx');
}

  fetchDataForReferenceDoNo(): void {
  if (this.selectedDate) {
    const formattedDate = this.formatDate(this.selectedDate);
    const depot=this.depot;
    const apiUrl = `https://www.swatpro.co/fetchnearexiryreportdepowise.php?datepick=${formattedDate}&depot=${depot}`;

    this.isLoading = true;

    this.http.get<RouteData[]>(apiUrl).subscribe(
      (response) => {
        this.data = response;
        this.isLoading = false;
        this.showgrid=true;
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.isLoading = false;
      }
    );
  } else {
    this.data = [];
  }
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

  printRouteSlip(routeNo: string): void {
    // Implement your logic to handle printing the route slip here
    console.log('Printing Route Slip for Route No:', routeNo);
    // You can use window.print() or any other library to print the slip
  }

  clear(table: Table): void {
    table.clear();
  }
}


