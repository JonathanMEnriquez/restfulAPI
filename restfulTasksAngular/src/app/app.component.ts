import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Your Tasks';
  allTasks:any = "";
  taskId:String = "";
  singleTask:any = "";

  constructor(private _httpService: HttpService) {}

  ngOnInit() {
    
  }
  
  getAll(){
    console.log('calling my service')
    let observable = this._httpService.getTasks()
    console.log(observable);
    observable.subscribe((data:any) => {
      console.log('got the tasks!', data);
      this.allTasks = data;
    })
  }

  getOne(id:String) {
    console.log(this.taskId);
    let observable = this._httpService.getOneTask(id);
    observable.subscribe((data:any) => {
      console.log('got one task');
      this.singleTask = data.data;
      console.log(this.singleTask);
    })
  }
}
