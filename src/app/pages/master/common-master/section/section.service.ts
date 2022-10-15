


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SectionService {

  
  _baseUrl = environment.API_URL + 'api/section/';

  private _createsection = this._baseUrl + 'create';
  private _getsection = this._baseUrl + 'get';
  private _updatesection = this._baseUrl + 'update';
  private _deletesection = this._baseUrl + 'delete';


  constructor(
    private http: HttpClient
  ) { }

  getsection() {
    return this.http.get<any>(this._getsection);
  }

  getSinglesection(id) {
    return this.http.get<any>(this._getsection + '/' + id );
  }

  createsection(data) {
    return this.http.post<any>(this._createsection, data);
  }

  updatesection(data) {
    return this.http.put<any>(this._updatesection, data);
  }

  deletesection(id:any, deletedBy){
    return this.http.delete<any>(this._deletesection + '/' + id + '/' + deletedBy);
    }

}
