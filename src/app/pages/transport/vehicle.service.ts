import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  
  _baseUrl = environment.API_URL + 'api/vehicle/';

  private _createVehicle = this._baseUrl + 'create';
  private _getVehicle = this._baseUrl + 'get';
  private _updateVehicle = this._baseUrl + 'update';
  private _deleteVehicle = this._baseUrl + 'delete';


  constructor(
    private http: HttpClient
  ) { }

  getVehicle() {
    return this.http.get<any>(this._getVehicle);
  }

  getSingleVehicle(id) {
    return this.http.get<any>(this._getVehicle + '/' + id );
  }

  createVehicle(data) {
    return this.http.post<any>(this._createVehicle, data);
  }

  updateVehicle(data) {
    return this.http.put<any>(this._updateVehicle, data);
  }

  deleteVehicle(id:any, deletedBy){
    return this.http.delete<any>(this._deleteVehicle + '/' + id + '/' + deletedBy);
    }

}
 