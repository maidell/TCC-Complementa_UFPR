import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { MaterialStylesModule } from 'src/app/components/layout/material-styles/material-styles.module';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardsModule } from './cards/cards.module';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    UserDetailsComponent,
    NavbarComponent,
    DashboardComponent,

  ],
  imports: [
    CommonModule,
    MaterialStylesModule,
    CardsModule

  ],
  exports: [
    HeaderComponent,
    UserDetailsComponent,
    NavbarComponent,
    DashboardComponent
  ]
})
export class LayoutModule { }
