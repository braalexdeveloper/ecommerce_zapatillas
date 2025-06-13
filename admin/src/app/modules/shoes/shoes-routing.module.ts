import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListShoesComponent } from './components/list-shoes/list-shoes.component';
import { AddShoeComponent } from './components/add-shoe/add-shoe.component';
import { EditShoeComponent } from './components/edit-shoe/edit-shoe.component';

const routes: Routes = [
  {path:'',component:ListShoesComponent},
  {path:'create',component:AddShoeComponent},
  {path:':id',component:EditShoeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoesRoutingModule { }
