import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ExamScheduleService {

  _baseUrl = environment.API_URL + 'api/exam/schedule/';
  private _createSchedule = this._baseUrl + 'create';
  private _getSchedule = this._baseUrl + 'get';
  
  constructor(
    private http: HttpClient
  ) { }

  createSchedule(data){
    return this.http.post<any>(this._createSchedule, data);
  }
  getSchedule(stdId, academicYearId)  {
    return this.http.get<any>(this._getSchedule + '/' + stdId + '/' + academicYearId);
  }
}
