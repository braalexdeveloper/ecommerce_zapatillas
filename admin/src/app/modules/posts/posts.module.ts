import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { ListComponent } from './components/list/list.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { PostService } from './service/post.service';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../categories/service/category.service';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers:[PostService,CategoryService]
})
export class PostsModule { }
