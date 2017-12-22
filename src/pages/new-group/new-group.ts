import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, AlertController, App, Content, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImageProvider } from '../../providers/image/image';
import { LoadingProvider } from '../../providers/loading/loading';
import { DataProvider } from '../../providers/data/data';
import { AlertProvider } from '../../providers/alert/alert';
import { Validator } from '../../validator';
import { Camera } from '@ionic-native/camera';
import { AngularFireDatabase } from 'angularfire2/database';
import { GroupPage } from '../group/group';
import { MessagePage } from '../message/message';
import {AddMembersPage} from '../add-members/add-members'
import * as firebase from 'firebase';
//import { SearchPeoplePage } from '../search-people/search-people';

@Component({
  selector: 'page-new-group',
  templateUrl: 'new-group.html'
})
export class NewGroupPage {
  @ViewChild(Content) content: Content;
  private friends: any;
  private searchUser: any;
  private account: any
  private excludedIds: any;
  private group: any;
  private groupForm: FormGroup;
 // private friends: any;
  private searchFriend: any;
  private groupMembers: any;
  private alert: any;
 // private excludedIds: any
 showToolbar:boolean = false;
 headerImgSize:string = '100%';
 headerImgUrl:string = '';
 transition:boolean = false;
  trip;
  trips;
  userId;
  // NewGroupPage
  // This is the page where the user can start a new group chat with their friends.
  constructor(public navCtrl: NavController, public navParams: NavParams, public imageProvider: ImageProvider, public dataProvider: DataProvider, public formBuilder: FormBuilder,
    public alertProvider: AlertProvider, public alertCtrl: AlertController, public angularfire: AngularFireDatabase, public app: App, public loadingProvider: LoadingProvider, 
    public camera: Camera, private ref:ChangeDetectorRef, public modalCtrl:ModalController) {
    // Create our groupForm based on Validator.ts
    this.userId = firebase.auth().currentUser.uid;
    this.groupForm = formBuilder.group({
      name: Validator.groupNameValidator
      //description: Validator.groupDescriptionValidator
    });
    this.trip = this.navParams.get('type');
  }
  addMember(){
    let searchPage=this.modalCtrl.create(AddMembersPage);
    var that = this;
    searchPage.onDidDismiss(data =>{
      if(that.groupMembers.indexOf(data)==-1){
        that.groupMembers.push(data);
        console.log(JSON.stringify(this.groupMembers))
      }
    })
    searchPage.present();
  }

  ionViewDidLoad() {
    // Initialize
this.group = {
      img: 'assets/images/set.png'
    };
    this.searchFriend = '';

    // Get user's friends to add to the group.
    this.dataProvider.getCurrentUser().subscribe((account) => {
      this.excludedIds = [];
      if (!this.groupMembers) {
        this.groupMembers = [account]
      }
      if (this.excludedIds.indexOf(account.$key) == -1) {
        this.excludedIds.push(account.$key);
      }
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
      });
  
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

  // Back
  back() {
    if (this.group)
      this.imageProvider.deleteImageFile(this.group.img);
    this.navCtrl.pop();
  }

  // Proceed with group creation.
  done() {
    this.loadingProvider.show();
    var messages = [];
    // Add system message that group is created.
    messages.push({
      date: new Date().toString(),
      sender: firebase.auth().currentUser.uid,
      type: 'system',
      message: 'This group has been created.',
      icon: 'md-chatbubbles'
    });
    // Add members of the group.
    var members = [];
    for (var i = 0; i < this.groupMembers.length; i++) {
      members.push(this.groupMembers[i].$key);
    }
    // Add group info and date.
    this.group.dateCreated = new Date().toString();
    this.group.messages = messages;
    this.group.members = members;
    this.group.name = this.groupForm.value["name"];
 
    this.angularfire.list('groups').push(this.group).then((success) => {
      let groupId = success.key;
      // Add group reference to users.
      this.angularfire.object('/accounts/' + this.groupMembers[0].$key + '/groups/' + groupId).update({
        messagesRead: 1
      });
      for (var i = 1; i < this.groupMembers.length; i++) {
        this.angularfire.object('/accounts/' + this.groupMembers[i].$key + '/groups/' + groupId).update({
          messagesRead: 0
        });
      }
      // Open the group chat of the just created group.
      this.navCtrl.popToRoot().then(() => {
        this.loadingProvider.hide();
        this.app.getRootNav().push(MessagePage, { groupId: groupId });
      });
    });
  }

  // Add friend to members of group.
  addToGroup(friend) {
    this.groupMembers.push(friend);
  }

  // Remove friend from members of group.
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

  // Check if friend is already added to the group or not.
  inGroup(friend) {
    for (var i = 0; i < this.groupMembers.length; i++) {
      if (this.groupMembers[i].$key == friend.$key) {
        return true;
      }
    }
    return false;
  }

  // Toggle to add/remove friend from the group.
  addOrRemoveFromGroup(friend) {
    if (this.inGroup(friend)) {
      this.removeFromGroup(friend);
    } else {
      this.addToGroup(friend);
      //console.log(this.friends);
    }
  }
  getStatus(user) {
    // Returns:
    // 0 when user can be requested as friend.
    // 1 when a friend request was already sent to this user.
    // 2 when this user has a pending friend request.
    if (this.friends) {
      for (var i = 0; i < this.friends.length; i++) {
        if (this.friends[i].$key == user.$key) {
          return 1;
        }
      }
    }
    return 0;
  }
  

  // Set group photo.
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

  // Search people to add as friend.
  /*searchPeople() {
    this.navCtrl.push(SearchPeoplePage);
  }*/
}
