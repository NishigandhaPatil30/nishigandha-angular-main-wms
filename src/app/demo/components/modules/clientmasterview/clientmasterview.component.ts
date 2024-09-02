import { Component, ViewChild} from '@angular/core';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import { MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button'; 
import { MatPaginator ,PageEvent} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableExporterModule } from 'mat-table-exporter'
import {MatIconModule} from '@angular/material/icon';
import{Router} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { StudentsService } from '../students.service';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
interface USER {
  id: string;
   name: string;
Username:string;
Password:number;
ClientName:string;
ContactPersonName:string;
MobileNumber:number;
MailId:string;
Industry:string;
Address:string;
PinCode:number;
GSTNumber:number;
BillingCity:string;
ClientLocation:string;
Edit:string;
Delete:string;
}
@Component({
  selector: 'app-clientmasterview',
  templateUrl: './clientmasterview.component.html',
  styleUrls: ['./clientmasterview.component.scss'],
  providers:[ConfirmationService,MessageService],
  standalone: true,
  imports: [ToastModule,MatButtonModule,ConfirmDialogModule,ButtonModule,MatTableExporterModule,MatIconModule,MatTableModule,MatSortModule,MatInputModule, MatPaginatorModule,CommonModule,MatProgressBarModule],
})
export class ClientmasterviewComponent {
  students:any[]=[];
  fetchedStudents: any[] = [];
  id:any;
  constructor(private studentsService1: StudentsService,
    private router:Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
      ){ }
    
     ELEMENT_DATA: USER[] = [];
      isLoading = false;
      totalRows = 0;
      pageSize = 5;
      currentPage = 0;
      pageSizeOptions: number[] = [5, 10, 25, 100,500];
      displayedColumns: string[] = ['id','Username','Password','ClientName','ContactPersonName','ContactPersonName','MobileNumber','MailId','Industry','Address','PinCode','GSTNumber','BillingCity','ClientLocation','Edit','Delete'];
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
    
     
      ngOnInit(): void {
        // Load initial data
        this.loadData();
      
        // Fetch and assign data for fetchedStudents and students arrays
        this.studentsService1.getclientmaster().subscribe((data: any[]) => {
          this.fetchedStudents = data;
          this.students = data; // Assign the same data to both arrays
        });
      }
    
      loadData() {
        this.isLoading = true;
        let URL = 'https://www.swatpro.co/wmsclientmastershow.php';
          //console.log(URL);
        fetch(URL)
    
          .then(response => response.json())
          .then(data => {
            this.dataSource.data = data.rows;
    
            setTimeout(() => {
              this.paginator.pageIndex = this.currentPage;
              this.paginator.length = data.count;
            });
            this.isLoading = false;
          }, error => {
            console.log(error);
            this.isLoading = false;
          });
      }
    /*navigateToEdit(element) {
     
      this.router.navigate(['dashboard/modules/view/edit',element.id]);
    }*/
    
    navigateToEdit(students:any){
     this.id=students.id;
     console.log(this.id);
      this.router.navigate(['modules/clientmaster/clinetmasterview/clientmasteredit/'+ this.id]);
    }
    delete(students: any): void {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this record?',
        accept: () => {
          // User clicked "Yes," so proceed with deletion
          this.studentsService1.deleteclientmaster(students.id).subscribe(() => {
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
    
    
    }
