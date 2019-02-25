import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import * as $ from 'jquery';

import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { LoginComponent } from './view/login/login.component';
import { MovieComponent } from './view/movies/movie.component';
import { MoviedbService } from './_services/moviedb.service';

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule,
    DataTablesModule,
    HttpClientModule,
    DataTablesModule
  ],

  declarations: [ 
    AppComponent, 
    HelloComponent,
    LoginComponent,
    MovieComponent
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    MoviedbService
  ],

  bootstrap:    [ AppComponent ]
})
export class AppModule { }
