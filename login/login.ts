import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UsersserviceProvider]
})
export class LoginPage {

  public email: string;
  public password: string;


  constructor(public usersService : UsersserviceProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  submitLogin(){

    var that = this;

    var loader = this.loadingCtrl.create({
          content: "Please wait..."
        });
        loader.present();


        this.usersService.loginUserService(this.email, this.password).then(authData => {
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

  forgotPassword(){
    let prompt = this.alertCtrl.create({
      title : "Reset Password",
      message: "Enter your email to reset your password",
      inputs:[
        {
          name: 'recoverEmail',
          placeholder: 'you@email.com'
        },
      ],
      buttons:[
        {
          text:'Cancel',
          handler: data =>{
            console.log('Cancel clicked');
          }
        },
        {
            text:'Submit',
            handler: data =>{
              //add a preloader aka LoadingController
              let loading = this.loadingCtrl.create({
              dismissOnPageChange: true,
              content: 'Reseting your password...'
            });
              //call userservice
              this.usersService.forgotpasswordUser(data.recoverEmail).then(() =>{
                //add a ToastController
                loading.dismiss().then(() =>{
                //show popup
                let alert = this.alertCtrl.create({
                  title: 'Check your Email',
                  subTitle: 'Password reset sucessful!',
                  buttons:['OK']
                });
                alert.present();
              })

            }, error => {
                let alert = this.alertCtrl.create({
                  title: 'Error reseting password',
                  subTitle: error.message,
                  buttons:['OK']
                });
                alert.present();
            });
          }
        }
      ]
    });
    prompt.present();
  }

  redirectToSignup(){

          this.navCtrl.push(SignupPage);
  }

}
