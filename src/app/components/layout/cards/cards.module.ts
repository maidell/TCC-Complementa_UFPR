import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RectCardComponent } from './rect-card/rect-card.component';
import { SquareCardComponent } from './square-card/square-card.component';
import { MaterialStylesModule } from '../material-styles/material-styles.module';
import { WarnCardComponent } from './warn-card/warn-card.component';
import { ModifyCardComponent } from './modify-card/modify-card.component';
import { TableCardComponent } from './table-card/table-card.component';

@NgModule({
  declarations: [
    RectCardComponent,
    SquareCardComponent,
    WarnCardComponent,
    ModifyCardComponent,
    TableCardComponent
  ],
  imports: [
    CommonModule,
    MaterialStylesModule
  ],
  exports: [
    RectCardComponent,
    SquareCardComponent,
    WarnCardComponent,
    TableCardComponent
  ]
})
export class CardsModule { }
