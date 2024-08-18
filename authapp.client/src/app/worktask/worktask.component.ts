import { Component, OnInit } from '@angular/core';
import { WorkTaskService } from '../services/worktask.service';


interface WorkTask{
  id?: number;
  name:string;
  description: string;
}
@Component({
  selector: 'app-worktask',
  templateUrl: './worktask.component.html',
  styleUrl: './worktask.component.css'
})

export class WorktaskComponent implements OnInit {
  workTasks: WorkTask[] = [];
  newWorkTask: WorkTask = {name:'',description:''};
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  constructor(private workTaskService: WorkTaskService){}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.workTaskService.getWorkTasks().subscribe(tasks => {
      this.workTasks = tasks;
    });
  }
  
  addworkTask(): void{
    if(this.newWorkTask.name && this.newWorkTask.description){
      this.workTaskService.addWorkTask(this.newWorkTask).subscribe(
        response =>{
          this.loadTasks();
          alert('Successfully added');
          this.closeModal();
        },
        error => {
          alert('Error for add work task : ' + error);
        }
      );
    }else{
      alert('Please fill all fields');
    }
   
  }
  deleteWorkTask(task:WorkTask): void{
    if(task && task.id){
      this.workTaskService.deleteWorkTask(task.id).subscribe(
        response =>{
          this.loadTasks();
          alert('Successfully deleted');
        },
        error=>{
          alert('Error for delete work task :'+ error);
        }
      )
    }
 
  }


}
