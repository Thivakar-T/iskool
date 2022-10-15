import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  _baseUrl = environment.API_URL + 'api/state/';

  private _createState = this._baseUrl + 'create';
  private _getState = this._baseUrl + 'get';
  private _updateState = this._baseUrl + 'update';


  constructor(
    private http: HttpClient
  ) { }

  getState() {
    return this.http.get<any>(this._getState);
  }

  getSingleState(id) {
    return this.http.get<any>(this._getState + '/' + id);
  }

  createState(data) {
    return this.http.post<any>(this._createState, data);
  }

  updateState(data) {
    return this.http.put<any>(this._updateState, data);
  }

}
