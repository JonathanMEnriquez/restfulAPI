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
  lastTask:any = "";

  constructor(private _httpService: HttpService) {}

  ngOnInit() {
    
    this.getAll();
    // this.getFirst();
  }
  
  getAll(){
    console.log('calling my service')
    let observable = this._httpService.getTasks()
    console.log(observable);
    observable.subscribe((data:any) => {
      console.log('got the tasks!', data);
      this.allTasks = data;
      let arr:Object[] = this.allTasks.data;
      this.lastTask = arr[arr.length - 1];
      console.log(this.lastTask);
    })
  }

  // getFirst() {
  //   let observable = this._httpService.getOneTask()
  //   observable.subscribe((data:any) => {

  //   })
  // }
}
