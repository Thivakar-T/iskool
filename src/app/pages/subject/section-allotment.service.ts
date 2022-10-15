import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SectionAllotmentService {
  _baseUrl = environment.API_URL + 'api/section/allotment/';
  private _getAllotment = this._baseUrl + 'get';
  private _updateAllotment = this._baseUrl + 'update';
  private _createAllotment = this._baseUrl + 'create/section';

  constructor(
    private http: HttpClient
  ) { }
  getSingleAllotment(yearId,stdId)  {
    return this.http.get<any>(this._getAllotment + '/' + yearId + '/' + stdId);
  }
  updateAllotment(data) {
    return this.http.put<any>(this._updateAllotment, data);

  }
  createAllotment(data) {
    return this.http.post<any>(this._createAllotment, data);

  }
}
