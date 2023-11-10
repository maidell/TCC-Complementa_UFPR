import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RectCardComponent } from './rect-card/rect-card.component';
import { SquareCardComponent } from './square-card/square-card.component';
import { MaterialStylesModule } from '../material-styles/material-styles.module';
import { WarnCardComponent } from './warn-card/warn-card.component';

@NgModule({
  declarations: [
    RectCardComponent,
    SquareCardComponent,
    WarnCardComponent
  ],
  imports: [
    CommonModule,
    MaterialStylesModule
  ],
  exports: [
    RectCardComponent,
    SquareCardComponent,
    WarnCardComponent
  ]
})
export class CardsModule { }
