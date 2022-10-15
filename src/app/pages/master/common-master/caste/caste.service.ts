import { Injectable } from '@angular/core';
import { environment } from './../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CasteService {
  private _baseUrl = environment.API_URL + 'api/caste/';
  // private _session = this._baseUrl + '/api/sessiontype/create ';
  private _createCaste = this._baseUrl + 'create';
  private _getCaste = this._baseUrl + 'get';
  private _updateCaste = this._baseUrl + 'update';
  private _deleteCaste = this._baseUrl + 'delete';

  constructor(private http: HttpClient) { }
  getCaste() {
    return this.http.get<any>(this._getCaste);
  }

  getSingleCaste(id) {
    return this.http.get<any>(this._getCaste + '/' + id );
  }

  createCaste(data) {
    return this.http.post<any>(this._createCaste, data);
  }

  updateCaste(data) {
    return this.http.put<any>(this._updateCaste, data);
  }

  deleteData(id :any,deletedBy) {
    return this.http.delete(this._deleteCaste + '/' + id+'/'+deletedBy);
    }
}
