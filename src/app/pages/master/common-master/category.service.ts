import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  _baseUrl = environment.API_URL + 'api/category/'

  private _createcategory = this._baseUrl + 'create';
  private _getcategory = this._baseUrl + 'get'
  private _updatecategory = this._baseUrl + 'update'
  private _deleteCategory = this._baseUrl + 'delete'

  createCategory(data) {
    return this.http.post<any>(this._createcategory, data);
  }
  
  getCategory() {
    return this.http.get<any>(this._getcategory);
  }

  getSingleCategory(degreeId){
    return this.http.get<any>(this._getcategory + '/' + degreeId );
    
  }
  updateCategory(data){
    return this.http.put<any>(this._updatecategory, data)

  }
  
  deleteCategory(id:any, deletedBy){
    return this.http.delete<any>(this._deleteCategory + '/' + id + '/' + deletedBy);
    }
  constructor(private http: HttpClient) { }
}
