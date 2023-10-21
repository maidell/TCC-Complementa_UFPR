import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { MaterialStylesModule } from 'src/material-styles/material-styles.module';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    MaterialStylesModule
  ],
  exports: [
    HeaderComponent,
    UserDetailsComponent
  ]
})
export class LayoutModule { }
