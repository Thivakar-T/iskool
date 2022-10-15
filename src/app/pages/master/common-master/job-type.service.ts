import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobTypeService {
  private createapiurl = "http://101.53.155.156:82/api/jobtype/create";
  private getapiurl = "http://101.53.155.156:82/api/jobtype/get";
  private putapiurl = "http://101.53.155.156:82/api/jobtype/update";
  private getidapiurl = "http://101.53.155.156:82/api/jobtype/get";
  private deleteapiurl = "http://101.53.155.156:82/api/jobtype/delete";

  constructor(private http: HttpClient) { }

  public getData() {
    return this.http.get<any>(this.getapiurl);
   }
   public createData(data : any) {
    return this.http.post<any>(this.createapiurl, data);
   }
   public getidData(id) {
    return this.http.get<any>(this.getidapiurl + '/' + id);
   }
   updateData(data) {
    return this.http.put<any>(this.putapiurl, data);
  }
  deleteData(id:any, deletedBy){
    return this.http.delete<any>(this.deleteapiurl + '/' + id + '/' + deletedBy);
    }
}
