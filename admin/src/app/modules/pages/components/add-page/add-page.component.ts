import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PageService } from '../../service/page.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements AfterViewInit{
  @ViewChild('summernote') summernoteRef!: ElementRef;
  title: string = '';
  content: string = '';
  selectedImage: any = null;

  constructor(
    private _pageService: PageService,
    private router:Router
  ) {}

 
    ngAfterViewInit(): void {
      this.initSummernote();
    }
  
    private initSummernote() {
      $(this.summernoteRef.nativeElement).summernote({
        height: 400,
        minHeight: null,
        maxHeight: null,
        focus: true,
        dialogsInBody: true, // Importante para diálogos modales
        toolbar: [
          ['style', ['style']],
          ['font', ['bold', 'italic', 'underline', 'clear']],
          ['fontname', ['fontname']],
          ['fontsize', ['fontsize']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['height', ['height']],
          ['table', ['table']],
          ['insert', ['link', 'picture', 'video', 'hr']],
          ['view', ['fullscreen', 'codeview', 'help']]
        ],
        fontNames: [
          'Arial', 'Arial Black', 'Comic Sans MS', 
          'Courier New', 'Helvetica', 'Impact', 
          'Tahoma', 'Times New Roman', 'Verdana'
        ],
        fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '36'],
        popover: {
          image: [
            ['imagesize', ['imageSize100', 'imageSize50', 'imageSize25']],
            ['float', ['floatLeft', 'floatRight', 'floatNone']],
            ['remove', ['removeMedia']],
            ['custom', ['imageAttributes', 'imageShape']]
          ]
        },
        callbacks: {
          onChange: (content: string) => {
            this.content = content;
          },
          onImageUpload: (files: File[]) => {
            this.uploadImage(files[0]);
          }
        }
      });
    }
  
    private uploadImage(file: File) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        
        image.onload = () => {
          $(this.summernoteRef.nativeElement).summernote('insertImage', e.target.result, ($image: any) => {
            $image.css('max-width', '100%');
            $image.attr('data-filename', file.name);
          });
        };
      };
      reader.readAsDataURL(file);
    }

  createPage() {
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('content', this.content);
    
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this._pageService.create(formData).subscribe({
      next: (data) => {
        console.log('Página creada', data);
        this.router.navigate(['/pages']).then(nav => {
          console.log('Navegación exitosa', nav);
        });
      },
      error: (error) => {
        console.error('Error al crear página', error);
        this.router.navigate(['/pages']); // Navegación incluso en error
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  ngOnDestroy() {
    $(this.summernoteRef.nativeElement).summernote('destroy');
  }
}
