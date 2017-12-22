/*
DEV: Monique Nichols
Product: Nautical
File: Account.ts (Account page)
Last Modified: 12/18/2017
*/
//pages, providers, and packages imports
import { Component, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { Platform, NavController, Content, AlertController, ModalController, ActionSheetController } from 'ionic-angular';
import { LogoutProvider } from '../../providers/logout/logout';
import { LoadingProvider } from '../../providers/loading/loading';
import { DataProvider } from '../../providers/data/data';
import {SettingsPage} from '../settings/settings'
import {FeedbackPage} from '../feedback/feedback';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ImageProvider } from '../../providers/image/image';
import { AlertProvider } from '../../providers/alert/alert';
import * as moment from 'moment';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';
//this page contains all of the functions associated with the account page.
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  //gets the content element from account.html
  @ViewChild(Content) content: Content;
  //sets the default settings for our toolbar
  showToolbar:boolean = false;
  headerImgSize:string = '100%';
  headerImgUrl:string = '';
  transition:boolean = false;
  private user: any;
  private subscription:any;
  private subscription2:any;
  private alert;
  public sendTo   : any;
  public subject  : string = 'Plan your next getaway with Nautical!';
  public message  : string = 'Save money with friends, plan events, and make memories that will last a lifetime!';
  public image    : string   = 'https://travel.gc.ca/vt/images/promo/travel-insurance-bag.jpg';
  public uri      : string   = 'http://masteringionic.com/products/product-detail/s/mastering-ionic-2-e-book';
  private upcoming =[];
  private past =[];
  constructor(public navCtrl: NavController, public ref: ChangeDetectorRef,  public loadingProvider: LoadingProvider,
    public dataProvider: DataProvider,  public alertCtrl: AlertController,  public logoutProvider: LogoutProvider, public modalCtrl:ModalController,
  public actionSheetCtrl:ActionSheetController,public alertProvider:AlertProvider, public imageProvider:ImageProvider, private _SHARE: SocialSharing, public platform:Platform, public angularfire:AngularFireDatabase) {

  }
  ionViewDidLoad(){
    this.getUser();
  }
  //handles events that happen when a user exits this tab.
  ionViewDidLeave(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
    if(this.subscription2){
      this.subscription2.unsubscribe();
    }
  }
  //gets current user information
  getUser(){
    this.loadingProvider.show();//shows loading provider
    //subscribes to user information from the database
    this.subscription = this.dataProvider.getCurrentUser().subscribe((user) => {
      this.user = user;//sets user equal to user data
      if(user.trips){
        //iterates through user.trips data
        for(var i = 0; i<user.trips.length; i++){
        //gets user trips
         this.subscription2 = this.dataProvider.getTrip(user.trips[i]).subscribe(trip =>{
          this.classifyTrip(trip);
          })
        }
      }
      this.loadingProvider.hide();//hides loader
    });
  }
//classifies trips based off of in the past or in the future
  classifyTrip(trip){
    var a = moment(trip.start);//gets trip start
    var b = moment();//gets current time/date
      var diff =a.diff(b, 'days');//calculates difference between the two in days
      //handles events that are in the past
      if(diff < 0){
        if(this.past.indexOf(trip.$key)==-1){
          this.past.push(trip.$key);
        }
      }else 
      //handles events that are in the future
      if(diff > 0){
        if(this.upcoming.indexOf(trip.$key)==-1){
          this.upcoming.push(trip.$key);
        }
      }
  }
  //controls the menu that appears when users select the more icon button in the navBar
  menu(){
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Modify your album',
        buttons: [
          {
            text: 'Invite Friends',//allows users to invite friends to nautical
            handler: () => {
              this.share();
            }
          },
          {
            text: 'Settings',//allows users to adjust their account settings
            handler: () => {
              this.goSettings();
            }
          },
          {
            text: 'Support & Feedback',//allows users to contribute support and feedback requests
            handler: () => {
              this.goFeedback();
            }
          },
          {
            text: 'Sign-Out',//allows users to signout
            handler: () => {
              this.logout();
            }
          },
          {
            text: 'Delete Account',//allows users to delete their account
            handler: () => {
              this.deleteAccount();
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
  }
  //controls the menu that appears when a user selects more from the list of options
  more(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'More Options',
      buttons: [
        {
          text: 'Delete Account',
          role: 'destructive',
          handler: () => {
            this.deleteAccount();//allows users to delete their account
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  //controls the delete account function
  deleteAccount() {
    this.alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete your account? This cannot be undone.',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Delete',
          handler: data => {
            this.loadingProvider.show();//show loader
            // Delete Firebase user
            firebase.auth().currentUser.delete()
              .then((success) => {
                // Delete profilePic of user on Firebase storage
                this.imageProvider.deleteUserImageFile(this.user);
                // Delete user data on Database
                this.angularfire.object('/accounts/' + this.user.userId).remove().then(() => {
                  this.loadingProvider.hide();//hides loader
                  this.alertProvider.showAccountDeletedMessage();//shows success message
                  this.logoutProvider.logout();//logout user
                });
              })
              .catch((error) => {
                this.loadingProvider.hide();//hide loader
                let code = error["code"];
                this.alertProvider.showErrorMessage(code);//show error message
                //handles needs reauthentication error
                if (code == 'auth/requires-recent-login') {
                  this.logoutProvider.logout();
                }
              });
          }
        }
      ]
    }).present();
  }
//controls share sheet
  share()
  {
     this.platform.ready()
     .then(() =>
     {
        this._SHARE.share(this.message, this.subject, this.image, this.uri)
        .then((data) =>
        {
           console.log('Shared via SharePicker');
        })
        .catch((err) =>
        {
           console.log('Was not shared via SharePicker');
        });
     });
  }
//detects scroll event
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
//controls user logouts
logout() {
  this.alert = this.alertCtrl.create({
    title: 'Confirm Logout',
    message: 'Are you sure you want to logout?',
    buttons: [
      {
        text: 'Cancel'
      },
      {
        text: 'Logout',
        handler: data => { this.logoutProvider.logout(); }
      }
    ]
  }).present();
}
//takes user to settings to modify account
goSettings(){
  let settingsModal= this.modalCtrl.create(SettingsPage);
  settingsModal.present();
}
//shows options for feedback
goFeedback(){
    let alert = this.alertCtrl.create({
      title: 'Support & Feedback',
      buttons: [
        {
          text: "Something Isn't Working",
          handler: () => {
            let feedbackModal= this.modalCtrl.create(FeedbackPage,{'type':0});//creates support page
            feedbackModal.onDidDismiss((data)=>{
              //if user entered data show successmessage
              if(data){
                this.alertProvider.showSupportkMessage();
              }
            })
            feedbackModal.present();
          }
        },
        {
          text: "General Feedback",
          handler: () => {
            let feedbackModal= this.modalCtrl.create(FeedbackPage,{'type':1});//creates feedback page
            feedbackModal.onDidDismiss((data)=>{
              //if user entered data show successmessage
              if(data){
                this.alertProvider.showFeedbackMessage();
              }
            })
            feedbackModal.present();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }
}
