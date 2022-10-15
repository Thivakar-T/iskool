import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class YearService {
  _baseUrl = environment.API_URL + 'api/';
  private _getyear = this._baseUrl + 'year/get ';

  constructor(
    private http: HttpClient
  ) { }
  getyear() {
    return this.http.get<any>(this._getyear); 
  }
}