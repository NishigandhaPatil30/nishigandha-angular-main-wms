import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute ,Router } from '@angular/router';
import { MessageService } from 'primeng/api';

interface LRData {
  RouteNo: string;
  ReferenceDoNo: string;
  Pickingslip: string;
  ConsigneeName: string;
  TotalQuantity: number;
  TotalWeight: number;
  DeliveryLocation: string;
  Invoice: string;
  EWayBillNo: string;
  Date1: string;
}
@Component({
  selector: 'app-routewiselrgeneration',
  templateUrl: './routewiselrgeneration.component.html',
  styleUrls: ['./routewiselrgeneration.component.scss'],
  providers:[MessageService]
})
export class RoutewiselrgenerationComponent implements OnInit {
  data: LRData[] = [];
  ReferenceDoNo: any;
  depot:any;
  private baseUrl = 'https://www.swatpro.co/wmslrgeneration.php';

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router,private messageService: MessageService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.ReferenceDoNo = params.get('ReferenceDoNo');
      console.log('ReferenceDoNo:', this.ReferenceDoNo); // Debug statement
      this.loadData();
    });
    const userInfoString = sessionStorage.getItem('userInfo');
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      this.depot = userInfo.Depot;
     
    }
  }

  loading: boolean = false;

  load() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false
    }, 2000);
  }

  loadData(): void {
    const url = `${this.baseUrl}?ReferenceDoNo=${this.ReferenceDoNo}`;
    this.http.get<LRData[]>(url).subscribe(
      data => {
       // console.log('API Response:', data); // Debug statement
        this.data = data;
      },
      error => {
        console.log('Error:', error);
      }
    );
  }

  // saveDataToDatabase(): void {
  //   if (Object.keys(this.data).length === 0) {
  //     console.log('Data is empty. No need to save.');
  //     return;
  //   }
  
  //   // Send the data to the PHP script
  //   this.http.post('https://www.swatpro.co/insert_data.php', this.data).subscribe(
  //     (response) => {
  //       alert('Record successfully inserted');
  //       location.reload();
  //       // Perform any additional logic or feedback to the user here.
  //     },
  //     (error) => {
  //       console.error('Error saving data to the database:', error);
  //       // Handle error and provide feedback to the user if necessary.
  //     }
  //   );
  // }
  
  saveDataToDatabase(): void {
    if (Object.keys(this.data).length === 0) {
      console.log('Data is empty. No need to save.');
      return;
    }
    
   
    // Send the data to the PHP script
    this.http.post<string[]>('https://www.swatpro.co/insert_data.php', this.data).subscribe(
      (generatedLRs) => {
        const lrNumbers = generatedLRs.join(', '); // Join LR numbers into a single string
       // alert(`Record successfully inserted. Generated LR numbers: ${lrNumbers}`);
       // Display the success message
this.messageService.add({
  severity: 'success',
  summary: 'Success',
  detail: `Record successfully inserted. Generated LR numbers: ${lrNumbers}`
});

// Set a timeout to close the success message after a specified time (e.g., 5000 milliseconds or 5 seconds)
setTimeout(() => {
  this.router.navigate(
    ['modules', 'lrgenration', 'wmsroutewiselrgeneartion', encodedReferenceDoNo, 'Lrno'],
    { queryParams: { lr: lrNumbers } }
  ); // Clear the message
}, 1000); // 5 seconds (5000 milliseconds)

        
        // Redirect to another page with LR number as parameter
        const encodedReferenceDoNo = encodeURIComponent(this.ReferenceDoNo);



  
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Already inserted eway bill number and invoice number'
        });
        // Handle error and provide feedback to the user if necessary.
      }
    );
  }
  
  
  validateInput(event: any) {
    const inputValue = event.target.value;
    const pattern = /^[0-9]*$/; // Only allows numeric values
    if (!pattern.test(inputValue)) {
      event.target.value = inputValue.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
    
    }
   }
}
