import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';




export interface Habit {
  id?: string;
  name: string;
  task: [];
  startDate: string;
  completed: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class HabitOperationService {
  private habitsCollection: AngularFirestoreCollection<Habit>;
  habits$: Observable<Habit[]>;

  constructor(private afs: AngularFirestore) {
    this.habitsCollection = afs.collection<Habit>('habits');
    this.habits$ = this.habitsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Habit;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  addHabit(habit: Habit) {
    return this.habitsCollection.add(habit);
  }

  updateHabit(habit: Habit) {
    return this.habitsCollection.doc(habit.id).update(habit);
  }

  deleteHabit(id: string) {
    return this.habitsCollection.doc(id).delete();
  }
}