import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulesRoutingModule } from './modules-routing.module';
import { ClientmastereditComponent } from './clientmasteredit/clientmasteredit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from 'primeng/button'
import { FileUploadModule } from 'primeng/fileupload';
import { MatSelectModule } from '@angular/material/select';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { LocationmasterComponent } from './locationmaster/locationmaster.component';
import { LocationmasterviewComponent } from './locationmasterview/locationmasterview.component';
import { LocationmastereditComponent } from './locationmasteredit/locationmasteredit.component';
import { WarehosuemasterComponent } from './warehosuemaster/warehosuemaster.component';
import { WarehosuemasterviewComponent } from './warehosuemasterview/warehosuemasterview.component';
import { WarehosuemastereditComponent } from './warehosuemasteredit/warehosuemasteredit.component';
import { UsermasterComponent } from './usermaster/usermaster.component';
import { UsermasterviewComponent } from './usermasterview/usermasterview.component';
import { UsermastereditComponent } from './usermasteredit/usermasteredit.component';
import { ProductmasterComponent } from './productmaster/productmaster.component';
import { ProductmasterviewComponent } from './productmasterview/productmasterview.component';
import { ProductmastereditComponent } from './productmasteredit/productmasteredit.component';
import { GridmasterComponent } from './gridmaster/gridmaster.component';
import { GridmasterviewComponent } from './gridmasterview/gridmasterview.component';
import { GridmastereditComponent } from './gridmasteredit/gridmasteredit.component';
import { RoutemasterComponent } from './routemaster/routemaster.component';
import { RoutemasterviewComponent } from './routemasterview/routemasterview.component';
import { MargincreationComponent } from './margincreation/margincreation.component';
import { GridqrcodeComponent } from './gridqrcode/gridqrcode.component';
import { OrigincreationComponent } from './origincreation/origincreation.component';
import { StorageinwardreportComponent } from './storageinwardreport/storageinwardreport.component';
import { GridwisestockComponent } from './gridwisestock/gridwisestock.component';
import { ProductwisestockComponent } from './productwisestock/productwisestock.component';
import { BatchwisereportComponent } from './batchwisereport/batchwisereport.component';
import { NearexpiryreportComponent } from './nearexpiryreport/nearexpiryreport.component';
import { StockregisterComponent } from './stockregister/stockregister.component';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table'; // Import the TableModule
import { TotalwarehosuestockreportComponent } from './totalwarehosuestockreport/totalwarehosuestockreport.component';
import {MatInputModule} from '@angular/material/input';
import { MaterialinwardgrnComponent } from './materialinwardgrn/materialinwardgrn.component';
import { LrgenerationComponent } from './lrgeneration/lrgeneration.component';
import { LrgenerationforexcelComponent } from './lrgenerationforexcel/lrgenerationforexcel.component';
import { RoutewiselrgenerationComponent } from './routewiselrgeneration/routewiselrgeneration.component';
import { LrnogeneratedComponent } from './lrnogenerated/lrnogenerated.component';
import { LrnogeneratedforexcelComponent } from './lrnogeneratedforexcel/lrnogeneratedforexcel.component';
import { MaterialoutwardComponent } from './materialoutward/materialoutward.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table'; 
import { MatNativeDateModule } from '@angular/material/core';
import { ViewpickingslipnumberComponent } from './viewpickingslipnumber/viewpickingslipnumber.component';
import { Viewpickingslipnumber1Component } from './viewpickingslipnumber1/viewpickingslipnumber1.component';
import { ViewpickingslipComponent } from './viewpickingslip/viewpickingslip.component';
import { ViewpickingforexcelComponent } from './viewpickingforexcel/viewpickingforexcel.component';
import { RoutewiseslipComponent } from './routewiseslip/routewiseslip.component';
import { WmsroutewiselrgeneartionforexcelComponent } from './wmsroutewiselrgeneartionforexcel/wmsroutewiselrgeneartionforexcel.component';
import { InternalwarehousestockshiftingComponent } from './internalwarehousestockshifting/internalwarehousestockshifting.component';
import { InternalwarehousestockshiftingviewComponent } from './internalwarehousestockshiftingview/internalwarehousestockshiftingview.component';
import { HsequipementComponent } from './hsequipement/hsequipement.component';
import { HsequipementshowComponent } from './hsequipementshow/hsequipementshow.component';
import { LeakagedamageComponent } from './leakagedamage/leakagedamage.component';
import { ViewleakagedamageareaComponent } from './viewleakagedamagearea/viewleakagedamagearea.component';
import { CompatibilitystoragemappingComponent } from './compatibilitystoragemapping/compatibilitystoragemapping.component';
import { CompatibilitystoragemappingviewComponent } from './compatibilitystoragemappingview/compatibilitystoragemappingview.component';
import { GridauditComponent } from './gridaudit/gridaudit.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { MaterialinwardsrnComponent } from './materialinwardsrn/materialinwardsrn.component';
import { MatDialogModule } from '@angular/material/dialog';
import { InwardshowreportComponent } from './inwardshowreport/inwardshowreport.component';
import { MatTableExporterModule } from 'mat-table-exporter'
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { OuwardstockComponent } from './ouwardstock/ouwardstock.component';
import { MaterialsrnreportComponent } from './materialsrnreport/materialsrnreport.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';
import { GrnviewComponent } from './grnview/grnview.component';
import { SrngrnviewComponent } from './srngrnview/srngrnview.component';
import { PanelModule } from 'primeng/panel';
import { BadgeModule } from 'primeng/badge';
import { DropdownModule } from 'primeng/dropdown';
import { OutwardexcelreportComponent } from './outwardexcelreport/outwardexcelreport.component';
import { ProductgridwisestockComponent } from './productgridwisestock/productgridwisestock.component';
@NgModule({
  imports: [
    DropdownModule,
    BadgeModule,
    PanelModule,
    TagModule,
    ConfirmDialogModule,
    ToastModule,
    MatTableExporterModule,
    DialogModule,
    HttpClientModule,
    RouterModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatTableModule,
    MatDatepickerModule,
    CommonModule,
    AutoCompleteModule,
    ModulesRoutingModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ButtonModule,
    FileUploadModule,
    MatSelectModule,
    FormsModule,
    CalendarModule,
    InputTextModule,
    TableModule,
    MatInputModule,
    MatDialogModule
  ],
  declarations: [
    OutwardexcelreportComponent,
    SrngrnviewComponent,
    LrnogeneratedforexcelComponent,
    WmsroutewiselrgeneartionforexcelComponent,
    LrgenerationforexcelComponent,
    ViewpickingforexcelComponent,
    ClientmastereditComponent,
    LocationmasterComponent,
    LocationmastereditComponent,
    WarehosuemasterComponent,
    WarehosuemastereditComponent,
    UsermasterComponent,
    UsermastereditComponent,
    ProductmasterComponent,
    ProductmastereditComponent,
    GridmasterComponent,
    GridmastereditComponent,
    RoutemasterComponent,
    MargincreationComponent,
    OrigincreationComponent,
    StorageinwardreportComponent,
    GridwisestockComponent,
    ProductwisestockComponent,
    BatchwisereportComponent,
    NearexpiryreportComponent,
    StockregisterComponent,
    TotalwarehosuestockreportComponent,
    MaterialinwardgrnComponent,
    LrgenerationComponent,
    RoutewiselrgenerationComponent,
    LrnogeneratedComponent,
    MaterialoutwardComponent,
    ViewpickingslipnumberComponent,
    Viewpickingslipnumber1Component,
    ViewpickingslipComponent,
    RoutewiseslipComponent,
    InternalwarehousestockshiftingComponent,
    InternalwarehousestockshiftingviewComponent,
    HsequipementComponent,
    HsequipementshowComponent,
    LeakagedamageComponent,
    ViewleakagedamageareaComponent,
    CompatibilitystoragemappingComponent,
    CompatibilitystoragemappingviewComponent,
    GridauditComponent,
    MaterialinwardsrnComponent,
    InwardshowreportComponent,
    RoutemasterviewComponent,
    OuwardstockComponent,
    MaterialsrnreportComponent,
    GrnviewComponent,
    ProductgridwisestockComponent,
 
  ]
})
export class ModulesModule { }
