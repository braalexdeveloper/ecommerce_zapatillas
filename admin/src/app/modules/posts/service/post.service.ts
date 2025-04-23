import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  apiUrl='https://apiblog.brayanweb.com/api/';
  constructor(
    private http:HttpClient
  ) { }

getAllPosts():Observable<any>{
return this.http.get(this.apiUrl+"posts");
}

getPost(id:any):Observable<any>{
  return this.http.get(this.apiUrl+"posts/"+id);
}

create(post:FormData):Observable<any>{
  return this.http.post(this.apiUrl+"posts",post);
}

update(post:FormData,id:any):Observable<any>{
  return this.http.post(this.apiUrl+"posts/"+id,post);
}

delete(id:any):Observable<any>{
return this.http.delete(this.apiUrl+"posts/"+id);
}
}
