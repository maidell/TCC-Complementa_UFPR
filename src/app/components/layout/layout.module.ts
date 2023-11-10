import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { MaterialStylesModule } from 'src/app/components/layout/material-styles/material-styles.module';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardsModule } from './cards/cards.module';
import { ProjetosComponent } from './projetos/projetos.component';
import { AtividadesComponent } from './atividades/atividades.component';
import { WarningComponent } from './warning/warning.component';
import { ContestacoesComponent } from './contestacoes/contestacoes.component';
import { TitleComponent } from './title/title.component';
import { ConsultasModule } from './consultas/consultas.module';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    UserDetailsComponent,
    NavbarComponent,
    DashboardComponent,
    ProjetosComponent,
    AtividadesComponent,
    WarningComponent,
    ContestacoesComponent,
    TitleComponent
  ],
  imports: [
    CommonModule,
    MaterialStylesModule,
    CardsModule,
    RouterModule,
    ConsultasModule
  ],
  exports: [
    HeaderComponent,
    UserDetailsComponent,
    NavbarComponent,
    DashboardComponent,
    TitleComponent
  ]
})
export class LayoutModule { }
