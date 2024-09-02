import { Component,OnInit ,ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-viewleakagedamagearea',
  templateUrl: './viewleakagedamagearea.component.html',
  styleUrls: ['./viewleakagedamagearea.component.scss']
})
export class ViewleakagedamageareaComponent implements OnInit{
  data: any[] = []; 
    isLoading: boolean = false;
    @ViewChild('dt1') dataTable!: Table;
   constructor(private http: HttpClient) {}
  
    ngOnInit(): void {
      this.fetchData();
    }
    
     fetchData(): void {
        this.isLoading = true;
      const apiUrl = 'https://www.swatpro.co/leakagedamagearteasshow.php';
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
  
