/*
DEV: Monique Nichols
Product: Nautical
File: Settings.ts (Settings page)
Last Modified: 12/18/2017
*/
//import pages packages providers
import { Component, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { NavController, Content, AlertController, ModalController, ViewController } from 'ionic-angular';
import { LogoutProvider } from '../../providers/logout/logout';
import { LoadingProvider } from '../../providers/loading/loading';
import { DataProvider } from '../../providers/data/data';
import { AlertProvider } from '../../providers/alert/alert';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { Validator } from '../../validator';
import 'rxjs/add/operator/take';
import { Login } from '../../login';
import { ImageProvider } from '../../providers/image/image';
import { Camera } from '@ionic-native/camera';
//This page contains all functions for the settings page
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  //gets content element from settings.html
  @ViewChild(Content) content: Content;
  //sets defaults for our toolbar object
  showToolbar:boolean = false;
  headerImgSize:string = '100%';
  headerImgUrl:string = '';
  transition:boolean = false;
  private subscription: any;
  private user: any;
  private alert;
  constructor(public navCtrl: NavController, public ref: ChangeDetectorRef,  public loadingProvider: LoadingProvider,
    public dataProvider: DataProvider,  public alertCtrl: AlertController,  public logoutProvider: LogoutProvider, 
    public alertProvider: AlertProvider, public angularfire: AngularFireDatabase, public viewCtrl:ViewController,
  public imageProvider:ImageProvider, public camera:Camera) {
  }
//handles functions that happen every time the page is loaded
  ionViewDidLoad() {
    this.getUserData();
  }
  //gets user data and subscribes
  getUserData(){
    this.loadingProvider.show();
    this.subscription=this.dataProvider.getCurrentUser().subscribe((user) => {
      this.loadingProvider.hide();
      this.user = user;
    });
  }
  //handles functions that happen everytime a page is exited
  ionViewDidLeave(){
    //if we are subscribed to a user, we unsubscribe to increase app performance.
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
  //this function dismisses the settings modal
  close(){
    this.viewCtrl.dismiss();
  }
  //detects/handles scroll events
  onScroll($event: any){
    let scrollTop = $event.scrollTop;
    this.showToolbar = scrollTop >= 120;
    if(scrollTop < 0){
        this.transition = false;
        this.headerImgSize = `${ Math.abs(scrollTop)/2 + 100}%`;
    }else{
        this.transition = true;
        this.headerImgSize = '100%'
    }
    this.ref.detectChanges();
}
 // Change user's email. Uses Validator.ts to validate the entered email. After, update the userData on database.
  // When the user changed their email, they have to confirm the new email address.
  setEmail() {
    this.alert = this.alertCtrl.create({
      title: 'Change Email Address',
      message: "Please enter a new email address.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Your Email Address',
          value: this.user.email
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => { }
        },
        {
          text: 'Save',
          handler: data => {
            let email = data["email"];
            //Check if entered email is different from the current email
            if (this.user.email != email) {
              //Check if email is valid.
              if (Validator.profileEmailValidator.pattern.test(email)) {
                this.loadingProvider.show();
                // Update email on Firebase.
                firebase.auth().currentUser.updateEmail(email)
                  .then((success) => {
                    // Update userData on Database.
                    this.angularfire.object('/accounts/' + this.user.userId).update({
                      email: email
                    }).then((success) => {
                      Validator.profileEmailValidator.pattern.test(email);
                      // Check if emailVerification is enabled, if it is go to verificationPage.
                      if (Login.emailVerification) {
                        if (!firebase.auth().currentUser.emailVerified) {
                          this.navCtrl.setRoot(Login.verificationPage);
                        }
                      }
                    }).catch((error) => {
                      this.alertProvider.showErrorMessage('profile/error-change-email');
                    });
                  })
                  .catch((error) => {
                    //Show error
                    this.loadingProvider.hide();
                    let code = error["code"];
                    this.alertProvider.showErrorMessage(code);
                    if (code == 'auth/requires-recent-login') {
                      this.logoutProvider.logout();
                    }
                  });
              } else {
                this.alertProvider.showErrorMessage('profile/invalid-email');
              }
            }
          }
        }
      ]
    }).present();
  }
