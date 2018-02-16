import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http:  HttpClient) {
   }

  getTasks() {
    console.log('got a request from the component');
    return this._http.get('/tasks');
  }

  getOneTask(id) {
    return this._http.get('/tasks/' + id);
  }
}


