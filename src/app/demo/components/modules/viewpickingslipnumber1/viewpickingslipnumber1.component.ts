import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table'; // For Angular Material

@Component({
  selector: 'app-viewpickingslipnumber1',
  templateUrl: './viewpickingslipnumber1.component.html',
  styleUrl: './viewpickingslipnumber1.component.scss'
})
export class Viewpickingslipnumber1Component implements OnInit {
  pickingslip: any;
  referenceDoNo: any;
  totalQuantity:any;
  sapPartyCodeArray: string[] = [];
  showMoreActive: boolean = false;
  pickingslipArray: string[] = [];
  referenceDoNoArray:string[]=[];
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

  groupedReferenceDoNo: {[key: string]: string[]} = {};
  groupedReferenceDoNo1: { [key: string]: { [key: string]: string[] } } = {};

  showMore: { [key: string]: boolean } = {};


  // Method to toggle show more for a specific Sap Party Code
  toggleShowMore(sapPartyCode: string) {
    this.showMore[sapPartyCode] = !this.showMore[sapPartyCode];
  }
isFirstSapPartyCode(sapPartyCode: string, index: number): boolean {
  return index === 0 || sapPartyCode !== this.sapPartyCodeArray[index - 1];
}
ngOnInit() {
  this.route.queryParams.subscribe((params) => {
    const pickingslipString = params['pickingslip'];
    const referenceDoNoString = params['referenceDoNo'];
    const sapPartyCodeString = params['sapPartyCode'];

    if (pickingslipString && referenceDoNoString && sapPartyCodeString) {
      this.pickingslipArray = pickingslipString.split(',');
      this.referenceDoNoArray = referenceDoNoString.split(',');
      this.sapPartyCodeArray = sapPartyCodeString.split(',');
      // Create a map to store unique referenceDoNo values for each sapPartyCode
      const uniqueReferenceDoNoMap = new Map<string, string[]>();

      this.groupedReferenceDoNo = this.groupBySapPartyCode(this.sapPartyCodeArray, this.referenceDoNoArray);
      this.groupedReferenceDoNo1 = this.groupBySapPartyCode1(this.sapPartyCodeArray, this.referenceDoNoArray, this.pickingslipArray);


      this.totalQuantity = params['totalQuantity'];
    }
  });
}
groupBySapPartyCode(sapPartyCodeArray, referenceDoNoArray) {
  const groupedReferenceDoNo: { [key: string]: string[] } = {};

  sapPartyCodeArray.forEach((sapPartyCode, index) => {
    if (!groupedReferenceDoNo[sapPartyCode]) {
      groupedReferenceDoNo[sapPartyCode] = [];
    }
    groupedReferenceDoNo[sapPartyCode].push(referenceDoNoArray[index]);
  });

  for (const sapPartyCode in groupedReferenceDoNo) {
    if (groupedReferenceDoNo.hasOwnProperty(sapPartyCode)) {
      groupedReferenceDoNo[sapPartyCode] = Array.from(new Set(groupedReferenceDoNo[sapPartyCode]));
    }
  }


  return groupedReferenceDoNo;
}
 groupBySapPartyCode1(sapPartyCodeArray, referenceDoNoArray, pickingslipArray) {
  console.log(sapPartyCodeArray);
  console.log(referenceDoNoArray);
  console.log(pickingslipArray);
  const groupedReferenceDoNo1 = {};
  let tempPickingslip = null; // Temporary variable to store pickingslip
  
  sapPartyCodeArray.forEach((sapPartyCode, index) => {
    const referenceDoNo = referenceDoNoArray[index];
    const pickingslip = tempPickingslip || pickingslipArray[index]; // Use temporary pickingslip if available, otherwise use current pickingslip
    tempPickingslip = null; // Reset temporary pickingslip
    
    // Check if the sapPartyCode already exists
    if (!groupedReferenceDoNo1[sapPartyCode]) {
      groupedReferenceDoNo1[sapPartyCode] = {};
    }

    // Check if the referenceDoNo already exists for this sapPartyCode
    if (groupedReferenceDoNo1[sapPartyCode][referenceDoNo] === undefined) {
      groupedReferenceDoNo1[sapPartyCode][referenceDoNo] = pickingslip;
    } else {
      // Handle the situation where referenceDoNo already exists
      // Only update pickingslip if it's different
      if (groupedReferenceDoNo1[sapPartyCode][referenceDoNo] !== pickingslip) {
        // Save the pickingslip to be used in the next iteration
        tempPickingslip = pickingslip;
      }
      
      // Assign the pickingslip to the next index's reference Do for the same SAP party code
      let nextIndex = index + 1;
      while (nextIndex < sapPartyCodeArray.length && sapPartyCodeArray[nextIndex] === sapPartyCode) {
        const nextReferenceDoNo = referenceDoNoArray[nextIndex];
        if (groupedReferenceDoNo1[sapPartyCode][nextReferenceDoNo] === undefined) {
          groupedReferenceDoNo1[sapPartyCode][nextReferenceDoNo] = pickingslip;
          break;
        }
        nextIndex++;
      }
    }
  });
  console.log(groupedReferenceDoNo1);
  return groupedReferenceDoNo1;
}







