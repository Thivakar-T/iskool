import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolePolicyMasterService {

  _baseUrl = environment.API_URL + 'api';

  private _getRolePolicy = this._baseUrl + '/role/page/policy/get';
  private _updateRolePolicy = this._baseUrl + '/role/page/policy/update';
  private _getrolemaster = this._baseUrl + '/rolemaster/get';
  constructor(
    private http: HttpClient
  ) { }

  getRolePolicy(data) {
    return this.http.put<any>(this._getRolePolicy,data );
  }

  updateRolePolicy(data) {
    return this.http.put<any>(this._updateRolePolicy ,data);
  }
  getrolemaster() {
    return this.http.get<any>(this._getrolemaster);
  }

}
