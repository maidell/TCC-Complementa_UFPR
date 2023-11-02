import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RectCardComponent } from './rect-card/rect-card.component';
import { SquareCardComponent } from './square-card/square-card.component';
import { MaterialStylesModule } from '../material-styles/material-styles.module';

@NgModule({
  declarations: [
    RectCardComponent,
    SquareCardComponent
  ],
  imports: [
    CommonModule,
    MaterialStylesModule
  ],
  exports: [
    RectCardComponent,
    SquareCardComponent
  ]
})
export class CardsModule { }
