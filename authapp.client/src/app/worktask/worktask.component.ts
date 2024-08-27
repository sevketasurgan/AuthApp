import { Component, OnInit } from '@angular/core';
import { WorkTaskService } from '../services/worktask.service';
import { UserService } from '../services/user.service';


interface WorkTask{
  id?: number;
  name:string;
  description: string;
  status: number;
  assignedToUserId?:string;
  createdByUserId?:string;
}
@Component({
  selector: 'app-worktask',
  templateUrl: './worktask.component.html',
  styleUrl: './worktask.component.css'
})

export class WorktaskComponent implements OnInit {
  workTasks: WorkTask[] = [];
  newWorkTask: WorkTask = {name:'',description:'',status:1};
  isModalOpen = false;
  statuses = [
    { value: 1, label: 'Pending' },
    { value: 2, label: 'In Progress' },
    { value: 3, label: 'Done' }
  ];
  users:any[] =[];
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  constructor(private workTaskService: WorkTaskService, private userService:UserService){}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      console.log(this.users);
    });
    this.loadTasks();
  }

  selectStatus(status: number): number {
    
    return status;
  }
  loadTasks() {
    this.workTaskService.getWorkTasks().subscribe(tasks => {
      this.workTasks = tasks;
      tasks.forEach((task) =>{
        console.log(task);
      })
    });
  }
  
  addworkTask(): void{
    if(this.newWorkTask.name && this.newWorkTask.description){
      console.log(this.newWorkTask.assignedToUserId);
      console.log(this.newWorkTask);
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

  updateWorkTask(task:WorkTask): void{
    if(task && task?.id){
      this.workTaskService.updateWorkTask(task).subscribe(
        response =>{
          this.loadTasks();
          alert('Successfully updated');
        },
        error=>{
          alert('Error for update work task :'+ error);
        }
      )
    }
  }

  onChangeStatus(task:WorkTask,event:Event): void{
    const selectElement = event.target as HTMLSelectElement;
    const newStatus = Number(selectElement.value);
    if(newStatus){
      task.status = newStatus;
      this.updateWorkTask(task);
    }

  }


}
