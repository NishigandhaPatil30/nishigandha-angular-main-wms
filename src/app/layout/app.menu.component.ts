import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { PanelMenuModule } from 'primeng/panelmenu';
import { Router } from '@angular/router';
@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

  model: any[] = [];

    constructor(public layoutService: LayoutService,private router: Router) { }

    ngOnInit() {
        this.model = [
          {
            
            items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }
            ]
        },
      
       
          
        {
        
          items: [
            
        
            // Add the nested dropdown menu here
            {
              label: 'MASTER',
              icon: '',
              items: [
                {
                  label: 'CLIENT MASTER',
                  routerLink: 'modules/clientmaster',
                  icon: 'pi pi-fw pi-user',
                },
                {
                  label: 'LOCATION MASTER',
                  routerLink: 'modules/locationmaster',
                  icon: 'pi pi-map-marker',
                },
                {
                  label: 'WAREHOUSE MASTER',
                  routerLink: 'modules/warehousemaster',
                  icon: 'pi pi-building',
                },
                {
                  label: 'USER MASTER',
                  routerLink: 'modules/usermaster',
                  icon: 'pi pi-fw pi-user',
                },
                {
                  label: 'PRODUCT MASTER',
                  routerLink: '/modules/productmaster',
                  icon: 'pi pi-fw pi-book',
                },
                {
                  label: 'GRID MASTER',
                  routerLink: 'modules/gridmaster',
                  icon: 'pi pi-fw pi-table',
                },
                {
                  label: 'ROUTE MASTER',
                  routerLink: 'modules/routemaster',
                  icon: 'pi pi-fw pi-map',
                },
                {
                  label: 'VENDOR MASTER',
           
                  icon: 'pi pi-fw pi-users',
                },
                {
                  label: 'VENDOR RATE CONTRACT',
        
                  icon: 'pi pi-fw pi-money-bill',
                },
                {
                  label: 'MARGIN CREATION',
                  routerLink: 'modules/margincreation',
                  icon: 'pi pi-check-circle',
                },
                {
                  label: 'GRID QR CODE',
                  routerLink: 'modules/gridqrcode',
                  icon: 'pi pi-fw pi-qrcode',
                },
                {
                  label: 'ORIGIN CREATION',
                  routerLink: 'modules/origincreation',
                  icon: 'pi pi-fw pi-globe',
                },
              ],
            },
          ],
        },
              {
        
                items: [
                  
              
                  // Add the nested dropdown menu here
                  {
                    label: 'MATERIAL INWARD',
                    icon: '',
                    items: [
                      {
                        label: 'MATERIAL INWARD(GRN)',
                        routerLink: 'modules/materialinward',
                        icon: 'pi pi-arrow-down',
                      },
                      {
                        label: 'MATERIAL INWARD(SRN)',
                       routerLink:'modules/materialinwardsrn',
                        icon: 'pi pi-arrow-up',
                      },
                    ],
                  },
                ],
              },
        
            {
        
                items: [
                  {
                    label: 'STORAGE',
                    icon: '',
                    items: [
                      {
                        label: 'INTERNAL WAREHOUSE STOCK SHIFTING',
                        routerLink: 'modules/internalwarehousestockshifting',
                        icon: 'pi pi-building',
                      },
                      {
                        label: 'HSE EQUIPMENT POSITION',
                        routerLink: 'modules/hsequipement',
                        icon: 'pi pi-wrench',
                      },
                      {
                        label: 'LEAKAGE DAMAGE AREA',
                        routerLink: 'modules/leakagedamage',
                        icon: 'pi pi-exclamation-triangle',
                      },
                      {
                        label: 'COMPATIBILITY STORAGE MAPPING',
                        routerLink: 'modules/compatibilitystoragemapping',
                        icon:'pi pi-map',
                      },
                      {
                        label: 'GRID AUDIT',
                        routerLink: 'modules/gridaudit',
                        icon:'pi pi-search',
                      },
                    ],
                  },
                ],
              },


              {
        
                items: [
                  {
                    label: 'MATERIAL OUTWARD',
                    icon: '',
                    items: [
                      {
                        label: 'GENERATE PICKING SLIP',
                        routerLink: 'modules/materialoutward',
                        icon: 'pi pi-file-excel',
                      },
                      {
                        label: 'VIEW PICKING SLIP',
                        routerLink: 'modules/viewpickingslip',
                        icon: 'pi pi-eye',
                      },
                      {
                        label: 'VIEW PICKING SLIP FOR EXCEL',
                        routerLink: 'modules/viewpickingslipexcel',
                        icon: 'pi pi-eye',
                      },
                      {
                        label: 'ROUTE WISE SLIP',
                        routerLink: 'modules/routewiseslip',
                        icon: 'pi pi-map-marker',
                      },
                    ],
                  },
                ],
              },
              
              {
        
                items: [
                  {
                    label: 'DISPATCH',
                    icon: '',
                    items: [
                      {
                        label: 'LR GENERATION',
                        routerLink: 'modules/lrgeneration',
                        icon: 'pi pi-cog',
                      },
                      {
                        label: 'LR GENERATION FOR EXCEL',
                        routerLink: 'modules/lrgenerationforexcel',
                        icon: 'pi pi-cog',
                      },
                      {
                        label: 'CREATE DRS',
                        routerLink: '',
                        icon: 'pi pi-plus',
                      },
                    ],
                  },
                ],
              },
             
              {
        
                items: [
                  {
                    label: 'DELIVERY',
                    icon: '',
                    items: [
                      {
                        label: 'UPDATE DRS',
                        routerLink: '',
                        icon: 'pi pi-cog',
                      },
                      {
                        label: 'VERIFY DRS',
                        routerLink: '',
                        icon: 'pi pi-plus',
                      },
                      {
                        label: 'FREIGHT BILL GENERATION',
                        routerLink: '',
                        icon: 'pi pi-plus',
                      },
                    ],
                  },
                ],
              },
              
              {
        
                items: [
                  {
                    label: 'REPORT',
                    icon: '',
                    items: [
                      {
                        label: 'STORAGE INWARD REPORT',
                        routerLink: 'modules/storageinwardreport',
                        icon: 'pi pi-cog',
                      },
                      {
                        label: 'GRID WISE STOCK',
                        routerLink: 'modules/gridwisestock',
                        icon: 'pi pi-plus',
                      },
                      {
                        label: 'PRODUCT GRID WISE STOCK',
                        routerLink: 'modules/productgridwisestock',
                        icon: 'pi pi-plus',
                      },
                      {
                        label: 'PRODUCT WISE STOCK',
                        routerLink: 'modules/productwisestock',
                        icon: 'pi pi-plus',
                      },
                      {
                        label: 'BATCH WISE STOCK',
                        routerLink: 'modules/batchwisereport',
                        icon: 'pi pi-plus',
                      },
                      {
                        label: 'NEAR EXPIRY REPORT',
                        routerLink: 'modules/nearexpiryreport',
                        icon: 'pi pi-plus',
                      },
                      {
                        label: 'STOCK REGISTER',
                        routerLink: 'modules/stockregister',
                        icon: 'pi pi-plus',
                      },
                      {
                        label: 'TOTAL WAREHOUSE STOCK REPORT',
                        routerLink: 'modules/totalwarehosuestockreport',
                        icon: 'pi pi-plus',
                      },
                    ],
                  },
                ],
              },

              {
        
                items: [
                  {
                    label: 'TOOLS',
                    icon: '',
                    items: [
                      {
                        label: 'CONTACTS',
                        routerLink: '',
                        icon: 'pi pi-contact',
                      },
                      {
                        label: 'LEADS',
                        routerLink: '',
                        icon: 'pi pi-fw pi-contact-phone',
                      },
                      
                    ],
                  },
                ],
              },
              
        
        ];
    }
    redirectToNewPage() {
      // Navigate to the desired page (replace 'newpage' with your actual route path)
      this.router.navigate(['/dashboard']);
    }
}
