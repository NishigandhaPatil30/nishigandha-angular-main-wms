import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Table } from 'primeng/table';
import { Router } from '@angular/router'; 
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
  selector: 'app-lrgenerationforexcel',
  templateUrl: './lrgenerationforexcel.component.html',
  styleUrl: './lrgenerationforexcel.component.scss'
})
export class LrgenerationforexcelComponent implements OnInit {
  data: RouteData[] = [];
  isLoading: boolean = false;
  selectedDate: any;
  selectedDate1: any;
ReferenceDoNo: any;
depot:any;
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
    const Depot=this.depot;
    const apiUrl = `https://www.swatpro.co/fetchstockpendingforexceldepowise.php?datepick=${fromDate}&datepick1=${toDate}&Depot=${Depot}`;

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

  printRouteSlip(routeNo: string): void {
    // Implement your logic to handle printing the route slip here
    console.log('Printing Route Slip for Route No:', routeNo);
    // You can use window.print() or any other library to print the slip
  }

  clear(table: Table): void {
    table.clear();
  }
  goToOtherComponent(ReferenceDoNo: string) {
  this.router.navigate(['modules/lrgenration/wmsroutewiselrgeneartionforexcel',ReferenceDoNo]); 
}
}


