import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit{
categories:any=[];

constructor(
  private _categoryService:CategoryService
){

}



ngOnInit(): void {
    this.allCategories();
}


showErrorAlert() {
  Swal.fire({
    title: 'Error!',
    text: 'Ocurrió un problema.',
    icon: 'error',
    confirmButtonText: 'Ok'
  });
}

allCategories(){
  return this._categoryService.getAllCategories().subscribe({
    next:(data)=>{
    console.log(data)
    this.categories=data.categories;
    },
    error:(error)=>{
console.log(error)
    }
  });
}

delete(id:any){

  Swal.fire({
    title: '¿Estás seguro?',
    text: "Esta acción no se puede deshacer.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, borrar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this._categoryService.delete(id).subscribe({
        next:(data)=>{
        console.log(data)
        this.categories=this.categories.filter((el:any)=>el.id!==id);
        
      Swal.fire('¡Eliminado!', 'La Categoria ha sido eliminado.', 'success');
        },
        error:(error)=>{
      console.log(error)
        }
      });
      
    }
  });
  

}

}
