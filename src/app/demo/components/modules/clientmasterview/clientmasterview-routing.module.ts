import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ClientmasterviewComponent  } from './clientmasterview.component';


@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ClientmasterviewComponent }
	])],
	exports: [RouterModule]
})
export class ClientmasterviewRoutingModule { }
