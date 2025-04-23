import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Post } from 'src/app/interfaces/post.interface';
import { PostService } from '../../service/post.service';
import * as $ from 'jquery';
import 'datatables.net-bs4';
import 'datatables.net-buttons-bs4';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy {
  posts: Post[] = [];
  dataTable: any; // Guarda una referencia a la instancia de DataTable

  constructor(
    private postService: PostService,
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  ngAfterViewInit(): void {
    this.initializeDataTable();
  }

  ngOnDestroy(): void {
    if (this.dataTable) {
      this.dataTable.destroy();
    }
  }

  loadPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (data) => {
        this.posts = data.posts;
        this.updateDataTable(); // Actualizar datos al cargar
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  initializeDataTable(): void {
    setTimeout(() => {
      this.dataTable = $('#example1').DataTable({
        data: this.posts,
        columns: [
          { data: null, defaultContent: '' },  // Índice
          { data: 'title' },
          { data: 'created_at', render: (data) => new Date(data).toLocaleDateString('es-ES') },
          { data: 'image', render: (data) => data ? `<img class="img-fluid img-thumbnail" width="100" src="https://apiblog.brayanweb.com/storage/${data}" alt="">` : '' },
          { data: null, defaultContent: '' }   // Acciones
        ],
        columnDefs: [
          {
            targets: 0,
            render: (data, type, row, meta) => meta.row + 1  // Renderizar índice
          },
          {
            targets: 4,
            render: (data, type, row) => {
              return `
              <button class="btn btn-info mx-2 ver-btn" data-id="${row.id}">Ver</button>
                <button class="btn btn-warning edit-btn" data-id="${row.id}">Editar</button>
                <button class="btn btn-danger mx-2 delete-btn" data-id="${row.id}">Eliminar</button>
              `;
            }
          }
        ]
      });

      this.attachEventListeners();
    }, 100);
  }

  updateDataTable(): void {
    if (this.dataTable) {
      this.dataTable.clear().rows.add(this.posts).draw(); // Actualiza los datos de la tabla
      this.attachEventListeners(); // Vuelve a adjuntar eventos después de actualizar
    }
  }

  attachEventListeners(): void {
    const editButtons = this.el.nativeElement.querySelectorAll('.edit-btn');
    editButtons.forEach((button: any) => {
      $(button).off('click').on('click', () => { // Asegura que los eventos se manejen correctamente
        const id = $(button).data('id');
        this.edit(id);
      });
    });

    const viewButtons = this.el.nativeElement.querySelectorAll('.ver-btn');
    viewButtons.forEach((button: any) => {
      $(button).off('click').on('click', () => { // Asegura que los eventos se manejen correctamente
        const id = $(button).data('id');
        window.open('http://localhost:8050/blog/post/show/' + id, '_blank'); 
      });
    });

    const deleteButtons = this.el.nativeElement.querySelectorAll('.delete-btn');
    deleteButtons.forEach((button: any) => {
      $(button).off('click').on('click', () => { // Asegura que los eventos se manejen correctamente
        const id = $(button).data('id');
        this.delete(id);
      });
    });
  }

  delete(id: any): void {
    this.postService.delete(id).subscribe({
      next: () => {
        this.posts = this.posts.filter(post => post.id !== id);
        this.updateDataTable(); // Actualiza la tabla después de eliminar
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  edit(id: any): void {
    this.router.navigate(['/posts/update', id]);
  }
}
