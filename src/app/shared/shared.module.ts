import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailDirective } from './directives/email.directive';
import { NumericoDirective } from './directives/numerico.directive';



@NgModule({
  declarations: [
    EmailDirective,
    NumericoDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NumericoDirective,
    EmailDirective
  ]
})
export class SharedModule { }
