import { Component,OnInit ,ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';
import { MessageService, SelectItem } from 'primeng/api';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-compatibilitystoragemappingview',
  templateUrl: './compatibilitystoragemappingview.component.html',
  styleUrls: ['./compatibilitystoragemappingview.component.scss'],
  providers:[MessageService]
})
export class CompatibilitystoragemappingviewComponent implements OnInit{
  data: any[] = []; 
    isLoading: boolean = false;
    showgrid:boolean=false;
    
    @ViewChild('dt1') dataTable!: Table;
   constructor(private http: HttpClient,private messageService: MessageService) {}
  
    ngOnInit(): void {
      this.fetchData();
    }
 
     fetchData(): void {
        this.isLoading = true;
      const apiUrl = 'https://www.swatpro.co/compatibilitygridreportshow.php';
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
      rowData.originalProductCode = rowData.Productcode;
      this.showgrid=true;
      
    }
    saveProductCode(rowData: any) {
      const updatedData = {
        Id: rowData.Id,
        gridNo: rowData.GridNo,
        productCode: rowData.Productcode,
        groupCode: rowData.Groupcode
      };
    console.log(updatedData);
      this.http.post<any>('https://www.swatpro.co/updatecompatibilitygrid.php', updatedData).subscribe(
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
            this.fetchData();
          }
        },
        (error) => {
          console.error('Error updating data:', error);
        }
      );
    }
    
    cancelEdit(rowData: any) {
      rowData.Productcode = rowData.originalProductCode;
      rowData.isEditing = false;
    }
   

    
  }
  

