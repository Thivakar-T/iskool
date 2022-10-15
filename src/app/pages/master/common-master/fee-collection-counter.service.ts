import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FeeCollectionCounterService {
  private _baseUrl = environment.API_URL + 'api/fee/collection/counter/';
  private _createFee = this._baseUrl + 'create';
  private _getFee = this._baseUrl + 'get';
  private _updateFee = this._baseUrl + 'update';
  private _deleteFee = this._baseUrl + 'delete';

  constructor(private http: HttpClient) { }
  getFee() {
    return this.http.get<any>(this._getFee);
  }

  getSingleFee(id) {
    return this.http.get<any>(this._getFee + '/' + id );
  }

  createFee(data) {
    return this.http.post<any>(this._createFee, data);
  }

  updateFee(data) {
    return this.http.put<any>(this._updateFee, data);
  }

  deleteData(id :any) {
    return this.http.delete(this._deleteFee + '/' + id);
    }
}
