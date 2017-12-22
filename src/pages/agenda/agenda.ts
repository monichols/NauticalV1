import { Component, ViewChild, ChangeDetectorRef  } from '@angular/core';
import { NavController, NavParams, Content, ModalController } from 'ionic-angular';
import * as moment from 'moment';
import {AddEventPage} from '../add-event/add-event';
/**
 * Generated class for the AgendaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html',
})
export class AgendaPage {
trip;
@ViewChild(Content) content: Content;
showToolbar:boolean = false;
headerImgSize:string = '100%';
headerImgUrl:string = '';
transition:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public ref: ChangeDetectorRef, public modalCtrl: ModalController) {
    this.trip=this.navParams.get('trip');
    var temp = moment(this.trip.start);
    var Temp = moment(this.trip.end);
    var month = temp.format('M');
    var Month = Temp.format('M');
    if(month == Month){
      this.trip.header = moment(this.trip.start).format("MMM DD")+' - '+moment(this.trip.end).format("DD");
    }else{
      if(month != Month){
        this.trip.header = moment(this.trip.start).format("MMM DD")+' - '+moment(this.trip.end).format("MMM DD");
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgendaPage');

  }
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

addEvent(){
  let eventModal = this.modalCtrl.create(AddEventPage);
  eventModal.present();
}

}
