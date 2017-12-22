import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, App, ActionSheetController, AlertController, Content } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingProvider } from '../../providers/loading/loading';
import { DataProvider } from '../../providers/data/data';
import { AlertProvider } from '../../providers/alert/alert';
import { NewMessagePage } from '../new-message/new-message';
import { NewGroupPage } from '../new-group/new-group';
import { MessagePage } from '../message/message';
import { GroupPage } from '../group/group';
import * as firebase from 'firebase';
import { ItemSliding } from 'ionic-angular';
import {FirebaseProvider} from '../../providers/firebase/firebase';

//Group imports
import { AddTripPage } from '../add-trip/add-trip';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html'
})
export class MessagesPage {
  @ViewChild(Content) content: Content;
  showToolbar:boolean = false;
  headerImgSize:string = '100%';
  headerImgUrl:string = '';
  transition:boolean = false;
  private group: any;
  private conversations: any;
  private updateDateTime: any;
  private searchFriend: any;
  private groups: any;
  private user: any;
  private alert: any;
  private searchGroup: any;
  private conversation:any;
  
  // MessagesPage
  // This is the page where the user can see their current conversations with their friends.
  // The user can also start a new conversation.
  constructor(public navCtrl: NavController, public navParams: NavParams, public angularfire: AngularFireDatabase,
     public loadingProvider: LoadingProvider, public app: App, public alertProvider: AlertProvider, public dataProvider: DataProvider,public alertCtrl: AlertController, 
     public actionSheetCtrl: ActionSheetController, public ref:ChangeDetectorRef, public firebaseProvider:FirebaseProvider) { }
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
    this.dataProvider.getCurrentUser().subscribe(user=>{
      this.user = user;
    });
    // Create userData on the database if it doesn't exist yet.
    this.searchFriend = '';
    this.loadingProvider.show();
    if(firebase.auth().currentUser!=null || firebase.auth().currentUser!=undefined ){
      // update token
      this.angularfire.object('/accounts/' + firebase.auth().currentUser.uid).update({
        pushToken: localStorage.getItem('pushToken')
      });
    }
    // Get info of conversations of current logged in user.
    this.dataProvider.getConversations().subscribe((conversations) => {
      if (conversations.length > 0) {
        conversations.forEach((conversation) => {
          if (conversation.$exists()) {
            // Get conversation partner info.
            this.dataProvider.getUser(conversation.$key).subscribe((user) => {
              conversation.friend = user;
              // Get conversation info.
              this.dataProvider.getConversation(conversation.conversationId).subscribe((obj) => {
                // Get last message of conversation.
                let lastMessage = obj.messages[obj.messages.length - 1];
                conversation.date = lastMessage.date;
                conversation.sender = lastMessage.sender;
                // Set unreadMessagesCount
                conversation.unreadMessagesCount = obj.messages.length - conversation.messagesRead;
                // Process last message depending on messageType.
                if (lastMessage.type == 'text') {
                  if (lastMessage.sender == firebase.auth().currentUser.uid) {
                    conversation.message = 'You: ' + lastMessage.message;
                  } else {
                    conversation.message = lastMessage.message;
                  }
                } else {
                  if (lastMessage.sender == firebase.auth().currentUser.uid) {
                    conversation.message = 'You sent a photo message.';
                  } else {
                    conversation.message = 'has sent you a photo message.';
                  }
                }
                this.addOrUpdateConversation(conversation);
              });
            });
          }
        });
        this.loadingProvider.hide();
      } else {
        this.conversations = [];
        this.loadingProvider.hide();
      }
    });
    var that = this;
    if (!that.updateDateTime) {
      that.updateDateTime = setInterval(function() {
        if (that.conversations) {
          that.conversations.forEach((conversation) => {
            let date = conversation.date;
            conversation.date = new Date(date);
          });
        }
      }, 60000);
    }

    this.searchGroup = '';
    this.loadingProvider.show();

    // Get groups
    this.dataProvider.getGroups().subscribe((groupIds) => {
      if (groupIds.length > 0) {
        if(this.groups && this.groups.length > groupIds.length) {
          // User left/deleted a group, clear the list and add or update each group again.
          this.groups = [];
        }
        groupIds.forEach((groupId) => {
          this.dataProvider.getGroup(groupId.$key).subscribe((group) => {
            if (group.$exists()) {
              // Get group's unreadMessagesCount
              group.unreadMessagesCount = group.messages.length - groupId.messagesRead;
              // Get group's last active date
              group.date = group.messages[group.messages.length - 1].date;
              group.type = 'group';
              if(group.messages[group.messages.length - 1].sender == firebase.auth().currentUser.uid){
                group.lastMessage = 'You: '+group.messages[group.messages.length - 1].message; 
              }else{
                this.dataProvider.getUser(group.messages[group.messages.length - 1].sender).subscribe((user)=>{
                  group.lastMessage = user.name+': '+group.messages[group.messages.length - 1].message; 
                })
              }
             
              this.addOrUpdateConversation(group);
            }
          });
        });
        this.loadingProvider.hide();
      } else {
        this.groups = [];
        this.loadingProvider.hide();
      }
    });

