import { Component } from '@angular/core';
import { ShoeService } from '../../service/shoe.service';

@Component({
  selector: 'app-add-shoe',
  templateUrl: './add-shoe.component.html',
  styleUrls: ['./add-shoe.component.css']
})
export class AddShoeComponent {
  name: string = '';
  description: string = '';
  price: number = 0;
  brand_id: number = 2;
  categories: any;
  sizes: any;
  images: File[] = [];

  previewImages: any[]=[];

  constructor(
    private _shoeService: ShoeService
  ) {

  }

  onImageSelected(event: any): void {
    const files: FileList = event.target.files;
    this.images = [];

    for (let i = 0; i < files.length; i++) {

      const reader = new FileReader();
      this.images.push(files[i]);

      reader.onload = () => {
        this.previewImages.push({
          file: files[i],
          url: reader.result as string,
          is_main: false
        });
      };

      reader.readAsDataURL(files[i])
    }
    console.log(this.images)
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
    const categoriesArray = [1, 2];
    categoriesArray.forEach(id => {
      formData.append('categories[]', id.toString());
    });

    // Enviar tallas con stock como JSON
    const sizesArray = [
      { id: 1, stock: 10 },
      { id: 2, stock: 5 }
    ];
    formData.append('sizes', JSON.stringify(sizesArray));

    // Enviar imágenes individualmente
    this.images.forEach((image) => {
      formData.append('arrayImages', image);
    });


    this._shoeService.createShoe(formData).subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
