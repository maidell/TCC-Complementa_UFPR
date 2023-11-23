import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { MaterialStylesModule } from 'src/app/components/layout/material-styles/material-styles.module';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterModule } from '@angular/router';
import { CardsModule } from './cards/cards.module';
import { WarningComponent } from './cards/warning/warning.component';
import { TitleComponent } from './title/title.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    UserDetailsComponent,
    NavbarComponent,
    TitleComponent,
  ],
  imports: [
    CommonModule,
    MaterialStylesModule,
    CardsModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    UserDetailsComponent,
    NavbarComponent,
    TitleComponent,
  ]
})
export class LayoutModule { }
