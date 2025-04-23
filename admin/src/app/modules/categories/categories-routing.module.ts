import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { UpdateCategoryComponent } from './components/update-category/update-category.component';


const routes: Routes = [
  {
  path:'',component:ListCategoriesComponent
},
{path:'create',component:CreateCategoryComponent},
{path:'update/:id',component:UpdateCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
