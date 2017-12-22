import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NavController, NavParams, App, Content, ViewController } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DataProvider } from '../../providers/data/data';
import { LoadingProvider } from '../../providers/loading/loading';
/**
 * Generated class for the AddMembersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-add-members',
  templateUrl: 'add-members.html',
})
export class AddMembersPage {
public users: any;
public temp:FirebaseListObservable<any>;
private searchFriend: any;
private members:any;
@ViewChild(Content) content: Content;
private friends: any;
private searchUser: any;
private account: any
private excludedIds: any;
showToolbar:boolean = false;
headerImgSize:string = '100%';
headerImgUrl:string = '';
transition:boolean = false;
trip;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afDatabase :AngularFireDatabase,
  public dataProvider: DataProvider, public viewController: ViewController, public  ref: ChangeDetectorRef, public loadingProvider: LoadingProvider )
   {
    this.members=[];
    this.users=[];
    this.afDatabase.list('accounts/').subscribe((accounts)=>{
      accounts.forEach((account)=>{
        if(account.userId != firebase.auth().currentUser.uid){
          this.users.push(account);
        }else{
        }
      })
    })
  }
  back() {
    this.navCtrl.pop();
  }
  addFriend(friend){
this.viewController.dismiss(friend);
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

  ionViewDidLoad() {
    this.searchUser = '';
    this.loadingProvider.show();
    this.dataProvider.getCurrentUser().subscribe((account) => {
      this.excludedIds = [];
      this.account = account;
      if (this.excludedIds.indexOf(account.$key) == -1) {
        this.excludedIds.push(account.$key);
      }

    });
    // Get user's friends.
    this.dataProvider.getUsers().subscribe((accounts) => {
      if (accounts) {
        for (var i = 0; i < accounts.length; i++) {
          this.dataProvider.getUser(accounts[i].userId).subscribe((account) => {
            this.addOrUpdateFriend(account);
          });
        }
      } else {
        this.friends = [];
      }
      this.loadingProvider.hide();
    });

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
  submit(){
    this.viewController.dismiss(this.members);
  }
  addMember(friend){
    if(this.members.indexOf(friend)==-1){
      this.members.push(friend);
      this.users.splice(this.users.indexOf(friend),1);
    }else{

    }
  }
  removeMember(member){
    if(this.members.indexOf(member) > -1){
      this.members.splice(this.members.indexOf(member),1);
      this.users.push(member);
  }

}
cancel(){
  this.viewController.dismiss();
}
}