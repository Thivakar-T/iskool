import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentRegistrationService {

  _baseUrl = environment.API_URL + 'api/student/registration/'

  private _createStudentRegistration = this._baseUrl + 'create';
  private _getAllRegistration = this._baseUrl + 'get';
  private _getSingleStudentInformation = this._baseUrl + 'get';
  private _updateRegistration = this._baseUrl + 'update';



  constructor(private http: HttpClient) { }


  createStudentRegistration(data) {
    return this.http.post<any>(this._createStudentRegistration, data);
  }
  getAllRegistration() {
    return this.http.get<any>(this._getAllRegistration);
  }

  getSingleStudentInformation(id){
    return this.http.get<any>(this._getSingleStudentInformation + '/' + id );
    
  }

  updateRegistration(id , taptype , data) {
    return this.http.put<any>(this._updateRegistration + '/' + id + '/' + taptype , data);
  }
}