//changes the users name. Uses Validator.ts to check the validity of the name selected
setName() {
  this.alert = this.alertCtrl.create({
    title: 'Change Profile Name',
    message: "Please enter a new profile name.",
    inputs: [
      {
        name: 'name',
        placeholder: 'Your Name',
        value: this.user.name
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => { }
      },
      {
        text: 'Save',
        handler: data => {
          let name = data["name"];
          // Check if entered name is different from the current name
          if (this.user.name != name) {
            // Check if name's length is more than five characters
            if (name.length >= Validator.profileNameValidator.minLength) {
              // Check if name contains characters and numbers only.
              if (Validator.profileNameValidator.pattern.test(name)) {
                this.loadingProvider.show();
                let profile = {
                  displayName: name,
                  photoURL: this.user.photoURL
                };
                // Update profile on Firebase
                firebase.auth().currentUser.updateProfile(profile)
                  .then((success) => {
                    // Update userData on Database.
                    this.angularfire.object('/accounts/' + this.user.userId).update({
                      name: name
                    }).then((success) => {
                      Validator.profileNameValidator.pattern.test(name); //Refresh validator
                      this.alertProvider.showProfileUpdatedMessage();
                    }).catch((error) => {
                      this.alertProvider.showErrorMessage('profile/error-update-profile');
                    });
                  })
                  .catch((error) => {
                    // Show error
                    this.loadingProvider.hide();
                    let code = error["code"];
                    this.alertProvider.showErrorMessage(code);
                    if (code == 'auth/requires-recent-login') {
                      this.logoutProvider.logout();
                    }
                  });
              } else {
                this.alertProvider.showErrorMessage('profile/invalid-chars-name');
              }
            } else {
              this.alertProvider.showErrorMessage('profile/name-too-short');
            }
          }
        }
      }
    ]
  }).present();
}
//changes the users password uses validator.ts to check the validity of the password entered
setPassword() {
  this.alert = this.alertCtrl.create({
    title: 'Change Password',
    message: "Please enter a new password.",
    inputs: [
      {
        name: 'currentPassword',
        placeholder: 'Current Password',
        type: 'password'
      },
      {
        name: 'password',
        placeholder: 'New Password',
        type: 'password'
      },
      {
        name: 'confirmPassword',
        placeholder: 'Confirm Password',
        type: 'password'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => { }
      },
      {
        text: 'Save',
        handler: data => {
          let currentPassword = data["currentPassword"];
          let credential = firebase.auth.EmailAuthProvider.credential(this.user.email, currentPassword);
          // Check if currentPassword entered is correct
          this.loadingProvider.show();
          firebase.auth().currentUser.reauthenticateWithCredential(credential)
            .then((success) => {
              let password = data["password"];
              // Check if entered password is not the same as the currentPassword
              if (password != currentPassword) {
                if (password.length >= Validator.profilePasswordValidator.minLength) {
                  if (Validator.profilePasswordValidator.pattern.test(password)) {
                    if (password == data["confirmPassword"]) {
                      // Update password on Firebase.
                      firebase.auth().currentUser.updatePassword(password)
                        .then((success) => {
                          this.loadingProvider.hide();
                          Validator.profilePasswordValidator.pattern.test(password);
                          this.alertProvider.showPasswordChangedMessage();
                        })
                        .catch((error) => {
                          this.loadingProvider.hide();
                          let code = error["code"];
                          this.alertProvider.showErrorMessage(code);
                          if (code == 'auth/requires-recent-login') {
                            this.logoutProvider.logout();
                          }
                        });
                    } else {
                      this.alertProvider.showErrorMessage('profile/passwords-do-not-match');
                    }
                  } else {
                    this.alertProvider.showErrorMessage('profile/invalid-chars-password');
                  }
                } else {
                  this.alertProvider.showErrorMessage('profile/password-too-short');
                }
              }
            })
            .catch((error) => {
              //Show error
              this.loadingProvider.hide();
              let code = error["code"];
              this.alertProvider.showErrorMessage(code);
            });
        }
      }
    ]
  }).present();
}
//Sets username and validates input using validator.ts
setUsername() {
  this.alert = this.alertCtrl.create({
    title: 'Change Username',
    message: "Please enter a new username.",
    inputs: [
      {
        name: 'username',
        placeholder: 'Your Username',
        value: this.user.username
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => { }
      },
      {
        text: 'Save',
        handler: data => {
          let username = data["username"];
          // Check if entered username is different from the current username
          if (this.user.username != username) {
            this.dataProvider.getUserWithUsername(username).take(1).subscribe((userList) => {
              if (userList.length > 0) {
                this.alertProvider.showErrorMessage('profile/error-same-username');
              } else {
                this.angularfire.object('/accounts/' + this.user.userId).update({
                  username: username
                }).then((success) => {
                  this.alertProvider.showProfileUpdatedMessage();
                }).catch((error) => {
                  this.alertProvider.showErrorMessage('profile/error-update-profile');
                });
              }
            });
          }
        }
      }
    ]
  }).present();
}
//sets profile photo from camera or gallery
setPhoto() {
  // Ask if the user wants to take a photo or choose from photo gallery.
  this.alert = this.alertCtrl.create({
    title: 'Set Profile Photo',
    message: 'Do you want to take a photo or choose from your photo gallery?',
    buttons: [
      {
        text: 'Cancel',
        handler: data => { }
      },
      {
        text: 'Choose from Gallery',
        handler: () => {
          // Call imageProvider to process, upload, and update user photo.
          this.imageProvider.setProfilePhoto(this.user, this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Take Photo',
        handler: () => {
          // Call imageProvider to process, upload, and update user photo.
          this.imageProvider.setProfilePhoto(this.user, this.camera.PictureSourceType.CAMERA);
        }
      }
    ]
  }).present();
}
//sets phone number **NEED TO ADD PHONE NUMBER PATTERN VALIDATORS**
setPhone() {
  this.alert = this.alertCtrl.create({
    title: 'Change Phone Number',
    message: "Please enter a new phone number.",
    inputs: [
      {
        name: 'phone',
        placeholder: 'Your Phone',
        value: this.user.phone
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => { }
      },
      {
        text: 'Save',
        handler: data => {
          let phone = data["phone"];
          // Check if entered username is different from the current username
          if (this.user.phone != phone) {
            this.dataProvider.getUserWithPhone(phone).take(1).subscribe((userList) => {
              if (userList.length > 0) {
                this.alertProvider.showErrorMessage('profile/error-same-phone');
              } else {
                this.angularfire.object('/accounts/' + this.user.userId).update({
                  phone: phone
                }).then((success) => {
                  this.alertProvider.showProfileUpdatedMessage();
                }).catch((error) => {
                  this.alertProvider.showErrorMessage('profile/error-update-profile');
                });
              }
            });
          }
        }
      }
    ]
  }).present();
}

}
