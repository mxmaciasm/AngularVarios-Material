import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialExampleModule } from '../material.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';

import { TableBasicExample } from './tablebasicexample/table-basic-example';
import { TableSortingExample } from './table-sorting-example/table-sorting-example';


@NgModule({
  declarations: [AppComponent, TableBasicExample, TableSortingExample],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent, TableBasicExample, TableSortingExample],
})
export class AppModule { }
