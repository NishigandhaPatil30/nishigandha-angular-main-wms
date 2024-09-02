import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientmasterRoutingModule } from './clientmaster-routing.module';
import { ClientmasterComponent } from './clientmaster.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field'; // Import MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from 'primeng/button'
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api'; 

@NgModule({
  declarations: [ClientmasterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatGridListModule,
    ClientmasterRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ButtonModule,
    FileUploadModule,
    ToastModule,
    DialogModule

  ],
})
export class ClientmasterModule { }
