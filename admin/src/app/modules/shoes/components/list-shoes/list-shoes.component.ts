import { Component, OnInit } from '@angular/core';
import { ShoeService } from '../../service/shoe.service';

@Component({
  selector: 'app-list-shoes',
  templateUrl: './list-shoes.component.html',
  styleUrls: ['./list-shoes.component.css']
})
export class ListShoesComponent implements OnInit {
  shoes: any[] = [];
  public apiUrl = 'http://127.0.0.1:5000';
  constructor(
    private _shoeService: ShoeService
  ) {

  }

  ngOnInit(): void {
    this.getShoes();
  }

  getShoes() {
    this._shoeService.getShoes().subscribe({
      next: (data) => {
        console.log(data)
        this.shoes = data.items;
      }
    })
  }

  deleteShoe(id:number){
    this._shoeService.deleteShoe(id).subscribe({
      next: (data) => {
        console.log(data)
        this.getShoes();
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

}
