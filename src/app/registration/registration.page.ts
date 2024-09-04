import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { getFirestore } from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  registerForm!: FormGroup;
  name?: string = '';
  email?: any = '';
  password?: any = '';
  phone?: any = '';
  repassword?: string = '';
  dob?: string = '';
  CreatedAt? = new Date();

  isToastOpen = false;
  registrationInfo: string = '';

  constructor(
    private fire: AngularFirestore,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    const app = getApp();
    const db = getFirestore(app);
    console.log('db==>', db);
  }

  setOpen(isOpen: boolean, registrationInfo: string) {
    this.isToastOpen = isOpen;
    this.registrationInfo = registrationInfo;
  }

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        dob: ['', [Validators.required]],
        mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        reEnterPassword: ['', [Validators.required]],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('reEnterPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  async register() {
    if (this.registerForm.valid) {
      const { reEnterPassword, ...user } = this.registerForm.value;
      try {
        await this.authService.registerUser(user);
        this.registrationInfo = 'User registred successfully';
        this.setOpen(true, this.registrationInfo);
      } catch (error) {
        // Handle registration error
        console.error('Registration error:', error);
      }
    }
  }
}
