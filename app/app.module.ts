import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
 
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { UsersserviceProvider } from '../providers/usersservice/usersservice';



  // Initialize Firebase
  export const config = {
    apiKey: "AIzaSyAmmDaXUtt_uduIG54exrWlrLZq7Fgm78U",
    authDomain: "ionicimageupload-3706a.firebaseapp.com",
    databaseURL: "https://ionicimageupload-3706a.firebaseio.com",
    projectId: "ionicimageupload-3706a",
    storageBucket: "ionicimageupload-3706a.appspot.com",
    messagingSenderId: "847132346056"
  };
  firebase.initializeApp(config);


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsersserviceProvider
  ]
})
export class AppModule {}
