import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomlabService {

  _baseUrl = environment.API_URL + 'api/room/create';
  _baseUrl2 = environment.API_URL + 'api/room/get';
  _baseUrl3 = environment.API_URL + 'api/room/delete';
  _baseUrl4 = environment.API_URL + 'api/room/update';


  constructor(private http: HttpClient) { }

  createBatch(data) {
    return this.http.post<any>(this._baseUrl, data);

  }
  getAllUsers() {
    return this.http.get<any>(this._baseUrl2);
  }
 
  getSingleBatch(id) {
    return this.http.get<any>(this._baseUrl2 + '/' + id );
  }
  updateBatch(data) {
    return this.http.put<any>(this._baseUrl4, data);
  }

  deleteRoom(id :any , userName) {
    return this.http.delete(this._baseUrl3 +'/'+ id + '/' + userName );
    }

}
