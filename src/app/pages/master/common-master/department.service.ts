import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  // private createapiurl = "http://101.53.155.156:82/api/department/create";
  // private getapiurl = "http://101.53.155.156:82/api/department/get";
  // private putapiurl = "http://101.53.155.156:82/api/department/update";
  // private getidapiurl = "http://101.53.155.156:82/api/department/get/{departmentId}";
  // private deleteapiurl = "http://101.53.155.156:82/api/department/delete/{departmentId}";
  private _baseUrl = environment.API_URL + 'api/department/';
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
   public getidData(id) {
    return this.http.get<any>(this.getapiurl + '/' + id);
   }
   updateData(data) {
    return this.http.put<any>(this.putapiurl, data);
  }
  deleteData(id){
    return this.http.delete<any>(this.deleteapiurl + '/' + id );
    }

}
