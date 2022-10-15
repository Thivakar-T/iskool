import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageExamService {

  _baseUrl = environment.API_URL + 'api/exam/time/table/';

  private _createtimetable = this._baseUrl + 'create';
  private _gettimetable = this._baseUrl + 'get';
  private _getdownload = this._baseUrl + 'get/download';
  private _getTime =  environment.API_URL + 'api/time/get';

  constructor(private http: HttpClient) { }

  gettimetable(academicYearId,stdId,examId) {
    return this.http.get<any>(this._gettimetable+ '/' + academicYearId + '/' + stdId+ '/' + examId );
  }

  getdownload(academicYearId,stdId,examId) {
    return this.http.get<any>(this._getdownload+ '/' + academicYearId + '/' + stdId+ '/' + examId );
  }

  createtimetable(data) {
    return this.http.post<any>(this._createtimetable, data);
  }

  getTimes() {
    return this.http.get<any>(this._getTime); 
  }
}
