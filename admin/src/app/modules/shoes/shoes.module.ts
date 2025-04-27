import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ShoesRoutingModule } from './shoes-routing.module';
import { AddShoeComponent } from './components/add-shoe/add-shoe.component';
import { ListShoesComponent } from './components/list-shoes/list-shoes.component';




@NgModule({
  declarations: [
    ListShoesComponent,
    AddShoeComponent
  ],
  imports: [
    CommonModule,
    ShoesRoutingModule,
  
    FormsModule
  ]
})
export class ShoesModule { }
