import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardssquareCardComponent } from './cardssquare-card/cardssquare-card.component';
import { DashAdminComponent } from './amin/dash-admin/dash-admin.component';



@NgModule({
  declarations: [
    CardssquareCardComponent,
    DashAdminComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
