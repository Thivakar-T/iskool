import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdmissionCommonDocumentService {
  private _baseUrl = environment.API_URL + 'api/admission/common/document/';

  private _createDocument = this._baseUrl + 'create';
  private _getDocument = this._baseUrl + 'get';
  private _updateDocument = this._baseUrl + 'update';
  private _deleteDocument = this._baseUrl + 'delete';

  constructor(private http: HttpClient) { }

  getDocument() {
    return this.http.get<any>(this._getDocument);
  }

  getSingleDocument(id) {
    return this.http.get<any>(this._getDocument + '/' + id );
  }

  createDocument(data) {
    return this.http.post<any>(this._createDocument, data);
  }

  updateDocument(data) {
    return this.http.put<any>(this._updateDocument, data);
  }

  deleteDocument(id :any) {
    return this.http.delete(this._deleteDocument + '/' + id);
    }
}
