import { HttpClient } from '@angular/common/http';
import { environment } from './/../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeesService {

  _baseUrl = environment.API_URL + 'api/fee/create';
  _baseUrl2 = environment.API_URL + 'api/fee/get';
  _baseUrl3 = environment.API_URL + 'api/fee/update';
  _baseUrl4 = environment.API_URL + 'api/fee/delete';

  constructor(private http: HttpClient) { }

  createFee(data: any) {
    return this.http.post<any>(this._baseUrl, data);

  }
  getFees() {
    return this.http.get<any>(this._baseUrl2);
  }
  
  getSingleFees(feeMasterId){
    return this.http.get<any>(this._baseUrl2 + '/' + feeMasterId );
    
  }
  updateFees(data){
    return this.http.put<any>(this._baseUrl3, data) 

  }
  deleteFees(id:any, deletedBy){
    return this.http.delete<any>(this._baseUrl4 + '/' + id + '/' + deletedBy);
    }
}
