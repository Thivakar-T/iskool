import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  _baseUrl = environment.API_URL + 'api/notification/notify/send';
  _baseUrl2 = environment.API_URL + 'api/notification/get';


  constructor(private http: HttpClient) { }

  createNotification(data: any) {
    return this.http.post<any>(this._baseUrl, data);

  }
  getAllNotify() {
    return this.http.get<any>(this._baseUrl2);
  }
 
}
