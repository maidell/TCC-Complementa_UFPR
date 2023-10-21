import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutModule } from '../layout/layout.module';
import { MaterialStylesModule } from 'src/material-styles/material-styles.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LayoutModule,
    MaterialStylesModule,
    
  ]
})
export class AuthModule { }
