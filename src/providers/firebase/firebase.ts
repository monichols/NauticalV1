import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';
//import { NavController, NavParams, Content, AlertController, ModalController, ActionSheetController } from 'ionic-angular';
import * as firebase from 'firebase';
import {LoadingProvider} from '../loading/loading';
import {AlertProvider} from '../alert/alert';
/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  constructor( public angularfire:AngularFireDatabase, public loadingProvider:LoadingProvider,
  public alertProvider:AlertProvider) {
    console.log('Hello FirebaseProvider Provider');
  }
  deleteConversation(userId, conversation, convo){
console.log(userId);
var temp = conversation.users.splice(conversation.users.indexOf(userId), 1);
this.angularfire.object('/conversations/'+ conversation.$key).update({
  users: temp,
  messages: conversation.messages
}).then((success) => {
  this.angularfire.object('/accounts/' + firebase.auth().currentUser.uid + '/conversations/' + convo.$key).remove().then(() => {
 conversation = null;
 console.log('success');
    setTimeout(() => {
      this.loadingProvider.hide();
      //this.navCtrl.popToRoot();
    }, 300);
  });
}).catch((error) => {
  this.loadingProvider.hide();
  this.alertProvider.showErrorMessage('group/error-leave-group');
});
  }
}
