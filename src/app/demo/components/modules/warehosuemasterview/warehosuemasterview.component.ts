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
  Clientcode: string;
ClientName:string;
GSTNumber:number;
PhoneNumber:string;
WarehouseCode:string;
WarehouseAddress:number;
WarehouseLength:string;
WarehouseWidth:string;
WarehouseLocation:string;
OpertionalGate:number;
EmergencyGate:number;
WarehouseLongitude:string;
WarehouseLatitude:string;
Edit:string;
 Delete:string;
}

@Component({
  selector: 'app-warehosuemasterview',
  templateUrl: './warehosuemasterview.component.html',
  styleUrls: ['./warehosuemasterview.component.scss'],
  standalone: true,
  providers:[ConfirmationService,MessageService],
  imports: [ToastModule,MatButtonModule,ConfirmDialogModule,ButtonModule,MatTableExporterModule,MatIconModule,MatTableModule,MatSortModule,MatInputModule, MatPaginatorModule,CommonModule,MatProgressBarModule],
})
export class WarehosuemasterviewComponent {
  students:any[]=[];
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
    displayedColumns: string[] = ['id','Clientcode','ClientName','GSTNumber','PhoneNumber','WarehouseCode','WarehouseAddress','WarehouseLength','WarehouseWidth','WarehouseLocation','OpertionalGate','EmergencyGate','WarehouseLongitude','WarehouseLatitude','Edit','Delete'];
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
 
      this.studentsService1.getwarehousemaster()
  .subscribe((data:any[])=>{
  this.students = data;
  //console.log(this.students);
  });
  const userInfoString = sessionStorage.getItem('userInfo');
  if (userInfoString) {
    const userInfo = JSON.parse(userInfoString);
    this.depot = userInfo.Depot;
    this.loadData(this.depot);
  }
}
  
loadData(depot: string): void {
      this.isLoading = true;
      let URL = `https://www.swatpro.co/wmswarehousemastershowdepowise.php?depot=${depot}`;
      console.log(URL);
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
  
  
  navigateToEdit(students:any){
   this.id=students.id;
    this.router.navigate(['modules/warehousemaster/warehousemasterview/warehousemasteredit/'+ this.id]);
  }
  
  
  

  delete(students: any): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this record?',
      accept: () => {
        // User clicked "Yes," so proceed with deletion
        this.studentsService1.deletewarehousemaster(students.id).subscribe(() => {
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
      this.loadData(this.depot);
    }
  
  
  }
  