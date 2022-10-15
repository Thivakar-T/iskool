import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SearchStudentService {  
 
  _baseUrl = environment.API_URL + 'api/student/registration/';
   private _searchstudent = this._baseUrl + 'search';
   private _getstudentInformation = this._baseUrl + 'get';
   private _getCancell = this._baseUrl + 'cancel/get';
   private _updateCancel = this._baseUrl + 'update';
   private _getCancel = this._baseUrl + 'get';


  constructor(
    private http: HttpClient
  ) { }

  getCancel(data) {
    return this.http.put<any>(this._getCancel,data );
  }
  
  updatestudent(data) {
    return this.http.put<any>(this._searchstudent, data);
  }

  getStudentInformation(id) {
    return this.http.get<any>(this._getstudentInformation + '/' + id);
  }
  getCancell() {
    return this.http.get<any>(this._getCancell);
  }
  updateCancel(data) {
    return this.http.put<any>(this._updateCancel, data);
  }
}
