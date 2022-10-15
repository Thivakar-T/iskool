import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  _baseUrl = environment.API_URL + 'api/meta/get/';

  private _getCountry = this._baseUrl + 'country';
  private _getState = this._baseUrl + 'state';
  private _getCity = this._baseUrl + 'city';
  private _getAdmissionCategory = this._baseUrl + 'admission/category';
  private _getBatch = this._baseUrl + 'batch';
  private _getBoard = this._baseUrl + 'board';
  private _getBranch = this._baseUrl + 'branch';
  private _getCaste = this._baseUrl + 'caste';
  private _getCategory = this._baseUrl + 'category';
  private _getDegree = this._baseUrl + 'degree';
  private _getMotherTongue = this._baseUrl + 'mother/tongue';
  private _getReligion = this._baseUrl + 'religion';
  private _getScheme = this._baseUrl + 'scheme';
  private _getSection = this._baseUrl + 'section';
  private _getSemester = this._baseUrl + 'semester';
  private _getSession = this._baseUrl + 'session';
  private _getShift = this._baseUrl + 'shift';
  private _getStd = this._baseUrl + 'std';
  private _getSubject = this._baseUrl + 'subject';
  private _getYear = this._baseUrl + 'year';
  private _getAdmissionBatch = this._baseUrl + 'academic/batch';


  constructor(private http: HttpClient) { }


 getCountry(){
    return this.http.get<any>(this._getCountry);
  }
  getState(){
    return this.http.get<any>(this._getState);
  }
  getCity(){
    return this.http.get<any>(this._getCity);
  }
  getCategory(){
    return this.http.get<any>(this._getCategory);
  }
  getAdmissionCategory(){
    return this.http.get<any>(this._getAdmissionCategory);
  }
  getBatch(){
    return this.http.get<any>(this._getBatch);
  }
  getBoard(){
    return this.http.get<any>(this._getBoard);
  }
  getBranch(){
    return this.http.get<any>(this._getBranch);
  } 
  getCaste(){
    return this.http.get<any>(this._getCaste);
  }
  getDegree(){
    return this.http.get<any>(this._getDegree);
  }
  getMotherTongue(){
   return this.http.get<any>(this._getMotherTongue);
  }
  getReligion(){
    return this.http.get<any>(this._getReligion);
  } 
  getScheme(){
    return this.http.get<any>(this._getScheme);
  }
  getSection(){
    return this.http.get<any>(this._getSection);
  }
  getSemester(){
    return this.http.get<any>(this._getSemester);
  }
  getSession(){
    return this.http.get<any>(this._getSession);
  }
  getShift(){
    return this.http.get<any>(this._getShift);
  }
   getStd(){
    return this.http.get<any>(this._getStd);
  }
   getSubject(){
    return this.http.get<any>(this._getSubject);
  }
  getYear(){
    return this.http.get<any>(this._getYear);
  }
}
