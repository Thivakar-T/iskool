import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  // private _baseUrl = environment.API_URL + 'api/notification/';
  // private _getNotification = this._baseUrl + 'get';
  // private _closeNotification = this._baseUrl + 'close';

  constructor(
    private http: HttpClient
  ) { }

  // getNotification(){
  //   return this.http.get<any>(this._getNotification);
  // }

  // closeNotification(data){
  //   return this.http.put<any>(this._closeNotification, data);
  // }
}
