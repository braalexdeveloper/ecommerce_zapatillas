import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

private apiUrl = 'http://127.0.0.1:5000/api/'; 
  constructor(
    private http:HttpClient
  ) { }

  getBrands():Observable<any>{
    return this.http.get(this.apiUrl+"brands");
  }

}
