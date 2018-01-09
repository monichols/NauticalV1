import { Component, ViewChild,ChangeDetectorRef  } from '@angular/core';
import { NavController, NavParams, Content, ViewController } from 'ionic-angular';
import * as moment from 'moment';
import * as firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {AlertProvider} from '../../providers/alert/alert';
/**
 * Generated class for the AddEventPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {
  @ViewChild(Content) content: Content;
  showToolbar:boolean = false;
  headerImgSize:string = '100%';
  headerImgUrl:string = '';
  transition:boolean = false;
  private subscription1;
  public trips:any;
  private trip:any;
  private start:any;
  private title;
  private details;
  private end:any;
  private cost: any = 0;
  private allocated;
  private img='assets/images/adventure.jpeg'; 
  private eventStart:any;
  private eventEnd:any=this.eventStart;
  private category:any = 'Adventure';
  private categoryAllocated:any;
  private categories= [{id:'Other'},{id:'Entertainment/Night Life'},{id:'Adventure'},{id:'Meeting/Conference'},{id:'Gratuity'},{id:'Goods/Souveniers'},
  {id:'Travel'},{id:'Hotel/Accomodations'},{id:'Transportation'}];
  constructor(public navCtrl: NavController, public navParams: NavParams, public ref:ChangeDetectorRef, public viewCtrl: ViewController,
  private db:AngularFireDatabase, private alertProvider:AlertProvider) {
  this.trip = this.navParams.get('trip');
  this.start = moment(this.trip.start).toISOString();
  this.end = moment(this.trip.end).toISOString();
  this.eventStart = this.start;
  this.eventEnd = this.eventStart;
  this.categories.sort((a: any, b: any) => {
    let item1 = a.id;
    let item2 = b.id;
    if (item1 < item2) {
      return -1;
    } else if (item1 > item2) {
      return 1;
    } else {
      return 0;
    }
  });
  this.subscription1 = this.db.object('/trips/'+this.trip.$key).subscribe(res =>{
  this.allocated = res.allocated;
  });
  }

changeImg(){
  console.log(this.category);
    if(this.category == 'Other'){
      this.img='assets/images/event-default.jpeg';
    }
    if(this.category == 'Meeting/Conference'){
      this.img='assets/images/meetings.jpeg';
    }  
    if(this.category == 'Entertainment/Night Life'){
      this.img='assets/images/entertainment.jpeg';
    } 
    if(this.category == 'Adventure'){
      this.img='assets/images/adventure.jpeg';
    }
    if(this.category == 'Hotel/Accomodations'){
      this.img='assets/images/hotel.jpeg';
    } 
    if(this.category == 'Gratuity'){
      this.img='assets/images/gratuity.jpeg';
    }
    if(this.category == 'Goods/Souveniers'){
      this.img='assets/images/goods.jpeg' 
    }
    if(this.category == 'Travel'){
      this.img='assets/images/travel.jpeg' 
    }
    if(this.category == 'Transportation'){
      this.img='assets/images/transportation.jpeg' 
    }


}
submit(){
let category = this.category.replace(' ','_');
let event = {title:this.title,start:this.eventStart,end:this.eventEnd,category:this.category,details:this.details,cost:this.cost,img:this.img};
let allocated = this.allocated + this.cost;
this.db.list('/trips/'+this.trip.$key+'/events/'+category).push(event).then((success) =>{
  this.db.object('/trips/'+this.trip.$key).update({allocated:allocated}).then((success)=>{
    this.alertProvider.showEventAdded();
  })
  this.close();
  });
}
ionViewWillLeave(){
  if(this.subscription1){
    this.subscription1.unsubscribe();
  }
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
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
close(){
  this.viewCtrl.dismiss();
}

}
