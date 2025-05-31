import { Component, OnInit } from '@angular/core';
import { ShoeService } from '../../service/shoe.service';
import { BrandService } from 'src/app/modules/brands/service/brand.service';
import { CategoryService } from 'src/app/modules/categories/service/category.service';
import { SizeService } from 'src/app/modules/sizes/service/size.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-shoe',
  templateUrl: './add-shoe.component.html',
  styleUrls: ['./add-shoe.component.css']
})
export class AddShoeComponent implements OnInit{
  name: string = '';
  description: string = '';
  price: number = 0;
  brands: any[] = [];
  brand_id:number=0;
  
  categories: any[]=[];
  categoriesSelect:number[]=[];

  sizes: any;
  selectedSizes:{id:number,stock:number}[]=[];
  

  previewImages: any[]=[];

  constructor(
    private _shoeService: ShoeService,
    private _brandService:BrandService,
    private _categoriesService:CategoryService,
    private _sizesService:SizeService,
    private router:Router
  ) {

  }

  ngOnInit(): void {
      this.getBrands();
      this.getCategories();
      this.getSizes();
  }

  getBrands(){
this._brandService.getBrands().subscribe({
  next: (data) => {
        console.log(data)
        this.brands=data;
      },
      error: (error) => {
        console.log(error);
      }
})
  }

  getCategories(){
    this._categoriesService.getAllCategories().subscribe({
      next:(data)=>{
        console.log(data)
        this.categories=data;
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

  getSizes(){
this._sizesService.getAllSizes().subscribe({
  next: (data) => {
        console.log(data)
        this.sizes=data;
      },
      error: (error) => {
        console.log(error);
      }
})
  }


  onSizeChange(event:any,sizeId:number){
    if(event.target.checked){
      this.selectedSizes.push({id:sizeId,stock:0});
    }else{
      this.selectedSizes=this.selectedSizes.filter(el=>el.id!==sizeId);
    }
  }

  onStockSize(event:any,sizeId:number){
    console.log(event.target.value)
    let size=this.selectedSizes.find(el=>el.id===sizeId);
    if(size){
      size.stock=event.target.value;
    }
    console.log(this.selectedSizes)
  }

  isCheckedSize(idSize: number): boolean {
  return this.selectedSizes.some(el => el.id === idSize);
}


  onImageSelected(event: any): void {
    const files: FileList = event.target.files;
   

    for (let i = 0; i < files.length; i++) {

      const reader = new FileReader();
    

      reader.onload = () => {
        this.previewImages.push({
          file: files[i],
          url: reader.result as string,
          is_main: false
        });
      };

      reader.readAsDataURL(files[i])
    }
   
    console.log(this.previewImages)
  }

  setPrincipalImage(index: number) {
    this.previewImages.forEach((img:any, i:number) => {
      img.is_main = i === index;
    });
    console.log(this.previewImages)
  }

  createShoe() {
    let formData = new FormData();

    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('price', this.price.toString());
    formData.append('brand_id', this.brand_id.toString());

    // Enviar las categorías como array (ej. categories[] = 1, categories[] = 2)
    
    this.categoriesSelect.forEach(id => {
      formData.append('categories[]', id.toString());
    });

    // Enviar tallas con stock como JSON
   
    formData.append('sizes', JSON.stringify(this.selectedSizes));

    // Enviar imágenes individualmente
    this.previewImages.forEach((image) => {
      formData.append('arrayImages', image.file);
      formData.append('arrayImgsPrincipal',image.is_main);
    });


    this._shoeService.createShoe(formData).subscribe({
      next: (data) => {
        console.log(data)
this.router.navigate(['/shoes']);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  resetForm() {
  this.brand_id = 0;
  this.name = '';
  this.description = '';
  this.price = 0;
  this.categoriesSelect = [];
  this.selectedSizes = [];
  
  this.previewImages = [];
  
}

}
