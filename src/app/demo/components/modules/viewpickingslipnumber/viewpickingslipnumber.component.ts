import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table'; // For Angular Material
@Component({
  selector: 'app-viewpickingslipnumber',
  templateUrl: './viewpickingslipnumber.component.html',
  styleUrls: ['./viewpickingslipnumber.component.scss']
})
export class ViewpickingslipnumberComponent implements OnInit {
  pickingslip: any;
  referenceDoNo: any;
  totalQuantity:any;
  pickedItems: any[] = [];
  isTableVisible: boolean = false; // Initialize the flag to false
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

  // For Angular Material table
  dataSource = new MatTableDataSource<any>(this.pickedItems);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.pickingslip = params['pickingslip'];
      this.referenceDoNo = params['referenceDoNo'];
      this.totalQuantity=params['totalQuantity'];
    });
  }

  downloadPrint() {
    const phpEndpoint =
      'https://www.swatpro.co/get_picking_slip.php?ReferenceDoNo=' +
      this.referenceDoNo;

    fetch(phpEndpoint)
      .then((response) => response.json())
      .then((data) => {
        // Process the fetched data and assign it to the pickedItems array
        this.pickedItems = data;
        this.dataSource.data = this.pickedItems; // For Angular Material table

        // Generate the print content with the table
        let printContent = `
          <h1 style="text-align:center;">Picking Slip</h1>
          <table style="  border-collapse: collapse;
  width: 100%; border: 1px solid;">
            <tr style="  background-color: #f2f2f2;">
              <th style=" border: 1px solid black;
  padding: 8px;">ReferenceDoNo</th>
              <th style=" border: 1px solid black;
  padding: 8px;">RouteNo</th>
              <th style=" border: 1px solid black;
  padding: 8px;">Picking Slip No</th>
              <th style=" border: 1px solid black;
  padding: 8px;">Gate No</th>
              <th style=" border: 1px solid black;
  padding: 8px;">Product Code</th>
              <th style=" border: 1px solid black;
  padding: 8px;">Brand</th>
              <th style=" border: 1px solid black;
  padding: 8px;">Consignee Name</th>
              <th style=" border: 1px solid black;
  padding: 8px;">To Place</th>
              <th style=" border: 1px solid black;
  padding: 8px;">Packing Size</th>
              <th style=" border: 1px solid black;
  padding: 8px;">Quantity</th>
              <th style=" border: 1px solid black;
  padding: 8px;">Batch</th>
              <th style=" border: 1px solid black;
  padding: 8px;">Storage Location</th>
            </tr>
        `;

        data.forEach((item) => {
          // Customize the content based on your data structure
          printContent += `
            <tr >
              <td style=" border: 1px solid black;
  padding: 8px;">${item.ReferenceDoNo}</td>
              <td style=" border: 1px solid black;
  padding: 8px;">${item.RouteNo}</td>
              <td style=" border: 1px solid black;
  padding: 8px;">${item.Pickingslip}</td>
              <td style=" border: 1px solid black;
  padding: 8px;">${item.Gateno}</td>
              <td style=" border: 1px solid black;
  padding: 8px;">${item.ProductCode}</td>
              <td style=" border: 1px solid black;
  padding: 8px;">${item.Brand}</td>
              <td style=" border: 1px solid black;
  padding: 8px;">${item.ConsigneeName}</td>
              <td style=" border: 1px solid black;
  padding: 8px;">${item.DeliveryLocation}</td>
              <td style=" border: 1px solid black;
  padding: 8px;">${item.Pack}</td>
              <td style=" border: 1px solid black;
  padding: 8px;">${item.Quantity}</td>
              <td style=" border: 1px solid black;
  padding: 8px;">${item.Batch}</td>
              <td style=" border: 1px solid black;
  padding: 8px;">${item.Storagelocation}</td>
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
/*stikerprint() {
  const phpEndpoint = 'https://vtc3pl.in/get_sticker_print.php?Pickingslip=' + this.pickingslip + '&totalQuantity=' + this.totalQuantity;

}*/


    stikerprint() {
    const phpEndpoint = `https://www.swatpro.co/get_sticker_print.php?Pickingslip=${this.pickingslip}&totalQuantity=${this.totalQuantity}`;

    // AJAX call to the PHP backend
    const xhr = new XMLHttpRequest();
    xhr.open('GET', phpEndpoint, true);
    xhr.responseType = 'text';

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // Print the stickers
          this.printStickers(xhr.responseText);
        } else {
          console.error('Error while fetching sticker data.');
        }
      }
    };

    xhr.send();
  }

  private printStickers(content: string) {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(content);
      printWindow.document.close();
      printWindow.print();
    } else {
      console.error('Error opening print window.');
    }
  }
}

