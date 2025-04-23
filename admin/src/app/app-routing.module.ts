import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './modules/users/users.component';


const routes: Routes = [
{
  path: 'categories',
  loadChildren: () =>
    import('./modules/categories/categories.module').then((m) => m.CategoriesModule)
},
{
  path: 'posts',
  loadChildren: () =>
    import('./modules/posts/posts.module').then((m) => m.PostsModule)
},
{
path:'pages',
loadChildren:()=> import('./modules/pages/pages.module').then((m)=>m.PagesModule)
},
{
path:'shoes',
loadChildren:()=>import('./modules/shoes/shoes.module').then((m)=>m.ShoesModule)
},
{
  path:"users",
  component:UsersComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
