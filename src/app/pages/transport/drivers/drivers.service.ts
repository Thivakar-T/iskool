import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriversService { 

  _baseUrl = environment.API_URL + 'api/driver/create';
  _baseUrl2 = environment.API_URL + 'api/driver/get';
  _baseUrl3 = environment.API_URL + 'api/driver/delete';
  _baseUrl4 = environment.API_URL + 'api/driver/update';


  constructor(private http: HttpClient) { }

  createdriver(data: any) {
    return this.http.post<any>(this._baseUrl, data);

  }
  getdriver() {
    return this.http.get<any>(this._baseUrl2);
  }
 
  getSingledriver(id) {
    return this.http.get<any>(this._baseUrl2 + '/' + id );
  }
  updatedriver(data) {
    return this.http.put<any>(this._baseUrl4, data);
  }

  deleteData(id :any , userName) {
    return this.http.delete(this._baseUrl3 +'/'+ id + '/' + userName );
    }

}

