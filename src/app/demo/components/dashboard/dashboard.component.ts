import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  depot:any;
    productCount: any;
    gridCount: any;
    inwardCount:any;
    rootCount:any;
    outwardcount:any;
    items!: MenuItem[];
    public productCodes: string[];
    products!: Product[];
    config: any;
    chartData: any;
    chartData1:any;
    data: any;
    chartOptions: any;
    chartOptions1:any;
    subscription!: Subscription;
    isLoading: boolean = false;
    constructor(private productService: ProductService, public layoutService: LayoutService,private http: HttpClient,private router: Router) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initChart();
            this.initChart1();
        });
    }
    fetchProductCount(depot: string): void {
      
      this.isLoading = true;
        this.http.get<any>(`https://swatpro.co/dashboardproductmasterdepowise.php?depot=${depot}`)
          .subscribe(data => {
             // console.log(data);
            this.productCount = data.productCount; // Adjust the property based on your API response
            this.isLoading = false;
          });
      }

      fetchGridCount(depot: string): void {
        this.http.get<any>(`https://swatpro.co/dashboardgridmasterdepowise.php?depot=${depot}`)
          .subscribe(data => {
           //   console.log(data);
            this.gridCount = data.gridCount; // Adjust the property based on your API response
          });
      }
      fetchInwardCount(depot: string): void {
      this.http.get<any>(`https://swatpro.co/dashboardinwardmasterdepowise.php?depot=${depot}`)
        .subscribe(data => {
         // console.log(data);
          this.inwardCount = data.inwardCount; // Adjust the property based on your API response
        });
    }
    fetchrootCount(depot: string): void {
        this.http.get<any>(`https://swatpro.co/dashboardoutwardstockdepowise.php?depot=${depot}`)
          .subscribe(data => {
           // console.log(data);
            this.rootCount = data.rootCount; // Adjust the property based on your API response
          });
      }
      fetchoutwardexcel(depot: string): void {
        this.http.get<any>(`https://swatpro.co/dashboardoutwardstockforexceldepowise.php?depot=${depot}`)
          .subscribe(data => {
           // console.log(data);
            this.outwardcount = data.outwardcount; // Adjust the property based on your API response
          });
      }
      
      redirectToAnotherPage() {

        this.router.navigate(['modules/materialinward/inwardshowreport']);
    }
    outwardforexcel() {

      this.router.navigate(['modules/exceloutwardtock']);
  }
    productredirectToAnotherPage() {
        this.router.navigate(['modules/productmaster/productmasterview']);
    }
    gridredirectToAnotherPage() {
        this.router.navigate(['modules/gridmaster/gridmastermasterview']);
    }
    rootredirectToAnotherPage() {
        this.router.navigate(['modules/outwardtock']);
    }

    ngOnInit() {
        this.initChart();
        this.initChart1();
        this.productService.getProductsSmall().then(data => this.products = data);

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
        const userInfoString = sessionStorage.getItem('userInfo');
        if (userInfoString) {
          const userInfo = JSON.parse(userInfoString);
          this.depot = userInfo.Depot;
          this.fetchProductCount(this.depot);
          this. fetchGridCount(this.depot);
          this.fetchInwardCount(this.depot);
          this.fetchrootCount(this.depot);
          this.fetchoutwardexcel(this.depot);
        }
      
       
        this.fetchProductCodes();
        this.getProductCodesOnly();
        this.getProductCodesOnly1();
        this.initChart();
        this.initChart1();
        this.data = {
           
            datasets: [
              {
            
                backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726", "#26C6DA", "#7E57C2"],
           
              },
             
            ],
            labels: ["Red", "Green", "Yellow", "Grey", "Blue"]
          };
          
          

        this.config = this.config.config;
        this.updateChartOptions();
        this.subscription = this.config.configUpdate$.subscribe(config => {
            this.config = config;
            this.updateChartOptions();
        });
    }

    updateChartOptions() {
        this.chartOptions = this.config && this.config.dark ? this.getDarkTheme() : this.getLightTheme();
    }
    getLightTheme() {
        return {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        }
    }

    getDarkTheme() {
        return {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: 'rgba(255,255,255,0.2)'
                    }
                }
            }};
            
    }
    
    fetchProductCodes() {
        this.http
          .get<string[]>('https://swatpro.co/warehouse10products.php')
          .subscribe((data) => {
            this.productCodes = data;
            console.log(data);
      
            // Create a new data object with the fetched productCodes as labels
            this.data = {
              datasets: [
                {
                  data: data, // Example: Random data values
                  backgroundColor: data.map(() => getRandomColor()), // Random background colors
                },
              ],
              labels: data.map((data) => `Product Code ${data}`), // Add "Product Code" text
            };
      
            // Function to generate random data values
            function getRandomDataValue() {
              return Math.floor(Math.random() * 100); // Modify this based on your data
            }
      
            // Function to generate random colors
            function getRandomColor() {
              const letters = '0123456789ABCDEF';
              let color = '#';
              for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
              }
              return color;
            }
          });
      }
      
      
      getProductCodesOnly() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      
        // First API call
        this.http.get<any[]>('https://swatpro.co/productcodedashboard.php').subscribe((data1) => {
          this.productCodes = data1;
      
          // Second API call
          this.http.get<any[]>('https://swatpro.co/brandtowtablesshowdashboard.php').subscribe((data2) => {
            // Handle data from the second API call here
      
            // Third API call
            this.http.get<any[]>('https://swatpro.co/productcodedashboard1.php').subscribe((data3) => {
              // Handle data from the third API call here
      
              this.chartData = {
                labels: data2,
                datasets: [
                  {
                    label: 'Material Inward',
                    data: data1,
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: 0.4,
                  },
                  {
                    label: 'Material Outward',
                    data:data3, // Use data from the second API call here
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: 0.4,
                  },
                  
                ],
              };
            });
          });
        });
      }
      
      getProductCodesOnly1() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      
        // First API call
        this.http.get<any[]>('https://swatpro.co/productcodedashboard11.php').subscribe((data1) => {
          this.productCodes = data1;
      
          // Second API call
          this.http.get<any[]>('https://swatpro.co/datewisesales.php').subscribe((data2) => {
            // Handle data from the second API call here
      
            // Third API call
            this.http.get<any[]>('https://swatpro.co/productcodedashboard112.php').subscribe((data3) => {
              // Handle data from the third API call here
      
              this.chartData1 = {
                labels: data2,
                datasets: [
                  {
                    label: 'Material Inward',
                    data: data1,
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: 0.4,
                  },
                  {
                    label: 'Material Outward',
                    data:data3, // Use data from the second API call here
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: 0.4,
                  },
                  
                ],
              };
            });
          });
        });
      }
    

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    }
    initChart1() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
