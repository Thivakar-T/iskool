import { Injectable } from '@angular/core';
import { environment } from './../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SessionTypeService {
  private _baseUrl = environment.API_URL + 'api/sessiontype/';
  private _createsessiontype = this._baseUrl + 'create';
  private _getsessiontype = this._baseUrl + 'get';
  private _updatesessiontype = this._baseUrl + 'update';
  private _deletesessiontype = this._baseUrl + 'delete';

  constructor(private http: HttpClient) { }
  getSession() {
    return this.http.get<any>(this._getsessiontype);
  }

  getSingleSession(id) {
    return this.http.get<any>(this._getsessiontype + '/' + id );
  }

  createSession(data) {
    return this.http.post<any>(this._createsessiontype, data);
  }

  updateSession(data) {
    return this.http.put<any>(this._updatesessiontype, data);
  }

  deleteData(id :any,userName) {
    return this.http.delete(this._deletesessiontype + '/' + id+'/'+ userName);
    }
}
