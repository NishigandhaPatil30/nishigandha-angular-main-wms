import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientmasterviewRoutingModule } from './clientmasterview-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {  MatTableModule } from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [],

  imports: [
    CommonModule,
    ClientmasterviewRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
  
  ]
})

export class ClientmasterviewModule { }
