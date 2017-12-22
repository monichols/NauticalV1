import { Injectable, NgZone } from '@angular/core';

import * as firebase from 'firebase';
import { Login } from '../../login';
import { NavController } from 'ionic-angular';
import { LoadingProvider } from '../loading/loading';
import { AlertProvider } from '../alert/alert';
import { GooglePlus } from '@ionic-native/google-plus';
import {Facebook} from '@ionic-native/facebook';

@Injectable()
export class LoginProvider {


  private navCtrl: NavController;

  //private facebookProvider = new Facebook({
    //clientId: Login.facebookAppId,
    //appScope: ["email"]
  //});

  constructor(public loadingProvider: LoadingProvider, 
    public alertProvider: AlertProvider, public zone: NgZone, 
    public googleplus: GooglePlus,
  public facebook: Facebook) {
    console.log("Initializing Login Provider");
 
    // Detect changes on the Firebase user and redirects the view depending on the user's status.
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user["isAnonymous"]) {
          //Goto Trial Page.
          // this.navCtrl.setRoot(Login.trialPage, { animate: false });
        } else {
          if (Login.emailVerification) {
            if (user["emailVerified"]) {
              //Goto Home Page.
              this.zone.run(() => {
                this.navCtrl.setRoot(Login.homePage, { animate: false });
              });
              //Since we're using a TabsPage an NgZone is required.
            } else {

              //Goto Verification Page.
              this.navCtrl.setRoot(Login.verificationPage, { animate: false });
            }
          } else {
            //Goto Home Page.
            this.zone.run(() => {
              this.navCtrl.setRoot(Login.homePage, { animate: false });
            });
            //Since we're using a TabsPage an NgZone is required.
          }
        }
      }
    });
  }

  // Hook this provider up with the navigationController.
  // This is important, so the provider can redirect the app to the views depending
  // on the status of the Firebase user.
  setNavController(navCtrl) {
    this.navCtrl = navCtrl;
  }

  // Facebook Login, after successful authentication, triggers firebase.auth().onAuthStateChanged((user) on top and
  // redirects the user to its respective views. Make sure to set your FacebookAppId on login.ts
  // and enabled Facebook Login on Firebase app authentication console.
  facebookLogin() {
this.loadingProvider.show();
this.facebook.login(['email']).then(res=>{
const fc = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
firebase.auth().signInWithCredential(fc).then(fs=>{
  this.loadingProvider.hide();
}).catch(ferr=>{
  alert(JSON.stringify(ferr));
   this.loadingProvider.hide();
})
}).catch(err=>{
   this.loadingProvider.hide();
alert(JSON.stringify(err));
})
  }

  // Google Login, after successful authentication, triggers firebase.auth().onAuthStateChanged((user) on top and
  // redirects the user to its respective views. Make sure to set your GoogleWebClient Id on login.ts
  // and enabled Google Login on Firebase app authentication console.

googleLogin() {
    this.loadingProvider.show();
    this.googleplus.login({
      'webClientId': Login.googleClientId,
      'offline': true
    }).then((success) => {
      let credential = firebase.auth.GoogleAuthProvider.credential(success['idToken'], null);
      firebase.auth().signInWithCredential(credential)
        .then((success) => {
          alert('success');
          this.loadingProvider.hide();
        })
        .catch((error) => {
          this.loadingProvider.hide();
          alert(JSON.stringify(error));
          let code = error["code"];
          this.alertProvider.showErrorMessage(code);
        });
    }, error => { this.loadingProvider.hide(); alert(JSON.stringify(error)); });
  }


  /*googleLogin() {
this.googleplus.login({
  'webClientId':'558035351867-enbhecpbvh3bifqsvlq3abh5ns3eor65.apps.googleusercontent.com',
  'offline': true
}).then(res=>{
  firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken)).then(suc=>
  {
    alert("login success")
  }).catch(ns=>{
    alert("login failed")
  })
})
  }*/


  // Login on Firebase given the email and password.
  emailLogin(email, password) {
    this.loadingProvider.show();
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((success) => {
        this.loadingProvider.hide();
      })
      .catch((error) => {
        this.loadingProvider.hide();
        let code = error["code"];
        this.alertProvider.showErrorMessage(code);
      });
  }

  // Register user on Firebase given the email and password.
  register(email, password) {
    this.loadingProvider.show();
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((success) => {
        this.loadingProvider.hide();
      })
      .catch((error) => {
        this.loadingProvider.hide();
        let code = error["code"];
        this.alertProvider.showErrorMessage(code);
      });
  }

  // Send Password Reset Email to the user.
  sendPasswordReset(email) {
    this.loadingProvider.show();
    firebase.auth().sendPasswordResetEmail(email)
      .then((success) => {
        this.loadingProvider.hide();
        this.alertProvider.showPasswordResetMessage(email);
      })
      .catch((error) => {
        this.loadingProvider.hide();
        let code = error["code"];
        this.alertProvider.showErrorMessage(code);
      });
  }

}
