import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  _baseUrl = environment.API_URL + 'api/country/';

  private _createCountry = this._baseUrl + 'create';
  private _getCountry = this._baseUrl + 'get';
  private _updateCountry = this._baseUrl + 'update';


  constructor(
    private http: HttpClient
  ) { }

  getCountry() {
    return this.http.get<any>(this._getCountry);
  }

  getSingleCountry(id) {
    return this.http.get<any>(this._getCountry + '/' + id);
  }

  createCountry(data) {
    return this.http.post<any>(this._createCountry, data);
  }

  updateCountry(data) {
    return this.http.put<any>(this._updateCountry, data);
  }

}
