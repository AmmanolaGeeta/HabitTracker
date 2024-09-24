import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { HabitOperationService } from '../service/habit-operation.service';
import { AuthService } from '../service/auth.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { AddHabitComponent } from '../component/add-habit/add-habit.component';
import { Observable } from 'rxjs';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';


export interface Task {
  name: string;
  status: boolean;
}

export interface Habit {
  id?: string;
  habitTitle: string;
  tasks: Task[];
  startDate: Date;
  endDate: Date;
  userName: string;
  email: string;
  status: string;  // e.g., "active", "completed", etc.
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  @ViewChild(IonModal)
  modal!: IonModal;

  // habits$: Observable<Habit[]> | undefined;
  habitForm!: FormGroup ;
  habits!: Habit[];

  // habits: Habit[] = [
  //   {
  //     id: 1,
  //     name: 'My Habit 1',
  //     tasks: [
  //       { id: 1, tsk: 'Task 1', isChecked: false },
  //       { id: 2, tsk: 'Task 2', isChecked: false }
  //     ],
  //     status: 'Not Started',
  //     date:new Date()
  //   },
  //   {
  //     id: 2,
  //     name: 'My Habit 2',
  //     tasks: [
  //       { id: 1, tsk: 'Task 3', isChecked: false },
  //       { id: 2, tsk: 'Task 4', isChecked: false }
  //     ],
  //     status: 'Not Started',
  //     date:new Date()
  //   },

  // ];


  updateTaskStatus(task: Task, index: number ,habit_index:number) {
  //   task.isChecked = !task.isChecked;
  //   this.updateHabitStatus(habit_index);
  }
  
  updateHabitStatus(index: number) {
  //   const habit = this.habits[index];
  //   const allTasksChecked = habit.tasks.every(task => task.isChecked);
  //   const someTasksChecked = habit.tasks.some(task => task.isChecked);

  //   if (allTasksChecked) {
  //     habit.status = "Completed";
  //   } else if (someTasksChecked) {
  //     habit.status = "In Progress";
  //   } else {
  //     habit.status = "Not Started";
  //   }
  }



  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private loadingController: LoadingController,
    private habitServive: HabitOperationService,
    private authService: AuthService,
    private fb: FormBuilder,
    private afs: AngularFirestore
  ) {}

  ngOnInit() {
    // this.habits$ = this.habitServive.habits$;
    this.habitForm = this.fb.group({
      habitTitle: ['', Validators.required],
      tasks: this.fb.array([this.createTask()]),  // Start with one task by default
      startDate: [new Date(), Validators.required],
      endDate: [''],
      userName: ['Geeta Ammanola', Validators.required],
      email: ['Geeta@gmail.com', [Validators.required, Validators.email]],
      status: ['not started', Validators.required],
    });
  }

  createTask(): FormGroup {
    return this.fb.group({
      t_name: ['', Validators.required],
      status: [false]  // Default status is false (incomplete)
    });
  }
  get tasks(): FormArray {
    return this.habitForm.get('tasks') as FormArray;
  }

  addTask() {
    this.tasks.push(this.createTask());
  }

  removeTask(index: number) {
    this.tasks.removeAt(index);
  }

  async submitHabit() {
    debugger;
    console.log('submitHabit clicked',this.habitForm.value);
    if (this.habitForm.valid) {
      const newHabit: Habit = this.habitForm.value;
      try {
        await this.afs.collection('userHabits').add(newHabit);
        console.log('Habit added successfully!');
      } catch (error) {
        console.error('Error adding habit:', error);
      }
    }
  }
  // async AddNewHabit(note: notes) {
  //   const modal = await this.modalCtrl.create({
  //     component: AddHabitComponent,
  //     componentProps: { id: note.id },
  //     breakpoints: [0, 0.5, 0.8],
  //     initialBreakpoint: 0.5,
  //   });

  //   await modal.present();
  // }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      console.log(ev.detail.data);
    }
  }

  confirm() {
    console.log('confirm clicked');
    
    this.modal.dismiss('confirm');
    this.submitHabit();
    // this.addNewHabit();

    // this.title = '';
    // this.note = '';
    // this.userId = '';
  }

  addNewHabit() {
    // const noteData = new notes('', this.title, this.note, new Date());
    // console.log(
    //   'noteData',
    //   noteData,
    //   'this.title',
    //   this.title,
    //   this.note,
    //   'this.note'
    // );

    // this.habitServive
    //   .addHabit({
    //     // userId: '',
    //     // notestitle: this.title,
    //     // notescontent: this.note,
    //     createdAt: new Date(), //.toLocaleString , //new Date(timestamp.toDate()).toUTCString()  //new Date(),
    //   })
    //   ?.then(async () => {
    //     const toast = await this.toastCtrl.create({
    //       message: 'Habit added successfully',
    //       duration: 2000,
    //     });
    //     toast.present();
    //   })
    //   .catch(async (error) => {
    //     const toast = await this.toastCtrl.create({
    //       message: error,
    //       duration: 2000,
    //     });
    //     toast.present();
    //   });
  }

  inputFields = [{ value: '' }];

  addInputField() {
    this.inputFields.push({ value: '' });
    console.log(' this.inputFields', this.inputFields);
    
  }

  removeInputfield(index: number){
    this.inputFields.splice(index, 1);
    console.log(' this.inputFields', this.inputFields);
  }



  


}
  


