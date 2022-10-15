import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  private _baseUrl = environment.API_URL + 'api/shift/';
  // private shift =  this._baseUrl + 'api/shift/create';
  private _createShift = this._baseUrl + 'create';
  private _getShift = this._baseUrl + 'get';
  private _updateShift = this._baseUrl + 'update';
  private _deleteShift = this._baseUrl + 'delete';
  constructor(private http: HttpClient,
    private router: Router) { }


    getShift() {
      return this.http.get<any>(this._getShift);
    }
  
    getSingleShift(id) {
      return this.http.get<any>(this._getShift + '/' + id );
    }
  
    createShift(data) {
      return this.http.post<any>(this._createShift, data);
    }
  
    updateShift(data) {
      return this.http.put<any>(this._updateShift, data);
    }
  
    deleteData(id :any,deletedBy) {
      return this.http.delete(this._deleteShift+ '/'  + id + '/'+ deletedBy );
      }
  }
  