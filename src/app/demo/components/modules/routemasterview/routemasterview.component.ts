import { Component,OnInit ,ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';
import { MessageService, SelectItem } from 'primeng/api';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-routemasterview',
  templateUrl: './routemasterview.component.html',
  styleUrls: ['./routemasterview.component.scss'],
  providers:[MessageService]
})
export class RoutemasterviewComponent implements OnInit{
  data: any[] = []; 
    isLoading: boolean = false;
    showgrid:boolean=false;
    depot:any;
    @ViewChild('dt1') dataTable!: Table;
   constructor(private http: HttpClient,private messageService: MessageService) {}
   ngOnInit(): void {
    const userInfoString = sessionStorage.getItem('userInfo');
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      this.depot = userInfo.Depot;
      this.fetchData(this.depot);
    }
  }

  fetchData(depot: string): void {
    this.isLoading = true;
    const apiUrl = `https://www.swatpro.co/wmsrootmastershow1depowise.php?depot=${depot}`;
    console.log(apiUrl);
    this.http.get<any[]>(apiUrl).subscribe(
      (data) => {
        this.data = data;
        console.log(data);
        this.isLoading = false;
      },

      (error) => {
        console.error('Error fetching data:', error);
        this.isLoading = false;
      }
    );
  }
    exportToExcel() {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);
    
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    
      saveAs(blob, 'compatibilityreport.xlsx');
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
    save(rowData: any) {
            console.log('Saving:', rowData);
      rowData.isEditing = false;
    }
    editProductCode(rowData: any) {
      rowData.isEditing = true;
      rowData.originalProductCode = rowData.DeliveryLocation;
      this.showgrid=true;
      
    }
    saveProductCode(rowData: any) {
      const updatedData = {
        Id: rowData.Id,
        DeliveryLocation: rowData.DeliveryLocation,
        ConsigneeName: rowData.ConsigneeName,
        SAPPartyCode: rowData.SAPPartyCode,
        Status: rowData.Status,
        SequenceNo: rowData.SequenceNo,
        Region: rowData.Region,
        RouteNo: rowData.RouteNo,
        Kilometer: rowData.Kilometer,
        Tat: rowData.Tat,
        Slab1: rowData.Slab1,
        Slab2: rowData.Slab2,
        Slab3: rowData.Slab3,
        Slab4: rowData.Slab4,
        depot:this.depot
      };
    console.log(updatedData);
      this.http.post<any>('https://www.swatpro.co/updaterootmaster.php', updatedData).subscribe(
        (response) => {
          // Assuming your PHP backend returns a success message
          if (response.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'success',
              detail: 'Record Updated Successfully',
            });
            rowData.isEditing = false;
            // Optionally, you can refresh the data by calling fetchData() again.
            this.fetchData(this.depot);
          }
        },
        (error) => {
          console.error('Error updating data:', error);
        }
      );
    }
    
    cancelEdit(rowData: any) {
      rowData.DeliveryLocation = rowData.originalProductCode;
      rowData.isEditing = false;
    }
   

    
  }
  

