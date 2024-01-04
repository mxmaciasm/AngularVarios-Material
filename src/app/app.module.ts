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

import {SelectexampleComponent} from './selectexample/selectexample.component';
import {SelectGroupOptionsComponent} from './select-group-options/select-group-options.component';

@NgModule({
  declarations: [AppComponent, TableBasicExample, TableSortingExample, SelectexampleComponent,SelectGroupOptionsComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent, TableBasicExample, TableSortingExample, SelectexampleComponent,SelectGroupOptionsComponent],
})
export class AppModule { }
