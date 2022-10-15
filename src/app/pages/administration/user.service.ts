import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './/../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  _baseUrl = environment.API_URL + 'api/user/create';
  _baseUrl2 = environment.API_URL + 'api/user/get';
  _baseUrl3 = environment.API_URL + 'api/user/meta/get';


  constructor(private http: HttpClient) { }
  createUsers(data: any) {
    return this.http.post<any>(this._baseUrl, data);

  }

  get() {
    return this.http.get<any>(this._baseUrl2);
  }
  getUsers() {
    return this.http.get<any>(this._baseUrl3);
  }

  getsingle(id) {
    return this.http.get<any>(this._baseUrl2 + '/' + id);
  }


}
