import { Component } from '@angular/core';


interface Task {
  id: number;
  tsk: string;
  isChecked: boolean;
}

interface Habit {
  id: number;
  name: string;
  tasks: Task[];
  status: string;
  date:Date;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  habits: Habit[] = [
    {
      id: 1,
      name: 'My Habit 1',
      tasks: [
        { id: 1, tsk: 'Task 1', isChecked: false },
        { id: 2, tsk: 'Task 2', isChecked: false }
      ],
      status: 'Not Started',
      date:new Date()
    },
    {
      id: 2,
      name: 'My Habit 2',
      tasks: [
        { id: 1, tsk: 'Task 3', isChecked: false },
        { id: 2, tsk: 'Task 4', isChecked: false }
      ],
      status: 'Not Started',
      date:new Date()
    },

  ];


  updateTaskStatus(task: Task, index: number ,habit_index:number) {
    task.isChecked = !task.isChecked;
    this.updateHabitStatus(habit_index);
  }
  
  updateHabitStatus(index: number) {
    const habit = this.habits[index];
    const allTasksChecked = habit.tasks.every(task => task.isChecked);
    const someTasksChecked = habit.tasks.some(task => task.isChecked);

    if (allTasksChecked) {
      habit.status = "Completed";
    } else if (someTasksChecked) {
      habit.status = "In Progress";
    } else {
      habit.status = "Not Started";
    }
  }
}
  


