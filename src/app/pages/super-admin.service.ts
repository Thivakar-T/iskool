import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {

  _baseUrl = environment.API_URL + 'api/superadmin/';

  private _superAdminSwitchLogin = this._baseUrl + 'switch/login';

  constructor(
    private http: HttpClient
  ) { }

  superAdminSwitchLogin(data) {
    return this.http.post<any>(this._superAdminSwitchLogin, data);
  }
}