  selectedCheckboxes: boolean[] = Array(this.referenceDoNoArray.length).fill(false);
  isFirstReferenceDoNo(referenceDoNo: string, index: number): boolean {
    // Check if the current row's referenceDoNo is the first occurrence in the array
    return this.referenceDoNoArray.indexOf(referenceDoNo) === index;
  }
  showButtons: boolean = false;
  selectAllCheckboxes: boolean = false;
 
  selectAllCheckboxesChanged() {
    this.showButtons = this.selectAllCheckboxes;
    if (this.selectAllCheckboxes) {
      console.log("All rows data:", this.pickingslipArray);
      console.log("All rows data:", this.referenceDoNoArray);
    } else {
    }
  }

  downloadPrint(sapPartyCode: string) {
    const referenceDoNos = this.groupedReferenceDoNo[sapPartyCode].join(',');

    const phpEndpoint = 'https://www.swatpro.co/get_picking_sliptest.php?ReferenceDoNo=' + referenceDoNos;
    console.log(referenceDoNos);
    fetch(phpEndpoint)
      .then((response) => response.json())
      .then((data) => {
        this.pickedItems = data;
        this.dataSource.data = this.pickedItems;
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
  
  
  downloadPrint1() {
    // Initialize the printContent variable
    let printContent = '';
    let fetchPromises = [];
    let processedReferenceDoNos = new Set();

    this.pickingslipArray.forEach((pickingslip, index) => {
        // Check if the referenceDoNo has been processed before
        if (!processedReferenceDoNos.has(pickingslip)) {
            const phpEndpoint = 'https://www.swatpro.co/get_picking_sliptest1.php?pickingslip=' + pickingslip;
            console.log(phpEndpoint);
            // Push each fetch promise to an array
            fetchPromises.push(
                fetch(phpEndpoint)
                .then((response) => response.json())
                .then((data) => {
                    // Append the content for each ReferenceDoNo to the printContent
                    printContent += `
                    <div style="page-break-before: ${index > 0 ? 'always' : 'auto'};">
                        <h1 style="text-align:center;">Picking Slip - pickingslip: ${pickingslip}</h1>
                        <table style="border-collapse: collapse; width: 100%; border: 1px solid;">
                            <!-- Header row -->
                            <tr style="background-color: #f2f2f2;">
                                <th style="border: 1px solid black; padding: 8px;">ReferenceDoNo</th>
                                <th style="border: 1px solid black; padding: 8px;">RouteNo</th>
                                <th style="border: 1px solid black; padding: 8px;">Picking Slip No</th>
                                <th style="border: 1px solid black; padding: 8px;">Gate No</th>
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
                        <tr>
                            <td style="border: 1px solid black; padding: 8px;">${item.ReferenceDoNo}</td>
                            <td style="border: 1px solid black; padding: 8px;">${item.RouteNo}</td>
                            <td style="border: 1px solid black; padding: 8px;">${item.Pickingslip}</td>
                            <td style="border: 1px solid black; padding: 8px;">${item.Gateno}</td>
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

                    printContent += '</table></div>';
                })
                .catch((error) => {
                    console.error(`Error fetching picking slip data for ReferenceDoNo ${pickingslip}:`, error);
                })
            );

            // Add the referenceDoNo to the set of processed referenceDoNos
            processedReferenceDoNos.add(pickingslip);
        }
    });

    // Wait for all fetch operations to complete before printing
    Promise.all(fetchPromises)
        .then(() => {
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
        });
}


  
  
  
  
  


    stikerprint(pickingslip) {
    const phpEndpoint = `https://www.swatpro.co/get_sticker_printtest.php?Pickingslip=${pickingslip}&totalQuantity=${this.totalQuantity}`;
    console.log(phpEndpoint);
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


  stikerprint1() {
    console.log("All rows data:");
  
    // Use Promise.all to parallelize AJAX requests
    const ajaxPromises = this.pickingslipArray.map(pickingslip => {
      const singlePickingslipEndpoint = `https://www.swatpro.co/get_sticker_printtest.php?Pickingslip=${pickingslip}&totalQuantity=${this.totalQuantity}`;
  
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', singlePickingslipEndpoint, true);
        xhr.responseType = 'text';
  
        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
            } else {
              reject(`Error while fetching sticker data for pickingslip: ${pickingslip}`);
            }
          }
        };
  
        xhr.send();
      });
    });
  
    // Use Promise.all to wait for all AJAX requests to complete
    Promise.all(ajaxPromises)
      .then(responses => {
        const allContent = responses.join('');
        this.printStickers1(allContent);
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  private printStickers1(content: string) {
    const printWindow = window.open('', '_blank', 'height=500,width=800');
  
    if (!printWindow) {
      console.error('Failed to open print window.');
      return;
    }
  
    // Lazy load images
    const lazyContent = content.replace(/<img src=/g, '<img loading="lazy" src=');
  
    printWindow.document.write(lazyContent);
    printWindow.document.close();
    printWindow.focus();
  
    // Print the content
    printWindow.print();
  }
  
  
  removeDuplicates(array: string[]): string[] {
    return Array.from(new Set(array));
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

