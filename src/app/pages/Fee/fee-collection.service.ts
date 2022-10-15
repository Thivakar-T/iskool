import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeeCollectionService {
  _baseUrl = environment.API_URL + 'api/student/fees/receipt/';

  private _getFee = this._baseUrl + 'fetch';
  private _getReport = this._baseUrl + 'report';
  private _filterReport = this._baseUrl + 'filter/report';
  private _createFee = this._baseUrl + 'fees/pay';

  constructor(
    private http: HttpClient
  ) { }
  getSingleAllotment(regNo,stdId)  {
    return this.http.get<any>(this._getFee + '/' + regNo + '/' + stdId);
  }
  getRegNo(regNo)  {
    return this.http.get<any>(this._getFee + '/' + regNo);
  }
  getReport(data){
    return this.http.put<any>(this._getReport,data);
  }
  filterReport(data){
    return this.http.put<any>(this._filterReport,data);
  }
  createFee(data){
    return this.http.post<any>(this._createFee,data);
  }
  
}
