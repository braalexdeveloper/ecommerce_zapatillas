import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {

   private apiUrl = 'http://127.0.0.1:8000/api/'; // API de prueba

  constructor(
    private http:HttpClient
  ) { }

  getPages():Observable<any>{
return this.http.get(this.apiUrl+'pages');
  }

  getPage(id:number):Observable<any>{
    return this.http.get(this.apiUrl+'pages/'+id);
  }

  create(data:any):Observable<any>{
return this.http.post(this.apiUrl+'pages',data);
  }

  update(data:any,id:any):Observable<any>{
    return this.http.post(this.apiUrl+'pages/'+id,data);
  }

  delete(id:number):Observable<any>{
    return this.http.delete(this.apiUrl+'pages/'+id);
  }
}
