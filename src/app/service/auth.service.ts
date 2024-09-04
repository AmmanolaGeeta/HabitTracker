import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';


export interface Users{
  name:string;
  email: string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;

  constructor(public ngFireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {

  }


  // Register a new user
  async registerUser(user: any) {
    console.log('user==>',user);
    
    try {
      const res = await this.ngFireAuth.createUserWithEmailAndPassword(user.email, user.password);
      await this.firestore.collection('userInfo').doc(res.user?.uid).set({
        name: user.name,
        dob: user.dob,
        mobile: user.mobile,
        email: user.email,
        password:user.password,
        createdAt: new Date(),
      });
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  }


  // async registerUser(email: string, password: string) {
  //   return await this.ngFireAuth.createUserWithEmailAndPassword(email, password)

  // }

  // async loginUser(email: string, password: string) {
  //   return await this.ngFireAuth.signInWithEmailAndPassword(email, password);

  // }


  // Login user
  async loginUser(email: string, password: string) {
    try {
      await this.ngFireAuth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/tabs/tab1']);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }



  async resetPassword(email: string) {
    return await this.ngFireAuth.sendPasswordResetEmail(email);

  }
  async getProfile():Promise <Users | null> {
    return new Promise<Users | null>((resolve, reject) => {
      this.ngFireAuth.onAuthStateChanged(user => {
        if (user) {
          resolve(user as unknown as Users);
        } else {
          resolve(null);
        }
      }, reject);
    })
  }

  async signOut() {
    return await this.ngFireAuth.signOut();
  }
}