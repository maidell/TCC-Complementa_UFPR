import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashAdminComponent } from './dash-admin/dash-admin.component';
import { MaterialStylesModule } from '../layout/material-styles/material-styles.module';
import { CardsModule } from '../cards/cards.module';
@NgModule({
  declarations: [
    DashAdminComponent
  ],
  imports: [
    CommonModule,
    MaterialStylesModule,
    CardsModule
   ],
  exports: [
    DashAdminComponent
  ]
})
export class AdminModule { }
