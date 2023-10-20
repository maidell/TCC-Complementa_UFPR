import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashAdminComponent } from './dash-admin/dash-admin.component';
import { MatIconModule } from '@angular/material/icon';
import { MaterialStylesModule } from 'src/app/components/layout/material-styles/material-styles.module';
@NgModule({
  declarations: [
    DashAdminComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MaterialStylesModule
   ],
  exports: [
    DashAdminComponent
  ]
})
export class AdminModule { }
