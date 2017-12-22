import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, Content, AlertController, ModalController, ActionSheetController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { LoadingProvider } from '../../providers/loading/loading';
import {AlertProvider} from '../../providers/alert/alert';
import { ImageProvider } from '../../providers/image/image';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { UserInfoPage } from '../user-info/user-info';
import { ImageModalPage } from '../image-modal/image-modal';
import { Camera } from '@ionic-native/camera';
import { Contacts } from '@ionic-native/contacts';
import { Keyboard } from '@ionic-native/keyboard';
import { Geolocation } from '@ionic-native/geolocation';
//import { ChangeDetectorRef } from '@angular/core/src/change_detection/change_detector_ref';

@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {
  @ViewChild(Content) content: Content;
  showToolbar:boolean = false;
  headerImgSize:string = '100%';
  headerImgUrl:string = '';
  transition:boolean = false;
  private userId: any;
  private title: any;
  private message: any;
  private conversationId: any;
  private messages: any;
  private alert: any;
  private updateDateTime: any;
  private messagesToShow: any;
  private startIndex: any = -1;
  private scrollDirection: any = 'bottom';
  private subscription: any;
private groupId;
conversationImg;
colors = [];
randomcolor = 'red';
group;
  // Set number of messages to show.
  private numberOfMessages = 10;
  public getRandomColor(){
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
user;
  // MessagePage
  // This is the page where the user can chat with a friend.
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider, public angularfire: AngularFireDatabase,
    public loadingProvider: LoadingProvider, public alertCtrl: AlertController, public imageProvider: ImageProvider, public modalCtrl: ModalController,
    public camera: Camera, public keyboard: Keyboard, public actionSheet: ActionSheetController, public contacts: Contacts, public geolocation: Geolocation,
  public alertProvider: AlertProvider, public ref: ChangeDetectorRef){ 
      this.dataProvider.getCurrentUser().subscribe(user =>{
        this.user = user;
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

  ionViewDidLoad() {
   // this.user = firebase.auth().currentUser.uid;
    this.userId = this.navParams.get('userId');
    if(!this.userId){
      var arr =[];
      this.groupId = this.navParams.get('groupId');
      this.subscription = this.dataProvider.getGroup(this.groupId).subscribe((group) => {
        this.group = group;
        if (group.$exists()) {
          this.title = group.name;
          this.conversationImg = group.img;
          if(group.members){
            group.members.forEach(member =>{
              this.colors.push({user:member, color:this.getRandomColor()});
              console.log(JSON.stringify(this.colors));
          })
          }
          // Get group messages
          this.dataProvider.getGroupMessages(group.$key).subscribe((messages) => {
            if (this.messages) {
              // Just append newly added messages to the bottom of the view.
              if (messages.length > this.messages.length) {
                let message = messages[messages.length - 1];
                this.dataProvider.getUser(message.sender).subscribe((user) => {
                  message.avatar = user.img;
                  message.color = this.getColor(message.sender);
                  console.log(message.color);
                  message.name = this.getInitials(user.name);
                  console.log('name'+message.name);
                });
                this.messages.push(message);
                // Also append to messagesToShow.
                this.messagesToShow.push(message);
                // Reset scrollDirection to bottom.
                this.scrollDirection = 'bottom';
              }
            } else {
              // Get all messages, this will be used as reference object for messagesToShow.
              this.messages = [];
              messages.forEach((message) => {
                this.dataProvider.getUser(message.sender).subscribe((user) => {
                  message.avatar = user.img;
                  message.color = this.getColor(message.sender);
                  console.log(message.color);
                  message.name = this.getInitials(user.name);
                  console.log('name'+message.name);
                });
                this.messages.push(message);
              });
              // Load messages in relation to numOfMessages.
              if (this.startIndex == -1) {
                // Get initial index for numberOfMessages to show.
                if ((this.messages.length - this.numberOfMessages) > 0) {
                  this.startIndex = this.messages.length - this.numberOfMessages;
                } else {
                  this.startIndex = 0;
                }
              }
              if (!this.messagesToShow) {
                this.messagesToShow = [];
              }
              // Set messagesToShow
              for (var i = this.startIndex; i < this.messages.length; i++) {
                this.messagesToShow.push(this.messages[i]);
              }
              this.loadingProvider.hide();
            }
          });
        }
      });
  
      // Update messages' date time elapsed every minute based on Moment.js.
      var that = this;
      if (!that.updateDateTime) {
        that.updateDateTime = setInterval(function() {
          if (that.messages) {
            that.messages.forEach((message) => {
              let date = message.date;
              message.date = new Date(date);
            });
          }
        }, 60000);
      }

    }else{

      this.dataProvider.getUser(this.userId).subscribe((user) => {
        this.title = user.name;
        
      });
  
      // Get conversationInfo with friend.
      this.angularfire.object('/accounts/' + firebase.auth().currentUser.uid + '/conversations/' + this.userId).subscribe((conversation) => {
        if (conversation.$exists()) {
          // User already have conversation with this friend, get conversation
          
          this.conversationId = conversation.conversationId;
  this.dataProvider.getConversation(this.conversationId).subscribe(convo =>{
    this.conversationImg = convo.img;
    console.log(convo.img);
    if(convo.users){
      convo.users.forEach(member =>{
        this.colors.push({user:member, color:this.getRandomColor()});
        console.log(JSON.stringify(this.colors));
    })
    }
  });
          // Get conversation
          this.dataProvider.getConversationMessages(this.conversationId).subscribe((messages) => {
            if (this.messages) {
              // Just append newly added messages to the bottom of the view.
              if (messages.length > this.messages.length) {
                let message = messages[messages.length - 1];
                this.dataProvider.getUser(message.sender).subscribe((user) => {
                  message.color = this.getColor(message.sender);
                  console.log(message.color);
                  message.avatar = user.img;
                  message.name = this.getInitials(user.name);
                  //console.log('name'+message.name);
                });
                this.messages.push(message);
                // Also append to messagesToShow.
                this.messagesToShow.push(message);
                // Reset scrollDirection to bottom.
                this.scrollDirection = 'bottom';
              }
            } else {
              // Get all messages, this will be used as reference object for messagesToShow.
              this.messages = [];
              messages.forEach((message) => {
                this.dataProvider.getUser(message.sender).subscribe((user) => {
                  message.color = this.getColor(message.sender);
                  console.log(message.color);
                  message.avatar = user.img;
                  message.name = this.getInitials(user.name);
                  //console.log('name'+message.name);
                });
                this.messages.push(message);
              });
              // Load messages in relation to numOfMessages.
              if (this.startIndex == -1) {
                // Get initial index for numberOfMessages to show.
                if ((this.messages.length - this.numberOfMessages) > 0) {
                  this.startIndex = this.messages.length - this.numberOfMessages;
                } else {
                  this.startIndex = 0;
                }
              }
              if (!this.messagesToShow) {
                this.messagesToShow = [];
              }
              // Set messagesToShow
              for (var i = this.startIndex; i < this.messages.length; i++) {
                this.messagesToShow.push(this.messages[i]);
              }
              this.loadingProvider.hide();
            }
          });
        }
      });
  
      // Update messages' date time elapsed every minute based on Moment.js.
      var that = this;
      if (!that.updateDateTime) {
        that.updateDateTime = setInterval(function() {
          if (that.messages) {
            that.messages.forEach((message) => {
              let date = message.date;
              message.date = new Date(date);
            });
          }
        }, 60000);
      }
    }
  }
  menu(){
    if(this.groupId){
      let action = this.actionSheet.create({
        title:'Menu',
        buttons:[{
          text: 'Change Group Name',
          handler: () =>{

          }
        },
        {
          text: 'Change Photo',
          handler: () =>{

          }
        },
        {
          text: 'Leave Group',
          handler: () =>{

          }
        },{
          text: 'cancel',
          role: 'cancel',
          handler: ()=>{
            console.log("cancelled");
          }
        }]
      });
      action.present();
    }else if(this.userId){
      let action = this.actionSheet.create({
        title:'Menu',
        buttons:[{
          text: 'Delete Thread',
          handler: () =>{
      
          }
        },{
          text: 'cancel',
          role: 'cancel',
          handler: ()=>{
            console.log("cancelled");
          }
        }]
      });
      action.present();
    }

  }


  setStyle(message){
  return { width:'100%',
    'background-color':message.color,
    height:'100%'}
  }

  getColor(userId){
    for(var i = 0; i < this.colors.length; i++) {
      var k = this.colors[i]['user'];
      if(userId == k ){
        return this.colors[i]['color'];
      }else{

      }
  }
  }
  setPhoto() {
    if(this.groupId){this.alert = this.alertCtrl.create({
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
            this.loadingProvider.show();
            // Upload photo and set to group photo, afterwards, return the group object as promise.
            this.imageProvider.setGroupPhotoPromise(this.group, this.camera.PictureSourceType.PHOTOLIBRARY).then((group) => {
              // Add system message.
              this.group.messages.push({
                date: new Date().toString(),
                sender: this.user.$key,
                type: 'system',
                message: this.user.name + ' has changed the group photo.',
                icon: 'ios-camera'
              });
              // Update group image on database.
              this.dataProvider.getGroup(this.groupId).update({
                img: group.img,
                messages: this.group.messages
              }).then((success) => {
                this.loadingProvider.hide();
                this.alertProvider.showGroupUpdatedMessage();
              }).catch((error) => {
                this.loadingProvider.hide();
                this.alertProvider.showErrorMessage('group/error-update-group');
              });
            });
          }
        },
        {
          text: 'Take Photo',
          handler: () => {
            this.loadingProvider.show();
            // Upload photo and set to group photo, afterwwards, return the group object as promise.
            this.imageProvider.setGroupPhotoPromise(this.group, this.camera.PictureSourceType.CAMERA).then((group) => {
              // Add system message.
              this.group.messages.push({
                date: new Date().toString(),
                sender: this.user.$key,
                type: 'system',
                message: this.user.name + ' has changed the group photo.',
                icon: 'ios-camera'
              });
              // Update group image on database.
              this.dataProvider.getGroup(this.groupId).update({
                img: group.img,
                messages: this.group.messages
              }).then((success) => {
                this.loadingProvider.hide();
                this.alertProvider.showGroupUpdatedMessage();
              }).catch((error) => {
                this.loadingProvider.hide();
                this.alertProvider.showErrorMessage('group/error-update-group');
              });
            });
          }
        }
      ]
    }).present();}else if(this.userId){
      this.alert = this.alertCtrl.create({
        title: 'Set Conversation Photo',
        message: 'Do you want to take a photo or choose from your photo gallery?',
        buttons: [
          {
            text: 'Cancel',
            handler: data => { }
          },
          {
            text: 'Choose from Gallery',
            handler: () => {
              this.loadingProvider.show();
              // Upload photo and set to group photo, afterwards, return the group object as promise.
              this.imageProvider.setGroupPhotoPromise(this.group, this.camera.PictureSourceType.PHOTOLIBRARY).then((url) => {
               // Add system message.
               this.messages.push({
                date: new Date().toString(),
                sender: this.user.$key,
                type: 'system',
                message: this.user.name + ' has changed the conversation photo.',
                icon: 'ios-camera'
              });
              // Update group image on database.
              this.angularfire.object('/conversations/'+ this.conversationId).update({
                img: url,
                messages: this.messages
              }).then((success) => {
                this.loadingProvider.hide();
                this.alertProvider.showGroupUpdatedMessage();
              }).catch((error) => {
                this.loadingProvider.hide();
                this.alertProvider.showErrorMessage('group/error-update-group');
              });
              });
            }
          },
          {
            text: 'Take Photo',
            handler: () => {
              this.loadingProvider.show();
              // Upload photo and set to group photo, afterwwards, return the group object as promise.
              this.imageProvider.setGroupPhotoPromise(this.group, this.camera.PictureSourceType.CAMERA).then((url) => {
                // Add system message.
                this.messages.push({
                  date: new Date().toString(),
                  sender: this.user.$key,
                  type: 'system',
                  message: this.user.name + ' has changed the conversation photo.',
                  icon: 'ios-camera'
                });
                // Update group image on database.
                this.angularfire.object('/conversations/'+ this.conversationId).update({
                  img: url,
                  messages: this.messages
                }).then((success) => {
                  this.loadingProvider.hide();
                  this.alertProvider.showGroupUpdatedMessage();
                }).catch((error) => {
                  this.loadingProvider.hide();
                  this.alertProvider.showErrorMessage('group/error-update-group');
                });
              });
            }
          }
        ]
      }).present();
    }
  }
  // Load previous messages in relation to numberOfMessages.
  loadPreviousMessages() {
    var that = this;
    // Show loading.
    this.loadingProvider.show();
    setTimeout(function() {
      // Set startIndex to load more messages.
      if ((that.startIndex - that.numberOfMessages) > -1) {
        that.startIndex -= that.numberOfMessages;
      } else {
        that.startIndex = 0;
      }
      // Refresh our messages list.
      that.messages = null;
      that.messagesToShow = null;
      // Set scroll direction to top.
      that.scrollDirection = 'top';
      // Populate list again.
      that.ionViewDidLoad();
    }, 1000);
  }

  // Update messagesRead when user lefts this page.
  ionViewWillLeave() {
    if (this.messages)
      this.setMessagesRead(this.messages);
  }
  isSystemMessage(message) {
    if (message.type == 'system') {
      return true;
    } else {
      return false;
    }
  }
  getInitials(nameString){
    var name = nameString;
    var initials = name.match(/\b\w/g) || [];
    var initials2 = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    return initials2;
  }

  // Check if currentPage is active, then update user's messagesRead.
  setMessagesRead(messages) {
    if(this.groupId){
      if (this.navCtrl.getActive().instance instanceof MessagePage) {
        // Update user's messagesRead on database.
        this.angularfire.object('/accounts/' + firebase.auth().currentUser.uid + '/groups/' + this.groupId).update({
          messagesRead: this.messages.length
          
        });
        console.log('success')
      }
    }else{
      if (this.navCtrl.getActive().instance instanceof MessagePage) {
        // Update user's messagesRead on database.
        var totalMessagesCount;
        this.dataProvider.getConversationMessages(this.conversationId).subscribe((messages) => {
          totalMessagesCount = messages.length;
        });
        this.angularfire.object('/accounts/' + firebase.auth().currentUser.uid + '/conversations/' + this.userId).update({
          messagesRead: totalMessagesCount
        });
      }
    }
   
  }

  // Check if 'return' button is pressed and send the message.
  onType(keyCode) {
    if (keyCode == 13) {
      // this.keyboard.close();
      // this.send();
    }
  }

  // Scroll to bottom of page after a short delay.
  scrollBottom() {
    var that = this;
    setTimeout(function() {
      that.content.scrollToBottom();
    }, 300);
  }

  // Scroll to top of the page after a short delay.
  scrollTop() {
    var that = this;
    setTimeout(function() {
      that.content.scrollToTop();
    }, 300);
  }

  // Scroll depending on the direction.
  doScroll() {
    if (this.scrollDirection == 'bottom') {
      this.scrollBottom();
    } else if (this.scrollDirection == 'top') {
      this.scrollTop();
    }
  }

  // Check if the user is the sender of the message.
  isSender(message) {
    if (message.sender == firebase.auth().currentUser.uid) {
      return true;
    } else {
      return false;
    }
  }

  // Back
  back() {
    //this.navCtrl.pop();
    this.navCtrl.popToRoot();
  }
  doRefresh(refresher) {
    var that = this;

    setTimeout(() => {
      // Set startIndex to load more messages.
      if ((that.startIndex - that.numberOfMessages) > -1) {
        that.startIndex -= that.numberOfMessages;
      } else {
        that.startIndex = 0;
      }
      // Refresh our messages list.
      that.messages = null;
      that.messagesToShow = null;
      // Set scroll direction to top.
      that.scrollDirection = 'top';
      // Populate list again.
      refresher.complete();
      that.ionViewDidLoad();
    }, 1000);
  }

  // Send message, if there's no conversation yet, create a new conversation.
  send() {
    if(!this.userId){
      // Clone an instance of messages object so it will not directly be updated.
    // The messages object should be updated by our observer declared on ionViewDidLoad.
    let messages = JSON.parse(JSON.stringify(this.messages));
    messages.push({
      date: new Date().toString(),
      sender: firebase.auth().currentUser.uid,
      type: 'text',
      message: this.message
    });
    // Update group messages.
    this.dataProvider.getGroup(this.groupId).update({
      messages: messages
    });
    // Clear messagebox.
    this.message = '';
    }else{
      if (this.message) {
        // User entered a text on messagebox
        if (this.conversationId) {
          // Add Message to the existing conversation
          // Clone an instance of messages object so it will not directly be updated.
          // The messages object should be updated by our observer declared on ionViewDidLoad.
          let messages = JSON.parse(JSON.stringify(this.messages));
          messages.push({
            date: new Date().toString(),
            sender: firebase.auth().currentUser.uid,
            type: 'text',
            message: this.message
          });
          // Update conversation on database.
          this.dataProvider.getConversation(this.conversationId).update({
            messages: messages
          });
          // Clear messagebox.
          this.message = '';
        } else {
          // New Conversation with friend.
          var messages = [];
          messages.push({
            date: new Date().toString(),
            sender: firebase.auth().currentUser.uid,
            type: 'text',
            message: this.message
          });
          var users = [];
          users.push(firebase.auth().currentUser.uid);
          users.push(this.userId);
          // Add conversation.
          this.angularfire.list('conversations').push({
            dateCreated: new Date().toString(),
            messages: messages,
            users: users
          }).then((success) => {
            let conversationId = success.key;
            this.message = '';
            // Add conversation reference to the users.
            this.angularfire.object('/accounts/' + firebase.auth().currentUser.uid + '/conversations/' + this.userId).update({
              conversationId: conversationId,
              messagesRead: 1
            });
            this.angularfire.object('/accounts/' + this.userId + '/conversations/' + firebase.auth().currentUser.uid).update({
              conversationId: conversationId,
              messagesRead: 0
            });
          });
        }
      }
    }
    
  }

  // View user info
  viewUser(userId) {
    this.navCtrl.push(UserInfoPage, { userId: userId });
  }


  attach(){
    let action = this.actionSheet.create({
      title:'Choose attachments',
      buttons:[{
        text: 'Camera',
        handler: () =>{
          console.log("take photo");
          this.imageProvider.uploadPhotoMessage(this.conversationId, this.camera.PictureSourceType.CAMERA).then((url) => {
            // Process image message.
            this.sendPhotoMessage(url);
          });
        }
      },{
        text: 'Photo Library',
        handler: ()=>{
          console.log("Access gallery");
          this.imageProvider.uploadPhotoMessage(this.conversationId, this.camera.PictureSourceType.PHOTOLIBRARY).then((url) => {
              // Process image message.
              this.sendPhotoMessage(url);
          });
        }
      },{
        text: 'Video',
        handler: () =>{
          console.log("Video");
          this.imageProvider.uploadVideoMessage(this.conversationId).then(url=>{
            this.sendVideoMessage(url);
          });
        }
      },{
        text: 'Location',
        handler:()=>{
          console.log("Location");
          this.geolocation.getCurrentPosition({
            timeout: 2000
          }).then(res => {
            let locationMessage = "current location: lat:"+res.coords.latitude+" lng:"+res.coords.longitude;
            let confirm = this.alertCtrl.create({
              title: 'Your Location',
              message: locationMessage,
              buttons:[{
                text:'cancel',
                handler: () =>{
                  console.log("canceled");
                }
              },{
                text: 'Share',
                handler: () =>{
                  console.log("share");
                  this.message = locationMessage;
                  this.send();
                }
              }]
            });
            confirm.present();
          }, locationErr => {
            console.log("Location Error"+ JSON.stringify(locationErr));
          });
        }
      },{
        text: 'Contact',
        handler: () =>{
          console.log("Share contact");
          this.contacts.pickContact().then( data =>{
            console.log(data.displayName);
            console.log(data.phoneNumbers[0].value);
            this.message = data.displayName+" ph: "+data.phoneNumbers[0].value;
            this.send();
          }, err=>{
            console.log(err);
          })
        }
      },{
        text: 'cancel',
        role: 'cancel',
        handler: ()=>{
          console.log("cancelled");
        }
      }]
    });
    action.present();
  }
  takePhoto(){
    this.imageProvider.uploadPhotoMessage(this.conversationId, this.camera.PictureSourceType.CAMERA).then((url) => {
      // Process image message.
      this.sendPhotoMessage(url);
    });
  }

  // Process photoMessage on database.
  sendPhotoMessage(url) {
    if (this.conversationId) {
      // Add image message to existing conversation.
      let messages = JSON.parse(JSON.stringify(this.messages));
      messages.push({
        date: new Date().toString(),
        sender: firebase.auth().currentUser.uid,
        type: 'image',
        url: url
      });
      // Update conversation on database.
      this.dataProvider.getConversation(this.conversationId).update({
        messages: messages
      });
    } else {
      // Create new conversation.
      var messages = [];
      messages.push({
        date: new Date().toString(),
        sender: firebase.auth().currentUser.uid,
        type: 'image',
        url: url
      });
      var users = [];
      users.push(firebase.auth().currentUser.uid);
      users.push(this.userId);
      // Add conversation.
      this.angularfire.list('conversations').push({
        dateCreated: new Date().toString(),
        messages: messages,
        users: users
      }).then((success) => {
        let conversationId = success.key;
        // Add conversation references to users.
        this.angularfire.object('/accounts/' + firebase.auth().currentUser.uid + '/conversations/' + this.userId).update({
          conversationId: conversationId,
          messagesRead: 1
        });
        this.angularfire.object('/accounts/' + this.userId + '/conversations/' + firebase.auth().currentUser.uid).update({
          conversationId: conversationId,
          messagesRead: 0
        });
      });
    }
  }
    // Process Video on database.
  sendVideoMessage(url) {
    if (this.conversationId) {
      // Add image message to existing conversation.
      let messages = JSON.parse(JSON.stringify(this.messages));
      messages.push({
        date: new Date().toString(),
        sender: firebase.auth().currentUser.uid,
        type: 'video',
        url: url
      });
      // Update conversation on database.
      this.dataProvider.getConversation(this.conversationId).update({
        messages: messages
      });
    } else {
      // Create new conversation.
      var messages = [];
      messages.push({
        date: new Date().toString(),
        sender: firebase.auth().currentUser.uid,
        type: 'video',
        url: url
      });
      var users = [];
      users.push(firebase.auth().currentUser.uid);
      users.push(this.userId);
      // Add conversation.
      this.angularfire.list('conversations').push({
        dateCreated: new Date().toString(),
        messages: messages,
        users: users
      }).then((success) => {
        let conversationId = success.key;
        // Add conversation references to users.
        this.angularfire.object('/accounts/' + firebase.auth().currentUser.uid + '/conversations/' + this.userId).update({
          conversationId: conversationId,
          messagesRead: 1
        });
        this.angularfire.object('/accounts/' + this.userId + '/conversations/' + firebase.auth().currentUser.uid).update({
          conversationId: conversationId,
          messagesRead: 0
        });
      });
    }
  }

  // Enlarge image messages.
  enlargeImage(img) {
    let imageModal = this.modalCtrl.create(ImageModalPage, { img: img });
    imageModal.present();
  }
  getStyle(user){
    for(var i = 0; i<this.colors.length; i++){
      if(this.colors[i].user == user){
        return{
            width:'100%',
            'background-color':this.colors[i].color,
            height:'100%'
          }
      }
    }
  }
}
