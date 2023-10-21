import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashAdminComponent } from './admin/dash-admin/dash-admin.component';
import { CardsModule } from './cards/cards.module';
import { AdminModule } from './admin/admin.module';
import { AlunoModule } from './aluno/aluno.module';
import { AuthModule } from './auth/auth.module';
import { LayoutModule } from './layout/layout.module';
import { PagesModule } from './pages/pages.module';
import { UsuarioModule } from './usuario/usuario.module';
import { MaterialStylesModule } from 'src/material-styles/material-styles.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';

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
    PagesModule,
    UsuarioModule,
    FlexLayoutModule,
    MaterialStylesModule,
    MatCardModule
  ],

})
export class ComponentsModule { }
