import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Your Tasks';
  allTasks:any = "";
  taskId:String = "";
  editTask:any;
  newTask:any;

  constructor(private _httpService: HttpService) {}

  ngOnInit() {
    this.getAll();
    this.newTask = { 
      title: "",
      description: ""
    }

    this.editTask = { 
      id: "",
      title: "",
      description: "",
      completed: false
    }
  }

  createTask(){
    console.log('calling my service');
    let observable = this._httpService.createATask(this.newTask)
    observable.subscribe((data: any)=> {
      console.log('saved successfully');
      this.getAll();
    })
    //reset newTask
    this.newTask = { title: "", description: "" };
  }
  
  getAll(){
    console.log('calling my service');
    let observable = this._httpService.getTasks()
    console.log(observable);
    observable.subscribe((data:any) => {
      console.log('got the tasks!', data);
      this.allTasks = data;
    })
  }

  fillInEdit(event) {

    console.log('edit button pressed');
    console.log(event.srcElement);
    this.editTask.title = event.srcElement.title;
    this.editTask.description = event.srcElement.name;
    this.editTask.id = event.srcElement.id;
  }

  updateTask(){
    console.log('calling service');
    let observable = this._httpService.updateTask(this.editTask);
    observable.subscribe((data:any)=> {
      console.log('successfullly updated task!');
      this.editTask = {
        id: "",
        title: "",
        description: "",
        completed: false
      }
      this.getAll();
    })
  }

  deleteTask(event) {
    console.log('gonna delete');
    let observable = this._httpService.deleteTask(event.srcElement.id);
    observable.subscribe((data:any)=>{
      console.log('successfully deleted task');
      this.getAll();
    })
  }
}
