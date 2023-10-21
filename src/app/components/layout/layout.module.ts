import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { MaterialStylesModule } from './material-styles/material-styles.module';



@NgModule({
  declarations: [
    UserDetailsComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MaterialStylesModule
    
  ],
  exports: [
    UserDetailsComponent,
    FooterComponent,
    HeaderComponent
  ]
})
export class LayoutModule { }
