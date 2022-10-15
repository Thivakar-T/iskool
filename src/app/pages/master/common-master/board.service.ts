import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  _baseUrl = environment.API_URL + 'api/board/create';
  _baseUrl2 = environment.API_URL + 'api/board/get';
  _baseUrl3 = environment.API_URL + 'api/board/delete';
  _baseUrl4 = environment.API_URL + 'api/board/update';

  constructor(private http: HttpClient) { }

  createBatch(data: any) {
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

    deleteData(id :any , userName) {
      return this.http.delete(this._baseUrl3 +'/'+ id + '/' + userName );
      }
}
