import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';
import { LoginPage } from '../login/login';
import * as firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [UsersserviceProvider]
})
export class HomePage {
  //public userPhotoUrl: any;
  public userDisplayName: any;

  constructor(public navCtrl: NavController, public usersService : UsersserviceProvider) {
    //Current users uid
    //var myUserId = firebase.auth().currentUser.uid;
    //this.displayUser(myUserId);
  }
  /*ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }*/

  //Lougout Funtion
  logoutUser(){

    var that = this;
    //calls the logoutUserService function in the "usersservice" provider
    this.usersService.logoutUserService().then( () => {
    //the keyword "this" does not work in these brakets so I use that which I declared above
    //sets the root page to login page
      this.navCtrl.setRoot(LoginPage);
  })
}


  displayUser(theUserId){
    var that= this;
    //we declare a variable that we call "snapshot"
    this.usersService.viewUser(theUserId).then(snapshot =>{

      //get users userPhotoUrl
      //that.userPhotoUrl = snapshot.val().photo;
      that.userDisplayName = snapshot.val().city;
    })
  }

}
