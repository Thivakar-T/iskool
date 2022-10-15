import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DegreeService {
  _baseUrl = environment.API_URL + 'api/degree/'

  private _createDegree = this._baseUrl + 'create';
  private _getDegree = this._baseUrl + 'get'
  private _updateDegree = this._baseUrl + 'update'
  private _deleteDegree = this._baseUrl + 'delete'

  createDegree(data) {
    return this.http.post<any>(this._createDegree, data);
  }
  
  getDegree() {
    return this.http.get<any>(this._getDegree);
  }

  getSingleDegree(degreeId){
    return this.http.get<any>(this._getDegree + '/' + degreeId );
    
  }
  updateDegree(data){
    return this.http.put<any>(this._updateDegree, data)

  }
  
  deleteDegree(id:any, deletedBy){
    return this.http.delete<any>(this._deleteDegree + '/' + id + '/' + deletedBy);
    }
  
  constructor(private http: HttpClient) { }
}
