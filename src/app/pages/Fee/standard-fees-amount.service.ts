import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StandardFeesAmountService {

  _baseUrl = environment.API_URL + 'api/standardfee/';

  private _createFeeAmount = this._baseUrl + 'create';
  private _getFeeAmount = this._baseUrl + 'get';
 


  constructor(
    private http: HttpClient
  ) { }

  getStandardFeeAmount(id) {
    return this.http.get<any>(this._getFeeAmount + '/' + id );
  }

  createFeeAmount(data) {
    return this.http.post<any>(this._createFeeAmount, data);
  }

  

}
