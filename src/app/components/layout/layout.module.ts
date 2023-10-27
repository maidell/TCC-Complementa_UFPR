import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { MaterialStylesModule } from 'src/app/components/layout/material-styles/material-styles.module';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    UserDetailsComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MaterialStylesModule
  ],
  exports: [
    HeaderComponent,
    UserDetailsComponent,
    NavbarComponent
  ]
})
export class LayoutModule { }
