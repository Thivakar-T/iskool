import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SemesterService {
  _baseUrl = environment.API_URL + 'api/';
  private _getsemester = this._baseUrl + 'semester/get ';

  constructor(
    private http: HttpClient
  ) { }
  getsemester() {
    return this.http.get<any>(this._getsemester); 
  }
}