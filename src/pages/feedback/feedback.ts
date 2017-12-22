import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { DataProvider } from '../../providers/data/data';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';
import { AngularFireDatabase } from "angularfire2/database";
import moment from 'moment';
/**
 * Generated class for the FeedbackPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
type;
title='';
subject;
body;
user;
date=moment();
isenabled:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController,
    private emailComposer: EmailComposer,  public dataProvider: DataProvider, public loadingProvider: LoadingProvider,
    private af: AngularFireDatabase, public alertProvider:AlertProvider) {
      this.dataProvider.getCurrentUser().subscribe((user) => {
        this.loadingProvider.hide();
        this.user = user;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
    this.type = this.navParams.get('type');
    console.log(this.type);
    if(this.type == 0){
      this.title = 'Support';
    }else{
      this.title = 'Feedback';
    }
 
  }
  onChange(input1, input2){
    if(input1.length > 0 && input2.length){
      if(input2.length <= 50 && input1.length <=2000){
        this.isenabled = true;
      }else{
        this.isenabled = false;
      }
      
    } else{
      this.isenabled = false;
    }
  }
  close(data){
    this.viewCtrl.dismiss(data);
  }
  send(subject,body){
    const date = Date();
    const userId = this.user.userId;
    const name = this.user.name;
    const html = `
    <div>From:${this.user.name} </div>
    <div>Email: <a href="mailto:${this.user.email}">${this.user.email}</a></div>
    <div>Date: ${date}</div>
    <div>Subject: ${subject}</div>
    <div>Message: ${body}</div>
  `;

    this.af.list('/internalMessages/'+this.title).push({ subject, body, html, userId, name }).then((success)=>{
      this.title = "";
      this.subject = "";
      this.body = "";
      let data='true';
      this.close(data);
    }).catch((err)=>{let data='false';
    this.close(data);})

      
    
  }

  


}
