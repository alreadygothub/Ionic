import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

/*
  Generated class for the UsersserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()

export class UsersserviceProvider {

  public data: any;
  public fireAuth: any;
  public userProfile: any;


  constructor() {
//this refers to the firebase Authentication which stores the email and password
  this.fireAuth = firebase.auth();
  //this is what we use to reference the "users" node in Firebase database
    this.userProfile =firebase.database().ref('users');
  }


  viewUser(userId: any){
    //Go to the users in firebase and look at a specific userid
    var userRef = this.userProfile.child(userId);
      return userRef.once('value');
    }

  loginUserService(email: string, password: string): any{
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  signupUserService(account:{}){
    return this.fireAuth.createUserWithEmailAndPassword(account['email'], account['password']).then((newUser) => {
      //sign in the user
       this.fireAuth.signInWithEmailAndPassword(account['email'], account['password']).then((authenticatedUser) => {
        //successful login, create user profile
       this.userProfile.child(authenticatedUser.uid).set(
         account
       );
       });
    });
  }

  /**
   * logoutUser doesn't take any parameters, it looks into the authentication object and signs out
   * the currently logged in user.
   */
  logoutUserService(): Promise<any> {
    return firebase.auth().signOut();
  }

  forgotpasswordUser(email: any){
    return this.fireAuth.sendPasswordResetEmail(email);
  }


}
