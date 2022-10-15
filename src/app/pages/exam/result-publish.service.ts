import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ResultPublishService {

  _baseUrl = environment.API_URL + 'api/result/publish/';
  private _getResult = this._baseUrl + 'search';
  private _updateResult = this._baseUrl + 'update';
  constructor(private http: HttpClient) { }

  getResult(examId, academicYearId, stdId)  {
    return this.http.get<any>(this._getResult + '/'+ examId +'/' + academicYearId + '/' + stdId);
  }

  publishTheResult(examId, academicYearId, stdId , data)  {
    return this.http.put<any>(this._getResult + '/'+ examId +'/' + academicYearId + '/' + stdId, data);
  }

  updateResult(data)  {
    return this.http.put<any>(this._updateResult, data);
  }

}
