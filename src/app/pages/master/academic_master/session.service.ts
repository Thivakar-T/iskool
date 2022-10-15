import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SessionService {

 
  _baseUrl = environment.API_URL + 'api/session/';

  private _createSession = this._baseUrl + 'create'; 
  private _getSession = this._baseUrl + 'get';
  private _updateSession = this._baseUrl + 'update'; 
  private _deleteSession = this._baseUrl + 'delete';


  constructor(
    private http: HttpClient
  ) { }

  getSession() {
    return this.http.get<any>(this._getSession);
  }

  getSingleSession(id) {
    return this.http.get<any>(this._getSession + '/' + id );
  }

  createSession(data) {
    return this.http.post<any>(this._createSession, data);
  }

  updateSession(data) {
    return this.http.put<any>(this._updateSession, data);
  }

  deleteSession(id:any, deletedBy){
    return this.http.delete<any>(this._deleteSession + '/' + id + '/' + deletedBy);
    }

}
