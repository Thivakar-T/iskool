import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AdmissionCategoryService {
 private getApi="http://101.53.155.156:82/api/admissioncategory/get";
 private createApi="http://101.53.155.156:82/api/admissioncategory/create";
 private updateApi="http://101.53.155.156:82/api/admissioncategory/update";
 private deleteApi="http://101.53.155.156:82/api/admissioncategory/delete";
  constructor(private http: HttpClient) { }
  public getData() {
    return this.http.get<any>(this.getApi);
  }
   public createData(data:any) {
    return this.http.post<any>(this.createApi,data);
  }
  public updateData(data:any) {
    return this.http.put<any>(this.updateApi,data);
  }
  public editData(id:any) {
    return this.http.get<any>(this.getApi +  '/' + id );
  }
  public deleteData(id:any, deletedBy) {
    return this.http.delete<any>(this.deleteApi + '/' + id + '/' + deletedBy );
  }
}
