import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPagesComponent } from './components/list-pages/list-pages.component';
import { AddPageComponent } from './components/add-page/add-page.component';

import { EditPageComponent } from './components/edit-page/edit-page.component';

const routes: Routes = [
  {
    path:'',
    component:ListPagesComponent
  },
  {
    path:'create',
    component:AddPageComponent
  },
  {
    path:'edit/:id',
    component:EditPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
