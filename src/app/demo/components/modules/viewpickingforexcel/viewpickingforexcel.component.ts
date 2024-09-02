import { Component ,OnInit} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Table } from 'primeng/table';
import { MatTableDataSource } from '@angular/material/table'; // For Angular Material
@Component({
  selector: 'app-viewpickingforexcel',
  templateUrl: './viewpickingforexcel.component.html',
  styleUrl: './viewpickingforexcel.component.scss'
})
export class ViewpickingforexcelComponent implements OnInit {
  data: any[] = [];
  rowData: any;
  showPrintButton = false;
  referenceDoNo: any;
  isLoading: boolean = false;
  pickedItems: any[] = [];
  Pickingslip: any;
  totalQuantity: any;
  Quantity: any;
  displayedColumns: string[] = [
    'ReferenceDoNo',
    'RouteNo',
    'Pickingslip',
    'Gateno',
    'ProductCode',
    'Brand',
    'ConsigneeName',
    'DeliveryLocation',
    'Pack',
    'Quantity',
    'Batch',
    'Storagelocation'
  ];

  dataSource = new MatTableDataSource<any>(this.pickedItems);

  constructor(private http: HttpClient) {}

  ngOnInit() {}
  showButton() {
    this.showPrintButton = true;
  }
  downloadPrint() {
    if (!this.referenceDoNo) {
      console.error('Reference Do Number is required.');
      return;
    }
    const phpEndpoint = 'https://www.swatpro.co/get_picking_slipforexcel.php?ReferenceDoNo=' + this.referenceDoNo;

    console.log(phpEndpoint);
    fetch(phpEndpoint)
      .then((response) => response.json())
      .then((data) => {
        // Process the fetched data and assign it to the pickedItems array
        this.pickedItems = data;
        this.dataSource.data = this.pickedItems; // For Angular Material table

        // Generate the print content with the table
        let printContent = `
          <h1 style="text-align:center;">Picking Slip</h1>
          <table style="border-collapse: collapse; width: 100%; border: 1px solid;">
            <tr style="background-color: #f2f2f2;">
              <th style="border: 1px solid black; padding: 8px;">ReferenceDoNo</th>
              <th style="border: 1px solid black; padding: 8px;">Sap Party Code</th>
              <th style="border: 1px solid black; padding: 8px;">RouteNo</th>
              <th style="border: 1px solid black; padding: 8px;">Picking Slip No</th>
              <th style="border: 1px solid black; padding: 8px;">Product Code</th>
              <th style="border: 1px solid black; padding: 8px;">Brand</th>
              <th style="border: 1px solid black; padding: 8px;">Consignee Name</th>
              <th style="border: 1px solid black; padding: 8px;">To Place</th>
              <th style="border: 1px solid black; padding: 8px;">Packing Size</th>
              <th style="border: 1px solid black; padding: 8px;">Quantity</th>
              <th style="border: 1px solid black; padding: 8px;">Batch</th>
              <th style="border: 1px solid black; padding: 8px;">Storage Location</th>
            </tr>
        `;

        data.forEach((item) => {
          // Customize the content based on your data structure
          printContent += `
            <tr >
              <td style="border: 1px solid black; padding: 8px;">${item.ReferenceDoNos}</td>
              <td style="border: 1px solid black; padding: 8px;">${item.SAPPartyCode}</td>
              <td style="border: 1px solid black; padding: 8px;">${item.RouteNo}</td>
              <td style="border: 1px solid black; padding: 8px;">${item.Pickingslip}</td>
              <td style="border: 1px solid black; padding: 8px;">${item.ProductCode}</td>
              <td style="border: 1px solid black; padding: 8px;">${item.Brand}</td>
              <td style="border: 1px solid black; padding: 8px;">${item.ConsigneeName}</td>
              <td style="border: 1px solid black; padding: 8px;">${item.DeliveryLocation}</td>
              <td style="border: 1px solid black; padding: 8px;">${item.Pack}</td>
              <td style="border: 1px solid black; padding: 8px;">${item.Quantity}</td>
              <td style="border: 1px solid black; padding: 8px;">${item.Batch}</td>
              <td style="border: 1px solid black; padding: 8px;">${item.Storagelocation}</td>
            </tr>
          `;
        });

        printContent += '</table>';

        // Open a new window and write the content
        const printWindow = window.open('', '_blank', 'height=500,width=800');

        if (!printWindow) {
          console.error('Failed to open print window.');
          return;
        }
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.focus();

        // Print the content
        printWindow.print();
      })
      .catch((error) => {
        console.error('Error fetching picking slip data:', error);
      });
  }

  printStickers(pickingslip: string, quantity: number) {
    const phpEndpoint =
      `https://www.swatpro.co/get_sticker_printtest.php?Pickingslip=${pickingslip}&Quantity=${quantity}`;

    console.log(phpEndpoint);

    this.http.get(phpEndpoint, { responseType: 'text' }).subscribe(
      (response) => {
        this.printStickersContent(response);
      },
      (error) => {
        console.error('Error while fetching sticker data.');
      }
    );
  }

  private printStickersContent(content: string) {
    const printContent = `
  
      ${content}
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    } else {
      console.error('Error opening print window.');
    }
  }


  fetchDataForReferenceDoNo(): void {
    if (!this.referenceDoNo) {
      this.data = []; // Clear the table data if the input box is empty
      return;
    }

    const apiUrl = `https://www.swatpro.co/fetchviewpickingslipforexcel.php?ReferenceDoNo=${this.referenceDoNo}`;
    console.log(apiUrl);
    // Set isLoading to true to show the loader
    this.isLoading = true;
    this.showPrintButton = true;
  
    this.http.get<any[]>(apiUrl).subscribe(
      response => {
        this.data = response;
        // Set isLoading back to false after the data is fetched
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching data:', error);
        // Set isLoading back to false in case of an error
        this.isLoading = false;
      }
    );
  }

  clear(table: Table): void {
    table.clear();
  }
}


