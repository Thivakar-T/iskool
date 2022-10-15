import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StudentMarkEntryService {

  _baseUrl = environment.API_URL + 'api/mark/entry/';
  private _createEntry = this._baseUrl + 'create';
  private _getEntry = this._baseUrl + 'search';
  
  constructor(
    private http: HttpClient
  ) { }

  createEntry(data){
    return this.http.post<any>(this._createEntry, data);
  }
  getEntry(academicYearId, stdId, sectionId, subOfferingDtlId, examId)  {
    return this.http.get<any>(this._getEntry + '/'+ academicYearId +'/' + stdId + '/' + sectionId + '/' + subOfferingDtlId + '/' + examId);
  }
  getSubOffering(academicYearId, stdId, examId)  {
    return this.http.get<any>(this._getEntry + '/'+ academicYearId +'/' + stdId + '/' + examId);
  }
}
