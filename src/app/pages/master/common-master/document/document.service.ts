
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  
  _baseUrl = environment.API_URL + 'api/document/';

  private _createdocument = this._baseUrl + 'create';
  private _getdocument = this._baseUrl + 'get';
  private _updatedocument = this._baseUrl + 'update';
  private _deletedocument = this._baseUrl + 'delete';


  constructor(
    private http: HttpClient
  ) { }

  getdocument() {
    return this.http.get<any>(this._getdocument);
  }

  getSingledocument(id) {
    return this.http.get<any>(this._getdocument + '/' + id );
  }

  createdocument(data) {
    return this.http.post<any>(this._createdocument, data);
  }

  updatedocument(data) {
    return this.http.put<any>(this._updatedocument, data);
  }

  deletedocument(id:any, deletedBy){
    return this.http.delete<any>(this._deletedocument + '/' + id + '/' + deletedBy);
    }

}