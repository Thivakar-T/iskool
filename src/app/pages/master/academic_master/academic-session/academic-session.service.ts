import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcademicSessionService {


  private _baseUrl = environment.API_URL + 'api/academic/session/';
  private _create = this._baseUrl + 'create';
  private _getData = this._baseUrl + 'get';

  private _getYear = environment.API_URL + 'api/meta/get/year';

  constructor(private http: HttpClient) { }

  createAcademicSession(data: any) {
    return this.http.post<any>(this._create, data);

  }
  getAllAcademicSession() {
    return this.http.get<any>(this._getData);
  }
 
  getSingleAcademicSession(id) {
    return this.http.get<any>(this._getData + '/' + id );
  }

  getYear() {
    return this.http.get<any>(this._getYear);
  }
  
}
