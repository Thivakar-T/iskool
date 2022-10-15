import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StudentPromotionService {
  _baseUrl = environment.API_URL + 'api/student/promotion/';
  private _getPromotion = this._baseUrl + 'get';
  private _postPromotion = this._baseUrl + 'create';

  constructor(
    private http: HttpClient
  ) { }

  getPromotion(academicYearId, stdId)  {
    return this.http.get<any>(this._getPromotion + '/'+ academicYearId +'/' + stdId);
  }
  createPromotion(data){
    return this.http.post<any>(this._postPromotion, data);
  }

}
