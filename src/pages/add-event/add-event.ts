import { Component, ViewChild,ChangeDetectorRef  } from '@angular/core';
import { NavController, NavParams, Content, ViewController } from 'ionic-angular';

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
  public trips:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public ref:ChangeDetectorRef, public viewCtrl: ViewController) {
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
