import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoeService {
  private apiUrl = 'http://127.0.0.1:5000/api/'; 
  constructor(
    private http:HttpClient
  ) { }

  getShoes():Observable<any>{
    return this.http.get(this.apiUrl+"shoes");
  }

  getShoe(id:string | null):Observable<any>{
return this.http.get(this.apiUrl+"shoes/"+id);
  }

  createShoe(shoe:any):Observable<any>{
    return this.http.post(this.apiUrl+"shoes",shoe);
  }

  updateShoe(id:number,shoe:any):Observable<any>{
    return this.http.put(this.apiUrl+"shoes/"+id,shoe);
  }

  deleteShoe(id:number):Observable<any>{
    return this.http.delete(this.apiUrl+"shoes/"+id);
  }

}
