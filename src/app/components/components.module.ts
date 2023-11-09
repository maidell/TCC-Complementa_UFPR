import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashAdminComponent } from './admin/dash-admin/dash-admin.component';
import { CardsModule } from './layout/cards/cards.module';
import { AdminModule } from './admin/admin.module';
import { AlunoModule } from './aluno/aluno.module';
import { AuthModule } from './auth/auth.module';
import { LayoutModule } from './layout/layout.module';
import { UsuarioModule } from './usuario/usuario.module';
import { MaterialStylesModule } from 'src/app/components/layout/material-styles/material-styles.module';
import { AtividadeComponent } from './atividade/atividade/atividade.component';
import { AtividadeModule } from './atividade/atividade.module';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    AdminModule,
    AlunoModule,
    AuthModule,
    CardsModule,
    LayoutModule,
    UsuarioModule,
    MaterialStylesModule,
    AtividadeModule

  ],

})
export class ComponentsModule { }
