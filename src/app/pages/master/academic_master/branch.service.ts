import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BranchService {

  
  _baseUrl = environment.API_URL + 'api/branch/';

  private _createBranch = this._baseUrl + 'create';
  private _getBranch = this._baseUrl + 'get';
  private _updateBranch = this._baseUrl + 'update';
  private _deleteBranch = this._baseUrl + 'delete';


  constructor(
    private http: HttpClient
  ) { }

  getBranch() {
    return this.http.get<any>(this._getBranch);
  }

  getSingleBranch(id) {
    return this.http.get<any>(this._getBranch + '/' + id );
  }

  createBranch(data) {
    return this.http.post<any>(this._createBranch, data);
  }

  updateBranch(data) {
    return this.http.put<any>(this._updateBranch, data);
  }

  deleteBranch(id:any, deletedBy){
    return this.http.delete<any>(this._deleteBranch + '/' + id + '/' + deletedBy);
    }

}
