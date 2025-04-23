import { Component, AfterViewInit, OnInit } from '@angular/core';
import { PostService } from '../../service/post.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/modules/categories/service/category.service';
declare var $: any;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements AfterViewInit, OnInit {

  title: string = '';
  content: string = '';
  categories: any = [];
  categoryIdValue:number | null=null;
  categoriesIds: any [] = [];
  selectedFile: File | null = null;

  constructor(
    private _postService: PostService,
    private _categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._categoryService.getAllCategories().subscribe((res) => {
      this.categories = res.categories;
     
    });
  }

  ngAfterViewInit(): void {
    $('#summernote').summernote({
      height: 300, // Altura del editor
      minHeight: null, // Altura mínima
      maxHeight: null, // Altura máxima
      focus: true,
      callbacks: {
        onChange: (contents: string) => {
          this.content = contents;
        }
      } // Poner foco al iniciar
    });
  }

  

  handleImage(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  handleSelect(): void {
    this.categoriesIds.push(this.categoryIdValue);
    this.categoriesIds=[...new Set(this.categoriesIds)];
    console.log(this.categoriesIds);
  }

  nameCategory(idCategory:any): string | undefined {
    let category = this.categories.find((el: any) => parseInt(el.id) === parseInt(idCategory));
    return category ? category.name : undefined;
  }

  deleteCategorySelect(idCategory:number){
    this.categoriesIds=this.categoriesIds.filter((el)=>el!==idCategory);
    console.log(this.categoriesIds);
  }

  create(): void {
    
    if (this.title && this.content && this.categoriesIds.length>0) {
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('content', this.content);
      this.categoriesIds.forEach(id => formData.append('category_ids[]', id.toString()));
      
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this._postService.create(formData).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['/pages']);
        },
        error: (error) => {
          console.log(error);
          this.router.navigate(['/pages']);
        }
      });
    }else{
      alert("Debe llenar los campos requeridos (*)")
    }
  }


}
