import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  
  _baseUrl = environment.API_URL + 'api/location/';

  private _createLocation = this._baseUrl + 'create';
  private _getLocation = this._baseUrl + 'get';
  private _updateLocation = this._baseUrl + 'update';
  private _deletelocation = this._baseUrl + 'delete';


  constructor(
    private http: HttpClient
  ) { }

  getLocation() {
    return this.http.get<any>(this._getLocation);
  }

  getSingleLocation(id) {
    return this.http.get<any>(this._getLocation + '/' + id );
  }
 
  createLocation(data) {
    return this.http.post<any>(this._createLocation, data);
  }

  updateLocation(data) {
    return this.http.put<any>(this._updateLocation, data);
  }

  deleteLocation(id:any, deletedBy){
    return this.http.delete<any>(this._deletelocation + '/' + id + '/' + deletedBy);
    }

}
 