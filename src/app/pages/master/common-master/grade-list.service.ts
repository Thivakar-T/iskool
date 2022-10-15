import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GradeListService {

  _baseUrl = environment.API_URL + 'api/grading/scheme/create';
  _baseUrl2 = environment.API_URL + 'api/grading/scheme/get';
  _baseUrl3 = environment.API_URL + 'api/grading/scheme/delete';

  constructor(private http: HttpClient) { }

  createGrading(data: any) {
    return this.http.post<any>(this._baseUrl, data);

  }
  getGrading() {
    return this.http.get<any>(this._baseUrl2);
  }
  getSingleGrading(id) {
    return this.http.get<any>(this._baseUrl2 + '/' + id );
  }
  updateGrade(data){
    return this.http.post<any>(this._baseUrl, data)

  }
  deleteGrade(id:any){
    return this.http.delete<any>(this._baseUrl3 + '/' + id);
    }
}
