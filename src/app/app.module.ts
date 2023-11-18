import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared';
import { ComponentsModule } from './components/components.module';
import { FormsModule } from '@angular/forms';
import { MaterialStylesModule } from 'src/app/components/layout/material-styles/material-styles.module';
import { AuthModule } from './components/auth/auth.module';
import { LayoutModule } from './components/layout/layout.module';
import { MainComponent } from './main/main.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    ComponentsModule,
    FormsModule,
    MaterialStylesModule,
    AuthModule,
    LayoutModule,
  ],
  exports: [
    FormsModule

  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
