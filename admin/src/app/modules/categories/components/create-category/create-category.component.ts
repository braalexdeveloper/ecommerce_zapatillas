import { Component } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent {

  name:String='';
  image:string='';

  constructor(
    private categoryService:CategoryService,
    private router:Router
  ){}

  create(){
return this.categoryService.create({name:this.name,image:this.image}).subscribe({
  next:(data)=>{
   this.router.navigate(['/categories']);
   Swal.fire({
    title: 'Éxito!',
    text: 'La Categoria se creo correctamente.',
    icon: 'success',
    timer: 1500, // Tiempo en milisegundos (1500 ms = 1.5 segundos)
    showConfirmButton: false // Opcional: Oculta el botón de confirmación
  });
  },
  error:(error)=>{
    console.log(error)
  }
});
  }
}
