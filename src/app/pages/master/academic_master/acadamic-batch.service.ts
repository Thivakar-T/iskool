import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcadamicBatchService {

 

  private _basUrl = environment.API_URL + 'api/acadamicbatch/';
  private _baseUrl = this._basUrl + 'create';
  private _baseUrl2 = this._basUrl + 'get';
  private _baseUrl3 = this._basUrl + 'update';
  private _baseUrl4 = this._basUrl + 'delete';

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
    return this.http.put<any>(this._baseUrl3, data);
  }

  deleteData(id :any , userName) {
    return this.http.delete(this._baseUrl4 +'/'+ id + '/' + userName );
    }
}
