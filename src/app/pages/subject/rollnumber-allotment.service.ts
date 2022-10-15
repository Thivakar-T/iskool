import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RollnumberAllotmentService {
  _baseUrl = environment.API_URL + 'api/student/rollnumber';
  private _get = this._baseUrl + '/get';
  private _update = this._baseUrl + '/update';
  private _updateNewRollNumber = this._baseUrl + '/create/roll/number';



  constructor(private http: HttpClient) { }
  
  get(academicyearId, standardId,sectionId) {
    return this.http.get<any>(this._get + '/' + academicyearId + '/' + standardId + '/' + sectionId  );
  }
  update(data) {
    return this.http.put<any>(this._update,data );
  }
  updateNewRollNumber(data) {
    return this.http.put<any>(this._updateNewRollNumber,data );
  }
}
