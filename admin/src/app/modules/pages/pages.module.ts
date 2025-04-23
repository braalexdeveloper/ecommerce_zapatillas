import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';

import { ListPagesComponent } from './components/list-pages/list-pages.component';
import { AddPageComponent } from './components/add-page/add-page.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
   
    ListPagesComponent,
    AddPageComponent,
    EditPageComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HttpClientModule,
        FormsModule
  ]
})
export class PagesModule { }
