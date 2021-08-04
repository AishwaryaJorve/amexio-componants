import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {
  filteredObject: any = [];
  zindex = 600;
  constructor(private _http: HttpClient) {
  }

  fetchData(serviceUrl: string, methodType: string): Observable<any> {
    const requestJson = {};
    const headers = new HttpHeaders().append('Content-Type', 'application/json;charset=UTF-8');
    if (methodType === 'post') {
      return this._http.post(serviceUrl, requestJson, {headers});
    } else if (methodType === 'get') {
      return this._http.get(serviceUrl, {headers});
    }
  }

  uploadFile(serviceUrl: string, methodType: string, requestData: any): Observable<any> {
    const requestJson = requestData;
    const headers = new HttpHeaders().append('Access-Control-Allow-Origin', '*');
    if (methodType.toUpperCase() === 'POST') {
      return this._http.post(serviceUrl, requestJson, {headers});
    }
  }
}
