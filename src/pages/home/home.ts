/*
DEV: Monique Nichols
Product: Nautical
File: Home.ts (Home page)
Last Modified: 12/18/2017
*/
//import of packages,pages, and providers
import { Component,ChangeDetectorRef, ViewChild } from '@angular/core';
import { App ,NavController, ModalController,Content  } from 'ionic-angular';
import {AddTripPage} from '../add-trip/add-trip';
import * as firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DataProvider } from '../../providers/data/data';
import * as moment from 'moment';
import {AgendaPage} from '../../pages/agenda/agenda';
import {OverviewPage} from '../../pages/overview/overview';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //gets content element from home.html
  @ViewChild(Content) content: Content;
  //sets default values
  showToolbar:boolean = false;
  headerImgSize:string = '100%';
  headerImgUrl:string = '';
  transition:boolean = false;
  private subscription;
  private subscr
  private userId;
  public trips:any;
  private tripsToShow: any=4;
  constructor(public app:App,public navCtrl: NavController, public modalCtrl:ModalController, public ref:ChangeDetectorRef,
  public dataProvider:DataProvider, public afDatabase:AngularFireDatabase) {
//sets value for this.userId
this.userId = firebase.auth().currentUser.uid;
  }
  //triggers everytime the page is loaded
  ionViewDidLoad() {
   this.getTrips();
}
ionViewDidLeave(){
  this.subscription.unsubscribe();
}
//gets all the trips
getTrips(){
  this.subscription = this.afDatabase.object('accounts/'+this.userId+'/trips').subscribe((_trips)=>{
    //if user has trips iterate through trips
    this.trips=[];
    if(_trips){
     for(var i =0; i<_trips.length; i++){
       //foreach trip subscribe only once and push into trips array
    this.dataProvider.getTrip(_trips[i]).take(1).subscribe((trip)=>{
         if(this.trips.indexOf(trip) == -1){ 
          this.trips.push(trip);
         }
         //calculates necessary trip info
         this.trips.forEach((trip)=>{
          var till = Math.abs(moment().diff(trip.start, 'hours'));
          var temp = moment().diff(trip.start, 'hours');
          var images=[];
          trip.members.forEach((member)=>{
            //gets user information of each trip member
          this.dataProvider.getUser(member).take(1).subscribe((user)=>{
            if(user.userId != this.userId){
              images.push(user.img);
            }
            })
          });
          trip.images=images;
        });
       });
      }
    }
  });
}
getClass(trip){
  if(trip.images.length == 2){
    return 'container2';
  }
  if(trip.images.length == 1){
    return 'container1';
  }
  if(trip.images.length >= 3){
    return 'container3';
  }
}
//takes users to addTrip page
  addTrip(){
    this.app.getRootNav().push(AddTripPage);
  }
  //takes users to agenda page
  viewTrip(trip){
    this.app.getRootNav().push(OverviewPage, {trip:trip.$key});
  }
//handles scroll events and detects changes
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
showTrips(){
  return this.tripsToShow;
}
//starts the infinite scroll
doInfinite(infiniteScroll){
  this.tripsToShow = this.tripsToShow + 4;
  setTimeout(() => {
   infiniteScroll.complete();
 }, 1000);
}
}
