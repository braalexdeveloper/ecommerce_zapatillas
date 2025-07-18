import { Component, OnInit } from '@angular/core';
import { ShoeService } from '../../service/shoe.service';
import { BrandService } from 'src/app/modules/brands/service/brand.service';
import { CategoryService } from 'src/app/modules/categories/service/category.service';
import { SizeService } from 'src/app/modules/sizes/service/size.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-shoe',
  templateUrl: './edit-shoe.component.html',
  styleUrls: ['./edit-shoe.component.css']
})
export class EditShoeComponent implements OnInit {
  id: string | null = '';
  name: string = '';
  description: string = '';
  price: number = 0;
  brands: any[] = [];
  brand_id: number = 0;

  categories: any[] = [];
  categoriesSelect: number[] = [];

  sizes: any;
  selectedSizes: { id: number, stock: number }[] = [];

  imagesFound: any[] = [];
  previewImages: any[] = [];

  constructor(
    private _shoeService: ShoeService,
    private _brandService: BrandService,
    private _categoriesService: CategoryService,
    private _sizesService: SizeService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.getBrands();
    this.getCategories();
    this.getSizes();

    this.id = this.route.snapshot.paramMap.get('id');
    this._shoeService.getShoe(this.id).subscribe({
      next: (data) => {
        this.name = data.name;
        this.price = data.price;
        this.description = data.description;
        this.brand_id = data.brand.id;
        this.categoriesSelect = Array.isArray(data.categoryShoes) ? data.categoryShoes.map((el: any) => el.category.id) : [];
        data.shoeSizes.forEach((el: any) => this.selectedSizes.push({ id: el.size.id, stock: el.stock }));
        this.imagesFound = data.images;

        console.log(data);

      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getBrands() {
    this._brandService.getBrands().subscribe({
      next: (data) => {
        console.log(data)
        this.brands = data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getCategories() {
    this._categoriesService.getAllCategories().subscribe({
      next: (data) => {
        console.log(data)
        this.categories = data;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  getSizes() {
    this._sizesService.getAllSizes().subscribe({
      next: (data) => {
        console.log(data)
        this.sizes = data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }


  onSizeChange(event: any, sizeId: number) {
    if (event.target.checked) {
      this.selectedSizes.push({ id: sizeId, stock: 0 });
    } else {
      this.selectedSizes = this.selectedSizes.filter(el => el.id !== sizeId);
    }
  }

  onStockSize(event: any, sizeId: number) {
    console.log(event.target.value)
    let size = this.selectedSizes.find(el => el.id === sizeId);
    if (size) {
      size.stock = event.target.value;
    }
    console.log(this.selectedSizes)
  }

  getValueStock(sizeId: number) {
    let size = this.selectedSizes.find(el => el.id === sizeId);
    return size?.stock;
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
    this.previewImages.forEach((img: any, i: number) => {
      img.is_main = i === index;
    });

    this.imagesFound.forEach(el=>el.is_main=false);
    console.log(this.previewImages)
  }

  principalImageFound(id: number) {
    this.imagesFound.forEach(el => {
      if (el.id === id) {
        el.is_main = true;
      } else {
        el.is_main = false;
      }

    });

    this.previewImages.forEach((img: any) => {
      img.is_main =false;
    });
    
  }

  updateShoe() {
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
      formData.append('arrayImgsPrincipal', image.is_main);

    });

    if (this.imagesFound.length > 0) {
      
        formData.append('idImages', JSON.stringify(this.imagesFound));
     

    }


    this._shoeService.updateShoe(this.id, formData).subscribe({
      next: (data) => {
        console.log(data)
        this.router.navigate(['/shoes']);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  deleteImage(idImage: number) {
    this.imagesFound = this.imagesFound.filter(el => el.id !== idImage);
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
