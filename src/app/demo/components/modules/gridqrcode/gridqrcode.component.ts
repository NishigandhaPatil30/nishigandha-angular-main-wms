import { Component, ViewChild} from '@angular/core';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import { MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatPaginator ,PageEvent} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import{Router} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { StudentsService } from '../students.service';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
interface USER {
  Id: string;
  Clientcode:string;
Warehauseno:string;
Grid:number;
Locationlenght:string;
Locationwidth:number;
Locationheight:number;
Result:string;
print:string;
Edit:string;
Delete:string;
}

@Component({
  selector: 'app-gridqrcode',
  templateUrl: './gridqrcode.component.html',
  styleUrls: ['./gridqrcode.component.scss'],
  standalone: true,
  providers:[ConfirmationService,MessageService],
  imports: [ToastModule,MatButtonModule,ConfirmDialogModule,ButtonModule,MatIconModule,MatTableModule,MatSortModule,MatInputModule, MatPaginatorModule,CommonModule,MatProgressBarModule],
})
export class GridqrcodeComponent {
  students:any[]=[];
  Id:any;
  
  constructor(private studentsService1: StudentsService,
  private router:Router,
  private http:HttpClient,
  private confirmationService: ConfirmationService,
  private messageService: MessageService
    ){ }
  
   ELEMENT_DATA: USER[] = [];
    isLoading = false;
    totalRows = 0;
    pageSize = 5;
    currentPage = 0;
    pageSizeOptions: number[] = [5, 10, 25, 100,500];
    displayedColumns: string[] = ['Id','Clientcode','Warehauseno','Grid','Locationlenght','Locationwidth','Locationheight','Result','print','Edit','Delete'];
    dataSource: MatTableDataSource<USER> = new MatTableDataSource();
  
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
   applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  
    depot:any;
    ngOnInit(): void {
      //Load initial data
      this.loadData();
      this.studentsService1.getgridmaster()
  .subscribe((data:any[])=>{
  this.students = data;
  //console.log(this.students);
  });
  const userInfoString = sessionStorage.getItem('userInfo');
     if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      this.depot = userInfo.Depot;
      console.log(this.depot);
     }
    }
  
    loadData() {
      this.isLoading = true;
      const userInfoString = sessionStorage.getItem('userInfo');
      let depot = '';
      if (userInfoString) {
        const userInfo = JSON.parse(userInfoString);
        depot = userInfo.Depot;
        console.log(depot);
      }
    
      const URL = `https://www.swatpro.co/wmsgridmastershowdepowise.php?depot=${encodeURIComponent(depot)}`;
      
      fetch(URL)
        .then(response => response.json())
        .then(data => {
          this.dataSource.data = data.rows;
    
          setTimeout(() => {
            this.paginator.pageIndex = this.currentPage;
            this.paginator.length = data.count;
          });
          this.isLoading = false;
        })
        .catch(error => {
          console.error(error);
          this.isLoading = false;
        });
    }
    
  
  
  navigateToEdit(students:any){
   this.Id=students.Id;
    this.router.navigate(['modules/gridmaster/gridmastermasterview/gridmasteredit/'+ this.Id]);
  }
  
  
 
  delete(students: any): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this record?',
      accept: () => {
        // User clicked "Yes," so proceed with deletion
        this.studentsService1.deletegridmaster(students.Id).subscribe(() => {
          // Display success message
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record Deleted Successfully' });
          
          // Redirect after a delay (e.g., 2 seconds)
          setTimeout(() => {
            window.location.reload();
          }, 300); // 2000 milliseconds = 2 seconds
        });
      }
    });
  }
    pageChanged(event: PageEvent) {
      console.log({ event });
      this.pageSize = event.pageSize;
      this.currentPage = event.pageIndex;
      this.loadData();
    }
    printData(Grid: string) {
      const apiUrl = `https://www.swatpro.co/getprintgrid.php?Grid=${Grid}`;
      console.log(apiUrl);
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
  