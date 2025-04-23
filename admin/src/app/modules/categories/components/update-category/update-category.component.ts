import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit{
  categoryId: string | null = null;
name:string='';

constructor(
  private _categoryService:CategoryService,
  private router:Router,
  private route:ActivatedRoute
){

}

ngOnInit(): void {
  this.categoryId = this.route.snapshot.paramMap.get('id');
    this._categoryService.getCategory(this.categoryId).subscribe({
      next: (data) => {
        this.name = data.category.name;
      },
      error: (error) => {
        console.error('Error al cargar la categoría:', error);
      }
    });
}


create(){
this._categoryService.update({id:this.categoryId,name:this.name}).subscribe({
  next: (data) => {
    this.router.navigate(['/categories']);
    Swal.fire({
      title: 'Éxito!',
      text: 'La Categoria se actualizo correctamente.',
      icon: 'success',
      timer: 2000, // Tiempo en milisegundos (1500 ms = 1.5 segundos)
      showConfirmButton: false // Opcional: Oculta el botón de confirmación
    });
  },
  error: (error) => {
    console.error('Error al modificar categoría:', error);
    Swal.fire({
      title: 'Error!',
      text: 'Ocurrió un problema: '+error,
      icon: 'error',
      timer: 2000, // Tiempo en milisegundos (2000 ms = 2 segundos)
      showConfirmButton: false // Opcional: Oculta el botón de confirmación
    });
  }
});
}
}
