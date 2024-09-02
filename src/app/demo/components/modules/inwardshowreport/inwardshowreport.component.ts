import { Component,OnInit ,ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-inwardshowreport',
  templateUrl: './inwardshowreport.component.html',
  styleUrls: ['./inwardshowreport.component.scss']
})
export class InwardshowreportComponent implements OnInit{
  data: any[] = []; 
  depot:any;
    isLoading: boolean = false;
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
    rowData = {
      inventoryStatus: 'INSTOCK', // Replace with the actual value from your data
    };
    
    getSeverity(inventoryStatus: string): string {
      // Add your logic to determine the severity based on inventoryStatus
      // For example, if inventoryStatus is 'warning', return 'warn'; otherwise, return 'info'
      if (inventoryStatus === 'warning') {
        return 'success';
      } else {
        return 'success';
      }
    }
    getFontSize(inventoryStatus: string): number {
      // Add your logic to determine the font size based on inventoryStatus
      // For example, if inventoryStatus is 'warning', return 16px; otherwise, return 14px
      if (inventoryStatus === 'warning') {
        return 90;
      } else {
        return 30;
      }
    }
  
     fetchData(depot: string): void {
        this.isLoading = true;
      const apiUrl = `https://www.swatpro.co/inwardreportshowdepowise.php?depot=${depot}`;
      this.http.get<any[]>(apiUrl).subscribe(
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
  }
  