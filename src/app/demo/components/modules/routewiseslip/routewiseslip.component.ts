import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Table } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { ActivatedRoute } from '@angular/router';

interface RouteData {
  RouteNo: string;
  Quantity: number;
  Weight: number;
  Toplace: string;
  Date1: string;
  DeliveryLocation: string; // Property for Outward table
  Date: string; // Property for Outward table
  isPostLr?: boolean; // Optional property for identifying POST LR or PRE LR
}

@Component({
  selector: 'app-routewiseslip',
  templateUrl: './routewiseslip.component.html',
  styleUrls: ['./routewiseslip.component.scss']
})
export class RoutewiseslipComponent implements OnInit {
  data: RouteData[] = [];
  isLoading: boolean = false;
  selectedDate: any;
  routeNo: any;
  constructor( private route: ActivatedRoute,
    private http: HttpClient) {}

  ngOnInit() {
 
}

 printData(routeNo: string) {
    const apiUrl = `https://www.swatpro.co/wmsroutewiseslipprint.php?RouteNo=${routeNo}`;
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


  fetchDataForReferenceDoNo(): void {
  if (this.selectedDate) {
    const formattedDate = this.formatDate(this.selectedDate);
    const apiUrl = `https://www.swatpro.co/fetchroutewiseslip.php?datepick=${formattedDate}`;

    this.isLoading = true;

    this.http.get<RouteData[]>(apiUrl).subscribe(
      (response) => {
        // Separate POST LR and PRE LR data
        const postLrData = response.filter((item) => item.RouteNo.startsWith('POST') || item.RouteNo.endsWith('POST'));
        const preLrData = response.filter((item) => !item.RouteNo.startsWith('PRE') && !item.RouteNo.endsWith('PRE'));

        // Combine POST LR and PRE LR data
        this.data = [...postLrData, ...preLrData];

        this.isLoading = false;
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

