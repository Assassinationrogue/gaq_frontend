import { User } from './../modal/public';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  postUser(user: User):Observable<User>{
    return this.http.post<User>("http://localhost:4000/api/user",{user:user})
  } 

  postLoginInfo(user: User):Observable<User>{
    return this.http.post<User>('http://localhost:4000/api/allowUser',{user:user});
  }
}
