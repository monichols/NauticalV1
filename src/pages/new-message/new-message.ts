import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NavController, NavParams, App, Content } from 'ionic-angular';
//import { SearchPeoplePage } from '../search-people/search-people';
import { MessagePage } from '../message/message';
import { DataProvider } from '../../providers/data/data';
import { LoadingProvider } from '../../providers/loading/loading';

@Component({
  selector: 'page-new-message',
  templateUrl: 'new-message.html'
})

export class NewMessagePage {
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

  // NewMessagePage
  // This is the page where the user are asked to select a friend whom they want to start a conversation with.
  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App, public dataProvider: DataProvider,
    public loadingProvider: LoadingProvider, public ref: ChangeDetectorRef) { }

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
    // Initialize
   
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

  // Back
  back() {
    this.navCtrl.pop();
  }

  // Add or update friend for real-time sync.
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

  // Search people.
  searchPeople() {
    //this.navCtrl.push(SearchPeoplePage);
  }

  // Open chat with this user.
  message(userId) {
    this.navCtrl.push(MessagePage, { userId: userId });
  }
}
