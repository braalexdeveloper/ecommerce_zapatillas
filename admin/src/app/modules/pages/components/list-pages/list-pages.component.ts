import { Component } from '@angular/core';
import { PageService } from '../../service/page.service';

@Component({
  selector: 'app-list-pages',
  templateUrl: './list-pages.component.html',
  styleUrls: ['./list-pages.component.css']
})
export class ListPagesComponent {
  pages: any = [];

  constructor(
    private _pageService: PageService
  ) { }

  ngOnInit(): void {
this.getPages();
  }

  getPages() {
    this._pageService.getPages().subscribe({
      next: (data) => {
        console.log(data)
        this.pages=data;
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  deletePage(id:number){
    this._pageService.delete(id).subscribe({
      next: (data) => {
        console.log(data)
        this.getPages();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
