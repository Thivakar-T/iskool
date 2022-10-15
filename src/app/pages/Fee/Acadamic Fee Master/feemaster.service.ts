import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeeMasterService {
  _baseUrl = environment.API_URL + 'api/academic/fee';
  private _getAmount = this._baseUrl + '/get';
  private _updateAmount = this._baseUrl + '/update';

  constructor(private http: HttpClient) { }
  
  // getPageModule(stdId, yearId) {
  //   return this.http.get<any>(this._getAmount + '/' + stdId + '/' + yearId  );
  // }
  getPageModule(academicYearId,stdId)  {
    return this.http.get<any>(this._getAmount + '/' + academicYearId + '/' + stdId);
  }
  
  updatePagModule(data) {
    return this.http.put<any>(this._updateAmount,data );
  }
}
