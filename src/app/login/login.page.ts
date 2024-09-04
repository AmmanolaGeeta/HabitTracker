import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  userData: any='';
  isToastOpen = false;
  registrationInfo: string = '';
  loginForm!: FormGroup;

  constructor(
    private fire: AngularFirestore,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });  }

    async login() {
      if (this.loginForm.valid) {
        const { email, password } = this.loginForm.value;
        try {
          await this.authService.loginUser(email, password);
        } catch(error: any)  {

          if (error.code === 'auth/invalid-credential') {
            this.registrationInfo = 'Invalid credential';
          }
  
          this.setOpen(true, this.registrationInfo);
          // console.error('Error creating user:', error.code, error.message);
    
          // Handle login error
          console.error('Login error:', error);
        
        }
    
      }
      
    }
  


  // login(email: string, password: string) {
  //   console.log('email', email, 'password', password);

  //   this.authService
  //     .loginUser(email, password)
  //     .then((userCredential) => {
  //       console.log('userCredential',userCredential);
        
  //       // Login successful, user is now authenticated
  //       if (userCredential.user !== null) {
  //         const uid = userCredential.user.uid;
  //         this.fire
  //           .collection('userInfo')
  //           .doc(uid)
  //           .get().toPromise()
  //           .then((doc) => {
  //             this.userData = doc?.data();
  //             console.log('userData==>',this.userData);
              
  //             // Check if password is correct
  //             console.log('password',password ,'this.userData.password',this.userData.password);
              
  //             if (password === this.userData.password) {
  //               // Password is correct, login successful
  //               console.log('Login successful!');
  //               this.router.navigate(['/tabs/tab1'], { replaceUrl: true });

  //             } else {
  //               // Password is incorrect
  //               console.log('Incorrect password');
  //             }
  //           });
  //       }
  //     })
  //     .catch((error) => {
        // if (error.code === 'auth/invalid-credential') {
        //   this.registrationInfo = 'Invalid credential';
        // }

        // this.setOpen(true, this.registrationInfo);
        // console.error('Error creating user:', error.code, error.message);
  
  //     });
  // }
  setOpen(isOpen: boolean, registrationInfo: string) {
    this.isToastOpen = isOpen;
    this.registrationInfo = registrationInfo;
  }
 

  forgotPassword() {
    // TO DO: implement new user logic here
    console.log('forgotPassword clicked!');
  }

  newUser() {
    // TO DO: implement new user logic here
    this.router.navigate(['/registration'], { replaceUrl: true });

    console.log('New user clicked!');
  }
}
