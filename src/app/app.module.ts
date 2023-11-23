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
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './components/auth/auth.interceptor';
import { IConfig, NgxMaskModule } from 'ngx-mask';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

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
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(options)
  ],
  exports: [
    FormsModule,
    ToastrModule

  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    { provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
