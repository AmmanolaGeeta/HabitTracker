import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
// import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import {AngularFireModule } from '@angular/fire/compat';
import {AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthService } from './service/auth.service';
import { provideFirebaseApp, initializeApp as initializeApp_alias } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getStorage, provideStorage } from '@angular/fire/storage';



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // provideAuth(() => getAuth()),
		// provideFirestore(() => getFirestore()),
    AngularFireDatabaseModule,AngularFireAuthModule,
    // provideAuth(() => getAuth()),
		// provideFirestore(() => getFirestore()),
		// provideStorage(() => getStorage())
    // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // provideFirestore(() => getFirestore()),
  ],
  providers: [AuthService, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({"projectId":"habbittrackerapp-e35da","appId":"1:456174007452:web:e82111ad2a8d8064b0e959","storageBucket":"habbittrackerapp-e35da.appspot.com","apiKey":"AIzaSyC2FWjGV_HTiKmPnvoo0-bhgzeAR2n_HSc","authDomain":"habbittrackerapp-e35da.firebaseapp.com","messagingSenderId":"456174007452","measurementId":"G-ECFZJ93W2W"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideMessaging(() => getMessaging()), provideStorage(() => getStorage())],
  bootstrap: [AppComponent],
})
export class AppModule {}

