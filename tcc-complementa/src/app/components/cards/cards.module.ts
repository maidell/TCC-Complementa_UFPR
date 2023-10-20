import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RectCardComponent } from './rect-card/rect-card.component';
import { SquareCardComponent } from './square-card/square-card.component';



@NgModule({
  declarations: [
    RectCardComponent,
    SquareCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CardsModule { }
