import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SchemeService {

 
  _baseUrl = environment.API_URL + 'api/scheme/';

  private _createScheme = this._baseUrl + 'create';
  private _getScheme = this._baseUrl + 'get';
  private _updateScheme = this._baseUrl + 'update';
  private _deleteScheme = this._baseUrl + 'delete';


  constructor(
    private http: HttpClient
  ) { }

  getScheme() {
    return this.http.get<any>(this._getScheme);
  }

  getSingleScheme(id) {
    return this.http.get<any>(this._getScheme + '/' + id );
  }

  createScheme(data) {
    return this.http.post<any>(this._createScheme, data);
  }

  updateScheme(data) {
    return this.http.put<any>(this._updateScheme, data);
  }

  deleteScheme(id:any, deletedBy){
    return this.http.delete<any>(this._deleteScheme + '/' + id + '/' + deletedBy);
    }

}
