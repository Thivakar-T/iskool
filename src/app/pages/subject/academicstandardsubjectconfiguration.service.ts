import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
@Injectable({ 
  providedIn: 'root'
})
export class AcademicstandardsubjectconfigurationService {

  
  _baseUrl = environment.API_URL + 'api/subject/offer';

  private _createAcademicsStandardSubject = this._baseUrl + '/create';
  private _getAcademicsStandardSubject = this._baseUrl + '/get';
  private _copyAcademicSub = this._baseUrl + '/copy';
  private _updateAcademicSub = this._baseUrl + '/get/copy';

  private _getdaymaster =  environment.API_URL + 'api/daymaster/get ';
  private _getSection =  environment.API_URL + 'api/section/get';
   private _getFaculty =  environment.API_URL + 'api/user/get/faculty';
   private _getTime =  environment.API_URL + 'api/time/get';
   private _getSubject =  environment.API_URL + 'api/subject/get';
   private _getRoom =  environment.API_URL + 'api/room/get';
   private _getAcademicYear =  environment.API_URL + 'api/academic/year/get';
   private _search =  environment.API_URL + 'api/subject/offer/search';




  constructor(
    private http: HttpClient
  ) { }

  getAcademicStandardSubject() {
    return this.http.get<any>(this._getAcademicsStandardSubject);
  }

  createAcademicStandardSubject(data) {
    return this.http.post<any>(this._createAcademicsStandardSubject, data);
  }
  updateAcademicSub(data) {
    return this.http.put<any>(this._updateAcademicSub, data);
  }

  getdaymaster() {
    return this.http.get<any>(this._getdaymaster); 
  }

  getSections() {
    return this.http.get<any>(this._getSection); 
  }
  
  getFacultys() {
    return this.http.get<any>(this._getFaculty); 
  }

  getTimes() {
    return this.http.get<any>(this._getTime); 
  }

  getSubject() {
    return this.http.get<any>(this._getSubject); 
  }

  getClassRoom() {
    return this.http.get<any>(this._getRoom); 
  }

  getAcademicYear() {
    return this.http.get<any>(this._getAcademicYear); 
  }

 searchSubOffer(yearId, stdId){
    return this.http.get<any>(this._search + '/' + yearId + '/' + stdId);
    }


}
 