import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import {NavController, NavParams, Content, ModalController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Slides } from 'ionic-angular';
import {AddEventPage} from '../add-event/add-event';
import * as firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
/**
 * Generated class for the OverviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html',
})

export class OverviewPage {
@ViewChild('doughnutCanvas') doughnutCanvas;
@ViewChild('doughnutCanvas') doughnutCanvasAdventure;
@ViewChild(Slides) slides: Slides;
@ViewChild(Content) content: Content;
showToolbar:boolean = false;
headerImgSize:string = '100%';
headerImgUrl:string = '';
transition:boolean = false;
private trip;
private doughnutChart: any;
private doughnutChartAdventure: any;
private view = "0";
private remaining;
private allocated;
private s1;
private tripKey;
private categories: any =[];
private cat;
  constructor(public navCtrl: NavController, public navParams: NavParams, private ref:ChangeDetectorRef, 
    private modalCtrl:ModalController, private db: AngularFireDatabase) {
    this.tripKey = this.navParams.get('trip');
    this.s1 = this.db.object('/trips/'+this.tripKey).subscribe((res)=>{
      this.trip = res;
      this.remaining = (this.trip.cost - this.trip.allocated);
    })

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
back(){
  this.navCtrl.pop();
}
  ionViewDidLoad() {

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
          labels: ["Allocated Funds (USD)","Remaining Budget (USD)"],
          datasets: [{
              label: 'Budget Overview',
              data: [this.trip.allocated,this.remaining],
              backgroundColor: [
                  'rgba(198, 166, 32, 1)',
                  'rgba(236, 237, 239, 1)'
              ]
          }]
      },
      options:{
        cutoutPercentage:80,
        rotation:0.5 * Math.PI,
        legend: {
          display: false,
      },
      title:{
      display:true,
      text:['Total Budget',Math.round(this.trip.allocated/this.trip.cost)+'%'],
      position:'bottom'
      }
      
      },
 
  });
  }
  addEvent(){
    let addEventModal = this.modalCtrl.create(AddEventPage,{trip:this.trip});
    addEventModal.present();
  }

}
