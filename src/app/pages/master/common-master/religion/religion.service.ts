

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReligionService {

  
  _baseUrl = environment.API_URL + 'api/religion/';

  private _createreligion = this._baseUrl + 'create';
  private _getreligion = this._baseUrl + 'get';
  private _updatereligion = this._baseUrl + 'update';
  private _deletereligion = this._baseUrl + 'delete';


  constructor(
    private http: HttpClient
  ) { }

  getreligion() {
    return this.http.get<any>(this._getreligion);
  }

  getSinglereligion(id) {
    return this.http.get<any>(this._getreligion + '/' + id );
  }

  createreligion(data) {
    return this.http.post<any>(this._createreligion, data);
  }

  updatereligion(data , modifiedBy) {
    return this.http.put<any>(this._updatereligion + '/' + modifiedBy , data);
  }

  deletereligion(id:any, deletedBy){
    return this.http.delete<any>(this._deletereligion + '/' + id + '/' + deletedBy);
    }

}
