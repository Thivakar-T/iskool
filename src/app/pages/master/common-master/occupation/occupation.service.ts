import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class OccupationService {
  private _baseUrl = environment.API_URL + 'api/occupation/';
  // private Occupation =  this._baseUrl + 'api/Occupation/create';
  private _createOccupation = this._baseUrl + 'create';
  private _getOccupation = this._baseUrl + 'get';
  private _updateOccupation = this._baseUrl + 'update';
  private _deleteOccupation = this._baseUrl + 'delete';
  constructor(private http: HttpClient,
    private router: Router) { }


    getOccupation() {
      return this.http.get<any>(this._getOccupation);
    }
  
    getSingleOccupation(id) {
      return this.http.get<any>(this._getOccupation + '/' + id );
    }
  
    createOccupation(data) {
      return this.http.post<any>(this._createOccupation, data);
    }
  
    updateOccupation(data) {
      return this.http.put<any>(this._updateOccupation, data);
    }
  
    deleteData(id :any,deletedBy) {
      return this.http.delete(this._deleteOccupation+ '/'  + id + '/'+ deletedBy );
      }
  }
  