import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashAdminComponent } from './dash-admin/dash-admin.component';
import { MaterialStylesModule } from '../layout/material-styles/material-styles.module';
import { CardsModule } from '../layout/cards/cards.module';
import { CadastroDeUsuariosComponent } from './cadastro-de-usuarios/cadastro-de-usuarios.component';
@NgModule({
  declarations: [
    DashAdminComponent,
    CadastroDeUsuariosComponent
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
