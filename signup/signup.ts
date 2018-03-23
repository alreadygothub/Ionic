import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';
import * as firebase from 'firebase';
import { HomePage } from '../home/home';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [UsersserviceProvider]
})
export class SignupPage {
//declarig the variables that we are using in the form
  public skills : string;
  public email : string;
  public phone : any;
  public password : any;
  public first_name : any;
  public last_name : any;
  public city : any;
  public state : any;
  public isJobSeeker : boolean;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public usersserviceProvider:  UsersserviceProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  //This signup function collects the info from the form
  doSignup(){

      var   account = {
        first_name: this.first_name,
        last_name: this.last_name || '',
        skills: this.skills || '',
        email: this.email,
        phone: this.phone || '',
        password: this.password,
        city: this.city || '',
        state: this.state || '',
        //isJobSeeker : this.isjobseeker || ''

      };
  var that = this;

//loading symbol appears when button is pushed and funtion is activated
  var loader = this.loadingCtrl.create({
        content: "Please wait...",

      });
      loader.present();

      //the signupuserservice function is expecting an account object which we declared above
    	this.usersserviceProvider.signupUserService(account).then(authData => {
    		//successful
    		loader.dismiss();
    		that.navCtrl.setRoot(HomePage);

    	}, error => {
  loader.dismiss();
       // Unable to log in
        let toast = this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'top'
        });
        toast.present();

        that.password = ""//empty the password field
    	});

}
}
