import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VirtualcardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-virtualcard',
  templateUrl: 'virtualcard.html',
})
export class VirtualcardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VirtualcardPage');
  }

  // Event Handler for Toggle Button
  
  // Event Handler for Add Cash Button
  addCashButton(){
    alert("Add Cash Button");
  }

  // Event Handler for Cash Out Button
  cashOutButton(){
    alert("Cash Out Button");
  }
}
