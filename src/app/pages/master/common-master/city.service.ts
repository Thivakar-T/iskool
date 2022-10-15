import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  _baseUrl = environment.API_URL + 'api/city/';

  private _createCity = this._baseUrl + 'create';
  private _getCity = this._baseUrl + 'get';
  private _updateCity = this._baseUrl + 'update';


  constructor(
    private http: HttpClient
  ) { }

  getCity() {
    return this.http.get<any>(this._getCity);
  }

  getSingleCity(id) {
    return this.http.get<any>(this._getCity + '/' + id);
  }

  createCity(data) {
    return this.http.post<any>(this._createCity, data);
  }

  updateCity(data) {
    return this.http.put<any>(this._updateCity, data);
  }
}
