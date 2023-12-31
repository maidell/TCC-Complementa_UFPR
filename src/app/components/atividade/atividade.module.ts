import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialStylesModule } from 'src/app/components/layout/material-styles/material-styles.module';
import { LayoutModule } from '../layout/layout.module';
import { FormsModule } from '@angular/forms';
import { AtividadeComponent } from './atividade/atividade.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AtividadeComponent
  ],
  imports: [
    CommonModule,
    MaterialStylesModule,
    LayoutModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  
})
export class AtividadeModule { }
