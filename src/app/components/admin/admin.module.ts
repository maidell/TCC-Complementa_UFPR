import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashAdminComponent } from './dash-admin/dash-admin.component';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    DashAdminComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
   ],
  exports: [
    DashAdminComponent
  ]
})
export class AdminModule { }
