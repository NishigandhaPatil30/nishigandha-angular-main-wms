import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientmastereditComponent } from './clientmasteredit/clientmasteredit.component';
import { ClientmasterviewComponent } from './clientmasterview/clientmasterview.component';
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
import { TotalwarehosuestockreportComponent } from './totalwarehosuestockreport/totalwarehosuestockreport.component';
import { MaterialinwardgrnComponent } from './materialinwardgrn/materialinwardgrn.component';
import { LrgenerationComponent } from './lrgeneration/lrgeneration.component';
import { LrgenerationforexcelComponent } from './lrgenerationforexcel/lrgenerationforexcel.component';
import { RoutewiselrgenerationComponent } from './routewiselrgeneration/routewiselrgeneration.component';
import { LrnogeneratedComponent } from './lrnogenerated/lrnogenerated.component';
import { LrnogeneratedforexcelComponent } from './lrnogeneratedforexcel/lrnogeneratedforexcel.component';
import { MaterialoutwardComponent } from './materialoutward/materialoutward.component';
import { ViewpickingslipnumberComponent } from './viewpickingslipnumber/viewpickingslipnumber.component';
import { Viewpickingslipnumber1Component } from './viewpickingslipnumber1/viewpickingslipnumber1.component';
import { ViewpickingslipComponent } from './viewpickingslip/viewpickingslip.component';
import { ViewpickingforexcelComponent } from './viewpickingforexcel/viewpickingforexcel.component';
import { RoutewiseslipComponent } from './routewiseslip/routewiseslip.component';
import { HsequipementComponent } from './hsequipement/hsequipement.component';
import { InternalwarehousestockshiftingviewComponent } from './internalwarehousestockshiftingview/internalwarehousestockshiftingview.component';
import { InternalwarehousestockshiftingComponent } from './internalwarehousestockshifting/internalwarehousestockshifting.component';
import { HsequipementshowComponent } from './hsequipementshow/hsequipementshow.component';
import { LeakagedamageComponent } from './leakagedamage/leakagedamage.component';
import { ViewleakagedamageareaComponent } from './viewleakagedamagearea/viewleakagedamagearea.component';
import { CompatibilitystoragemappingComponent } from './compatibilitystoragemapping/compatibilitystoragemapping.component';
import { CompatibilitystoragemappingviewComponent } from './compatibilitystoragemappingview/compatibilitystoragemappingview.component';
import { GridauditComponent } from './gridaudit/gridaudit.component';
import { MaterialinwardsrnComponent } from './materialinwardsrn/materialinwardsrn.component';
import { InwardshowreportComponent } from './inwardshowreport/inwardshowreport.component';
import { OuwardstockComponent } from './ouwardstock/ouwardstock.component';
import { MaterialsrnreportComponent } from './materialsrnreport/materialsrnreport.component';
import { GrnviewComponent } from './grnview/grnview.component';
import { WmsroutewiselrgeneartionforexcelComponent } from './wmsroutewiselrgeneartionforexcel/wmsroutewiselrgeneartionforexcel.component';
import { ProductgridwisestockComponent } from './productgridwisestock/productgridwisestock.component';
import { OutwardexcelreportComponent } from './outwardexcelreport/outwardexcelreport.component';
import { SrngrnviewComponent } from './srngrnview/srngrnview.component';
@NgModule({
    imports: [RouterModule.forChild([
        { path: 'clientmaster', data: { breadcrumb:'clientmaster'}, loadChildren: () => import('./clientmaster/clientmaster.module').then(m => m.ClientmasterModule) },
         { path: 'clientmaster/clinetmasterview', data: { breadcrumb:'clientmaster/clinetmasterview'}, loadChildren: () => import('./clientmasterview/clientmasterview.module').then(m => m.ClientmasterviewModule) },
         { path: 'clientmaster/clinetmasterview', data: { breadcrumb:'clientmaster/clinetmasterview'}, loadChildren: () => import('./clientmasterview/clientmasterview.module').then(m => m.ClientmasterviewModule) },
         { path: 'clientmaster/clinetmasterview', component: ClientmasterviewComponent },
         { path: 'clientmaster/clinetmasterview/clientmasteredit/:id', component: ClientmastereditComponent },
         { path: 'locationmaster', component: LocationmasterComponent },
         { path: 'locationmaster/locationmasterview', component: LocationmasterviewComponent },
         { path: 'locationmaster/locationmasterview/locationmasteredit/:id', component: LocationmastereditComponent },
         { path: 'warehousemaster', component: WarehosuemasterComponent },
         { path: 'warehousemaster/warehousemasterview', component: WarehosuemasterviewComponent },
         { path: 'warehousemaster/warehousemasterview/warehousemasteredit/:id', component: WarehosuemastereditComponent },
         { path: 'usermaster', component: UsermasterComponent },
         { path: 'usermaster/usermasterview', component: UsermasterviewComponent },
         { path: 'usermaster/usermasterview/usermasteredit/:Id', component: UsermastereditComponent },
         { path: 'productmaster', component: ProductmasterComponent },
         { path: 'productmaster/productmasterview', component: ProductmasterviewComponent },
         { path: 'productmaster/productmasterview/productmasteredit/:id', component: ProductmastereditComponent },
         { path: 'gridmaster', component: GridmasterComponent },
         { path: 'gridmaster/gridmastermasterview', component: GridmasterviewComponent },
         { path: 'gridmaster/gridmastermasterview/gridmasteredit/:id', component: GridmastereditComponent },
         { path: 'routemaster', component: RoutemasterComponent },
         { path: 'routemaster/routemasterview', component: RoutemasterviewComponent },
         { path: 'margincreation', component: MargincreationComponent },
         { path: 'gridqrcode', component: GridqrcodeComponent },
         { path: 'origincreation', component: OrigincreationComponent },
         { path: 'storageinwardreport', component: StorageinwardreportComponent },
         { path: 'gridwisestock', component: GridwisestockComponent },
         { path: 'productwisestock', component: ProductwisestockComponent },
         { path: 'batchwisereport', component: BatchwisereportComponent },
         { path: 'nearexpiryreport', component: NearexpiryreportComponent },
         { path: 'stockregister', component: StockregisterComponent },
         { path: 'totalwarehosuestockreport', component: TotalwarehosuestockreportComponent },
         { path: 'materialinward', component: MaterialinwardgrnComponent },
         { path: 'lrgeneration', component: LrgenerationComponent },
         { path: 'lrgenerationforexcel', component: LrgenerationforexcelComponent },
         { path: 'productgridwisestock', component: ProductgridwisestockComponent },
         { path: 'lrgenration/wmsroutewiselrgeneartion/:ReferenceDoNo', component: RoutewiselrgenerationComponent },
         { path: 'lrgenration/wmsroutewiselrgeneartionforexcel/:ReferenceDoNo', component: WmsroutewiselrgeneartionforexcelComponent },
         {
            path: 'lrgenration/wmsroutewiselrgeneartion/:ReferenceDoNo/Lrno',
            component: LrnogeneratedComponent
        },
        {
            path: 'lrgenration/wmsroutewiselrgeneartionforexcel/:ReferenceDoNo/Lrno',
            component: LrnogeneratedforexcelComponent
        },
        { path: 'materialoutward', component: MaterialoutwardComponent },
        { path: 'materialoutward/pickingslipnumber', component:ViewpickingslipnumberComponent },
        { path: 'materialoutward/pickingslipnumberexcel', component:Viewpickingslipnumber1Component },
        { path: 'viewpickingslip', component:ViewpickingslipComponent },
        { path: 'viewpickingslipexcel', component:ViewpickingforexcelComponent },
        { path: 'routewiseslip', component:RoutewiseslipComponent },
        { path: 'hsequipement', component:HsequipementComponent },
        { path: 'hsequipement/hsequipementview', component:HsequipementshowComponent },
        { path: 'leakagedamage', component:LeakagedamageComponent },
        { path: 'leakagedamage/leakagedamageview', component:ViewleakagedamageareaComponent },
        { path: 'compatibilitystoragemapping', component:CompatibilitystoragemappingComponent },
        { path: 'compatibilitystoragemapping/compatibilitystoragemappingview', component:CompatibilitystoragemappingviewComponent },
        { path: 'internalwarehousestockshifting', component:InternalwarehousestockshiftingComponent },
        { path: 'internalwarehousestockshifting/internalwarehousestockshiftingview', component:InternalwarehousestockshiftingviewComponent },
        { path: 'gridaudit', component:GridauditComponent },
        { path: 'materialinwardsrn', component: MaterialinwardsrnComponent },
        { path: 'materialinward/inwardshowreport', component: InwardshowreportComponent },
        { path: 'materialinwardsrn/inwardsrnreport', component: MaterialsrnreportComponent },
        { path: 'outwardtock', component:OuwardstockComponent },
        { path: 'exceloutwardtock', component:OutwardexcelreportComponent },
        { path: 'materialinward/grnview/:grnno', component:GrnviewComponent },
        { path: 'materialinwardsrn/srngrnview/:grnno', component:SrngrnviewComponent },

        { path: '**', redirectTo: '/notfound' }

    ])],
    exports: [RouterModule]
})

export class ModulesRoutingModule { }

