import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusroutemapService {

  constructor(private http: HttpClient) { }

  _baseUrl = environment.API_URL + 'api/bus/route/mapping/';

  private getapiurl = this._baseUrl + 'get';
  private deleteapiurl = this._baseUrl + 'delete';
  // private getidapiurl = this._baseUrl + 'get';
  private putapiurl = this._baseUrl + 'update';
  private createapiurl = this._baseUrl + 'update';


  public getData() {
    return this.http.get<any>(this.getapiurl);
   }
   
  getidData(id) {
    return this.http.get<any>(this.getapiurl +'/' + id);
   }
   updatesubject(data) {
    return this.http.put<any>(this.putapiurl, data);
  }
  deletesubject( busRouteMappingId){
    return this.http.delete<any>(this.deleteapiurl +'/'+  busRouteMappingId);
    }
  
}
