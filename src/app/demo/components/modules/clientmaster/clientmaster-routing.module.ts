import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ClientmasterComponent  } from './clientmaster.component';


@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ClientmasterComponent }
	])],
	exports: [RouterModule]
})
export class ClientmasterRoutingModule { }