    // Update groups' last active date time elapsed every minute based on Moment.js.
    var that = this;
    if (!that.updateDateTime) {
      that.updateDateTime = setInterval(function() {
        if (that.groups) {
          that.groups.forEach((group) => {
            let date = group.date;
            group.date = new Date(date);
          });
        }
      }, 60000);
    }
  }

  leaveGroup(group) {
    this.group = group;
    this.dataProvider.getCurrentUser().subscribe((user)=>{
      this.user = user;
    })
    this.alert = this.alertCtrl.create({
      title: 'Confirm Leave',
      message: 'Are you sure you want to leave this group?',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Leave',
          handler: data => {
            this.loadingProvider.show();
            // Remove member from group.
            this.group.members.splice(this.group.members.indexOf(this.user.userId), 1);
            // Add system message.
            this.group.messages.push({
              date: new Date().toString(),
              sender: this.user.userId,
              type: 'system',
              message: this.user.name + ' has left this group.',
              icon: 'md-log-out'
            });
        
            //this.conversations.splice(group, 1);
            // Update group on database.
            this.dataProvider.getGroup(this.group.$key).update({
              members: this.group.members,
              messages: this.group.messages
            }).then((success) => {
              
              // Remove group from user's group list.
              this.angularfire.object('/accounts/' + firebase.auth().currentUser.uid + '/groups/' + this.group.$key).remove().then(() => {
                // Pop this view because user already has left this group.
                this.group = null;
                setTimeout(() => {
                  this.loadingProvider.hide();
                  this.navCtrl.popToRoot();
                }, 300);
              });
            }).catch((error) => {
              this.alertProvider.showErrorMessage('group/error-leave-group');
            });
          }
        }
      ]
    }).present();
  }
  deleteConversation(slidingItem: ItemSliding, convo) {
    this.dataProvider.getConversation(convo.conversationId).take(1).subscribe((res)=>{
            this.conversation = res;
          });
    this.alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this thread?',
      buttons: [
        {
          text: 'Cancel',
          handler: data =>{
            slidingItem.close();
          }
        },
        {
          text: 'Delete',
          handler: data => {
            this.loadingProvider.show();
            var loggedInUser=firebase.auth().currentUser.uid;
            var p = 0;
            for(var i = 0; i<this.conversations.length; i++){
              p++;
              if(this.conversations[i].conversationId == convo.conversationId){
                console.log('index : '+i);
                let index = i;
                this.conversations.splice(index,1);
                slidingItem.close();
               this.deleteDb(loggedInUser,this.conversation,convo);
                this.navCtrl.popToRoot();
              }
              
               
            }
           
          }
          
        }
      ]
    }).present();
  }
deleteDb(loggedInUser,conversation,convo){
  this.firebaseProvider.deleteConversation(loggedInUser,conversation,convo);
}
  doRefresh(refresher) {
    var that = this;

    setTimeout(() => {
      // Set startIndex to load more messages.
    
      refresher.complete();
      that.ionViewDidLoad();
    }, 1000);
  }

  // Add or update conversation for real-time sync based on our observer, sort by active date.
  addOrUpdateConversation(conversation) {
    if (!this.conversations) {
      this.conversations = [conversation];
    } else {
      var index = -1;
      for (var i = 0; i < this.conversations.length; i++) {
        if (this.conversations[i].$key == conversation.$key) {
          index = i;
        }
      }
      if (index > -1) {
        this.conversations[index] = conversation;
      } else {
        this.conversations.push(conversation);
      }
      // Sort by last active date.
      this.conversations.sort((a: any, b: any) => {
        let date1 = new Date(a.date);
        let date2 = new Date(b.date);
        if (date1 > date2) {
          return -1;
        } else if (date1 < date2) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }

  // New conversation.
  newMessage() {
    //this.app.getRootNav().push(NewMessagePage);
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Create a Message',
      buttons: [
        {
          text: 'Group Message',
          handler: () => {
            this.app.getRootNav().push(NewGroupPage);
          }
        },
        {
          text: 'One on One Message',
          handler: () => {
            this.app.getRootNav().push(NewMessagePage);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  // Open chat with friend.
  message(userId, type) {
    if(type == 'group'){
      this.app.getRootNav().push(MessagePage, { groupId: userId });
    }else{

      this.app.getRootNav().push(MessagePage, { userId: userId });

    }
   
  }

  // Return class based if conversation has unreadMessages or not.
  hasUnreadMessages(conversation) {
    if (conversation.unreadMessagesCount > 0) {
      return 'messageSubtitleUnread';
    } else
      return 'messageSubtitle';
  }
}
