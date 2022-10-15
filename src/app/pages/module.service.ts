import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  _baseUrl = environment.API_URL + 'api';

  private _getModule = this._baseUrl + '/modulemaster/get';
  private _getPageModule = this._baseUrl + '/modulepagemaster/get';
  private _getMasterPageModule = this._baseUrl + '/module/page/policy/get/page/action';
  private _getMasterPagePolicyModule = this._baseUrl + '/module/page/policy/get';
  private _createMasterPagePolicyModule = this._baseUrl + '/module/page/policy/create';
  private _updateMasterPagePolicyModule = this._baseUrl + '/module/page/policy/update';
  private _deleteMasterPagePolicyModule = this._baseUrl + '/module/page/policy/delete';

  
  constructor(
    private http: HttpClient
  ) { }


  getModule() {
    return this.http.get<any>(this._getModule);
  }
  getPageModule(moduleId) {
    return this.http.get<any>(this._getPageModule + '/' + moduleId);
  }
  getMasterPageModule(pageId) {
    return this.http.get<any>(this._getMasterPageModule + '/' + pageId);
  }
  getMasterPagePolicyModule(modulepagepolicymasterId) {
    return this.http.get<any>(this._getMasterPagePolicyModule + '/' + modulepagepolicymasterId);
  }
  createMasterPagePolicyModule(data) {
    return this.http.post<any>(this._createMasterPagePolicyModule , data);
  }
  updateMasterPagePolicyModule(pageId , data) {
    return this.http.put<any>(this._updateMasterPagePolicyModule + '/' + pageId , data);
  }
  deleteMasterPagePolicyModule(modulepagepolicymasterId ,deletedBy) {
    return this.http.delete<any>(this._deleteMasterPagePolicyModule + '/' + modulepagepolicymasterId + '/' + deletedBy);
  }
}
