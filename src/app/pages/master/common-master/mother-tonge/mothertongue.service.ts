
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MothertongueService {

  
  _baseUrl = environment.API_URL + 'api/mothertong/';

  private _createmothertong = this._baseUrl + 'create';
  private _getmothertong = this._baseUrl + 'get';
  private _updatemothertong = this._baseUrl + 'update';
  private _deletemothertong = this._baseUrl + 'delete';


  constructor(
    private http: HttpClient
  ) { }

  getmothertong() {
    return this.http.get<any>(this._getmothertong);
  }

  getSinglemothertong(id) {
    return this.http.get<any>(this._getmothertong + '/' + id );
  }

  createmothertong(data) {
    return this.http.post<any>(this._createmothertong, data);
  }

  updatemothertong(data , modifiedBy) {
    return this.http.put<any>(this._updatemothertong + '/' + modifiedBy , data);
  }

  deletemothertong(id:any, deletedBy){
    return this.http.delete<any>(this._deletemothertong + '/' + id + '/' + deletedBy);
    }

}