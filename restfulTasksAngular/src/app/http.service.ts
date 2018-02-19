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
    return this._http.get(`/tasks/${id}`);
  }

  createATask(task: any) {
    return this._http.post('/tasks', task);
  }

  updateTask(task: any) {
    console.log('about to do the put request to ' + task.id);
    return this._http.put(`/tasks/${task.id}`, task);
  }

  deleteTask(id) {
    return this._http.delete(`/tasks/${id}`);
  }
}


