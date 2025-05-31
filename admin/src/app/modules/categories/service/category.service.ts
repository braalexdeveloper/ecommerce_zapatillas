import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
private apiUrl = 'http://127.0.0.1:5000/api/'; 

  constructor(
    private http:HttpClient
  ) { }

  getAllCategories():Observable<any>{
return this.http.get(this.apiUrl+"categories");
  }

  getCategory(id:any):Observable<any>{
    return this.http.get(this.apiUrl+"categories/"+id);
      }

  create(category:any):Observable<any>{
return this.http.post(this.apiUrl+"categories",category);
  }

  update(category:any):Observable<any>{
    return this.http.put(this.apiUrl+"categories/"+category.id,category);
      }

      delete(id:number):Observable<any>{
        return this.http.delete(this.apiUrl+"categories/"+id);
      }



}
