import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashAdminComponent } from './dash-admin/dash-admin.component';
import { MaterialStylesModule } from '../layout/material-styles/material-styles.module';
import { CardsModule } from '../layout/cards/cards.module';
import { CadastroDeUsuariosComponent } from './cadastro-de-usuarios/cadastro-de-usuarios.component';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    DashAdminComponent,
    CadastroDeUsuariosComponent
  ],
  imports: [
    CommonModule,
    MaterialStylesModule,
    CardsModule,
    FormsModule,
    NgxMaskModule.forRoot()
   ],
  exports: [
    DashAdminComponent,
    CadastroDeUsuariosComponent
  ]
})
export class AdminModule { }
