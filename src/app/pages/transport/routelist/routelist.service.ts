import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoutelistService {

  _baseUrl = environment.API_URL + 'api/transport/create'; 
  _baseUrl2 = environment.API_URL + 'api/transport/get';
  _baseUrl3 = environment.API_URL + 'api/transport/get';

  constructor(private http: HttpClient) { }

  create(data: any) {
    return this.http.post<any>(this._baseUrl, data);

  }
  getRoute() {
    return this.http.get<any>(this._baseUrl2); 
  }
  
  getSingleRoute(transportRouteId : any) {
    return this.http.get<any>(this._baseUrl3  + '/' + transportRouteId) ; 
  }
}
