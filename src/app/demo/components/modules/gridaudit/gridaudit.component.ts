import { Component,OnInit ,ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-gridaudit',
  templateUrl: './gridaudit.component.html',
  styleUrls: ['./gridaudit.component.scss']
})
export class GridauditComponent implements OnInit{
  data: any[] = []; 
  isChecked1: any[]=[];
  tableData: any[] = []; 
  
  rowData: any[] = [];
    isLoading: boolean = false;
    @ViewChild('dt1') dataTable!: Table;
   constructor(private http: HttpClient) {}
  
    ngOnInit(): void {
      this.fetchData();
    }
    
     fetchData(): void {
        this.isLoading = true;
      const apiUrl = 'https://www.swatpro.co/gridauditshow.php';
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
    onCheckboxChange(event: any, rowData: any) {
      if (event.target.checked) {
        // Add the row data to the tableData array if the checkbox is checked
        this.tableData.push(rowData);
      } else {
        // Remove the row data from the tableData array if the checkbox is unchecked
        const index = this.tableData.findIndex(item => item === rowData);
        if (index !== -1) {
          this.tableData.splice(index, 1);
        }
      }
    }
    submitForm() {
      // Gather data from your table or form fields
      const data = { /* your data here */ };
  
      // Send the data to the backend
      this.http.post('https://www.swatpro.co/insergridaudit.php', data).subscribe(
        (response) => {
          console.log('Data inserted successfully:', response);
        },
        (error) => {
          console.error('Error inserting data:', error);
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
  