import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import {NavController, AlertController, NavParams, ViewController, Content, ModalController } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { Camera } from '@ionic-native/camera';
import { ImageProvider } from '../../providers/image/image';
import { DataProvider } from '../../providers/data/data';
import {AlertProvider} from '../../providers/alert/alert';
import {AddMembersPage} from '../../pages/add-members/add-members';
import { CalendarController } from "ion2-calendar";

/**
 * Generated class for the AddTripPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-add-trip',
  templateUrl: 'add-trip.html'
})
export class AddTripPage {
  @ViewChild(Content) content: Content;
  showToolbar:boolean = false;
  headerImgSize:string = '100%';
  headerImgUrl:string = '';
  transition:boolean = false;
  public trips:any;
start;
public _Members:any;
end;
location;
private cost: any=0;
alert;
_trips;
private members:any;
images =['assets/images/default1.jpeg', 'assets/images/default2.jpeg', 'assets/images/default3.jpeg', 'assets/images/default4.jpeg', 'assets/images/default5.jpeg']
image;
private friends: any;
private group: any;
private groupMembers: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController, public dataProvider:DataProvider, public angularFire: AngularFireDatabase, public camera:Camera,
  public imageProvider:ImageProvider, public alertCtrl:AlertController, public ref:ChangeDetectorRef,
public modalCtrl:ModalController, public calendarCtrl: CalendarController, private alertProvider:AlertProvider) {

  this.members=[];
  this._Members=[];

  this.image=this.images[Math.floor(Math.random() * this.images.length)];
  }

  dateRange() {
    this.calendarCtrl.openCalendar({
  
     pickMode: 'range', // 'multi', 'range', 'single'
    weekdays: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
 monthFormat: 'MMM yyyy',
 color: 'dark' // 'primary' | 'secondary' | 'danger' | 'light' | 'dark'
     
    })
      .then( (res:any) => { this.start=new Date(res.from.time).toDateString(); this.end=new Date(res.to.time).toDateString(); })
      .catch( () => {} )
  }

  
  removeMember(member){
    if(this.members.indexOf(member) > -1){
      this.members.splice(this.members.indexOf(member),1);
  }

  }



  ionViewDidLoad() {
    this.group = {
      img: this.image
    };
  
    this.dataProvider.getCurrentUser().subscribe((account) => {
      if (!this.groupMembers) {
        this.groupMembers = [account]
      }
      if (account.friends) {
        for (var i = 0; i < account.friends.length; i++) {
          this.dataProvider.getUser(account.friends[i]).subscribe((friend) => {
            this.addOrUpdateFriend(friend);
          });
        }
      } else {
        this.friends = [];
      }
    });
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

  addOrUpdateFriend(friend) {
    if (!this.friends) {
      this.friends = [friend];
    } else {
      var index = -1;
      for (var i = 0; i < this.friends.length; i++) {
        if (this.friends[i].$key == friend.$key) {
          index = i;
        }
      }
      if (index > -1) {
        this.friends[index] = friend;
      } else {
        this.friends.push(friend);
      }
    }
  }
  close() {
    if (this.group)
      this.imageProvider.deleteImageFile(this.group.img);
    this.navCtrl.pop();
  }


  submit(){
    this._Members=[firebase.auth().currentUser.uid];
    if(this.members){
      this.members.forEach((member)=>{
        this._Members.push(member.userId);
      });
    }
    let start = this.start,
        end= this.end,
        location=this.location,
        cost=this.cost,
        trips = this.angularFire.list('/trips');
    trips.push({
      created: new Date().toString(),
      start:start,
      end:end,
      location:location,
      cost:cost,
      owner:firebase.auth().currentUser.uid,
      members:this._Members,
      img:this.group.img,
      saved:0,
      allocated:0
    }).then((data)=>
    this.push2(data.key)
  );
  this.alertProvider.showTripCreated();
    this.navCtrl.pop();
  }
  push2(key){
    this._Members.forEach((member)=>{
      this._trips=[];
      this.dataProvider.getUser(member).subscribe((user)=>{
        this._trips=[key];
        if(user.trips){
          for(var i=0; i<user.trips.length; i++){
            if(this._trips.indexOf(user.trips[i])==-1){
              this._trips.push(user.trips[i]);
            }
          }
        }else{

        }
      })
      let Trips = this.angularFire.object('/accounts/'+member);
      Trips.update({
        trips:this._trips
      });
    })
  }
  addToGroup(friend) {
    this.groupMembers.push(friend);
  }
  inGroup(friend) {
    for (var i = 0; i < this.groupMembers.length; i++) {
      if (this.groupMembers[i].$key == friend.$key) {
        return true;
      }
    }
    return false;
  }
  addPeople(){
    let addModal = this.modalCtrl.create(AddMembersPage);
    addModal.onDidDismiss(data => {
      if(data){
        this.members.push(data);
      }
    });
    addModal.present();
  }
  addOrRemoveFromGroup(friend) {
    if (this.inGroup(friend)) {
      this.removeFromGroup(friend);
    } else {
      this.addToGroup(friend);
    }
  }
  removeFromGroup(friend) {
    var index = -1;
    for (var i = 1; i < this.groupMembers.length; i++) {
      if (this.groupMembers[i].$key == friend.$key) {
        index = i;
      }
    }
    if (index > -1) {
      this.groupMembers.splice(index, 1);
    }
  }
  setGroupPhoto() {
    this.alert = this.alertCtrl.create({
      title: 'Set Group Photo',
      message: 'Do you want to take a photo or choose from your photo gallery?',
      buttons: [
        {
          text: 'Cancel',
          handler: data => { }
        },
        {
          text: 'Choose from Gallery',
          handler: () => {
            this.imageProvider.setGroupPhoto(this.group, this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Take Photo',
          handler: () => {
            this.imageProvider.setGroupPhoto(this.group, this.camera.PictureSourceType.CAMERA);
          }
        }
      ]
    }).present();
  }

}
