import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OutstandingService {
  _baseUrl = environment.API_URL + 'api/student/fees/receipt/';

  private _updatereport = this._baseUrl + 'get/unpaid/report';

  private _getreport = this._baseUrl + 'get/term/unpaid/report';

  constructor(
    private http: HttpClient
  ) { }
  updatereport(data) {
    return this.http.put<any>(this._updatereport, data);
  }
  // getSinglereport(stdId)  {
  //   return this.http.get<any>(this._getreport + '/' + stdId);
  // }
  getSinglereport(stdId)  {
    return this.http.get<any>(this._getreport  + '/' + stdId);
  }
}
