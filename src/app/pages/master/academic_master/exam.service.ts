import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  _baseUrl = environment.API_URL + 'api/exam/';

  private createapiurl = this._baseUrl + 'create';
  private getapiurl = this._baseUrl + 'get';
  private getidapiurl = this._baseUrl + 'get';
  private putapiurl = this._baseUrl + 'update';
  private deleteapiurl = this._baseUrl + 'delete';

  constructor(private http: HttpClient) { }

  public getData() {
    return this.http.get<any>(this.getapiurl);
  }
  public createData(data: any) {
    return this.http.post<any>(this.createapiurl, data);
  }
  public getidData(id) {
    return this.http.get<any>(this.getidapiurl + '/' + id);
  }
  updateexam(data) {
    return this.http.put<any>(this.putapiurl, data);
  }
  deleteexam(id: any , userName) {
    return this.http.delete<any>(this.deleteapiurl + '/' + id + '/' + userName );
  }
}
