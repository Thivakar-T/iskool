import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  _baseUrl = environment.API_URL + 'api/holiday/';
    
  private _createHoliday = this._baseUrl + 'create';
  private _getHoliday = this._baseUrl + 'get';
  private _updateHoliday = this._baseUrl + 'update';
  private _deleteHoliday = this._baseUrl + 'delete';

  constructor(

    private http: HttpClient
  ) { }
  getHoliday() {
    return this.http.get<any>(this._getHoliday);
  }

  getSingleHoliday(id) {
    return this.http.get<any>(this._getHoliday + '/' + id );
  }
   
  createHoliday(data) {
    return this.http.post<any>(this._createHoliday, data);

  }
  
  updateHoliday(data) {
    return this.http.put<any>(this._createHoliday, data);

  }
  deleteHoliday(id:any, deletedBy){
    return this.http.delete<any>(this._deleteHoliday + '/' + id + '/' + deletedBy);
    }

}
