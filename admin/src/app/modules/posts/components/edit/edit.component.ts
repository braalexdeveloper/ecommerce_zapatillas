import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../service/post.service';
import { CategoryService } from 'src/app/modules/categories/service/category.service';
declare var $: any;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements AfterViewInit, OnInit {
  id:any='';
  title: string = '';
  content: string = '';
  categories: any = [];
  categoryIdValue:number | null=null;
  categoriesIds: any [] = [];
  selectedFile: File | null = null;
  imageUrl: string = '';
  contentLoaded: boolean = false;

  constructor(
    private _postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private _categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this._postService.getPost(this.id).subscribe({
      next: (data) => {
        console.log(data)
        this.title = data.post.title;
        this.content = data.post.content;
        this.imageUrl = data.post.image;
        this.categoriesIds=data.post.categories.map((el:any)=>el.id);
        this.contentLoaded = true;
        this.initializeSummernote();
      },
      error: (error) => {
        console.log(error);
      }
    });

    this._categoryService.getAllCategories().subscribe((res) => {
      this.categories = res.categories;
     
    });
  }

  ngAfterViewInit(): void {
    if (this.contentLoaded) {
      this.initializeSummernote();
    }
  }

  initializeSummernote(): void {
    $('#summernote').summernote({
      height: 300, // Altura del editor
      minHeight: null, // Altura mínima
      maxHeight: null, // Altura máxima
      focus: true,
      callbacks: {
        onChange: (contents: string) => {
          this.content = contents;
        }
      }
    });
    $('#summernote').summernote('code', this.content); // Establecer el contenido inicial
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

  handleImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  update() {
    if (this.title && this.content) {
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('content', this.content);
      this.categoriesIds.forEach(id => formData.append('category_ids[]', id.toString()));
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

     this._postService.update(formData,this.id).subscribe({
        next: (data) => {
          console.log(data)
          this.router.navigate(['/posts']);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }


}
