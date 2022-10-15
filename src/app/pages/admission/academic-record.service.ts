import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcademicRecordService {

  _baseUrl = environment.API_URL + 'api/student/academic/record/search';
  _baseUrl2 = environment.API_URL + 'api/student/academic/record/get';

  constructor( private http: HttpClient) { }

  updatestudent(data) {
    return this.http.put<any>(this._baseUrl, data);
  }

  getStudentInformation(id) {
    return this.http.get<any>(this._baseUrl2 + '/' + id);
  }


}
