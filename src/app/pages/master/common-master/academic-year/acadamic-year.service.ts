import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcadamicYearService {

  constructor(private http: HttpClient) { }

 
  private _baseUrl = environment.API_URL + 'api/academic/year/';
  private createapiurl = this._baseUrl + 'create';
  private getapiurl = this._baseUrl + 'get';
  private putapiurl = this._baseUrl + 'update';
  private deleteapiurl = this._baseUrl + 'delete';


 
  public getData() {
    return this.http.get<any>(this.getapiurl);
   } 
   public createData(data : any) {
    return this.http.post<any>(this.createapiurl, data);
   }
   public getidData(yearId) {
    return this.http.get<any>(this.getapiurl + '/' + yearId);
   }
   updateData(data) {
    return this.http.put<any>(this.putapiurl, data);
  }
  deleteData(id){
    return this.http.delete<any>(this.deleteapiurl + '/' + id );
    }

}
