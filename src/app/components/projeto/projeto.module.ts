import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjetoComponent } from './projeto.component';
import { MaterialStylesModule } from '../layout/material-styles/material-styles.module';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CardsModule } from '../layout/cards/cards.module';

@NgModule({
  declarations: [
    ProjetoComponent,
  ],
  imports: [
    CommonModule,
    MaterialStylesModule,
    CardsModule,
    LayoutModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  exports: [
    ProjetoComponent
  ]
})
export class ProjetoModule { }
