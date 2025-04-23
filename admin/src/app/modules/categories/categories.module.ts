import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';

import { ListCategoriesComponent } from './components/list-categories/list-categories.component';

import { UpdateCategoryComponent } from './components/update-category/update-category.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from './service/category.service';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListCategoriesComponent,
    UpdateCategoryComponent,
    CreateCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [CategoryService],
})
export class CategoriesModule { }
