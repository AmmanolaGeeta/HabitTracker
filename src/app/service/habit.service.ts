// import { Injectable } from '@angular/core';
// import { AngularFireDatabase } from '@angular/fire/compat/database';


// export class habit{
//   // id? : string;
//   habitId:string;
//   habit_title: string;
//   task:[];
//   createdAt:any

//   constructor(habitId: string, habit_title: string, task:[], createdAt: any) {
//     this.habitId = habitId;
//     this.habit_title = habit_title;
//     this.task = task;
//     this.createdAt = createdAt;
//   }
  
// }


// @Injectable({
//   providedIn: 'root'
// })
// export class HabitService {

//   private notesCollection:any
//   private userId:any 

//   constructor(private firestore:Firestore,private authService:AuthServiceService) {
//     this.authService.getProfile().then(user => {

//       this.userId = user?.uid;
//       console.log(user?.uid);
//       // this.notesCollection = co;;

//     }).catch(error => {
//       console.error('Error getting user profile:', error);
//     });
//   }


//    addnotes(notes:notes){
//     notes.userId = this.userId;
//     console.log(notes);
    
//     const jouralRef = collection(this.firestore, 'notes');
    
//     return addDoc(jouralRef,notes)
//   }

//   getnotes(userId:any): Observable<notes[]> {
    
//     const jouralRef = collection(this.firestore, 'notes')
    
//     const  refq =  query(jouralRef,where('userId','==',userId))
//     return collectionData(refq,{ idField: 'id'}) as Observable<notes[]>
//   }

//    getUser(){
//      this.authService.getProfile().then(user =>{
//       this.userId = user?.uid
//       console.log(this.userId);
//     })

//    return this.userId
//   }


//   getnotesById(id:any) : Observable<notes>{
//       const notesRef = doc(this.firestore,`notes/${id}`)
//       return docData(notesRef,{ idField: 'id'}) as Observable<notes>
//   }
  
//   removenotes(id:any){
//     const notesRef = doc(this.firestore, `notes/${id}`)
//     return deleteDoc(notesRef)
//   }

//   updatenotes(notes:notes){
//     const notesRef = doc(this.firestore,`notes/${notes.id}`)
//     return updateDoc(notesRef,{notestitle:notes.notestitle,notescontent:notes.notescontent})
//   }


// }