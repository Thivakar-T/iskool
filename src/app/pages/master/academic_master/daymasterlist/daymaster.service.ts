import { Injectable } from '@angular/core';
import { environment } from './../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DaymasterService {
  _baseUrl = environment.API_URL + 'api/';
  private _getdaymaster = this._baseUrl + 'daymaster/get ';

  constructor(
    private http: HttpClient
  ) { }
  getdaymaster() {
    return this.http.get<any>(this._getdaymaster); 
  }
}
