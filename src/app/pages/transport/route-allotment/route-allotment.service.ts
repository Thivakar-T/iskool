import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RouteAllotmentService {
  private baseUrl1 = environment.API_URL + 'api/route/allotment/create'
  private baseUrl = environment.API_URL + 'api/route/allotment/search';
  constructor(   private http: HttpClient) {  }

  getPageModule(transportRouteHdrId, vehicleId) {
    return this.http.get<any>(this.baseUrl + '/' + transportRouteHdrId + '/' + vehicleId  );
  }
  createAllot(data) {
    return this.http.post<any>(this.baseUrl1, data);
  }
}
