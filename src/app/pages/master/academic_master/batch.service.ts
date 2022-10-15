import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BatchService {


  _baseUrl = environment.API_URL + 'api/batch/';

  private _createBatch = this._baseUrl + 'create';
  private _getBatch = this._baseUrl + 'get';
  private _updateBatch = this._baseUrl + 'update';
  private _deleteBatch = this._baseUrl + 'delete';


  constructor(
    private http: HttpClient
  ) { }

  getBatch() {
    return this.http.get<any>(this._getBatch);
  }

  getSingleBatch(id) {
    return this.http.get<any>(this._getBatch + '/' + id);
  }

  createBatch(data) {
    return this.http.post<any>(this._createBatch, data);
  }

  updateBatch(data) {
    return this.http.put<any>(this._updateBatch, data);
  }

  deleteBatch(id: any, deletedBy) {
    return this.http.delete<any>(this._deleteBatch + '/' + id + '/' + deletedBy);
  }

}
