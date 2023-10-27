import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutModule } from '../layout/layout.module';
import { MaterialStylesModule } from 'src/app/components/layout/material-styles/material-styles.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    MaterialStylesModule,
    FormsModule
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }
