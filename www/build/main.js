webpackJsonp([2],{

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Login; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_tabs_tabs__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_verification_verification__ = __webpack_require__(470);


var Login;
(function (Login) {
    // replace with your key
    Login.firebaseConfig = {
        apiKey: "AIzaSyDSi0_SLp_7bXS-sIVVygO331d_T_LMzQ4",
        authDomain: "nautical-549b8.firebaseapp.com",
        databaseURL: "https://nautical-549b8.firebaseio.com",
        projectId: "nautical-549b8",
        storageBucket: "nautical-549b8.appspot.com",
        messagingSenderId: "459609963569"
    };
    Login.facebookAppId = "128706657699939";
    Login.googleClientId = "978363958341-3ubj5f0qo6qcj2dtbbq7a5utt1ijp45j.apps.googleusercontent.com";
    Login.homePage = __WEBPACK_IMPORTED_MODULE_0__pages_tabs_tabs__["a" /* TabsPage */];
    Login.verificationPage = __WEBPACK_IMPORTED_MODULE_1__pages_verification_verification__["a" /* VerificationPage */];
    Login.emailVerification = true;
})(Login || (Login = {}));
//# sourceMappingURL=login.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_data__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loading_loading__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_alert_alert__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_image_image__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__user_info_user_info__ = __webpack_require__(463);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__image_modal_image_modal__ = __webpack_require__(464);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_contacts__ = __webpack_require__(465);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_keyboard__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_geolocation__ = __webpack_require__(467);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














//import { ChangeDetectorRef } from '@angular/core/src/change_detection/change_detector_ref';
var MessagePage = MessagePage_1 = (function () {
    // MessagePage
    // This is the page where the user can chat with a friend.
    function MessagePage(navCtrl, navParams, dataProvider, angularfire, loadingProvider, alertCtrl, imageProvider, modalCtrl, camera, keyboard, actionSheet, contacts, geolocation, alertProvider, ref) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataProvider = dataProvider;
        this.angularfire = angularfire;
        this.loadingProvider = loadingProvider;
        this.alertCtrl = alertCtrl;
        this.imageProvider = imageProvider;
        this.modalCtrl = modalCtrl;
        this.camera = camera;
        this.keyboard = keyboard;
        this.actionSheet = actionSheet;
        this.contacts = contacts;
        this.geolocation = geolocation;
        this.alertProvider = alertProvider;
        this.ref = ref;
        this.showToolbar = false;
        this.headerImgSize = '100%';
        this.headerImgUrl = '';
        this.transition = false;
        this.startIndex = -1;
        this.scrollDirection = 'bottom';
        this.colors = [];
        this.randomcolor = 'red';
        // Set number of messages to show.
        this.numberOfMessages = 10;
        this.dataProvider.getCurrentUser().subscribe(function (user) {
            _this.user = user;
        });
    }
    MessagePage.prototype.getRandomColor = function () {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    MessagePage.prototype.onScroll = function ($event) {
        var scrollTop = $event.scrollTop;
        this.showToolbar = scrollTop >= 120;
        if (scrollTop < 0) {
            this.transition = false;
            this.headerImgSize = Math.abs(scrollTop) / 2 + 100 + "%";
        }
        else {
            this.transition = true;
            this.headerImgSize = '100%';
        }
        this.ref.detectChanges();
    };
    MessagePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // this.user = firebase.auth().currentUser.uid;
        this.userId = this.navParams.get('userId');
        if (!this.userId) {
            var arr = [];
            this.groupId = this.navParams.get('groupId');
            this.subscription = this.dataProvider.getGroup(this.groupId).subscribe(function (group) {
                _this.group = group;
                if (group.$exists()) {
                    _this.title = group.name;
                    _this.conversationImg = group.img;
                    if (group.members) {
                        group.members.forEach(function (member) {
                            _this.colors.push({ user: member, color: _this.getRandomColor() });
                            console.log(JSON.stringify(_this.colors));
                        });
                    }
                    // Get group messages
                    _this.dataProvider.getGroupMessages(group.$key).subscribe(function (messages) {
                        if (_this.messages) {
                            // Just append newly added messages to the bottom of the view.
                            if (messages.length > _this.messages.length) {
                                var message_1 = messages[messages.length - 1];
                                _this.dataProvider.getUser(message_1.sender).subscribe(function (user) {
                                    message_1.avatar = user.img;
                                    message_1.color = _this.getColor(message_1.sender);
                                    console.log(message_1.color);
                                    message_1.name = _this.getInitials(user.name);
                                    console.log('name' + message_1.name);
                                });
                                _this.messages.push(message_1);
                                // Also append to messagesToShow.
                                _this.messagesToShow.push(message_1);
                                // Reset scrollDirection to bottom.
                                _this.scrollDirection = 'bottom';
                            }
                        }
                        else {
                            // Get all messages, this will be used as reference object for messagesToShow.
                            _this.messages = [];
                            messages.forEach(function (message) {
                                _this.dataProvider.getUser(message.sender).subscribe(function (user) {
                                    message.avatar = user.img;
                                    message.color = _this.getColor(message.sender);
                                    console.log(message.color);
                                    message.name = _this.getInitials(user.name);
                                    console.log('name' + message.name);
                                });
                                _this.messages.push(message);
                            });
                            // Load messages in relation to numOfMessages.
                            if (_this.startIndex == -1) {
                                // Get initial index for numberOfMessages to show.
                                if ((_this.messages.length - _this.numberOfMessages) > 0) {
                                    _this.startIndex = _this.messages.length - _this.numberOfMessages;
                                }
                                else {
                                    _this.startIndex = 0;
                                }
                            }
                            if (!_this.messagesToShow) {
                                _this.messagesToShow = [];
                            }
                            // Set messagesToShow
                            for (var i = _this.startIndex; i < _this.messages.length; i++) {
                                _this.messagesToShow.push(_this.messages[i]);
                            }
                            _this.loadingProvider.hide();
                        }
                    });
                }
            });
            // Update messages' date time elapsed every minute based on Moment.js.
            var that = this;
            if (!that.updateDateTime) {
                that.updateDateTime = setInterval(function () {
                    if (that.messages) {
                        that.messages.forEach(function (message) {
                            var date = message.date;
                            message.date = new Date(date);
                        });
                    }
                }, 60000);
            }
        }
        else {
            this.dataProvider.getUser(this.userId).subscribe(function (user) {
                _this.title = user.name;
            });
            // Get conversationInfo with friend.
            this.angularfire.object('/accounts/' + __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.uid + '/conversations/' + this.userId).subscribe(function (conversation) {
                if (conversation.$exists()) {
                    // User already have conversation with this friend, get conversation
                    _this.conversationId = conversation.conversationId;
                    _this.dataProvider.getConversation(_this.conversationId).subscribe(function (convo) {
                        _this.conversationImg = convo.img;
                        console.log(convo.img);
                        if (convo.users) {
                            convo.users.forEach(function (member) {
                                _this.colors.push({ user: member, color: _this.getRandomColor() });
                                console.log(JSON.stringify(_this.colors));
                            });
                        }
                    });
                    // Get conversation
                    _this.dataProvider.getConversationMessages(_this.conversationId).subscribe(function (messages) {
                        if (_this.messages) {
                            // Just append newly added messages to the bottom of the view.
                            if (messages.length > _this.messages.length) {
                                var message_2 = messages[messages.length - 1];
                                _this.dataProvider.getUser(message_2.sender).subscribe(function (user) {
                                    message_2.color = _this.getColor(message_2.sender);
                                    console.log(message_2.color);
                                    message_2.avatar = user.img;
                                    message_2.name = _this.getInitials(user.name);
                                    //console.log('name'+message.name);
                                });
                                _this.messages.push(message_2);
                                // Also append to messagesToShow.
                                _this.messagesToShow.push(message_2);
                                // Reset scrollDirection to bottom.
                                _this.scrollDirection = 'bottom';
                            }
                        }
                        else {
                            // Get all messages, this will be used as reference object for messagesToShow.
                            _this.messages = [];
                            messages.forEach(function (message) {
                                _this.dataProvider.getUser(message.sender).subscribe(function (user) {
                                    message.color = _this.getColor(message.sender);
                                    console.log(message.color);
                                    message.avatar = user.img;
                                    message.name = _this.getInitials(user.name);
                                    //console.log('name'+message.name);
                                });
                                _this.messages.push(message);
                            });
                            // Load messages in relation to numOfMessages.
                            if (_this.startIndex == -1) {
                                // Get initial index for numberOfMessages to show.
                                if ((_this.messages.length - _this.numberOfMessages) > 0) {
                                    _this.startIndex = _this.messages.length - _this.numberOfMessages;
                                }
                                else {
                                    _this.startIndex = 0;
                                }
                            }
                            if (!_this.messagesToShow) {
                                _this.messagesToShow = [];
                            }
                            // Set messagesToShow
                            for (var i = _this.startIndex; i < _this.messages.length; i++) {
                                _this.messagesToShow.push(_this.messages[i]);
                            }
                            _this.loadingProvider.hide();
                        }
                    });
                }
            });
            // Update messages' date time elapsed every minute based on Moment.js.
            var that = this;
            if (!that.updateDateTime) {
                that.updateDateTime = setInterval(function () {
                    if (that.messages) {
                        that.messages.forEach(function (message) {
                            var date = message.date;
                            message.date = new Date(date);
                        });
                    }
                }, 60000);
            }
        }
    };
    MessagePage.prototype.menu = function () {
        if (this.groupId) {
            var action = this.actionSheet.create({
                title: 'Menu',
                buttons: [{
                        text: 'Change Group Name',
                        handler: function () {
                        }
                    },
                    {
                        text: 'Change Photo',
                        handler: function () {
                        }
                    },
                    {
                        text: 'Leave Group',
                        handler: function () {
                        }
                    }, {
                        text: 'cancel',
                        role: 'cancel',
                        handler: function () {
                            console.log("cancelled");
                        }
                    }]
            });
            action.present();
        }
        else if (this.userId) {
            var action = this.actionSheet.create({
                title: 'Menu',
                buttons: [{
                        text: 'Delete Thread',
                        handler: function () {
                        }
                    }, {
                        text: 'cancel',
                        role: 'cancel',
                        handler: function () {
                            console.log("cancelled");
                        }
                    }]
            });
            action.present();
        }
    };
    MessagePage.prototype.setStyle = function (message) {
        return { width: '100%',
            'background-color': message.color,
            height: '100%' };
    };
    MessagePage.prototype.getColor = function (userId) {
        for (var i = 0; i < this.colors.length; i++) {
            var k = this.colors[i]['user'];
            if (userId == k) {
                return this.colors[i]['color'];
            }
            else {
            }
        }
    };
    MessagePage.prototype.setPhoto = function () {
        var _this = this;
        if (this.groupId) {
            this.alert = this.alertCtrl.create({
                title: 'Set Group Photo',
                message: 'Do you want to take a photo or choose from your photo gallery?',
                buttons: [
                    {
                        text: 'Cancel',
                        handler: function (data) { }
                    },
                    {
                        text: 'Choose from Gallery',
                        handler: function () {
                            _this.loadingProvider.show();
                            // Upload photo and set to group photo, afterwards, return the group object as promise.
                            _this.imageProvider.setGroupPhotoPromise(_this.group, _this.camera.PictureSourceType.PHOTOLIBRARY).then(function (group) {
                                // Add system message.
                                _this.group.messages.push({
                                    date: new Date().toString(),
                                    sender: _this.user.$key,
                                    type: 'system',
                                    message: _this.user.name + ' has changed the group photo.',
                                    icon: 'ios-camera'
                                });
                                // Update group image on database.
                                _this.dataProvider.getGroup(_this.groupId).update({
                                    img: group.img,
                                    messages: _this.group.messages
                                }).then(function (success) {
                                    _this.loadingProvider.hide();
                                    _this.alertProvider.showGroupUpdatedMessage();
                                }).catch(function (error) {
                                    _this.loadingProvider.hide();
                                    _this.alertProvider.showErrorMessage('group/error-update-group');
                                });
                            });
                        }
                    },
                    {
                        text: 'Take Photo',
                        handler: function () {
                            _this.loadingProvider.show();
                            // Upload photo and set to group photo, afterwwards, return the group object as promise.
                            _this.imageProvider.setGroupPhotoPromise(_this.group, _this.camera.PictureSourceType.CAMERA).then(function (group) {
                                // Add system message.
                                _this.group.messages.push({
                                    date: new Date().toString(),
                                    sender: _this.user.$key,
                                    type: 'system',
                                    message: _this.user.name + ' has changed the group photo.',
                                    icon: 'ios-camera'
                                });
                                // Update group image on database.
                                _this.dataProvider.getGroup(_this.groupId).update({
                                    img: group.img,
                                    messages: _this.group.messages
                                }).then(function (success) {
                                    _this.loadingProvider.hide();
                                    _this.alertProvider.showGroupUpdatedMessage();
                                }).catch(function (error) {
                                    _this.loadingProvider.hide();
                                    _this.alertProvider.showErrorMessage('group/error-update-group');
                                });
                            });
                        }
                    }
                ]
            }).present();
        }
        else if (this.userId) {
            this.alert = this.alertCtrl.create({
                title: 'Set Conversation Photo',
                message: 'Do you want to take a photo or choose from your photo gallery?',
                buttons: [
                    {
                        text: 'Cancel',
                        handler: function (data) { }
                    },
                    {
                        text: 'Choose from Gallery',
                        handler: function () {
                            _this.loadingProvider.show();
                            // Upload photo and set to group photo, afterwards, return the group object as promise.
                            _this.imageProvider.setGroupPhotoPromise(_this.group, _this.camera.PictureSourceType.PHOTOLIBRARY).then(function (url) {
                                // Add system message.
                                _this.messages.push({
                                    date: new Date().toString(),
                                    sender: _this.user.$key,
                                    type: 'system',
                                    message: _this.user.name + ' has changed the conversation photo.',
                                    icon: 'ios-camera'
                                });
                                // Update group image on database.
                                _this.angularfire.object('/conversations/' + _this.conversationId).update({
                                    img: url,
                                    messages: _this.messages
                                }).then(function (success) {
                                    _this.loadingProvider.hide();
                                    _this.alertProvider.showGroupUpdatedMessage();
                                }).catch(function (error) {
                                    _this.loadingProvider.hide();
                                    _this.alertProvider.showErrorMessage('group/error-update-group');
                                });
                            });
                        }
                    },
                    {
                        text: 'Take Photo',
                        handler: function () {
                            _this.loadingProvider.show();
                            // Upload photo and set to group photo, afterwwards, return the group object as promise.
                            _this.imageProvider.setGroupPhotoPromise(_this.group, _this.camera.PictureSourceType.CAMERA).then(function (url) {
                                // Add system message.
                                _this.messages.push({
                                    date: new Date().toString(),
                                    sender: _this.user.$key,
                                    type: 'system',
                                    message: _this.user.name + ' has changed the conversation photo.',
                                    icon: 'ios-camera'
                                });
                                // Update group image on database.
                                _this.angularfire.object('/conversations/' + _this.conversationId).update({
                                    img: url,
                                    messages: _this.messages
                                }).then(function (success) {
                                    _this.loadingProvider.hide();
                                    _this.alertProvider.showGroupUpdatedMessage();
                                }).catch(function (error) {
                                    _this.loadingProvider.hide();
                                    _this.alertProvider.showErrorMessage('group/error-update-group');
                                });
                            });
                        }
                    }
                ]
            }).present();
        }
    };
    // Load previous messages in relation to numberOfMessages.
    MessagePage.prototype.loadPreviousMessages = function () {
        var that = this;
        // Show loading.
        this.loadingProvider.show();
        setTimeout(function () {
            // Set startIndex to load more messages.
            if ((that.startIndex - that.numberOfMessages) > -1) {
                that.startIndex -= that.numberOfMessages;
            }
            else {
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
    };
    // Update messagesRead when user lefts this page.
    MessagePage.prototype.ionViewWillLeave = function () {
        if (this.messages)
            this.setMessagesRead(this.messages);
    };
    MessagePage.prototype.isSystemMessage = function (message) {
        if (message.type == 'system') {
            return true;
        }
        else {
            return false;
        }
    };
    MessagePage.prototype.getInitials = function (nameString) {
        var name = nameString;
        var initials = name.match(/\b\w/g) || [];
        var initials2 = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
        return initials2;
    };
    // Check if currentPage is active, then update user's messagesRead.
    MessagePage.prototype.setMessagesRead = function (messages) {
        if (this.groupId) {
            if (this.navCtrl.getActive().instance instanceof MessagePage_1) {
                // Update user's messagesRead on database.
                this.angularfire.object('/accounts/' + __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.uid + '/groups/' + this.groupId).update({
                    messagesRead: this.messages.length
                });
                console.log('success');
            }
        }
        else {
            if (this.navCtrl.getActive().instance instanceof MessagePage_1) {
                // Update user's messagesRead on database.
                var totalMessagesCount;
                this.dataProvider.getConversationMessages(this.conversationId).subscribe(function (messages) {
                    totalMessagesCount = messages.length;
                });
                this.angularfire.object('/accounts/' + __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.uid + '/conversations/' + this.userId).update({
                    messagesRead: totalMessagesCount
                });
            }
        }
    };
    // Check if 'return' button is pressed and send the message.
    MessagePage.prototype.onType = function (keyCode) {
        if (keyCode == 13) {
            // this.keyboard.close();
            // this.send();
        }
    };
    // Scroll to bottom of page after a short delay.
    MessagePage.prototype.scrollBottom = function () {
        var that = this;
        setTimeout(function () {
            that.content.scrollToBottom();
        }, 300);
    };
    // Scroll to top of the page after a short delay.
    MessagePage.prototype.scrollTop = function () {
        var that = this;
        setTimeout(function () {
            that.content.scrollToTop();
        }, 300);
    };
    // Scroll depending on the direction.
    MessagePage.prototype.doScroll = function () {
        if (this.scrollDirection == 'bottom') {
            this.scrollBottom();
        }
        else if (this.scrollDirection == 'top') {
            this.scrollTop();
        }
    };
    // Check if the user is the sender of the message.
    MessagePage.prototype.isSender = function (message) {
        if (message.sender == __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.uid) {
            return true;
        }
        else {
            return false;
        }
    };
    // Back
    MessagePage.prototype.back = function () {
        //this.navCtrl.pop();
        this.navCtrl.popToRoot();
    };
    MessagePage.prototype.doRefresh = function (refresher) {
        var that = this;
        setTimeout(function () {
            // Set startIndex to load more messages.
            if ((that.startIndex - that.numberOfMessages) > -1) {
                that.startIndex -= that.numberOfMessages;
            }
            else {
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
    };
    // Send message, if there's no conversation yet, create a new conversation.
    MessagePage.prototype.send = function () {
        var _this = this;
        if (!this.userId) {
            // Clone an instance of messages object so it will not directly be updated.
            // The messages object should be updated by our observer declared on ionViewDidLoad.
            var messages_1 = JSON.parse(JSON.stringify(this.messages));
            messages_1.push({
                date: new Date().toString(),
                sender: __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.uid,
                type: 'text',
                message: this.message
            });
            // Update group messages.
            this.dataProvider.getGroup(this.groupId).update({
                messages: messages_1
            });
            // Clear messagebox.
            this.message = '';
        }
        else {
            if (this.message) {
                // User entered a text on messagebox
                if (this.conversationId) {
                    // Add Message to the existing conversation
                    // Clone an instance of messages object so it will not directly be updated.
                    // The messages object should be updated by our observer declared on ionViewDidLoad.
                    var messages_2 = JSON.parse(JSON.stringify(this.messages));
                    messages_2.push({
                        date: new Date().toString(),
                        sender: __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.uid,
                        type: 'text',
                        message: this.message
                    });
                    // Update conversation on database.
                    this.dataProvider.getConversation(this.conversationId).update({
                        messages: messages_2
                    });
                    // Clear messagebox.
                    this.message = '';
                }
                else {
                    // New Conversation with friend.
                    var messages = [];
                    messages.push({
                        date: new Date().toString(),
                        sender: __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.uid,
                        type: 'text',
                        message: this.message
                    });
                    var users = [];
                    users.push(__WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.uid);
                    users.push(this.userId);
                    // Add conversation.
                    this.angularfire.list('conversations').push({
                        dateCreated: new Date().toString(),
                        messages: messages,
                        users: users
                    }).then(function (success) {
                        var conversationId = success.key;
                        _this.message = '';
                        // Add conversation reference to the users.
                        _this.angularfire.object('/accounts/' + __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.uid + '/conversations/' + _this.userId).update({
                            conversationId: conversationId,
                            messagesRead: 1
                        });
                        _this.angularfire.object('/accounts/' + _this.userId + '/conversations/' + __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.uid).update({
                            conversationId: conversationId,
                            messagesRead: 0
                        });
                    });
                }
            }
        }
    };
    // View user info
    MessagePage.prototype.viewUser = function (userId) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__user_info_user_info__["a" /* UserInfoPage */], { userId: userId });
    };
    MessagePage.prototype.attach = function () {
        var _this = this;
        var action = this.actionSheet.create({
            title: 'Choose attachments',
            buttons: [{
                    text: 'Camera',
                    handler: function () {
                        console.log("take photo");
                        _this.imageProvider.uploadPhotoMessage(_this.conversationId, _this.camera.PictureSourceType.CAMERA).then(function (url) {
                            // Process image message.
                            _this.sendPhotoMessage(url);
                        });
                    }
                }, {
                    text: 'Photo Library',
                    handler: function () {
                        console.log("Access gallery");
                        _this.imageProvider.uploadPhotoMessage(_this.conversationId, _this.camera.PictureSourceType.PHOTOLIBRARY).then(function (url) {
                            // Process image message.
                            _this.sendPhotoMessage(url);
                        });
                    }
                }, {
                    text: 'Video',
                    handler: function () {
                        console.log("Video");
                        _this.imageProvider.uploadVideoMessage(_this.conversationId).then(function (url) {
                            _this.sendVideoMessage(url);
                        });
                    }
                }, {
                    text: 'Location',
                    handler: function () {
                        console.log("Location");
                        _this.geolocation.getCurrentPosition({
                            timeout: 2000
                        }).then(function (res) {
                            var locationMessage = "current location: lat:" + res.coords.latitude + " lng:" + res.coords.longitude;
                            var confirm = _this.alertCtrl.create({
                                title: 'Your Location',
                                message: locationMessage,
                                buttons: [{
                                        text: 'cancel',
                                        handler: function () {
                                            console.log("canceled");
                                        }
                                    }, {
                                        text: 'Share',
                                        handler: function () {
                                            console.log("share");
                                            _this.message = locationMessage;
                                            _this.send();
                                        }
                                    }]
                            });
                            confirm.present();
                        }, function (locationErr) {
                            console.log("Location Error" + JSON.stringify(locationErr));
                        });
                    }
                }, {
                    text: 'Contact',
                    handler: function () {
                        console.log("Share contact");
                        _this.contacts.pickContact().then(function (data) {
                            console.log(data.displayName);
                            console.log(data.phoneNumbers[0].value);
                            _this.message = data.displayName + " ph: " + data.phoneNumbers[0].value;
                            _this.send();
                        }, function (err) {
                            console.log(err);
                        });
                    }
                }, {
                    text: 'cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log("cancelled");
                    }
                }]
        });
        action.present();
    };
    MessagePage.prototype.takePhoto = function () {
        var _this = this;
        this.imageProvider.uploadPhotoMessage(this.conversationId, this.camera.PictureSourceType.CAMERA).then(function (url) {
            // Process image message.
            _this.sendPhotoMessage(url);
        });
    };
    // Process photoMessage on database.
    MessagePage.prototype.sendPhotoMessage = function (url) {
        var _this = this;
        if (this.conversationId) {
            // Add image message to existing conversation.
            var messages_3 = JSON.parse(JSON.stringify(this.messages));
            messages_3.push({
                date: new Date().toString(),
                sender: __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.uid,
                type: 'image',
                url: url
            });
            // Update conversation on database.
            this.dataProvider.getConversation(this.conversationId).update({
                messages: messages_3
            });
        }
        else {
            // Create new conversation.
            var messages = [];
            messages.push({
                date: new Date().toString(),
                sender: __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.uid,
                type: 'image',
                url: url
            });
            var users = [];
            users.push(__WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.uid);
            users.push(this.userId);
            // Add conversation.
            this.angularfire.list('conversations').push({
                dateCreated: new Date().toString(),
                messages: messages,
                users: users
            }).then(function (success) {
                var conversationId = success.key;
                // Add conversation references to users.
                _this.angularfire.object('/accounts/' + __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.uid + '/conversations/' + _this.userId).update({
                    conversationId: conversationId,
                    messagesRead: 1
                });
                _this.angularfire.object('/accounts/' + _this.userId + '/conversations/' + __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.uid).update({
                    conversationId: conversationId,
                    messagesRead: 0
                });
            });
        }
    };
    // Process Video on database.
    MessagePage.prototype.sendVideoMessage = function (url) {
        var _this = this;
        if (this.conversationId) {
            // Add image message to existing conversation.
            var messages_4 = JSON.parse(JSON.stringify(this.messages));
            messages_4.push({
                date: new Date().toString(),
                sender: __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.uid,
                type: 'video',
                url: url
            });
            // Update conversation on database.
            this.dataProvider.getConversation(this.conversationId).update({
                messages: messages_4
            });
        }
        else {
            // Create new conversation.
            var messages = [];
            messages.push({
                date: new Date().toString(),
                sender: __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.uid,
                type: 'video',
                url: url
            });
            var users = [];
            users.push(__WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.uid);
            users.push(this.userId);
            // Add conversation.
            this.angularfire.list('conversations').push({
                dateCreated: new Date().toString(),
                messages: messages,
                users: users
            }).then(function (success) {
                var conversationId = success.key;
                // Add conversation references to users.
                _this.angularfire.object('/accounts/' + __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.uid + '/conversations/' + _this.userId).update({
                    conversationId: conversationId,
                    messagesRead: 1
                });
                _this.angularfire.object('/accounts/' + _this.userId + '/conversations/' + __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.uid).update({
                    conversationId: conversationId,
                    messagesRead: 0
                });
            });
        }
    };
    // Enlarge image messages.
    MessagePage.prototype.enlargeImage = function (img) {
        var imageModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_9__image_modal_image_modal__["a" /* ImageModalPage */], { img: img });
        imageModal.present();
    };
    MessagePage.prototype.getStyle = function (user) {
        for (var i = 0; i < this.colors.length; i++) {
            if (this.colors[i].user == user) {
                return {
                    width: '100%',
                    'background-color': this.colors[i].color,
                    height: '100%'
                };
            }
        }
    };
    return MessagePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */])
], MessagePage.prototype, "content", void 0);
MessagePage = MessagePage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-message',template:/*ion-inline-start:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/message/message.html"*/'<ion-header  mode=\'ios\'  [hidden]="!showToolbar">\n  \n    <ion-navbar  mode=\'ios\' [class.show-background]="showToolbar">\n        <ion-buttons  mode=\'ios\' start>\n            <button ion-button tappable (click)="back()"><ion-icon color=\'light\' class=\'menuButton\' name="arrow-back" item-right></ion-icon></button>\n          </ion-buttons>\n          <ion-buttons  mode=\'ios\' start>\n              <button class=\'profileTxt\' ion-button>Chats</button>\n            </ion-buttons>\n            <ion-buttons  mode=\'ios\' end>\n                <button ion-button tappable (click)="menu()"><ion-icon color=\'light\' class=\'menuButton\' name="ios-more-outline" item-right></ion-icon></button>\n              </ion-buttons>\n    </ion-navbar>\n  </ion-header>\n<ion-header  [hidden]="showToolbar">\n    <ion-navbar mode=\'ios\'class=\'tool\'>\n       <ion-buttons  mode=\'ios\' start>\n        <button ion-button tappable (click)="back()"><ion-icon color=\'light\' class=\'menuButton\' name="arrow-back" item-right></ion-icon></button>\n      </ion-buttons>\n      <ion-buttons  mode=\'ios\' start>\n          <button class=\'profileTxt\' ion-button>Chats</button>\n        </ion-buttons>\n        <ion-buttons  mode=\'ios\' end>\n            <button ion-button tappable (click)="menu()"><ion-icon color=\'light\' class=\'menuButton\' name="ios-more-outline" item-right></ion-icon></button>\n          </ion-buttons>\n        </ion-navbar>\n  </ion-header>\n<ion-content has-footer>\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n      <ion-refresher-content></ion-refresher-content>\n    </ion-refresher>\n  <div class=\'img\' *ngIf=\'groupId\' tappable (click)=\'setPhoto()\'>\n      <!--<img class=\'profileImg\' src=\'assets/images/profileBg.jpeg\'/>-->\n      <ion-icon color=\'light\' name=\'ios-camera-outline\'></ion-icon>\n    </div>\n  <div class=\'wrapper\'> \n      <div class=\'bg\'>\n          <div class=\'wrapper2\'>\n              <h1 class=\'profileName\'>{{title}}</h1>\n          </div>\n      <img class=\'bgImg\' *ngIf=\'!groupId\' src=\'assets/images/profileBg.jpeg\'/>\n      <img class=\'bgImg\' *ngIf=\'groupId\' src=\'{{group.img}}\'/>\n    </div>\n    </div>\n\n<!-- Messages -->\n\n<div class="messages">\n <ion-list no-lines>\n   <div class=\'m\' *ngFor="let message of messagesToShow">\n  <p class=\'senderName\'*ngIf=\'!isSystemMessage(message) && !isSender(message)\'>{{message.name}}</p>\n   <ion-item>\n\n       <!--  System Message -->\n    <div *ngIf="isSystemMessage(message)">\n      <p  class="system" >\n        <ion-icon name="{{message.icon}}"></ion-icon>\n        {{message.message}}\n      </p>\n     \n   </div>\n      <p item-right class="recip" *ngIf="message.type == \'text\' && isSender(message)">{{message.message}}</p>\n    \n       <p item-right class="location2" *ngIf="message.type == \'location\' && isSender(message)" (click)=\'showMap(message.lat,message.lon,message.sender)\'><ion-icon name=\'pin\'></ion-icon>You shared your location.</p>\n      <img class=\'img\' *ngIf="message.type == \'image\' && isSender(message)" item-right tappable (click)="enlargeImage(message.url)" src="{{message.url}}" (load)="doScroll()" />\n      <div item-right *ngIf=\'!isSystemMessage(message) && isSender(message)\'class=\'stripe\' >\n        <div [ngStyle]="getStyle(message.sender)">\n       </div>\n     </div>\n    \n     <div  item-left *ngIf="!isSender(message)" class=\'senderAvi\' tappable (click)=\'setPhoto()\'>\n        <img class=\'senderImg\' src="{{message.avatar}}" (load)="doScroll()" />\n      </div> \n   \n     <div *ngIf=\'!isSystemMessage(message) && !isSender(message)\'class=\'stripe\' item-left>\n        <div [ngStyle]="getStyle(message.sender)">\n       </div>\n     </div>\n    <p item-left class="sender" *ngIf="message.type == \'text\' && !isSender(message)">{{message.message}}</p>\n    <p item-left class="location" *ngIf="message.type == \'location\' && !isSender(message)"(click)=\'showMap(message.lat,message.lon,message.sender)\'><ion-icon name=\'pin\'></ion-icon>{{message.message}}</p>\n     <img class=\'img\'  *ngIf="message.type == \'image\' && !isSender(message)" item-left tappable (click)="enlargeImage(message.url)" src="{{message.url}}" (load)="doScroll()" />\n   \n   </ion-item>\n   <p class=\'rightS\'*ngIf=\'messagesToShow.indexOf(message) >= (messagesToShow.length-1) && isSender(message)\'>{{message.date |  Date2Format}}</p>\n   <p class=\'leftS\'*ngIf=\'messagesToShow.indexOf(message) >= (messagesToShow.length-1) && !isSender(message) \'>{{message.date |  Date2Format}}</p>\n   </div>\n </ion-list>\n</div>\n</ion-content>\n<!-- Message Box -->\n<ion-footer>\n<ion-item class="bottom_bar">\n <button item-left ion-button clear (click)="attach()"><ion-icon color=\'dark\' name="md-attach"></ion-icon></button>\n <ion-textarea type="text" rows="0" placeholder="Say something..." [(ngModel)]="message" (focus)="scrollBottom()" (keypress)="onType($event.keyCode)"></ion-textarea>\n <!-- <ion-buttons item-right> -->\n <button item-right ion-button clear (click)="connect(userId)"><ion-icon color=\'dark\' name="md-videocam"></ion-icon></button>\n <button item-right ion-button clear (click)="send()" [disabled]="!message"><ion-icon color=\'success\' name="ios-arrow-dropup-circle-outline"></ion-icon></button>\n <!-- </ion-buttons> -->\n</ion-item>\n</ion-footer>\n'/*ion-inline-end:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/message/message.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_3__providers_loading_loading__["a" /* LoadingProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5__providers_image_image__["a" /* ImageProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_12__ionic_native_keyboard__["a" /* Keyboard */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_contacts__["a" /* Contacts */], __WEBPACK_IMPORTED_MODULE_13__ionic_native_geolocation__["a" /* Geolocation */],
        __WEBPACK_IMPORTED_MODULE_4__providers_alert_alert__["a" /* AlertProvider */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]])
], MessagePage);

var MessagePage_1;
//# sourceMappingURL=message.js.map

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddMembersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data_data__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_loading_loading__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the AddMembersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AddMembersPage = (function () {
    function AddMembersPage(navCtrl, navParams, afDatabase, dataProvider, viewController, ref, loadingProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afDatabase = afDatabase;
        this.dataProvider = dataProvider;
        this.viewController = viewController;
        this.ref = ref;
        this.loadingProvider = loadingProvider;
        this.showToolbar = false;
        this.headerImgSize = '100%';
        this.headerImgUrl = '';
        this.transition = false;
        this.members = [];
        this.users = [];
        this.afDatabase.list('accounts/').subscribe(function (accounts) {
            accounts.forEach(function (account) {
                if (account.userId != __WEBPACK_IMPORTED_MODULE_2_firebase__["auth"]().currentUser.uid) {
                    _this.users.push(account);
                }
                else {
                }
            });
        });
    }
    AddMembersPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    AddMembersPage.prototype.addFriend = function (friend) {
        this.viewController.dismiss(friend);
    };
    AddMembersPage.prototype.onScroll = function ($event) {
        var scrollTop = $event.scrollTop;
        this.showToolbar = scrollTop >= 120;
        if (scrollTop < 0) {
            this.transition = false;
            this.headerImgSize = Math.abs(scrollTop) / 2 + 100 + "%";
        }
        else {
            this.transition = true;
            this.headerImgSize = '100%';
        }
        this.ref.detectChanges();
    };
    AddMembersPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.searchUser = '';
        this.loadingProvider.show();
        this.dataProvider.getCurrentUser().subscribe(function (account) {
            _this.excludedIds = [];
            _this.account = account;
            if (_this.excludedIds.indexOf(account.$key) == -1) {
                _this.excludedIds.push(account.$key);
            }
        });
        // Get user's friends.
        this.dataProvider.getUsers().subscribe(function (accounts) {
            if (accounts) {
                for (var i = 0; i < accounts.length; i++) {
                    _this.dataProvider.getUser(accounts[i].userId).subscribe(function (account) {
                        _this.addOrUpdateFriend(account);
                    });
                }
            }
            else {
                _this.friends = [];
            }
            _this.loadingProvider.hide();
        });
    };
    AddMembersPage.prototype.addOrUpdateFriend = function (friend) {
        if (!this.friends) {
            this.friends = [friend];
        }
        else {
            var index = -1;
            for (var i = 0; i < this.friends.length; i++) {
                if (this.friends[i].$key == friend.$key) {
                    index = i;
                }
            }
            if (index > -1) {
                this.friends[index] = friend;
            }
            else {
                this.friends.push(friend);
            }
        }
    };
    AddMembersPage.prototype.submit = function () {
        this.viewController.dismiss(this.members);
    };
    AddMembersPage.prototype.addMember = function (friend) {
        if (this.members.indexOf(friend) == -1) {
            this.members.push(friend);
            this.users.splice(this.users.indexOf(friend), 1);
        }
        else {
        }
    };
    AddMembersPage.prototype.removeMember = function (member) {
        if (this.members.indexOf(member) > -1) {
            this.members.splice(this.members.indexOf(member), 1);
            this.users.push(member);
        }
    };
    AddMembersPage.prototype.cancel = function () {
        this.viewController.dismiss();
    };
    return AddMembersPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */])
], AddMembersPage.prototype, "content", void 0);
AddMembersPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-add-members',template:/*ion-inline-start:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/add-members/add-members.html"*/'<!--\n  Generated template for the AddMembersPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header  mode=\'ios\'  [hidden]="!showToolbar">\n    \n      <ion-navbar  mode=\'ios\' [class.show-background]="showToolbar">\n          <ion-buttons start>\n              <button ion-button tappable (click)=\'back()\'><ion-icon color=\'light\' class=\'menuButton\' name="ios-close" item-right></ion-icon></button>\n            </ion-buttons>\n            <ion-buttons start>\n                <button class=\'profileTxt\' ion-button>Add Member</button>\n              </ion-buttons>\n      </ion-navbar>\n    \n    </ion-header>\n\n<ion-header  [hidden]="showToolbar">\n    \n      <ion-navbar mode=\'ios\'class=\'tool\'>\n         <ion-buttons  mode=\'ios\' start>\n          <button ion-button tappable (click)=\'back()\'><ion-icon color=\'light\' class=\'menuButton\' name="ios-close" item-right></ion-icon></button>\n        </ion-buttons>\n        <ion-buttons  mode=\'ios\' start>\n            <button class=\'profileTxt\' ion-button>Add Member</button>\n          </ion-buttons>\n      </ion-navbar>\n    \n    </ion-header>\n<ion-content class="content"\n(ionScroll)="onScroll($event)"\n[class.transition]="transition">\n<img src=\'assets/images/bgAdd.jpeg\'>\n  <div class=\'bg\'>\n    <div class=\'wrapper\'>\n  <!-- No friends yet to start a conversation with -->\n  <div class="empty-list" *ngIf="friends && friends.length == 0">\n    <h1><ion-icon name="md-contacts"></ion-icon></h1>\n    <p>Uh-oh! You have not added any friends yet.</p>\n    <button ion-button icon-left tappable (click)="searchPeople()"><ion-icon name="md-search"></ion-icon>Search People</button>\n  </div>\n  <!-- Show friends to start a conversation with -->\n  <ion-list class="avatar-list" *ngIf="friends && friends.length > 0">\n    <ion-searchbar [(ngModel)]="searchFriend" placeholder="Search for friend or username" showCancelButton="true" cancelButtonText="Done"></ion-searchbar>\n    <ion-list-header mode=\'md\' no-lines>\n        <h2>Users</h2>\n            </ion-list-header>\n    <ion-item *ngFor="let friend of friends | searchFilter:[excludedIds, searchUser]" no-lines tappable (click)="addFriend(friend)">\n      <ion-avatar item-left>\n        <img src="{{friend.img}}">\n      </ion-avatar>\n      <h2>{{friend.name}}</h2>\n    </ion-item>\n  </ion-list>\n</div>\n</div>\n</ion-content>'/*ion-inline-end:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/add-members/add-members.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_4__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* ViewController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"], __WEBPACK_IMPORTED_MODULE_5__providers_loading_loading__["a" /* LoadingProvider */]])
], AddMembersPage);

//# sourceMappingURL=add-members.js.map

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddEventPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_alert_alert__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the AddEventPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AddEventPage = (function () {
    function AddEventPage(navCtrl, navParams, ref, viewCtrl, db, alertProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ref = ref;
        this.viewCtrl = viewCtrl;
        this.db = db;
        this.alertProvider = alertProvider;
        this.showToolbar = false;
        this.headerImgSize = '100%';
        this.headerImgUrl = '';
        this.transition = false;
        this.cost = 0;
        this.img = 'assets/images/adventure.jpeg';
        this.eventEnd = this.eventStart;
        this.category = 'Adventure';
        this.categories = [{ id: 'Other' }, { id: 'Entertainment/Night Life' }, { id: 'Adventure' }, { id: 'Meeting/Conference' }, { id: 'Gratuity' }, { id: 'Goods/Souveniers' },
            { id: 'Travel' }, { id: 'Hotel/Accomodations' }, { id: 'Transportation' }];
        this.trip = this.navParams.get('trip');
        this.start = __WEBPACK_IMPORTED_MODULE_2_moment__(this.trip.start).toISOString();
        this.end = __WEBPACK_IMPORTED_MODULE_2_moment__(this.trip.end).toISOString();
        this.eventStart = this.start;
        this.eventEnd = this.eventStart;
        this.categories.sort(function (a, b) {
            var item1 = a.id;
            var item2 = b.id;
            if (item1 < item2) {
                return -1;
            }
            else if (item1 > item2) {
                return 1;
            }
            else {
                return 0;
            }
        });
        this.subscription1 = this.db.object('/trips/' + this.trip.$key).subscribe(function (res) {
            _this.allocated = res.allocated;
        });
    }
    AddEventPage.prototype.changeImg = function () {
        console.log(this.category);
        if (this.category == 'Other') {
            this.img = 'assets/images/event-default.jpeg';
        }
        if (this.category == 'Meeting/Conference') {
            this.img = 'assets/images/meetings.jpeg';
        }
        if (this.category == 'Entertainment/Night Life') {
            this.img = 'assets/images/entertainment.jpeg';
        }
        if (this.category == 'Adventure') {
            this.img = 'assets/images/adventure.jpeg';
        }
        if (this.category == 'Hotel/Accomodations') {
            this.img = 'assets/images/hotel.jpeg';
        }
        if (this.category == 'Gratuity') {
            this.img = 'assets/images/gratuity.jpeg';
        }
        if (this.category == 'Goods/Souveniers') {
            this.img = 'assets/images/goods.jpeg';
        }
        if (this.category == 'Travel') {
            this.img = 'assets/images/travel.jpeg';
        }
        if (this.category == 'Transportation') {
            this.img = 'assets/images/transportation.jpeg';
        }
    };
    AddEventPage.prototype.submit = function () {
        var _this = this;
        var category = this.category.replace(' ', '_');
        var event = { title: this.title, start: this.eventStart, end: this.eventEnd, category: this.category, details: this.details, cost: this.cost, img: this.img };
        var allocated = this.allocated + this.cost;
        this.db.list('/trips/' + this.trip.$key + '/events/' + category).push(event).then(function (success) {
            _this.db.object('/trips/' + _this.trip.$key).update({ allocated: allocated }).then(function (success) {
                _this.alertProvider.showEventAdded();
            });
            _this.close();
        });
    };
    AddEventPage.prototype.ionViewWillLeave = function () {
        if (this.subscription1) {
            this.subscription1.unsubscribe();
        }
    };
    AddEventPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddEventPage');
    };
    AddEventPage.prototype.onScroll = function ($event) {
        var scrollTop = $event.scrollTop;
        this.showToolbar = scrollTop >= 120;
        if (scrollTop < 0) {
            this.transition = false;
            this.headerImgSize = Math.abs(scrollTop) / 2 + 100 + "%";
        }
        else {
            this.transition = true;
            this.headerImgSize = '100%';
        }
        this.ref.detectChanges();
    };
    AddEventPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    return AddEventPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */])
], AddEventPage.prototype, "content", void 0);
AddEventPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-add-event',template:/*ion-inline-start:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/add-event/add-event.html"*/'<ion-header  [hidden]="!showToolbar">\n  <ion-navbar [class.show-background]="showToolbar">\n      <ion-title *ngIf=\'trip\'><p class=\'tripTitle\'>{{trip.location}}</p></ion-title>\n          <ion-buttons start>\n              <button ion-button tappable (click)="close()"><ion-icon color=\'light\' class=\'menuButton\' name="ios-close" item-right></ion-icon></button>\n            </ion-buttons>\n            <ion-buttons end>\n                <button ion-button tappable color=\'light\' (click)="submit()">Done</button>\n              </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-header  [hidden]="showToolbar">\n    <ion-navbar class=\'tool\'>\n        <ion-title *ngIf=\'trip\'><p class=\'tripTitle\'>{{trip.location}}</p></ion-title>\n       <ion-buttons start>\n        <button ion-button tappable (click)="close()"><ion-icon color=\'light\' class=\'menuButton\' name="ios-close" item-right></ion-icon></button>\n      </ion-buttons>\n      <ion-buttons end>\n          <button ion-button tappable color=\'light\' (click)="submit()">Done</button>\n        </ion-buttons>\n    </ion-navbar>\n  </ion-header>\n<ion-content class="content"\n(ionScroll)="onScroll($event)"\n[class.transition]="transition">\n<div>\n<div class=\'img\' tappable (click)=\'setGroupPhoto()\'>\n<ion-icon color=\'white\' name=\'ios-camera-outline\'>\n</ion-icon>\n</div>\n<div class=\'wrapper\'> \n<div class=\'bg\'>\n  <div class=\'wrapper2\'>\n    <h1 class=\'profileName\'>Create Activity</h1>\n  </div>\n<img class=\'bgImg\' [src]=\'img\'/>\n</div>\n</div>\n<ion-list inset class=\'list\'>\n<ion-item>\n    <ion-input text-center placeholder=\'Title\' [(ngModel)]=\'title\' type="text" style="text-align:center; color:black;"></ion-input>\n</ion-item>\n<ion-item>\n    <ion-label>Category</ion-label>\n    <ion-select (ionChange)=\'changeImg()\' [(ngModel)]="category">\n      <ion-option *ngFor=\'let category of categories\' [value]="category.id">{{category.id}}</ion-option>\n    </ion-select>\n  </ion-item>\n<ion-item>\n<ion-label>Start</ion-label>\n<ion-datetime [min]="start" [max]="end" placeholder=\'Start\' displayFormat="MM/DD/YYYY hh:mm a" [(ngModel)]="eventStart"></ion-datetime>\n</ion-item>\n<ion-item>\n  <ion-label>End</ion-label>\n  <ion-datetime [min]="eventStart" [max]="end" placeholder=\'End\' displayFormat="MM/DD/YYYY hh:mm a" [(ngModel)]="eventEnd"></ion-datetime>\n</ion-item>\n<ion-item>\n  <ion-textarea rows=\'6\' text-center placeholder=\'Details\' [(ngModel)]=\'details\' type="text" style="text-align:center; color:black;"></ion-textarea>\n</ion-item>\n<ion-item>\n    <input currencyMask placeholder=\'Budget Amount\' [(ngModel)]=\'cost\' />\n</ion-item>\n\n            \n<button class=\'submit\' ion-button  block color=\'primary\'(click)=\'submit()\'>DONE</button>\n      </ion-list>\n     \n</div>\n</ion-content>\n'/*ion-inline-end:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/add-event/add-event.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_4__providers_alert_alert__["a" /* AlertProvider */]])
], AddEventPage);

//# sourceMappingURL=add-event.js.map

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VirtualcardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the VirtualcardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var VirtualcardPage = (function () {
    function VirtualcardPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    VirtualcardPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VirtualcardPage');
    };
    // Event Handler for Toggle Button
    // Event Handler for Add Cash Button
    VirtualcardPage.prototype.addCashButton = function () {
        alert("Add Cash Button");
    };
    // Event Handler for Cash Out Button
    VirtualcardPage.prototype.cashOutButton = function () {
        alert("Cash Out Button");
    };
    return VirtualcardPage;
}());
VirtualcardPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-virtualcard',template:/*ion-inline-start:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/virtualcard/virtualcard.html"*/'<!--\n  Generated template for the VirtualcardPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n\n<ion-header>\n\n    <ion-navbar>\n        <ion-title id="Card">Virtual Card</ion-title>\n    </ion-navbar>\n\n</ion-header>-->\n\n<ion-content padding class="background">\n\n    <div class="title">\n        Virtual Card\n    </div>\n\n    <button class=\'hambutton\' ion-button menuToggle>\n    </button>\n\n    <div class="hamburger">\n        <div class="line1"></div>\n        <div class="line2"></div>\n        <div class="line3"></div>\n    </div>\n\n    <div class="balance">\n        $0.00\n    </div>\n\n    <div class="currency">\n        Cash\n    </div>\n    \n    <img class="physicalCard" width="330px" height="180px" src="../../assets/images/VirtualCard.jpg">\n\n\n    <div class="switch">\n        <input id="cmn-toggle-1" class="cmn-toggle cmn-toggle-round" type="checkbox"  >\n        <label for="cmn-toggle-1"></label>\n    </div>\n\n    <div class=\'button1\'>\n        <button class=\'addcash\' ion-button color="dark" (click)="addCashButton()">Add Cash</button>\n    </div>\n\n    <div class=\'button2\'>\n        <button class=\'cashout\' ion-button color="dark" (click)="cashOutButton()">Cash Out</button>\n    </div>\n\n</ion-content>'/*ion-inline-end:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/virtualcard/virtualcard.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */]) === "function" && _b || Object])
], VirtualcardPage);

var _a, _b;
//# sourceMappingURL=virtualcard.js.map

/***/ }),

/***/ 186:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 186;

/***/ }),

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoadingProvider = (function () {
    function LoadingProvider(loadingController) {
        this.loadingController = loadingController;
        // Loading Provider
        // This is the provider class for most of the loading spinners screens on the app.
        // Set your spinner/loading indicator type here
        // List of Spinners: https://ionicframework.com/docs/v2/api/components/spinner/Spinner/
        this.spinner = {
            spinner: 'circles'
        };
        console.log("Initializing Loading Provider");
    }
    //Show loading
    LoadingProvider.prototype.show = function () {
        if (!this.loading) {
            this.loading = this.loadingController.create(this.spinner);
            this.loading.present();
        }
    };
    //Hide loading
    LoadingProvider.prototype.hide = function () {
        if (this.loading) {
            this.loading.dismiss();
            this.loading = null;
        }
    };
    return LoadingProvider;
}());
LoadingProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* LoadingController */]])
], LoadingProvider);

//# sourceMappingURL=loading.js.map

/***/ }),

/***/ 227:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/group/group.module": [
		700,
		0
	],
	"../pages/virtualcard/virtualcard.module": [
		701,
		1
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 227;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__validator__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logout_logout__ = __webpack_require__(81);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var errorMessages = {
    // Alert Provider
    // This is the provider class for most of the success and error messages in the app.
    // If you added your own messages don't forget to make a function for them or add them in the showErrorMessage switch block.
    // Firebase Error Messages
    accountExistsWithDifferentCredential: { title: 'Account Exists!', subTitle: 'An account with the same credential already exists.' },
    invalidCredential: { title: 'Invalid Credential!', subTitle: 'An error occured logging in with this credential.' },
    operationNotAllowed: { title: 'Login Failed!', subTitle: 'Logging in with this provider is not allowed! Please contact support.' },
    userDisabled: { title: 'Account Disabled!', subTitle: 'Sorry! But this account has been suspended! Please contact support.' },
    userNotFound: { title: 'Account Not Found!', subTitle: 'Sorry, but an account with this credential could not be found.' },
    wrongPassword: { title: 'Incorrect Password!', subTitle: 'Sorry, but the password you have entered is incorrect.' },
    invalidEmail: { title: 'Invalid Email!', subTitle: 'Sorry, but you have entered an invalid email address.' },
    emailAlreadyInUse: { title: 'Email Not Available!', subTitle: 'Sorry, but this email is already in use.' },
    weakPassword: { title: 'Weak Password!', subTitle: 'Sorry, but you have entered a weak password.' },
    requiresRecentLogin: { title: 'Credential Expired!', subTitle: 'Sorry, but this credential has expired! Please login again.' },
    userMismatch: { title: 'User Mismatch!', subTitle: 'Sorry, but this credential is for another user!' },
    providerAlreadyLinked: { title: 'Already Linked!', subTitle: 'Sorry, but your account is already linked to this credential.' },
    credentialAlreadyInUse: { title: 'Credential Not Available!', subTitle: 'Sorry, but this credential is already used by another user.' },
    // Profile Error Messages
    changeName: { title: 'Change Name Failed!', subTitle: 'Sorry, but we\'ve encountered an error changing your name.' },
    invalidCharsName: __WEBPACK_IMPORTED_MODULE_2__validator__["a" /* Validator */].profileNameValidator.patternError,
    nameTooShort: __WEBPACK_IMPORTED_MODULE_2__validator__["a" /* Validator */].profileNameValidator.lengthError,
    changeEmail: { title: 'Change Email Failed!', subTitle: 'Sorry, but we\'ve encountered an error changing your email address.' },
    invalidProfileEmail: __WEBPACK_IMPORTED_MODULE_2__validator__["a" /* Validator */].profileEmailValidator.patternError,
    changePhoto: { title: 'Change Photo Failed!', subTitle: 'Sorry, but we\'ve encountered an error changing your photo.' },
    passwordTooShort: __WEBPACK_IMPORTED_MODULE_2__validator__["a" /* Validator */].profilePasswordValidator.lengthError,
    invalidCharsPassword: __WEBPACK_IMPORTED_MODULE_2__validator__["a" /* Validator */].profilePasswordValidator.patternError,
    passwordsDoNotMatch: { title: 'Change Password Failed!', subTitle: 'Sorry, but the passwords you entered do not match.' },
    updateProfile: { title: 'Update Profile Failed', subTitle: 'Sorry, but we\'ve encountered an error updating your profile.' },
    usernameExists: { title: 'Username Already Exists!', subTitle: 'Sorry, but this username is already taken by another user.' },
    phoneExists: { title: 'Phone Number Already Exists!', subTitle: 'Sorry, but this phone number is already taken by another user.' },
    // Image Error Messages
    imageUpload: { title: 'Image Upload Failed!', subTitle: 'Sorry but we\'ve encountered an error uploading selected image.' },
    // Group Error Messages
    groupUpdate: { title: 'Update Group Failed!', subTitle: 'Sorry, but we\'ve encountered an error updating this group.' },
    groupLeave: { title: 'Leave Group Failed!', subTitle: 'Sorry, but you\'ve encountered an error leaving this group.' },
    groupDelete: { title: 'Delete Group Failed!', subTitle: 'Sorry, but we\'ve encountered an error deleting this group.' }
};
var successMessages = {
    passwordResetSent: { title: 'Password Reset Sent!', subTitle: 'A password reset email has been sent to: ' },
    profileUpdated: { title: 'Profile Updated!', subTitle: 'Your profile has been successfully updated!' },
    feedbackReceived: { title: 'Feedback Received!', subTitle: 'Your feedback means a lot to us! We will review your submission and reach out with any questions.' },
    supportReceived: { title: 'Support Ticket Received!', subTitle: "We're sorry you're having issues with Nautical. We have received your support ticket and are working to resolve it." },
    emailVerified: { title: 'Email Confirmed!', subTitle: 'Congratulations! Your email has been confirmed!' },
    emailVerificationSent: { title: 'Email Confirmation Sent!', subTitle: 'An email confirmation has been sent to: ' },
    accountDeleted: { title: 'Account Deleted!', subTitle: 'Your account has been successfully deleted.' },
    passwordChanged: { title: 'Password Changed!', subTitle: 'Your password has been successfully changed.' },
    friendRequestSent: { title: 'Friend Request Sent!', subTitle: 'Your friend request has been successfully sent!' },
    friendRequestRemoved: { title: 'Friend Request Deleted!', subTitle: 'Your friend request has been successfully deleted.' },
    groupUpdated: { title: 'Group Updated!', subTitle: 'This group has been successfully updated!' },
    groupLeft: { title: 'Leave Group', subTitle: 'You have successfully left this group.' },
    tripCreation: { title: 'Trip Created', subTitle: 'Your trip has successfully been created!' },
    eventCreation: { title: 'Event Created', subTitle: 'Your event has successfully been created!' }
};
var AlertProvider = (function () {
    function AlertProvider(alertCtrl, logoutProvider) {
        this.alertCtrl = alertCtrl;
        this.logoutProvider = logoutProvider;
        console.log("Initializing Alert Provider");
    }
    // Show event added
    AlertProvider.prototype.showEventAdded = function () {
        this.alert = this.alertCtrl.create({
            title: successMessages.eventCreation["title"],
            subTitle: successMessages.eventCreation["subTitle"],
            buttons: ['OK']
        }).present();
    };
    // Show trip created
    AlertProvider.prototype.showTripCreated = function () {
        this.alert = this.alertCtrl.create({
            title: successMessages.tripCreation["title"],
            subTitle: successMessages.tripCreation["subTitle"],
            buttons: ['OK']
        }).present();
    };
    // Show profile updated
    AlertProvider.prototype.showProfileUpdatedMessage = function () {
        this.alert = this.alertCtrl.create({
            title: successMessages.profileUpdated["title"],
            subTitle: successMessages.profileUpdated["subTitle"],
            buttons: ['OK']
        }).present();
    };
    // Show password reset sent
    AlertProvider.prototype.showPasswordResetMessage = function (email) {
        this.alert = this.alertCtrl.create({
            title: successMessages.passwordResetSent["title"],
            subTitle: successMessages.passwordResetSent["subTitle"] + email,
            buttons: ['OK']
        }).present();
    };
    // Show email verified and redirect to homePage
    AlertProvider.prototype.showEmailVerifiedMessageAndRedirect = function (navCtrl) {
        this.alert = this.alertCtrl.create({
            title: successMessages.emailVerified["title"],
            subTitle: successMessages.emailVerified["subTitle"],
            buttons: [{
                    text: 'OK',
                    handler: function () {
                        navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login__["a" /* Login */].homePage);
                    }
                }]
        }).present();
    };
    AlertProvider.prototype.showFeedbackMessage = function () {
        this.alert = this.alertCtrl.create({
            title: successMessages.feedbackReceived["title"],
            subTitle: successMessages.feedbackReceived["subTitle"],
            buttons: ['OK']
        }).present();
    };
    AlertProvider.prototype.showSupportkMessage = function () {
        this.alert = this.alertCtrl.create({
            title: successMessages.supportReceived["title"],
            subTitle: successMessages.supportReceived["subTitle"],
            buttons: ['OK']
        }).present();
    };
    // Show email verification sent
    AlertProvider.prototype.showEmailVerificationSentMessage = function (email) {
        this.alert = this.alertCtrl.create({
            title: successMessages.emailVerificationSent["title"],
            subTitle: successMessages.emailVerificationSent["subTitle"] + email,
            buttons: ['OK']
        }).present();
    };
    // Show account deleted
    AlertProvider.prototype.showAccountDeletedMessage = function () {
        this.alert = this.alertCtrl.create({
            title: successMessages.accountDeleted["title"],
            subTitle: successMessages.accountDeleted["subTitle"],
            buttons: ['OK']
        }).present();
    };
    // Show password changed
    AlertProvider.prototype.showPasswordChangedMessage = function () {
        this.alert = this.alertCtrl.create({
            title: successMessages.passwordChanged["title"],
            subTitle: successMessages.passwordChanged["subTitle"],
            buttons: ['OK']
        }).present();
    };
    // Show friend request sent
    AlertProvider.prototype.showFriendRequestSent = function () {
        this.alert = this.alertCtrl.create({
            title: successMessages.friendRequestSent["title"],
            subTitle: successMessages.friendRequestSent["subTitle"],
            buttons: ['OK']
        }).present();
    };
    // Show friend request removed
    AlertProvider.prototype.showFriendRequestRemoved = function () {
        this.alert = this.alertCtrl.create({
            title: successMessages.friendRequestRemoved["title"],
            subTitle: successMessages.friendRequestRemoved["subTitle"],
            buttons: ['OK']
        }).present();
    };
    // Show group updated.
    AlertProvider.prototype.showGroupUpdatedMessage = function () {
        this.alert = this.alertCtrl.create({
            title: successMessages.groupUpdated["title"],
            subTitle: successMessages.groupUpdated["subTitle"],
            buttons: ['OK']
        }).present();
    };
    // Show error messages depending on the code
    // If you added custom error codes on top, make sure to add a case block for it.
    AlertProvider.prototype.showErrorMessage = function (code) {
        switch (code) {
            // Firebase Error Messages
            case 'auth/account-exists-with-different-credential':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.accountExistsWithDifferentCredential["title"],
                    subTitle: errorMessages.accountExistsWithDifferentCredential["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'auth/invalid-credential':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.invalidCredential["title"],
                    subTitle: errorMessages.invalidCredential["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'auth/operation-not-allowed':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.operationNotAllowed["title"],
                    subTitle: errorMessages.operationNotAllowed["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'auth/user-disabled':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.userDisabled["title"],
                    subTitle: errorMessages.userDisabled["subTitle"],
                    buttons: ['OK']
                });
                this.alert.present();
                break;
            case 'auth/user-not-found':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.userNotFound["title"],
                    subTitle: errorMessages.userNotFound["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'auth/wrong-password':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.wrongPassword["title"],
                    subTitle: errorMessages.wrongPassword["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'auth/invalid-email':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.invalidEmail["title"],
                    subTitle: errorMessages.invalidEmail["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'auth/email-already-in-use':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.emailAlreadyInUse["title"],
                    subTitle: errorMessages.emailAlreadyInUse["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'auth/weak-password':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.weakPassword["title"],
                    subTitle: errorMessages.weakPassword["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'auth/requires-recent-login':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.requiresRecentLogin["title"],
                    subTitle: errorMessages.requiresRecentLogin["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'auth/user-mismatch':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.userMismatch["title"],
                    subTitle: errorMessages.userMismatch["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'auth/provider-already-linked':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.providerAlreadyLinked["title"],
                    subTitle: errorMessages.providerAlreadyLinked["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'auth/credential-already-in-use':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.credentialAlreadyInUse["title"],
                    subTitle: errorMessages.credentialAlreadyInUse["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            // Profile Error Messages
            case 'profile/error-change-name':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.changeName["title"],
                    subTitle: errorMessages.changeName["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'profile/invalid-chars-name':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.invalidCharsName["title"],
                    subTitle: errorMessages.invalidCharsName["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'profile/name-too-short':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.nameTooShort["title"],
                    subTitle: errorMessages.nameTooShort["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'profile/error-change-email':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.changeEmail["title"],
                    subTitle: errorMessages.changeEmail["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'profile/invalid-email':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.invalidProfileEmail["title"],
                    subTitle: errorMessages.invalidProfileEmail["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'profile/error-change-photo':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.changePhoto["title"],
                    subTitle: errorMessages.changePhoto["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'profile/password-too-short':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.passwordTooShort["title"],
                    subTitle: errorMessages.passwordTooShort["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'profile/invalid-chars-password':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.invalidCharsPassword["title"],
                    subTitle: errorMessages.invalidCharsPassword["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'profile/passwords-do-not-match':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.passwordsDoNotMatch["title"],
                    subTitle: errorMessages.passwordsDoNotMatch["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'profile/error-update-profile':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.updateProfile["title"],
                    subTitle: errorMessages.updateProfile["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'profile/error-same-username':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.usernameExists["title"],
                    subTitle: errorMessages.usernameExists["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'profile/error-same-phone':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.phoneExists["title"],
                    subTitle: errorMessages.phoneExists["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            //Image Error Messages
            case 'image/error-image-upload':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.imageUpload["title"],
                    subTitle: errorMessages.imageUpload["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            // Group Error MEssages
            case 'group/error-update-group':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.groupUpdate["title"],
                    subTitle: errorMessages.groupUpdate["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'group/error-leave-group':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.groupLeave["title"],
                    subTitle: errorMessages.groupLeave["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
            case 'group/error-delete-group':
                this.alert = this.alertCtrl.create({
                    title: errorMessages.groupDelete["title"],
                    subTitle: errorMessages.groupDelete["subTitle"],
                    buttons: ['OK']
                }).present();
                break;
        }
    };
    return AlertProvider;
}());
AlertProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__logout_logout__["a" /* LogoutProvider */]])
], AlertProvider);

//# sourceMappingURL=alert.js.map

/***/ }),

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_login_login__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__validator__ = __webpack_require__(80);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginPage = (function () {
    // LoginPage
    // This is the page where the user can register and login to our app.
    // It's important to initialize the loginProvider here and setNavController as it will direct the routes of our app.
    function LoginPage(navCtrl, loginProvider, formBuilder, events) {
        this.navCtrl = navCtrl;
        this.loginProvider = loginProvider;
        this.formBuilder = formBuilder;
        this.events = events;
        // It's important to hook the navController to our loginProvider.
        this.loginProvider.setNavController(this.navCtrl);
        // Create our forms and their validators based on validators set on validator.ts.
        this.emailPasswordForm = formBuilder.group({
            email: __WEBPACK_IMPORTED_MODULE_4__validator__["a" /* Validator */].emailValidator,
            password: __WEBPACK_IMPORTED_MODULE_4__validator__["a" /* Validator */].passwordValidator
        });
        this.emailForm = formBuilder.group({
            email: __WEBPACK_IMPORTED_MODULE_4__validator__["a" /* Validator */].emailValidator
        });
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        // Set view mode to main.
        this.mode = 'main';
    };
    LoginPage.prototype.ionViewDidLeave = function () {
        this.events.publish('page:unload');
    };
    // Call loginProvider and login the user with email and password.
    // You may be wondering where the login function for Facebook and Google are.
    // They are called directly from the html markup via loginProvider.facebookLogin() and loginProvider.googleLogin().
    LoginPage.prototype.login = function () {
        this.loginProvider.emailLogin(this.emailPasswordForm.value["email"], this.emailPasswordForm.value["password"]);
    };
    // Call loginProvider and register the user with email and password.
    LoginPage.prototype.register = function () {
        this.loginProvider.register(this.emailPasswordForm.value["email"], this.emailPasswordForm.value["password"]);
    };
    // Call loginProvider and send a password reset email.
    LoginPage.prototype.forgotPassword = function () {
        this.loginProvider.sendPasswordReset(this.emailString);
        this.clearForms();
    };
    // Clear the forms.
    LoginPage.prototype.clearForms = function () {
        this.emailPasswordForm.reset();
        this.emailForm.reset();
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-login',template:/*ion-inline-start:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/login/login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content class="no-scroll">\n  <div class=\'container\'>\n  <div class="top">\n    <h1 class="Passion">Nautical</h1>\n<img class="logo" src="assets/images/icon.png"/>\n\n    <!--<ion-icon class="md-heart" name="md-heart" style="color:#ff5757;font-size:60px"></ion-icon>-->\n  </div>\n\n  <ion-list inset>\n    <form [formGroup]="emailPasswordForm">\n    <ion-item no-lines>\n        <ion-label ><ion-icon name=\'ios-person-outline\'></ion-icon></ion-label>\n        <ion-input placeholder=\'Email\' [(ngModel)]=\'emailString\' type="text" formControlName="email" style="text-align:left"></ion-input>\n      </ion-item>\n      <ion-item no-lines>\n        <ion-note><button item-right ion-button color="gray" clear tappable (click)="forgotPassword()">RESET</button></ion-note>\n        <ion-label ><ion-icon name=\'ios-lock-outline\'></ion-icon></ion-label>\n        <ion-input placeholder=\'Password\' type="password" formControlName="password" style="text-align:left"></ion-input>\n      </ion-item>\n      <ion-row>\n         <button ion-button full color="primary" block tappable (click)="login()" [disabled]="!emailPasswordForm.valid">Log in</button>\n      </ion-row>\n         <ion-row>\n        <button ion-button color="dark" block tappable (click)="register()" [disabled]="!emailPasswordForm.valid">Signup</button>\n      </ion-row>\n     <!-- <ion-row>\n        <ion-col>\n          <button ion-button color="primary" block tappable (click)="login()" [disabled]="!emailPasswordForm.valid">Log in</button>\n        </ion-col>\n        <ion-col>\n          <button ion-button color="dark" block tappable (click)="register()" [disabled]="!emailPasswordForm.valid">Signup</button>\n        </ion-col>\n      </ion-row>-->\n      </form>\n      <p style="text-align: center;font-size:10px;color:rgba(255,255,255,.8);">--- OR CONTINUE WITH ---</p>\n      <ion-row>\n        <ion-col>\n      <button ion-fab class=\'fabButt\' color="facebook" icon-only tappable (click)="loginProvider.facebookLogin()"><ion-icon name="logo-facebook"></ion-icon></button>\n        </ion-col>\n    <ion-col>\n      <button ion-fab class=\'fabButt\' icon-only color="google" tappable (click)="loginProvider.googleLogin()"><ion-icon name="logo-google"></ion-icon></button>\n    </ion-col>  \n    </ion-row>\n  <ion-row>\n    <button ion-button full clear tappable (click)="forgotPassword()" color=\'light\'> Forgot Password</button>\n  </ion-row>\n\n    </ion-list>\n</div>\n  <div class=\'wrapper\'>\n    <div class=\'bg\'>\n      <div class=\'wrapper2\'>\n      </div>\n    <img class=\'bgImg\' src=\'assets/images/background.jpg\'/>\n  </div>\n  </div>\n   \n \n</ion-content>'/*ion-inline-end:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/login/login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_login_login__["a" /* LoginProvider */],
        __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Events */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__loading_loading__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__alert_alert__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_google_plus__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__ = __webpack_require__(472);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LoginProvider = (function () {
    //private facebookProvider = new Facebook({
    //clientId: Login.facebookAppId,
    //appScope: ["email"]
    //});
    function LoginProvider(loadingProvider, alertProvider, zone, googleplus, facebook) {
        var _this = this;
        this.loadingProvider = loadingProvider;
        this.alertProvider = alertProvider;
        this.zone = zone;
        this.googleplus = googleplus;
        this.facebook = facebook;
        console.log("Initializing Login Provider");
        // Detect changes on the Firebase user and redirects the view depending on the user's status.
        __WEBPACK_IMPORTED_MODULE_1_firebase__["auth"]().onAuthStateChanged(function (user) {
            if (user) {
                if (user["isAnonymous"]) {
                    //Goto Trial Page.
                    // this.navCtrl.setRoot(Login.trialPage, { animate: false });
                }
                else {
                    if (__WEBPACK_IMPORTED_MODULE_2__login__["a" /* Login */].emailVerification) {
                        if (user["emailVerified"]) {
                            //Goto Home Page.
                            _this.zone.run(function () {
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login__["a" /* Login */].homePage, { animate: false });
                            });
                            //Since we're using a TabsPage an NgZone is required.
                        }
                        else {
                            //Goto Verification Page.
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login__["a" /* Login */].verificationPage, { animate: false });
                        }
                    }
                    else {
                        //Goto Home Page.
                        _this.zone.run(function () {
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login__["a" /* Login */].homePage, { animate: false });
                        });
                        //Since we're using a TabsPage an NgZone is required.
                    }
                }
            }
        });
    }
    // Hook this provider up with the navigationController.
    // This is important, so the provider can redirect the app to the views depending
    // on the status of the Firebase user.
    LoginProvider.prototype.setNavController = function (navCtrl) {
        this.navCtrl = navCtrl;
    };
    // Facebook Login, after successful authentication, triggers firebase.auth().onAuthStateChanged((user) on top and
    // redirects the user to its respective views. Make sure to set your FacebookAppId on login.ts
    // and enabled Facebook Login on Firebase app authentication console.
    LoginProvider.prototype.facebookLogin = function () {
        var _this = this;
        this.loadingProvider.show();
        this.facebook.login(['email']).then(function (res) {
            var fc = __WEBPACK_IMPORTED_MODULE_1_firebase__["auth"].FacebookAuthProvider.credential(res.authResponse.accessToken);
            __WEBPACK_IMPORTED_MODULE_1_firebase__["auth"]().signInWithCredential(fc).then(function (fs) {
                _this.loadingProvider.hide();
            }).catch(function (ferr) {
                alert(JSON.stringify(ferr));
                _this.loadingProvider.hide();
            });
        }).catch(function (err) {
            _this.loadingProvider.hide();
            alert(JSON.stringify(err));
        });
    };
    // Google Login, after successful authentication, triggers firebase.auth().onAuthStateChanged((user) on top and
    // redirects the user to its respective views. Make sure to set your GoogleWebClient Id on login.ts
    // and enabled Google Login on Firebase app authentication console.
    LoginProvider.prototype.googleLogin = function () {
        var _this = this;
        this.loadingProvider.show();
        this.googleplus.login({
            'webClientId': __WEBPACK_IMPORTED_MODULE_2__login__["a" /* Login */].googleClientId,
            'offline': true
        }).then(function (success) {
            var credential = __WEBPACK_IMPORTED_MODULE_1_firebase__["auth"].GoogleAuthProvider.credential(success['idToken'], null);
            __WEBPACK_IMPORTED_MODULE_1_firebase__["auth"]().signInWithCredential(credential)
                .then(function (success) {
                alert('success');
                _this.loadingProvider.hide();
            })
                .catch(function (error) {
                _this.loadingProvider.hide();
                alert(JSON.stringify(error));
                var code = error["code"];
                _this.alertProvider.showErrorMessage(code);
            });
        }, function (error) { _this.loadingProvider.hide(); alert(JSON.stringify(error)); });
    };
    /*googleLogin() {
  this.googleplus.login({
    'webClientId':'558035351867-enbhecpbvh3bifqsvlq3abh5ns3eor65.apps.googleusercontent.com',
    'offline': true
  }).then(res=>{
    firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken)).then(suc=>
    {
      alert("login success")
    }).catch(ns=>{
      alert("login failed")
    })
  })
    }*/
    // Login on Firebase given the email and password.
    LoginProvider.prototype.emailLogin = function (email, password) {
        var _this = this;
        this.loadingProvider.show();
        __WEBPACK_IMPORTED_MODULE_1_firebase__["auth"]().signInWithEmailAndPassword(email, password)
            .then(function (success) {
            _this.loadingProvider.hide();
        })
            .catch(function (error) {
            _this.loadingProvider.hide();
            var code = error["code"];
            _this.alertProvider.showErrorMessage(code);
        });
    };
    // Register user on Firebase given the email and password.
    LoginProvider.prototype.register = function (email, password) {
        var _this = this;
        this.loadingProvider.show();
        __WEBPACK_IMPORTED_MODULE_1_firebase__["auth"]().createUserWithEmailAndPassword(email, password)
            .then(function (success) {
            _this.loadingProvider.hide();
        })
            .catch(function (error) {
            _this.loadingProvider.hide();
            var code = error["code"];
            _this.alertProvider.showErrorMessage(code);
        });
    };
    // Send Password Reset Email to the user.
    LoginProvider.prototype.sendPasswordReset = function (email) {
        var _this = this;
        this.loadingProvider.show();
        __WEBPACK_IMPORTED_MODULE_1_firebase__["auth"]().sendPasswordResetEmail(email)
            .then(function (success) {
            _this.loadingProvider.hide();
            _this.alertProvider.showPasswordResetMessage(email);
        })
            .catch(function (error) {
            _this.loadingProvider.hide();
            var code = error["code"];
            _this.alertProvider.showErrorMessage(code);
        });
    };
    return LoginProvider;
}());
LoginProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__loading_loading__["a" /* LoadingProvider */],
        __WEBPACK_IMPORTED_MODULE_4__alert_alert__["a" /* AlertProvider */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_google_plus__["a" /* GooglePlus */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__["a" /* Facebook */]])
], LoginProvider);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic2_super_tabs__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__account_account__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__messages_messages__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_loading_loading__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/*
DEV: Monique Nichols
Product: Nautical
File: Tabs.Ts (tabs page)
Last Modified: 12/18/2017
*/
//Pages, Packages, and Provider imports.








//This page controls the tabs that appear at the bottom of the screen. This page
//serves as the home page in the event that a user is logged in.
var TabsPage = (function () {
    function TabsPage(angularfire, loadingProvider) {
        this.angularfire = angularfire;
        this.loadingProvider = loadingProvider;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_4__messages_messages__["a" /* MessagesPage */]; //sets first root to messages
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]; //sets second root to home(trips page)
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_3__account_account__["a" /* AccountPage */]; //sets third root to profile(account page)
        this.createUserData();
    }
    TabsPage.prototype.ionViewDidLoad = function () {
        this.superTabs.showToolbar(false); //hides the tabs from view.
    };
    // Create userData on the database if it doesn't exist yet.
    TabsPage.prototype.createUserData = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_7_firebase__["database"]().ref('accounts/' + __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.uid).once('value')
            .then(function (account) {
            // No database data yet, create user data on database
            if (!account.val()) {
                _this.loadingProvider.show();
                var user = __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser;
                var userId, name, provider, img, email;
                var providerData = user.providerData[0];
                userId = user.uid;
                // Get name from Firebase user.
                if (user.displayName || providerData.displayName) {
                    name = user.displayName;
                    name = providerData.displayName;
                }
                else {
                    name = "App User";
                }
                // Set default username based on name and userId.
                var username = name.replace(/ /g, '') + userId.substring(0, 8);
                // Get provider from Firebase user.
                if (providerData.providerId == 'password') {
                    provider = "Firebase";
                }
                else if (providerData.providerId == 'facebook.com') {
                    provider = "Facebook";
                }
                else if (providerData.providerId == 'google.com') {
                    provider = "Google";
                }
                // Get photoURL from Firebase user.
                if (user.photoURL || providerData.photoURL) {
                    img = user.photoURL;
                    img = providerData.photoURL;
                }
                else {
                    img = "assets/images/profile.png";
                }
                // Get email from Firebase user.
                email = user.email;
                // Set default description.
                var description = "I'm Available for chat";
                // Insert data on our database using AngularFire.
                _this.angularfire.object('/accounts/' + userId).set({
                    userId: userId,
                    name: name,
                    username: username,
                    provider: provider,
                    img: img,
                    email: email,
                    description: description,
                    dateCreated: new Date().toString()
                }).then(function () {
                    _this.loadingProvider.hide();
                });
            }
        });
    };
    return TabsPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic2_super_tabs__["a" /* SuperTabs */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic2_super_tabs__["a" /* SuperTabs */])
], TabsPage.prototype, "superTabs", void 0);
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/tabs/tabs.html"*/'<!--\nDEV: Monique Nichols\nProduct: Nautical\nFile: Tabs.html (tabs page)\nLast Modified: 12/18/2017\n-->\n<!--\n  this page controls the swipable tabs.\n-->\n<super-tabs selectedTabIndex=\'1\' [config]="{dragThreshold: 90}">\n  <super-tab [root]="tab1Root" title="First page"></super-tab>\n  <super-tab [root]="tab2Root" title="Second page"></super-tab>\n  <super-tab [root]="tab3Root" title="Third page"></super-tab>\n</super-tabs>\n'/*ion-inline-end:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/tabs/tabs.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_6__providers_loading_loading__["a" /* LoadingProvider */]])
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DataProvider = (function () {
    // Data Provider
    // This is the provider class for most of the Firebase observables in the app.
    function DataProvider(angularfire) {
        this.angularfire = angularfire;
        console.log("Initializing Data Provider");
    }
    // Get all users
    DataProvider.prototype.getUsers = function () {
        return this.angularfire.list('/accounts', {
            query: {
                orderByChild: 'name'
            }
        });
    };
    // Get user with username
    DataProvider.prototype.getUserWithUsername = function (username) {
        return this.angularfire.list('/accounts', {
            query: {
                orderByChild: 'username',
                equalTo: username
            }
        });
    };
    DataProvider.prototype.getUserWithPhone = function (phone) {
        return this.angularfire.list('/accounts', {
            query: {
                orderByChild: 'phone',
                equalTo: phone
            }
        });
    };
    DataProvider.prototype.getTrip = function (key) {
        return this.angularfire.object('/trips/' + key);
    };
    // Get logged in user data
    DataProvider.prototype.getCurrentUser = function () {
        return this.angularfire.object('/accounts/' + __WEBPACK_IMPORTED_MODULE_2_firebase__["auth"]().currentUser.uid);
    };
    // Get user by their userId
    DataProvider.prototype.getUser = function (userId) {
        return this.angularfire.object('/accounts/' + userId);
    };
    // Get requests given the userId.
    DataProvider.prototype.getRequests = function (userId) {
        return this.angularfire.object('/requests/' + userId);
    };
    // Get friend requests given the userId.
    DataProvider.prototype.getFriendRequests = function (userId) {
        return this.angularfire.list('/requests', {
            query: {
                orderByChild: 'receiver',
                equalTo: userId
            }
        });
    };
    // Get conversation given the conversationId.
    DataProvider.prototype.getConversation = function (conversationId) {
        return this.angularfire.object('/conversations/' + conversationId);
    };
    // Get conversations of the current logged in user.
    DataProvider.prototype.getConversations = function () {
        return this.angularfire.list('/accounts/' + __WEBPACK_IMPORTED_MODULE_2_firebase__["auth"]().currentUser.uid + '/conversations');
    };
    // Get messages of the conversation given the Id.
    DataProvider.prototype.getConversationMessages = function (conversationId) {
        return this.angularfire.object('/conversations/' + conversationId + '/messages');
    };
    // Get messages of the group given the Id.
    DataProvider.prototype.getGroupMessages = function (groupId) {
        return this.angularfire.object('/groups/' + groupId + '/messages');
    };
    // Get groups of the logged in user.
    DataProvider.prototype.getGroups = function () {
        return this.angularfire.list('/accounts/' + __WEBPACK_IMPORTED_MODULE_2_firebase__["auth"]().currentUser.uid + '/groups');
    };
    // Get group info given the groupId.
    DataProvider.prototype.getGroup = function (groupId) {
        return this.angularfire.object('/groups/' + groupId);
    };
    return DataProvider;
}());
DataProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */]])
], DataProvider);

//# sourceMappingURL=data.js.map

/***/ }),

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__add_trip_add_trip__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_data_data__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_overview_overview__ = __webpack_require__(632);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/*
DEV: Monique Nichols
Product: Nautical
File: Home.ts (Home page)
Last Modified: 12/18/2017
*/
//import of packages,pages, and providers








var HomePage = (function () {
    function HomePage(app, navCtrl, modalCtrl, ref, dataProvider, afDatabase) {
        this.app = app;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.ref = ref;
        this.dataProvider = dataProvider;
        this.afDatabase = afDatabase;
        //sets default values
        this.showToolbar = false;
        this.headerImgSize = '100%';
        this.headerImgUrl = '';
        this.transition = false;
        this.tripsToShow = 4;
        //sets value for this.userId
        this.userId = __WEBPACK_IMPORTED_MODULE_3_firebase__["auth"]().currentUser.uid;
    }
    //triggers everytime the page is loaded
    HomePage.prototype.ionViewDidLoad = function () {
        this.getTrips();
    };
    HomePage.prototype.ionViewDidLeave = function () {
        this.subscription.unsubscribe();
    };
    //gets all the trips
    HomePage.prototype.getTrips = function () {
        var _this = this;
        this.subscription = this.afDatabase.object('accounts/' + this.userId + '/trips').subscribe(function (_trips) {
            //if user has trips iterate through trips
            _this.trips = [];
            if (_trips) {
                for (var i = 0; i < _trips.length; i++) {
                    //foreach trip subscribe only once and push into trips array
                    _this.dataProvider.getTrip(_trips[i]).take(1).subscribe(function (trip) {
                        if (_this.trips.indexOf(trip) == -1) {
                            _this.trips.push(trip);
                        }
                        //calculates necessary trip info
                        _this.trips.forEach(function (trip) {
                            var till = Math.abs(__WEBPACK_IMPORTED_MODULE_6_moment__().diff(trip.start, 'hours'));
                            var temp = __WEBPACK_IMPORTED_MODULE_6_moment__().diff(trip.start, 'hours');
                            var images = [];
                            trip.members.forEach(function (member) {
                                //gets user information of each trip member
                                _this.dataProvider.getUser(member).take(1).subscribe(function (user) {
                                    if (user.userId != _this.userId) {
                                        images.push(user.img);
                                    }
                                });
                            });
                            trip.images = images;
                        });
                    });
                }
            }
        });
    };
    HomePage.prototype.getClass = function (trip) {
        if (trip.images.length == 2) {
            return 'container2';
        }
        if (trip.images.length == 1) {
            return 'container1';
        }
        if (trip.images.length >= 3) {
            return 'container3';
        }
    };
    //takes users to addTrip page
    HomePage.prototype.addTrip = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_2__add_trip_add_trip__["a" /* AddTripPage */]);
    };
    //takes users to agenda page
    HomePage.prototype.viewTrip = function (trip) {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_7__pages_overview_overview__["a" /* OverviewPage */], { trip: trip.$key });
    };
    //handles scroll events and detects changes
    HomePage.prototype.onScroll = function ($event) {
        var scrollTop = $event.scrollTop;
        this.showToolbar = scrollTop >= 120;
        if (scrollTop < 0) {
            this.transition = false;
            this.headerImgSize = Math.abs(scrollTop) / 2 + 100 + "%";
        }
        else {
            this.transition = true;
            this.headerImgSize = '100%';
        }
        this.ref.detectChanges();
    };
    HomePage.prototype.showTrips = function () {
        return this.tripsToShow;
    };
    //starts the infinite scroll
    HomePage.prototype.doInfinite = function (infiniteScroll) {
        this.tripsToShow = this.tripsToShow + 4;
        setTimeout(function () {
            infiniteScroll.complete();
        }, 1000);
    };
    return HomePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */])
], HomePage.prototype, "content", void 0);
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/home/home.html"*/'<!--\nDEV: Monique Nichols\nProduct: Nautical\nFile: Home.html (Home page)\nLast Modified: 12/18/2017\n-->\n<!--\n This page controls the home or trips page view\n-->\n<!--This is the navbar that shows when a user has triggered a scroll event.-->\n<ion-header  [hidden]="!showToolbar">\n    <ion-navbar [class.show-background]="showToolbar"><!--class show-background in app.scss-->\n      <!--navbar buttons start here-->\n        <ion-buttons start>\n            <button ion-button tappable (click)="menu()"><ion-icon color=\'light\' class=\'menuButton\' name="md-menu" item-right></ion-icon></button>\n          </ion-buttons>\n    </ion-navbar>\n  </ion-header>\n  <!--This is the navbar that shows when a user has not triggered a scroll event.-->\n  <ion-header  [hidden]="showToolbar">\n      <ion-navbar class=\'tool\'><!--class tool in app.scss-->\n        <!--navbar buttons start here-->\n         <ion-buttons start>\n          <button ion-button tappable (click)="menu()"><ion-icon color=\'light\' class=\'menuButton\' name="md-menu" item-right></ion-icon></button><!--class menuButton in app.scss -->\n        </ion-buttons>\n      </ion-navbar>\n    </ion-header>\n    <!--page content starts here-->\n<ion-content class="content" (ionScroll)="onScroll($event)" [class.transition]="transition">\n<div class=\'img\'><!--addTrip fab wrapper -->\n    <button color=\'primary\' class=\'addTrip\' ion-button icon-only round tappable (click)=\'addTrip()\'><ion-icon color=\'white\' name=\'md-add\'></ion-icon></button><!--displays set photo fab-->\n    </div>\n<div class=\'wrapper\'> <!--holds out BG image out \'My Trips\' title-->\n  <div class=\'bg\'>\n    <div class=\'wrapper2\'>\n      <h1 class=\'profileName\'>My Trips</h1>\n    </div>\n  <img class=\'bgImg\' src=\'assets/images/profileBg.jpeg\'/><!-- displays our generic image-->\n</div>\n</div>\n<ion-list no-lines *ngIf=\'trips\'  inset class=\'list\'><!--list of user events starts here-->\n   <ion-item no-lines (click)=\'viewTrip(trip)\' *ngFor="let trip of trips | slice:0:showTrips() let i=index"><!--ion-items populate using *ngFor-->\n    <div item-left>\n     <h3 class=\'day\'>{{trip.start | Date2Format}}</h3><!--shows the amount of time till the trip-->\n     </div>\n     <div [ngClass]=\'getClass(trip)\' item-left>\n        <div *ngFor=\'let image of trip.images | slice:0:3 let i=index\'><!-- Shows the images of those who are attending the trip-->\n          <img class=\'userImage\' src=\'{{image}}\'/>\n      </div>\n     </div>    \n     <div class=\'myTrip\'><!--wrapper that contains trip location and amount saved-->\n       <p class=\'tripName\'>{{trip.location}}</p>\n       <p>${{trip.saved}} saved.</p>\n     </div>\n     <div class=\'more-circle\' item-right><!-- more circle that shows on the right-->\n     </div>\n   </ion-item>\n   <ion-item no-lines *ngIf=\'trips.length <= 0\'>\n      <h2 class=\'tripName\'>No events to display at this time.</h2><!--if there are no events to show-->\n    </ion-item>\n</ion-list>\n  <!-- infinite scroll is here-->\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)" *ngIf="accounts && usersToShow < accounts.length">\n      <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Loading more users..."></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>\n\n'/*ion-inline-end:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ModalController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"],
        __WEBPACK_IMPORTED_MODULE_5__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 324:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddTripPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_image_image__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_data_data__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_alert_alert__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_add_members_add_members__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ion2_calendar__ = __webpack_require__(333);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










/**
 * Generated class for the AddTripPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AddTripPage = (function () {
    function AddTripPage(navCtrl, navParams, viewCtrl, dataProvider, angularFire, camera, imageProvider, alertCtrl, ref, modalCtrl, calendarCtrl, alertProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.dataProvider = dataProvider;
        this.angularFire = angularFire;
        this.camera = camera;
        this.imageProvider = imageProvider;
        this.alertCtrl = alertCtrl;
        this.ref = ref;
        this.modalCtrl = modalCtrl;
        this.calendarCtrl = calendarCtrl;
        this.alertProvider = alertProvider;
        this.showToolbar = false;
        this.headerImgSize = '100%';
        this.headerImgUrl = '';
        this.transition = false;
        this.cost = 0;
        this.images = ['assets/images/default1.jpeg', 'assets/images/default2.jpeg', 'assets/images/default3.jpeg', 'assets/images/default4.jpeg', 'assets/images/default5.jpeg'];
        this.members = [];
        this._Members = [];
        this.image = this.images[Math.floor(Math.random() * this.images.length)];
    }
    AddTripPage.prototype.dateRange = function () {
        var _this = this;
        this.calendarCtrl.openCalendar({
            pickMode: 'range',
            weekdays: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            monthFormat: 'MMM yyyy',
            color: 'dark' // 'primary' | 'secondary' | 'danger' | 'light' | 'dark'
        })
            .then(function (res) { _this.start = new Date(res.from.time).toDateString(); _this.end = new Date(res.to.time).toDateString(); })
            .catch(function () { });
    };
    AddTripPage.prototype.removeMember = function (member) {
        if (this.members.indexOf(member) > -1) {
            this.members.splice(this.members.indexOf(member), 1);
        }
    };
    AddTripPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.group = {
            img: this.image
        };
        this.dataProvider.getCurrentUser().subscribe(function (account) {
            if (!_this.groupMembers) {
                _this.groupMembers = [account];
            }
            if (account.friends) {
                for (var i = 0; i < account.friends.length; i++) {
                    _this.dataProvider.getUser(account.friends[i]).subscribe(function (friend) {
                        _this.addOrUpdateFriend(friend);
                    });
                }
            }
            else {
                _this.friends = [];
            }
        });
    };
    AddTripPage.prototype.onScroll = function ($event) {
        var scrollTop = $event.scrollTop;
        this.showToolbar = scrollTop >= 120;
        if (scrollTop < 0) {
            this.transition = false;
            this.headerImgSize = Math.abs(scrollTop) / 2 + 100 + "%";
        }
        else {
            this.transition = true;
            this.headerImgSize = '100%';
        }
        this.ref.detectChanges();
    };
    AddTripPage.prototype.addOrUpdateFriend = function (friend) {
        if (!this.friends) {
            this.friends = [friend];
        }
        else {
            var index = -1;
            for (var i = 0; i < this.friends.length; i++) {
                if (this.friends[i].$key == friend.$key) {
                    index = i;
                }
            }
            if (index > -1) {
                this.friends[index] = friend;
            }
            else {
                this.friends.push(friend);
            }
        }
    };
    AddTripPage.prototype.close = function () {
        if (this.group)
            this.imageProvider.deleteImageFile(this.group.img);
        this.navCtrl.pop();
    };
    AddTripPage.prototype.submit = function () {
        var _this = this;
        this._Members = [__WEBPACK_IMPORTED_MODULE_2_firebase__["auth"]().currentUser.uid];
        if (this.members) {
            this.members.forEach(function (member) {
                _this._Members.push(member.userId);
            });
        }
        var start = this.start, end = this.end, location = this.location, cost = this.cost, trips = this.angularFire.list('/trips');
        trips.push({
            created: new Date().toString(),
            start: start,
            end: end,
            location: location,
            cost: cost,
            owner: __WEBPACK_IMPORTED_MODULE_2_firebase__["auth"]().currentUser.uid,
            members: this._Members,
            img: this.group.img,
            saved: 0,
            allocated: 0
        }).then(function (data) {
            return _this.push2(data.key);
        });
        this.alertProvider.showTripCreated();
        this.navCtrl.pop();
    };
    AddTripPage.prototype.push2 = function (key) {
        var _this = this;
        this._Members.forEach(function (member) {
            _this._trips = [];
            _this.dataProvider.getUser(member).subscribe(function (user) {
                _this._trips = [key];
                if (user.trips) {
                    for (var i = 0; i < user.trips.length; i++) {
                        if (_this._trips.indexOf(user.trips[i]) == -1) {
                            _this._trips.push(user.trips[i]);
                        }
                    }
                }
                else {
                }
            });
            var Trips = _this.angularFire.object('/accounts/' + member);
            Trips.update({
                trips: _this._trips
            });
        });
    };
    AddTripPage.prototype.addToGroup = function (friend) {
        this.groupMembers.push(friend);
    };
    AddTripPage.prototype.inGroup = function (friend) {
        for (var i = 0; i < this.groupMembers.length; i++) {
            if (this.groupMembers[i].$key == friend.$key) {
                return true;
            }
        }
        return false;
    };
    AddTripPage.prototype.addPeople = function () {
        var _this = this;
        var addModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__pages_add_members_add_members__["a" /* AddMembersPage */]);
        addModal.onDidDismiss(function (data) {
            if (data) {
                _this.members.push(data);
            }
        });
        addModal.present();
    };
    AddTripPage.prototype.addOrRemoveFromGroup = function (friend) {
        if (this.inGroup(friend)) {
            this.removeFromGroup(friend);
        }
        else {
            this.addToGroup(friend);
        }
    };
    AddTripPage.prototype.removeFromGroup = function (friend) {
        var index = -1;
        for (var i = 1; i < this.groupMembers.length; i++) {
            if (this.groupMembers[i].$key == friend.$key) {
                index = i;
            }
        }
        if (index > -1) {
            this.groupMembers.splice(index, 1);
        }
    };
    AddTripPage.prototype.setGroupPhoto = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Set Group Photo',
            message: 'Do you want to take a photo or choose from your photo gallery?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Choose from Gallery',
                    handler: function () {
                        _this.imageProvider.setGroupPhoto(_this.group, _this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Take Photo',
                    handler: function () {
                        _this.imageProvider.setGroupPhoto(_this.group, _this.camera.PictureSourceType.CAMERA);
                    }
                }
            ]
        }).present();
    };
    return AddTripPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */])
], AddTripPage.prototype, "content", void 0);
AddTripPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-add-trip',template:/*ion-inline-start:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/add-trip/add-trip.html"*/'<!--\nDEV: Monique Nichols\nProduct: Nautical\nFile: Add-Trip.html (Add Trip page)\nLast Modified: 12/18/2017\n-->\n<!--\n This page controls the add trip page where users can add trips\n-->\n <!--This is the navbar that shows when a user has not triggered a scroll event.-->\n<ion-header  [hidden]="!showToolbar">\n      <ion-navbar [class.show-background]="showToolbar"><!--show-background class is in app.scss -->\n        <!--navbar buttons-->\n              <ion-buttons start>\n                  <button ion-button tappable (click)="close()"><ion-icon color=\'light\' class=\'menuButton\' name="ios-close" item-right></ion-icon></button><!-- class menuButton is in the app.scss file -->\n                </ion-buttons>\n      </ion-navbar>\n    </ion-header>\n     <!--This is the navbar that shows when a user has triggered a scroll event.-->\n    <ion-header  [hidden]="showToolbar">\n        <ion-navbar class=\'tool\'><!--tool class is in the app.scss file-->\n            <!--navbar buttons-->\n           <ion-buttons start>\n            <button ion-button tappable (click)="close()"><ion-icon color=\'light\' class=\'menuButton\' name="ios-close" item-right></ion-icon></button><!-- class menuButton is in the app.scss file -->\n          </ion-buttons>\n        </ion-navbar>\n      </ion-header>\n     <!--page content is here--> \n  <ion-content class="content" (ionScroll)="onScroll($event)" [class.transition]="transition">\n  <div class=\'img\' tappable (click)=\'setGroupPhoto()\'>\n  <ion-icon color=\'white\' name=\'ios-camera-outline\'>\n  </ion-icon>\n  </div>\n  <div class=\'wrapper\'> \n    <div class=\'bg\'>\n      <div class=\'wrapper2\'>\n        <h1 class=\'profileName\'>Create Trip</h1>\n      </div>\n    <img *ngIf=\'group\' class=\'bgImg\' src=\'{{group.img}}\'/>\n  </div>\n  </div>\n  <ion-list inset class=\'list\'>\n    <ion-item>\n        <ion-input text-center placeholder=\'Location\' [(ngModel)]=\'location\' type="text" style="text-align:center; color:black;"></ion-input>\n    </ion-item>\n    <ion-item tappable (click)=\'dateRange()\' text-center class=\'addPeople\'>\n        <div *ngIf=\'!start\'>Start Date</div>\n        <div *ngIf=\'start\'>{{start | DayFormat}}</div>\n    </ion-item>\n    <ion-item tappable text-center class=\'addPeople\'>\n        <div *ngIf=\'!end\'>End Date</div>\n        <div *ngIf=\'end\'>{{end | DayFormat}}</div>\n    </ion-item>\n    <ion-item>\n        <input currencyMask placeholder=\'Total Cost\' [(ngModel)]=\'cost\' />\n    <!-- <ion-input text-center placeholder=\'Total Cost\' [(ngModel)]=\'cost\' type="text" style="text-align:center"></ion-input>-->\n    </ion-item>\n    <ion-item (click)=\'addPeople()\' text-center class=\'addPeople\'>\n        Add People\n    </ion-item>\n    <div *ngIf=\'members.length>0\'>\n    <ion-item tappable *ngFor="let member of members">\n            <ion-avatar item-left><img src=\'{{member.img}}\'/></ion-avatar>\n            <h3>{{member.name}}</h3>\n            <p>@{{member.username}}</p>\n            <button (click)=\'removeMember(member)\' item-right ion-button clear color=\'danger\'><ion-icon name=\'ios-close-circle-outline\'></ion-icon></button>\n        </ion-item>\n    </div>  \n    <button class=\'submit\' ion-button  block color=\'primary\'(click)=\'submit()\'>DONE</button>\n          </ion-list>\n  </ion-content>\n'/*ion-inline-end:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/add-trip/add-trip.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* ViewController */], __WEBPACK_IMPORTED_MODULE_6__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */],
        __WEBPACK_IMPORTED_MODULE_5__providers_image_image__["a" /* ImageProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ModalController */], __WEBPACK_IMPORTED_MODULE_9_ion2_calendar__["a" /* CalendarController */], __WEBPACK_IMPORTED_MODULE_7__providers_alert_alert__["a" /* AlertProvider */]])
], AddTripPage);

//# sourceMappingURL=add-trip.js.map

/***/ }),

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_logout_logout__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loading_loading__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data_data__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__settings_settings__ = __webpack_require__(457);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__feedback_feedback__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_social_sharing__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_image_image__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_alert_alert__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_database__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_firebase__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/*
DEV: Monique Nichols
Product: Nautical
File: Account.ts (Account page)
Last Modified: 12/18/2017
*/
//pages, providers, and packages imports













//this page contains all of the functions associated with the account page.
var AccountPage = (function () {
    function AccountPage(navCtrl, ref, loadingProvider, dataProvider, alertCtrl, logoutProvider, modalCtrl, actionSheetCtrl, alertProvider, imageProvider, _SHARE, platform, angularfire) {
        this.navCtrl = navCtrl;
        this.ref = ref;
        this.loadingProvider = loadingProvider;
        this.dataProvider = dataProvider;
        this.alertCtrl = alertCtrl;
        this.logoutProvider = logoutProvider;
        this.modalCtrl = modalCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertProvider = alertProvider;
        this.imageProvider = imageProvider;
        this._SHARE = _SHARE;
        this.platform = platform;
        this.angularfire = angularfire;
        //sets the default settings for our toolbar
        this.showToolbar = false;
        this.headerImgSize = '100%';
        this.headerImgUrl = '';
        this.transition = false;
        this.subject = 'Plan your next getaway with Nautical!';
        this.message = 'Save money with friends, plan events, and make memories that will last a lifetime!';
        this.image = 'https://travel.gc.ca/vt/images/promo/travel-insurance-bag.jpg';
        this.uri = 'http://masteringionic.com/products/product-detail/s/mastering-ionic-2-e-book';
        this.upcoming = [];
        this.past = [];
    }
    AccountPage.prototype.ionViewDidLoad = function () {
        this.getUser();
    };
    //handles events that happen when a user exits this tab.
    AccountPage.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.subscription2) {
            this.subscription2.unsubscribe();
        }
    };
    //gets current user information
    AccountPage.prototype.getUser = function () {
        var _this = this;
        this.loadingProvider.show(); //shows loading provider
        //subscribes to user information from the database
        this.subscription = this.dataProvider.getCurrentUser().subscribe(function (user) {
            _this.user = user; //sets user equal to user data
            if (user.trips) {
                //iterates through user.trips data
                for (var i = 0; i < user.trips.length; i++) {
                    //gets user trips
                    _this.subscription2 = _this.dataProvider.getTrip(user.trips[i]).subscribe(function (trip) {
                        _this.classifyTrip(trip);
                    });
                }
            }
            _this.loadingProvider.hide(); //hides loader
        });
    };
    //classifies trips based off of in the past or in the future
    AccountPage.prototype.classifyTrip = function (trip) {
        var a = __WEBPACK_IMPORTED_MODULE_10_moment__(trip.start); //gets trip start
        var b = __WEBPACK_IMPORTED_MODULE_10_moment__(); //gets current time/date
        var diff = a.diff(b, 'days'); //calculates difference between the two in days
        //handles events that are in the past
        if (diff < 0) {
            if (this.past.indexOf(trip.$key) == -1) {
                this.past.push(trip.$key);
            }
        }
        else 
        //handles events that are in the future
        if (diff > 0) {
            if (this.upcoming.indexOf(trip.$key) == -1) {
                this.upcoming.push(trip.$key);
            }
        }
    };
    //controls the menu that appears when users select the more icon button in the navBar
    AccountPage.prototype.menu = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Modify your album',
            buttons: [
                {
                    text: 'Invite Friends',
                    handler: function () {
                        _this.share();
                    }
                },
                {
                    text: 'Settings',
                    handler: function () {
                        _this.goSettings();
                    }
                },
                {
                    text: 'Support & Feedback',
                    handler: function () {
                        _this.goFeedback();
                    }
                },
                {
                    text: 'Sign-Out',
                    handler: function () {
                        _this.logout();
                    }
                },
                {
                    text: 'Delete Account',
                    handler: function () {
                        _this.deleteAccount();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    //controls the menu that appears when a user selects more from the list of options
    AccountPage.prototype.more = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'More Options',
            buttons: [
                {
                    text: 'Delete Account',
                    role: 'destructive',
                    handler: function () {
                        _this.deleteAccount(); //allows users to delete their account
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    //controls the delete account function
    AccountPage.prototype.deleteAccount = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete your account? This cannot be undone.',
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Delete',
                    handler: function (data) {
                        _this.loadingProvider.show(); //show loader
                        // Delete Firebase user
                        __WEBPACK_IMPORTED_MODULE_12_firebase__["auth"]().currentUser.delete()
                            .then(function (success) {
                            // Delete profilePic of user on Firebase storage
                            _this.imageProvider.deleteUserImageFile(_this.user);
                            // Delete user data on Database
                            _this.angularfire.object('/accounts/' + _this.user.userId).remove().then(function () {
                                _this.loadingProvider.hide(); //hides loader
                                _this.alertProvider.showAccountDeletedMessage(); //shows success message
                                _this.logoutProvider.logout(); //logout user
                            });
                        })
                            .catch(function (error) {
                            _this.loadingProvider.hide(); //hide loader
                            var code = error["code"];
                            _this.alertProvider.showErrorMessage(code); //show error message
                            //handles needs reauthentication error
                            if (code == 'auth/requires-recent-login') {
                                _this.logoutProvider.logout();
                            }
                        });
                    }
                }
            ]
        }).present();
    };
    //controls share sheet
    AccountPage.prototype.share = function () {
        var _this = this;
        this.platform.ready()
            .then(function () {
            _this._SHARE.share(_this.message, _this.subject, _this.image, _this.uri)
                .then(function (data) {
                console.log('Shared via SharePicker');
            })
                .catch(function (err) {
                console.log('Was not shared via SharePicker');
            });
        });
    };
    //detects scroll event
    AccountPage.prototype.onScroll = function ($event) {
        var scrollTop = $event.scrollTop;
        this.showToolbar = scrollTop >= 120;
        if (scrollTop < 0) {
            this.transition = false;
            this.headerImgSize = Math.abs(scrollTop) / 2 + 100 + "%";
        }
        else {
            this.transition = true;
            this.headerImgSize = '100%';
        }
        this.ref.detectChanges();
    };
    //controls user logouts
    AccountPage.prototype.logout = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Confirm Logout',
            message: 'Are you sure you want to logout?',
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Logout',
                    handler: function (data) { _this.logoutProvider.logout(); }
                }
            ]
        }).present();
    };
    //takes user to settings to modify account
    AccountPage.prototype.goSettings = function () {
        var settingsModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__settings_settings__["a" /* SettingsPage */]);
        settingsModal.present();
    };
    //shows options for feedback
    AccountPage.prototype.goFeedback = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Support & Feedback',
            buttons: [
                {
                    text: "Something Isn't Working",
                    handler: function () {
                        var feedbackModal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__feedback_feedback__["a" /* FeedbackPage */], { 'type': 0 }); //creates support page
                        feedbackModal.onDidDismiss(function (data) {
                            //if user entered data show successmessage
                            if (data) {
                                _this.alertProvider.showSupportkMessage();
                            }
                        });
                        feedbackModal.present();
                    }
                },
                {
                    text: "General Feedback",
                    handler: function () {
                        var feedbackModal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__feedback_feedback__["a" /* FeedbackPage */], { 'type': 1 }); //creates feedback page
                        feedbackModal.onDidDismiss(function (data) {
                            //if user entered data show successmessage
                            if (data) {
                                _this.alertProvider.showFeedbackMessage();
                            }
                        });
                        feedbackModal.present();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        alert.present();
    };
    return AccountPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */])
], AccountPage.prototype, "content", void 0);
AccountPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-account',template:/*ion-inline-start:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/account/account.html"*/'<!--\nDEV: Monique Nichols\nProduct: Nautical\nFile: Account.html (Account page)\nLast Modified: 12/18/2017\n-->\n<!--\n This page controls the profile or account view\n-->\n  <!--This is the navbar that shows when a user has triggered a scroll event.-->\n<ion-header  [hidden]="!showToolbar">\n    <ion-navbar [class.show-background]="showToolbar"> <!--class show-background is in app.scss-->\n      <!--NavButtons start here -->\n        <ion-buttons start>\n            <button ion-button><ion-icon color=\'light\' class=\'menuButton\' name="md-menu" item-right></ion-icon></button><!-- Class menuButton is in app.scss-->\n          </ion-buttons>\n          <ion-buttons start>\n              <button class=\'profileTxt\' ion-button>Profile</button><!--class profileTxt is in app.scss-->\n            </ion-buttons>\n            <ion-buttons end>\n                <button ion-button tappable (click)="menu()"><ion-icon color=\'light\' class=\'menuButton\' name="ios-more-outline" item-right></ion-icon></button><!-- Class menuButton is in app.scss-->\n              </ion-buttons>\n              <!--NavButtons end here -->\n    </ion-navbar>\n  </ion-header>\n  <!--This is the navbar that shows when a user has not triggered a scroll event.-->\n  <ion-header  [hidden]="showToolbar">\n      <ion-navbar class=\'tool\'><!--class tool is in app.scss-->\n        <!--NavButtons start here -->\n         <ion-buttons start>\n          <button ion-button><ion-icon color=\'light\' class=\'menuButton\' name="md-menu" item-right></ion-icon></button><!-- Class menuButton is in app.scss-->\n        </ion-buttons>\n        <ion-buttons start>\n            <button class=\'profileTxt\' ion-button>Profile</button><!--class profileTxt is in app.scss-->\n          </ion-buttons>\n          <ion-buttons end>\n              <button ion-button tappable (click)="menu()"><ion-icon color=\'light\' class=\'menuButton\' name="ios-more-outline" item-right></ion-icon></button><!-- Class menuButton is in app.scss-->\n            </ion-buttons>\n            <!--NavButtons end here -->\n      </ion-navbar>\n    </ion-header>\n<!--Here is the content of the account.html page -->\n<ion-content class="content" (ionScroll)="onScroll($event)" [class.transition]="transition">\n<div *ngIf=\'user\'><!--Content Only shows if there is a user-->\n    <div class=\'img\'><!--Shows user\'s image-->\n        <img class=\'profileImg\' src={{user.img}}/>\n    </div>\n<div class=\'wrapper\'> \n    <div class=\'bg\'>\n      <div class=\'wrapper2\'>\n          <h1 class=\'profileName\'>{{user.name}}</h1><!--Shows user\'s name-->\n          <p class=\'userName\'>@{{user.username}}</p><!--Shows user\'s username-->\n      </div>\n    <img class=\'bgImg\' src=\'assets/images/profileBg.jpeg\'/><!--Shows generic bg img-->\n  </div>\n  </div>\n  <ion-list inset class=\'list\'><!--Shows all user options -->\n      <ion-item><!--item showing the trips taken in the past and upcoming trips-->\n        <div class=\'row\'><!-- creates grid for our divs -->\n        <div class=\'col col-50\'><!-- Places our past trips in a column of width 50% -->\n        <div item-left class=\'itemHeader\'><!--wraps our past trips content -->\n          <h3 class =\'listHeader\'>{{past.length}}</h3><!-- displays number of past trips-->\n          <p lass=\'subtitle\'>Trips Taken</p>\n         <div class=\'wrapper3\'><div class=\'underLine\'></div></div><!--Colored underline -->\n        </div>\n      </div>\n      <div class=\'col col-50\'><!-- Places our future trips in a column of width 50% -->\n        <div item-left class=\'itemHeader\'><!--wraps our future trips content -->\n            <h3 class =\'listHeader\'>{{upcoming.length}}</h3><!-- displays number of future trips-->\n            <p class=\'subtitle\'>Upcoming Trips</p>\n           <div class=\'wrapper3\'><div class=\'underLine2\'></div></div><!--Colored underline -->\n          </div>\n        </div>\n        </div>\n        </ion-item>\n      <ion-item  tappable (click)=\'share()\'><!--Click to show share options -->\n        <h3 class =\'listTxt\' item-left> Invite friends</h3>\n        <ion-icon color=\'gray\' name =\'ios-person-add-outline\'item-right></ion-icon>\n      </ion-item>\n        <ion-item tappable (click)=\'goSettings()\'><!--Click to go to settings page -->\n          <h3 class =\'listTxt\' item-left> Settings</h3>\n          <ion-icon color=\'gray\' name =\'ios-settings-outline\'item-right></ion-icon>\n        </ion-item> \n          <ion-item tappable (click)=\'goFeedback()\'><!--Click to go to feedback page -->\n            <h3 class =\'listTxt\' item-left> Support & Feedback</h3>\n            <ion-icon color=\'gray\' name =\'ios-ribbon-outline\'item-right></ion-icon>\n          </ion-item>\n          <ion-item tappable (click)=\'logout()\'><!--Click to signout -->\n              <h3 class =\'listTxt\' item-left > Sign Out</h3>\n              <ion-icon color=\'gray\' name =\'ios-exit-outline\'item-right></ion-icon>\n            </ion-item>\n            <ion-item tappable (click)=\'more()\'><!--Click to show more options-->\n                <h3 class =\'listTxt\' item-left> More</h3>\n                <ion-icon color=\'gray\' name =\'ios-more-outline\'item-right></ion-icon>\n              </ion-item>\n          </ion-list>\n</div>\n</ion-content>'/*ion-inline-end:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/account/account.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"], __WEBPACK_IMPORTED_MODULE_3__providers_loading_loading__["a" /* LoadingProvider */],
        __WEBPACK_IMPORTED_MODULE_4__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_logout_logout__["a" /* LogoutProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_9__providers_alert_alert__["a" /* AlertProvider */], __WEBPACK_IMPORTED_MODULE_8__providers_image_image__["a" /* ImageProvider */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* Platform */], __WEBPACK_IMPORTED_MODULE_11_angularfire2_database__["a" /* AngularFireDatabase */]])
], AccountPage);

//# sourceMappingURL=account.js.map

/***/ }),

/***/ 457:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_logout_logout__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loading_loading__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data_data__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_alert_alert__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__validator__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_take__ = __webpack_require__(679);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_take__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__login__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_image_image__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_camera__ = __webpack_require__(66);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/*
DEV: Monique Nichols
Product: Nautical
File: Settings.ts (Settings page)
Last Modified: 12/18/2017
*/
//import pages packages providers













//This page contains all functions for the settings page
var SettingsPage = (function () {
    function SettingsPage(navCtrl, ref, loadingProvider, dataProvider, alertCtrl, logoutProvider, alertProvider, angularfire, viewCtrl, imageProvider, camera) {
        this.navCtrl = navCtrl;
        this.ref = ref;
        this.loadingProvider = loadingProvider;
        this.dataProvider = dataProvider;
        this.alertCtrl = alertCtrl;
        this.logoutProvider = logoutProvider;
        this.alertProvider = alertProvider;
        this.angularfire = angularfire;
        this.viewCtrl = viewCtrl;
        this.imageProvider = imageProvider;
        this.camera = camera;
        //sets defaults for our toolbar object
        this.showToolbar = false;
        this.headerImgSize = '100%';
        this.headerImgUrl = '';
        this.transition = false;
    }
    //handles functions that happen every time the page is loaded
    SettingsPage.prototype.ionViewDidLoad = function () {
        this.getUserData();
    };
    //gets user data and subscribes
    SettingsPage.prototype.getUserData = function () {
        var _this = this;
        this.loadingProvider.show();
        this.subscription = this.dataProvider.getCurrentUser().subscribe(function (user) {
            _this.loadingProvider.hide();
            _this.user = user;
        });
    };
    //handles functions that happen everytime a page is exited
    SettingsPage.prototype.ionViewDidLeave = function () {
        //if we are subscribed to a user, we unsubscribe to increase app performance.
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    //this function dismisses the settings modal
    SettingsPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    //detects/handles scroll events
    SettingsPage.prototype.onScroll = function ($event) {
        var scrollTop = $event.scrollTop;
        this.showToolbar = scrollTop >= 120;
        if (scrollTop < 0) {
            this.transition = false;
            this.headerImgSize = Math.abs(scrollTop) / 2 + 100 + "%";
        }
        else {
            this.transition = true;
            this.headerImgSize = '100%';
        }
        this.ref.detectChanges();
    };
    // Change user's email. Uses Validator.ts to validate the entered email. After, update the userData on database.
    // When the user changed their email, they have to confirm the new email address.
    SettingsPage.prototype.setEmail = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Change Email Address',
            message: "Please enter a new email address.",
            inputs: [
                {
                    name: 'email',
                    placeholder: 'Your Email Address',
                    value: this.user.email
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        var email = data["email"];
                        //Check if entered email is different from the current email
                        if (_this.user.email != email) {
                            //Check if email is valid.
                            if (__WEBPACK_IMPORTED_MODULE_8__validator__["a" /* Validator */].profileEmailValidator.pattern.test(email)) {
                                _this.loadingProvider.show();
                                // Update email on Firebase.
                                __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.updateEmail(email)
                                    .then(function (success) {
                                    // Update userData on Database.
                                    _this.angularfire.object('/accounts/' + _this.user.userId).update({
                                        email: email
                                    }).then(function (success) {
                                        __WEBPACK_IMPORTED_MODULE_8__validator__["a" /* Validator */].profileEmailValidator.pattern.test(email);
                                        // Check if emailVerification is enabled, if it is go to verificationPage.
                                        if (__WEBPACK_IMPORTED_MODULE_10__login__["a" /* Login */].emailVerification) {
                                            if (!__WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.emailVerified) {
                                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__login__["a" /* Login */].verificationPage);
                                            }
                                        }
                                    }).catch(function (error) {
                                        _this.alertProvider.showErrorMessage('profile/error-change-email');
                                    });
                                })
                                    .catch(function (error) {
                                    //Show error
                                    _this.loadingProvider.hide();
                                    var code = error["code"];
                                    _this.alertProvider.showErrorMessage(code);
                                    if (code == 'auth/requires-recent-login') {
                                        _this.logoutProvider.logout();
                                    }
                                });
                            }
                            else {
                                _this.alertProvider.showErrorMessage('profile/invalid-email');
                            }
                        }
                    }
                }
            ]
        }).present();
    };
    //changes the users name. Uses Validator.ts to check the validity of the name selected
    SettingsPage.prototype.setName = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Change Profile Name',
            message: "Please enter a new profile name.",
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Your Name',
                    value: this.user.name
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        var name = data["name"];
                        // Check if entered name is different from the current name
                        if (_this.user.name != name) {
                            // Check if name's length is more than five characters
                            if (name.length >= __WEBPACK_IMPORTED_MODULE_8__validator__["a" /* Validator */].profileNameValidator.minLength) {
                                // Check if name contains characters and numbers only.
                                if (__WEBPACK_IMPORTED_MODULE_8__validator__["a" /* Validator */].profileNameValidator.pattern.test(name)) {
                                    _this.loadingProvider.show();
                                    var profile = {
                                        displayName: name,
                                        photoURL: _this.user.photoURL
                                    };
                                    // Update profile on Firebase
                                    __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.updateProfile(profile)
                                        .then(function (success) {
                                        // Update userData on Database.
                                        _this.angularfire.object('/accounts/' + _this.user.userId).update({
                                            name: name
                                        }).then(function (success) {
                                            __WEBPACK_IMPORTED_MODULE_8__validator__["a" /* Validator */].profileNameValidator.pattern.test(name); //Refresh validator
                                            _this.alertProvider.showProfileUpdatedMessage();
                                        }).catch(function (error) {
                                            _this.alertProvider.showErrorMessage('profile/error-update-profile');
                                        });
                                    })
                                        .catch(function (error) {
                                        // Show error
                                        _this.loadingProvider.hide();
                                        var code = error["code"];
                                        _this.alertProvider.showErrorMessage(code);
                                        if (code == 'auth/requires-recent-login') {
                                            _this.logoutProvider.logout();
                                        }
                                    });
                                }
                                else {
                                    _this.alertProvider.showErrorMessage('profile/invalid-chars-name');
                                }
                            }
                            else {
                                _this.alertProvider.showErrorMessage('profile/name-too-short');
                            }
                        }
                    }
                }
            ]
        }).present();
    };
    //changes the users password uses validator.ts to check the validity of the password entered
    SettingsPage.prototype.setPassword = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Change Password',
            message: "Please enter a new password.",
            inputs: [
                {
                    name: 'currentPassword',
                    placeholder: 'Current Password',
                    type: 'password'
                },
                {
                    name: 'password',
                    placeholder: 'New Password',
                    type: 'password'
                },
                {
                    name: 'confirmPassword',
                    placeholder: 'Confirm Password',
                    type: 'password'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        var currentPassword = data["currentPassword"];
                        var credential = __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"].EmailAuthProvider.credential(_this.user.email, currentPassword);
                        // Check if currentPassword entered is correct
                        _this.loadingProvider.show();
                        __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.reauthenticateWithCredential(credential)
                            .then(function (success) {
                            var password = data["password"];
                            // Check if entered password is not the same as the currentPassword
                            if (password != currentPassword) {
                                if (password.length >= __WEBPACK_IMPORTED_MODULE_8__validator__["a" /* Validator */].profilePasswordValidator.minLength) {
                                    if (__WEBPACK_IMPORTED_MODULE_8__validator__["a" /* Validator */].profilePasswordValidator.pattern.test(password)) {
                                        if (password == data["confirmPassword"]) {
                                            // Update password on Firebase.
                                            __WEBPACK_IMPORTED_MODULE_6_firebase__["auth"]().currentUser.updatePassword(password)
                                                .then(function (success) {
                                                _this.loadingProvider.hide();
                                                __WEBPACK_IMPORTED_MODULE_8__validator__["a" /* Validator */].profilePasswordValidator.pattern.test(password);
                                                _this.alertProvider.showPasswordChangedMessage();
                                            })
                                                .catch(function (error) {
                                                _this.loadingProvider.hide();
                                                var code = error["code"];
                                                _this.alertProvider.showErrorMessage(code);
                                                if (code == 'auth/requires-recent-login') {
                                                    _this.logoutProvider.logout();
                                                }
                                            });
                                        }
                                        else {
                                            _this.alertProvider.showErrorMessage('profile/passwords-do-not-match');
                                        }
                                    }
                                    else {
                                        _this.alertProvider.showErrorMessage('profile/invalid-chars-password');
                                    }
                                }
                                else {
                                    _this.alertProvider.showErrorMessage('profile/password-too-short');
                                }
                            }
                        })
                            .catch(function (error) {
                            //Show error
                            _this.loadingProvider.hide();
                            var code = error["code"];
                            _this.alertProvider.showErrorMessage(code);
                        });
                    }
                }
            ]
        }).present();
    };
    //Sets username and validates input using validator.ts
    SettingsPage.prototype.setUsername = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Change Username',
            message: "Please enter a new username.",
            inputs: [
                {
                    name: 'username',
                    placeholder: 'Your Username',
                    value: this.user.username
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        var username = data["username"];
                        // Check if entered username is different from the current username
                        if (_this.user.username != username) {
                            _this.dataProvider.getUserWithUsername(username).take(1).subscribe(function (userList) {
                                if (userList.length > 0) {
                                    _this.alertProvider.showErrorMessage('profile/error-same-username');
                                }
                                else {
                                    _this.angularfire.object('/accounts/' + _this.user.userId).update({
                                        username: username
                                    }).then(function (success) {
                                        _this.alertProvider.showProfileUpdatedMessage();
                                    }).catch(function (error) {
                                        _this.alertProvider.showErrorMessage('profile/error-update-profile');
                                    });
                                }
                            });
                        }
                    }
                }
            ]
        }).present();
    };
    //sets profile photo from camera or gallery
    SettingsPage.prototype.setPhoto = function () {
        var _this = this;
        // Ask if the user wants to take a photo or choose from photo gallery.
        this.alert = this.alertCtrl.create({
            title: 'Set Profile Photo',
            message: 'Do you want to take a photo or choose from your photo gallery?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Choose from Gallery',
                    handler: function () {
                        // Call imageProvider to process, upload, and update user photo.
                        _this.imageProvider.setProfilePhoto(_this.user, _this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Take Photo',
                    handler: function () {
                        // Call imageProvider to process, upload, and update user photo.
                        _this.imageProvider.setProfilePhoto(_this.user, _this.camera.PictureSourceType.CAMERA);
                    }
                }
            ]
        }).present();
    };
    //sets phone number **NEED TO ADD PHONE NUMBER PATTERN VALIDATORS**
    SettingsPage.prototype.setPhone = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Change Phone Number',
            message: "Please enter a new phone number.",
            inputs: [
                {
                    name: 'phone',
                    placeholder: 'Your Phone',
                    value: this.user.phone
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        var phone = data["phone"];
                        // Check if entered username is different from the current username
                        if (_this.user.phone != phone) {
                            _this.dataProvider.getUserWithPhone(phone).take(1).subscribe(function (userList) {
                                if (userList.length > 0) {
                                    _this.alertProvider.showErrorMessage('profile/error-same-phone');
                                }
                                else {
                                    _this.angularfire.object('/accounts/' + _this.user.userId).update({
                                        phone: phone
                                    }).then(function (success) {
                                        _this.alertProvider.showProfileUpdatedMessage();
                                    }).catch(function (error) {
                                        _this.alertProvider.showErrorMessage('profile/error-update-profile');
                                    });
                                }
                            });
                        }
                    }
                }
            ]
        }).present();
    };
    return SettingsPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */])
], SettingsPage.prototype, "content", void 0);
SettingsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-settings',template:/*ion-inline-start:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/settings/settings.html"*/'<!--\nDEV: Monique Nichols\nProduct: Nautical\nFile: Settings.html (Settings page)\nLast Modified: 12/18/2017\n-->\n<!--\n This page controls how users are able edit their account information\n-->\n  <!--This is the navbar that shows when a user has triggered a scroll event.-->\n<ion-header  [hidden]="!showToolbar">\n    <ion-navbar [class.show-background]="showToolbar"><!--class show-background in app.scss-->\n          <!--navbar buttons-->\n        <ion-buttons start>\n            <button ion-button><ion-icon color=\'light\' class=\'menuButton\' name="md-menu" item-right></ion-icon></button><!--class menuButton in app.scss-->\n          </ion-buttons>\n          <ion-buttons start>\n              <button class=\'profileTxt\' ion-button>Settings</button><!--Class profileTxt is in app.scss-->\n            </ion-buttons>\n            <ion-buttons end>\n                <button ion-button tappable (click)="close()"><ion-icon color=\'light\' class=\'menuButton\' name="ios-close" item-right></ion-icon></button><!--class menuButton in app.scss-->\n              </ion-buttons>\n    </ion-navbar>\n  </ion-header>\n  <!--This is the navbar that shows when a user has not triggered a scroll event.-->\n  <ion-header  [hidden]="showToolbar">\n      <ion-navbar class=\'tool\'><!--class tool in app.scss-->\n        <!--navbar buttons-->\n         <ion-buttons start>\n          <button ion-button><ion-icon color=\'light\' class=\'menuButton\' name="md-menu" item-right></ion-icon></button><!--class menuButton in app.scss-->\n        </ion-buttons>\n        <ion-buttons start>\n            <button class=\'profileTxt\' ion-button>Settings</button><!--Class profileTxt is in app.scss-->\n          </ion-buttons>\n          <ion-buttons end>\n              <button ion-button tappable (click)="close()"><ion-icon color=\'light\' class=\'menuButton\' name="ios-close" item-right></ion-icon></button><!--class menuButton in app.scss-->\n            </ion-buttons>\n      </ion-navbar>\n    </ion-header>\n<!-- this is the page content -->\n<ion-content class="content" (ionScroll)="onScroll($event)" [class.transition]="transition">\n<!-- this div displays if there is a user-->\n<div *ngIf=\'user\'>\n<div class=\'img\'>\n<img class=\'profileImg\' src={{user.img}} tappable (click)=\'setPhoto()\'/><!--displays user\'s image-->\n<button color=\'green\' class=\'addPic\' ion-button icon-only round tappable (click)=\'setPhoto()\'><ion-icon name=\'ios-camera-outline\'></ion-icon></button><!--displays set photo fab-->\n</div>\n<div class=\'wrapper\'> \n  <div class=\'bg\'>   \n    <div class=\'wrapper2\'>\n        <h1 class=\'profileName\'>{{user.name}}</h1><!-- user name shown here-->\n        <p class=\'userName\'>@{{user.username}}</p><!-- username shown here-->\n    </div>\n  <img class=\'bgImg\' src=\'assets/images/profileBg.jpeg\'/><!-- generic bg image shown here-->\n</div>\n</div>\n<!--Displays list of user options -->\n<ion-list inset class=\'list\'>\n    <!--shows list header-->\n    <ion-item class=\'item\'>\n        <h3 class =\'listHeader\'> Edit Profile</h3>\n       <div class=\'wrapper3\'><div class=\'underLine\'></div></div>\n      </ion-item>\n       <!--shows change name option-->\n    <ion-item tappable (click)=\'setName()\' class=\'item\'>\n      <h3 class =\'listTxt\'> Name</h3>\n     <h3 class=\'listTxt2\'>{{user.name}}</h3>\n    </ion-item>\n     <!--shows change email option if user provider is firebase-->\n    <ion-item tappable *ngIf="user.provider==\'Firebase\'" (click)=\'setEmail()\' class=\'item\'>\n        <h3 class =\'listTxt\'>Email</h3>\n       <h3 class=\'listTxt2\'>{{user.email}}</h3>\n      </ion-item>\n      <!--shows change username option-->\n      <ion-item tappable (click)=\'setUsername()\' class=\'item\'>\n          <h3 class =\'listTxt\'> Username</h3>\n         <h3 class=\'listTxt2\'>@{{user.username}}</h3>\n        </ion-item>\n        <!--shows change phone number option-->\n          <ion-item tappable (click)=\'setPhone()\' class=\'item\'>\n              <h3 class =\'listTxt\'> Phone</h3>\n             <h3 class=\'listTxt2\'>+1-{{user.phone}}</h3>\n            </ion-item>\n            <!--shows change password option if user provider is firebase-->\n            <ion-item *ngIf="user.provider==\'Firebase\'" tappable (click)=\'setPassword()\' class=\'item\'>\n                <h3 class =\'listTxt\'> Password</h3>\n               <h3 class=\'listTxt2\'>{{user.Password}}</h3>\n              </ion-item>\n        </ion-list>\n</div>\n</ion-content>\n'/*ion-inline-end:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/settings/settings.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"], __WEBPACK_IMPORTED_MODULE_3__providers_loading_loading__["a" /* LoadingProvider */],
        __WEBPACK_IMPORTED_MODULE_4__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_logout_logout__["a" /* LogoutProvider */],
        __WEBPACK_IMPORTED_MODULE_5__providers_alert_alert__["a" /* AlertProvider */], __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_11__providers_image_image__["a" /* ImageProvider */], __WEBPACK_IMPORTED_MODULE_12__ionic_native_camera__["a" /* Camera */]])
], SettingsPage);

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 458:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_email_composer__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_data__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_loading_loading__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_alert_alert__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the FeedbackPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var FeedbackPage = (function () {
    function FeedbackPage(navCtrl, navParams, viewCtrl, emailComposer, dataProvider, loadingProvider, af, alertProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.emailComposer = emailComposer;
        this.dataProvider = dataProvider;
        this.loadingProvider = loadingProvider;
        this.af = af;
        this.alertProvider = alertProvider;
        this.title = '';
        this.date = __WEBPACK_IMPORTED_MODULE_7_moment___default()();
        this.isenabled = false;
        this.dataProvider.getCurrentUser().subscribe(function (user) {
            _this.loadingProvider.hide();
            _this.user = user;
        });
    }
    FeedbackPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FeedbackPage');
        this.type = this.navParams.get('type');
        console.log(this.type);
        if (this.type == 0) {
            this.title = 'Support';
        }
        else {
            this.title = 'Feedback';
        }
    };
    FeedbackPage.prototype.onChange = function (input1, input2) {
        if (input1.length > 0 && input2.length) {
            if (input2.length <= 50 && input1.length <= 2000) {
                this.isenabled = true;
            }
            else {
                this.isenabled = false;
            }
        }
        else {
            this.isenabled = false;
        }
    };
    FeedbackPage.prototype.close = function (data) {
        this.viewCtrl.dismiss(data);
    };
    FeedbackPage.prototype.send = function (subject, body) {
        var _this = this;
        var date = Date();
        var userId = this.user.userId;
        var name = this.user.name;
        var html = "\n    <div>From:" + this.user.name + " </div>\n    <div>Email: <a href=\"mailto:" + this.user.email + "\">" + this.user.email + "</a></div>\n    <div>Date: " + date + "</div>\n    <div>Subject: " + subject + "</div>\n    <div>Message: " + body + "</div>\n  ";
        this.af.list('/internalMessages/' + this.title).push({ subject: subject, body: body, html: html, userId: userId, name: name }).then(function (success) {
            _this.title = "";
            _this.subject = "";
            _this.body = "";
            var data = 'true';
            _this.close(data);
        }).catch(function (err) {
            var data = 'false';
            _this.close(data);
        });
    };
    return FeedbackPage;
}());
FeedbackPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-feedback',template:/*ion-inline-start:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/feedback/feedback.html"*/'<ion-header>\n    <ion-navbar>\n      <ion-title><p class=\'title\'>{{title}}</p></ion-title>\n      <ion-buttons start>\n          <button class=\'close\' ion-button clear (click)=\'close()\'><ion-icon color= \'dark\' name=\'ios-close\'></ion-icon></button>\n      </ion-buttons>\n      <ion-buttons end>\n          <button class=\'Send\'[disabled]="!isenabled" ion-button clear (click)=\'send()\'>Send</button>\n      </ion-buttons>\n    </ion-navbar>\n  \n  \n  </ion-header>\n  \n  \n  <ion-content>\n      <div *ngIf=\'type ==0\'>\n          <ion-item>\n            <ion-label color="primary">RE:</ion-label>\n            <ion-input [(ngModel)]=\'subject\'  (input)=\'onChange(body, subject)\' placeholder="Subject"></ion-input>\n          </ion-item>\n         \n          <ion-item>\n              <ion-textarea rows=\'10\' [(ngModel)]=\'body\' (input)=\'onChange(body, subject)\' placeholder="Enter a brief description of the problem..."></ion-textarea>\n            </ion-item>\n          \n            <p class=\'count\' *ngIf=\'body\'>{{body.length}}/ 2000 chars</p>\n            <p class=\'warn\' *ngIf=\'!subject\'>*Subject cannot be empty.</p>\n            <div *ngIf=\'subject\'>\n            <p class=\'warn\' *ngIf=\'subject.length>50\'>*Subject cannot be more than 50 chars.</p>\n            </div>\n            <div *ngIf=\'body\'>\n                <p class=\'warn\' *ngIf=\'body.length>2000\'>*Subject cannot be more than 2000 chars.</p>\n                </div>\n            <p class=\'warn\' *ngIf=\'!body\'>*You must enter a description.</p>\n            \n        <button [disabled]="!isenabled" block ion-button color=\'primary\' (click)="send(subject, body)">Send Message</button>\n        \n        \n        \n         \n          </div>\n      <div  *ngIf=\'type != 0\'>\n          <ion-item>\n            <ion-label color="primary">RE:</ion-label>\n            <ion-input [(ngModel)]=\'subject\'  (input)=\'onChange(body, subject)\' placeholder="Subject"></ion-input>\n          </ion-item>\n          <ion-item>\n              <ion-textarea rows=\'10\' [(ngModel)]=\'body\' (input)=\'onChange(body, subject)\' placeholder="Enter a brief description of how we\'re doing..."></ion-textarea>\n            </ion-item>\n\n            <p class=\'count\' *ngIf=\'body\'>{{body.length}}/ 2000 chars</p>\n            <p class=\'warn\' *ngIf=\'!subject\'>*Subject cannot be empty.</p>\n            <div *ngIf=\'subject\'>\n            <p class=\'warn\' *ngIf=\'subject.length>50\'>*Subject cannot be more than 50 chars.</p>\n            </div>\n            <div *ngIf=\'body\'>\n                <p class=\'warn\' *ngIf=\'body.length>2000\'>*Subject cannot be more than 2000 chars.</p>\n                </div>\n            <p class=\'warn\' *ngIf=\'!body\'>*You must enter a description.</p>\n\n            <button [disabled]="!isenabled" block ion-button color=\'primary\' (click)="send(subject, body)">Send Message</button>\n          </div>\n     \n  </ion-content>\n  '/*ion-inline-end:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/feedback/feedback.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["w" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_email_composer__["a" /* EmailComposer */], __WEBPACK_IMPORTED_MODULE_3__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_loading_loading__["a" /* LoadingProvider */],
        __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_5__providers_alert_alert__["a" /* AlertProvider */]])
], FeedbackPage);

//# sourceMappingURL=feedback.js.map

/***/ }),

/***/ 461:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loading_loading__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data_data__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_alert_alert__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__new_message_new_message__ = __webpack_require__(462);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__new_group_new_group__ = __webpack_require__(468);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__message_message__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_firebase_firebase__ = __webpack_require__(469);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var MessagesPage = (function () {
    // MessagesPage
    // This is the page where the user can see their current conversations with their friends.
    // The user can also start a new conversation.
    function MessagesPage(navCtrl, navParams, angularfire, loadingProvider, app, alertProvider, dataProvider, alertCtrl, actionSheetCtrl, ref, firebaseProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.angularfire = angularfire;
        this.loadingProvider = loadingProvider;
        this.app = app;
        this.alertProvider = alertProvider;
        this.dataProvider = dataProvider;
        this.alertCtrl = alertCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.ref = ref;
        this.firebaseProvider = firebaseProvider;
        this.showToolbar = false;
        this.headerImgSize = '100%';
        this.headerImgUrl = '';
        this.transition = false;
    }
    MessagesPage.prototype.onScroll = function ($event) {
        var scrollTop = $event.scrollTop;
        this.showToolbar = scrollTop >= 120;
        if (scrollTop < 0) {
            this.transition = false;
            this.headerImgSize = Math.abs(scrollTop) / 2 + 100 + "%";
        }
        else {
            this.transition = true;
            this.headerImgSize = '100%';
        }
        this.ref.detectChanges();
    };
    MessagesPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.dataProvider.getCurrentUser().subscribe(function (user) {
            _this.user = user;
        });
        // Create userData on the database if it doesn't exist yet.
        this.searchFriend = '';
        this.loadingProvider.show();
        if (__WEBPACK_IMPORTED_MODULE_9_firebase__["auth"]().currentUser != null || __WEBPACK_IMPORTED_MODULE_9_firebase__["auth"]().currentUser != undefined) {
            // update token
            this.angularfire.object('/accounts/' + __WEBPACK_IMPORTED_MODULE_9_firebase__["auth"]().currentUser.uid).update({
                pushToken: localStorage.getItem('pushToken')
            });
        }
        // Get info of conversations of current logged in user.
        this.dataProvider.getConversations().subscribe(function (conversations) {
            if (conversations.length > 0) {
                conversations.forEach(function (conversation) {
                    if (conversation.$exists()) {
                        // Get conversation partner info.
                        _this.dataProvider.getUser(conversation.$key).subscribe(function (user) {
                            conversation.friend = user;
                            // Get conversation info.
                            _this.dataProvider.getConversation(conversation.conversationId).subscribe(function (obj) {
                                // Get last message of conversation.
                                var lastMessage = obj.messages[obj.messages.length - 1];
                                conversation.date = lastMessage.date;
                                conversation.sender = lastMessage.sender;
                                // Set unreadMessagesCount
                                conversation.unreadMessagesCount = obj.messages.length - conversation.messagesRead;
                                // Process last message depending on messageType.
                                if (lastMessage.type == 'text') {
                                    if (lastMessage.sender == __WEBPACK_IMPORTED_MODULE_9_firebase__["auth"]().currentUser.uid) {
                                        conversation.message = 'You: ' + lastMessage.message;
                                    }
                                    else {
                                        conversation.message = lastMessage.message;
                                    }
                                }
                                else {
                                    if (lastMessage.sender == __WEBPACK_IMPORTED_MODULE_9_firebase__["auth"]().currentUser.uid) {
                                        conversation.message = 'You sent a photo message.';
                                    }
                                    else {
                                        conversation.message = 'has sent you a photo message.';
                                    }
                                }
                                _this.addOrUpdateConversation(conversation);
                            });
                        });
                    }
                });
                _this.loadingProvider.hide();
            }
            else {
                _this.conversations = [];
                _this.loadingProvider.hide();
            }
        });
        var that = this;
        if (!that.updateDateTime) {
            that.updateDateTime = setInterval(function () {
                if (that.conversations) {
                    that.conversations.forEach(function (conversation) {
                        var date = conversation.date;
                        conversation.date = new Date(date);
                    });
                }
            }, 60000);
        }
        this.searchGroup = '';
        this.loadingProvider.show();
        // Get groups
        this.dataProvider.getGroups().subscribe(function (groupIds) {
            if (groupIds.length > 0) {
                if (_this.groups && _this.groups.length > groupIds.length) {
                    // User left/deleted a group, clear the list and add or update each group again.
                    _this.groups = [];
                }
                groupIds.forEach(function (groupId) {
                    _this.dataProvider.getGroup(groupId.$key).subscribe(function (group) {
                        if (group.$exists()) {
                            // Get group's unreadMessagesCount
                            group.unreadMessagesCount = group.messages.length - groupId.messagesRead;
                            // Get group's last active date
                            group.date = group.messages[group.messages.length - 1].date;
                            group.type = 'group';
                            if (group.messages[group.messages.length - 1].sender == __WEBPACK_IMPORTED_MODULE_9_firebase__["auth"]().currentUser.uid) {
                                group.lastMessage = 'You: ' + group.messages[group.messages.length - 1].message;
                            }
                            else {
                                _this.dataProvider.getUser(group.messages[group.messages.length - 1].sender).subscribe(function (user) {
                                    group.lastMessage = user.name + ': ' + group.messages[group.messages.length - 1].message;
                                });
                            }
                            _this.addOrUpdateConversation(group);
                        }
                    });
                });
                _this.loadingProvider.hide();
            }
            else {
                _this.groups = [];
                _this.loadingProvider.hide();
            }
        });
        // Update groups' last active date time elapsed every minute based on Moment.js.
        var that = this;
        if (!that.updateDateTime) {
            that.updateDateTime = setInterval(function () {
                if (that.groups) {
                    that.groups.forEach(function (group) {
                        var date = group.date;
                        group.date = new Date(date);
                    });
                }
            }, 60000);
        }
    };
    MessagesPage.prototype.leaveGroup = function (group) {
        var _this = this;
        this.group = group;
        this.dataProvider.getCurrentUser().subscribe(function (user) {
            _this.user = user;
        });
        this.alert = this.alertCtrl.create({
            title: 'Confirm Leave',
            message: 'Are you sure you want to leave this group?',
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Leave',
                    handler: function (data) {
                        _this.loadingProvider.show();
                        // Remove member from group.
                        _this.group.members.splice(_this.group.members.indexOf(_this.user.userId), 1);
                        // Add system message.
                        _this.group.messages.push({
                            date: new Date().toString(),
                            sender: _this.user.userId,
                            type: 'system',
                            message: _this.user.name + ' has left this group.',
                            icon: 'md-log-out'
                        });
                        //this.conversations.splice(group, 1);
                        // Update group on database.
                        _this.dataProvider.getGroup(_this.group.$key).update({
                            members: _this.group.members,
                            messages: _this.group.messages
                        }).then(function (success) {
                            // Remove group from user's group list.
                            _this.angularfire.object('/accounts/' + __WEBPACK_IMPORTED_MODULE_9_firebase__["auth"]().currentUser.uid + '/groups/' + _this.group.$key).remove().then(function () {
                                // Pop this view because user already has left this group.
                                _this.group = null;
                                setTimeout(function () {
                                    _this.loadingProvider.hide();
                                    _this.navCtrl.popToRoot();
                                }, 300);
                            });
                        }).catch(function (error) {
                            _this.alertProvider.showErrorMessage('group/error-leave-group');
                        });
                    }
                }
            ]
        }).present();
    };
    MessagesPage.prototype.deleteConversation = function (slidingItem, convo) {
        var _this = this;
        this.dataProvider.getConversation(convo.conversationId).take(1).subscribe(function (res) {
            _this.conversation = res;
        });
        this.alert = this.alertCtrl.create({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this thread?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        slidingItem.close();
                    }
                },
                {
                    text: 'Delete',
                    handler: function (data) {
                        _this.loadingProvider.show();
                        var loggedInUser = __WEBPACK_IMPORTED_MODULE_9_firebase__["auth"]().currentUser.uid;
                        var p = 0;
                        for (var i = 0; i < _this.conversations.length; i++) {
                            p++;
                            if (_this.conversations[i].conversationId == convo.conversationId) {
                                console.log('index : ' + i);
                                var index = i;
                                _this.conversations.splice(index, 1);
                                slidingItem.close();
                                _this.deleteDb(loggedInUser, _this.conversation, convo);
                                _this.navCtrl.popToRoot();
                            }
                        }
                    }
                }
            ]
        }).present();
    };
    MessagesPage.prototype.deleteDb = function (loggedInUser, conversation, convo) {
        this.firebaseProvider.deleteConversation(loggedInUser, conversation, convo);
    };
    MessagesPage.prototype.doRefresh = function (refresher) {
        var that = this;
        setTimeout(function () {
            // Set startIndex to load more messages.
            refresher.complete();
            that.ionViewDidLoad();
        }, 1000);
    };
    // Add or update conversation for real-time sync based on our observer, sort by active date.
    MessagesPage.prototype.addOrUpdateConversation = function (conversation) {
        if (!this.conversations) {
            this.conversations = [conversation];
        }
        else {
            var index = -1;
            for (var i = 0; i < this.conversations.length; i++) {
                if (this.conversations[i].$key == conversation.$key) {
                    index = i;
                }
            }
            if (index > -1) {
                this.conversations[index] = conversation;
            }
            else {
                this.conversations.push(conversation);
            }
            // Sort by last active date.
            this.conversations.sort(function (a, b) {
                var date1 = new Date(a.date);
                var date2 = new Date(b.date);
                if (date1 > date2) {
                    return -1;
                }
                else if (date1 < date2) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
        }
    };
    // New conversation.
    MessagesPage.prototype.newMessage = function () {
        var _this = this;
        //this.app.getRootNav().push(NewMessagePage);
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Create a Message',
            buttons: [
                {
                    text: 'Group Message',
                    handler: function () {
                        _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_7__new_group_new_group__["a" /* NewGroupPage */]);
                    }
                },
                {
                    text: 'One on One Message',
                    handler: function () {
                        _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_6__new_message_new_message__["a" /* NewMessagePage */]);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    // Open chat with friend.
    MessagesPage.prototype.message = function (userId, type) {
        if (type == 'group') {
            this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_8__message_message__["a" /* MessagePage */], { groupId: userId });
        }
        else {
            this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_8__message_message__["a" /* MessagePage */], { userId: userId });
        }
    };
    // Return class based if conversation has unreadMessages or not.
    MessagesPage.prototype.hasUnreadMessages = function (conversation) {
        if (conversation.unreadMessagesCount > 0) {
            return 'messageSubtitleUnread';
        }
        else
            return 'messageSubtitle';
    };
    return MessagesPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */])
], MessagesPage.prototype, "content", void 0);
MessagesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-messages',template:/*ion-inline-start:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/messages/messages.html"*/'<!--<ion-header>\n    <ion-navbar>\n      <ion-title>Messages</ion-title>\n      <ion-buttons end>\n        <button ion-button icon-only tappable class=\'newMessage\' color=\'blue\' (click)="newMessage()"><ion-icon name="ios-create-outline"></ion-icon></button>\n      </ion-buttons>\n    </ion-navbar>\n  </ion-header>-->\n  <ion-header  mode=\'ios\'  [hidden]="!showToolbar">\n      \n        <ion-navbar  mode=\'ios\' [class.show-background]="showToolbar">\n            <ion-buttons  mode=\'ios\' start>\n                <ion-icon color=\'light\' class=\'menuButton\' name="md-menu" item-right></ion-icon>\n              </ion-buttons>\n              <ion-buttons  mode=\'ios\' start>\n                  <button class=\'profileTxt\' ion-button>Chats</button>\n                </ion-buttons>\n                <ion-buttons  mode=\'ios\' end>\n                    <button ion-button tappable (click)="newMessage()"><ion-icon color=\'light\' class=\'menuButton\' name="ios-more-outline" item-right></ion-icon></button>\n                  </ion-buttons>\n        </ion-navbar>\n      \n      </ion-header>\n\n  <ion-header  [hidden]="showToolbar">\n        <ion-navbar mode=\'ios\'class=\'tool\'>\n           <ion-buttons  mode=\'ios\' start>\n           <ion-icon color=\'light\' class=\'menuButton\' name="md-menu" item-right></ion-icon>\n          </ion-buttons>\n          <ion-buttons  mode=\'ios\' start>\n              <button class=\'profileTxt\' ion-button>Chats</button>\n            </ion-buttons>\n            <ion-buttons  mode=\'ios\' end>\n                <button ion-button tappable (click)="newMessage()"><ion-icon color=\'light\' class=\'menuButton\' name="ios-more-outline" item-right></ion-icon></button>\n              </ion-buttons>\n        </ion-navbar>\n      \n      </ion-header>\n  <ion-content class="content"\n  (ionScroll)="onScroll($event)"\n  [class.transition]="transition">\n      <div *ngIf=\'user\' class=\'img\' tappable>\n          <img class=\'profileImg\' src={{user.img}}/>\n         \n        </div>\n      <div class=\'wrapper\'> \n          <div class=\'bg\'>\n              <div class=\'wrapper2\'>\n              </div>\n          <img class=\'bgImg\' src=\'assets/images/profileBg.jpeg\'/>\n        </div>\n        </div>\n    <!-- No conversations to show -->\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content></ion-refresher-content>\n      </ion-refresher>\n    <div class="empty-list" *ngIf="conversations && conversations.length <= 0">\n      <h1><ion-icon name="text"></ion-icon></h1>\n      <p>No new conversation yet.</p>\n      <button ion-button icon-left tappable (click)="newMessage()"><ion-icon name="md-add"></ion-icon>Start Chat</button>\n    </div>\n    <!-- Show conversations -->\n    <ion-list mode=\'md\'  no-lines class="avatar-list" *ngIf="conversations && conversations.length > 0">\n      <ion-item-sliding mode=\'md\' *ngFor="let conversation of conversations | conversationFilter:searchFriend" #slidingItem>\n      <ion-item  no-lines tappable (click)="message(conversation.$key, conversation.type)">\n        <div>\n          <h2 class=\'messageTitle\' *ngIf="conversation.friend">{{conversation.friend.name}}</h2>\n          <h2 class=\'messageTitle\' *ngIf="conversation.type == \'group\'">{{conversation.name}}</h2>\n          <ion-badge mode=\'ios\' color="teal" *ngIf="conversation.unreadMessagesCount > 0">{{conversation.unreadMessagesCount}}</ion-badge>\n          <p [ngClass]=hasUnreadMessages(conversation)>{{conversation.message}}</p>\n          <p [ngClass]=hasUnreadMessages(conversation) *ngIf="conversation.type == \'group\'">{{conversation.lastMessage}}</p>\n          <span class=\'messageDate\'>{{conversation.date | Date2Format}}</span>\n        </div>\n      </ion-item>\n      <ion-item-options side="right" *ngIf="conversation.type == \'group\'">\n          <button ion-button color=\'danger\' (click)="leaveGroup(conversation)">Leave</button>\n        </ion-item-options>\n        <ion-item-options side="right" *ngIf="!conversation.type">\n            <button ion-button color=\'danger\' (click)="deleteConversation(slidingItem, conversation)">Delete</button>\n          </ion-item-options>\n      </ion-item-sliding>\n    </ion-list>\n  </ion-content>\n\n\n'/*ion-inline-end:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/messages/messages.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_3__providers_loading_loading__["a" /* LoadingProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_5__providers_alert_alert__["a" /* AlertProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"], __WEBPACK_IMPORTED_MODULE_10__providers_firebase_firebase__["a" /* FirebaseProvider */]])
], MessagesPage);

//# sourceMappingURL=messages.js.map

/***/ }),

/***/ 462:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewMessagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__message_message__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_data_data__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_loading_loading__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { SearchPeoplePage } from '../search-people/search-people';



var NewMessagePage = (function () {
    // NewMessagePage
    // This is the page where the user are asked to select a friend whom they want to start a conversation with.
    function NewMessagePage(navCtrl, navParams, app, dataProvider, loadingProvider, ref) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.app = app;
        this.dataProvider = dataProvider;
        this.loadingProvider = loadingProvider;
        this.ref = ref;
        this.showToolbar = false;
        this.headerImgSize = '100%';
        this.headerImgUrl = '';
        this.transition = false;
    }
    NewMessagePage.prototype.onScroll = function ($event) {
        var scrollTop = $event.scrollTop;
        this.showToolbar = scrollTop >= 120;
        if (scrollTop < 0) {
            this.transition = false;
            this.headerImgSize = Math.abs(scrollTop) / 2 + 100 + "%";
        }
        else {
            this.transition = true;
            this.headerImgSize = '100%';
        }
        this.ref.detectChanges();
    };
    NewMessagePage.prototype.ionViewDidLoad = function () {
        // Initialize
        var _this = this;
        this.searchUser = '';
        this.loadingProvider.show();
        this.dataProvider.getCurrentUser().subscribe(function (account) {
            _this.excludedIds = [];
            _this.account = account;
            if (_this.excludedIds.indexOf(account.$key) == -1) {
                _this.excludedIds.push(account.$key);
            }
        });
        // Get user's friends.
        this.dataProvider.getUsers().subscribe(function (accounts) {
            if (accounts) {
                for (var i = 0; i < accounts.length; i++) {
                    _this.dataProvider.getUser(accounts[i].userId).subscribe(function (account) {
                        _this.addOrUpdateFriend(account);
                    });
                }
            }
            else {
                _this.friends = [];
            }
            _this.loadingProvider.hide();
        });
    };
    // Back
    NewMessagePage.prototype.back = function () {
        this.navCtrl.pop();
    };
    // Add or update friend for real-time sync.
    NewMessagePage.prototype.addOrUpdateFriend = function (friend) {
        if (!this.friends) {
            this.friends = [friend];
        }
        else {
            var index = -1;
            for (var i = 0; i < this.friends.length; i++) {
                if (this.friends[i].$key == friend.$key) {
                    index = i;
                }
            }
            if (index > -1) {
                this.friends[index] = friend;
            }
            else {
                this.friends.push(friend);
            }
        }
    };
    // Search people.
    NewMessagePage.prototype.searchPeople = function () {
        //this.navCtrl.push(SearchPeoplePage);
    };
    // Open chat with this user.
    NewMessagePage.prototype.message = function (userId) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__message_message__["a" /* MessagePage */], { userId: userId });
    };
    return NewMessagePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */])
], NewMessagePage.prototype, "content", void 0);
NewMessagePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-new-message',template:/*ion-inline-start:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/new-message/new-message.html"*/'<ion-header  mode=\'ios\'  [hidden]="!showToolbar">\n    \n      <ion-navbar  mode=\'ios\' [class.show-background]="showToolbar">\n          <ion-buttons start>\n              <button ion-button tappable (click)=\'back()\'><ion-icon color=\'light\' class=\'menuButton\' name="ios-close" item-right></ion-icon></button>\n            </ion-buttons>\n            <ion-buttons start>\n                <button class=\'profileTxt\' ion-button>New Message</button>\n              </ion-buttons>\n      </ion-navbar>\n    \n    </ion-header>\n\n<ion-header  [hidden]="showToolbar">\n    \n      <ion-navbar mode=\'ios\'class=\'tool\'>\n         <ion-buttons  mode=\'ios\' start>\n          <button ion-button tappable (click)=\'back()\'><ion-icon color=\'light\' class=\'menuButton\' name="ios-close" item-right></ion-icon></button>\n        </ion-buttons>\n        <ion-buttons  mode=\'ios\' start>\n            <button class=\'profileTxt\' ion-button>New Message</button>\n          </ion-buttons>\n      </ion-navbar>\n    \n    </ion-header>\n<ion-content class="content"\n(ionScroll)="onScroll($event)"\n[class.transition]="transition">\n<img src=\'assets/images/bgAdd.jpeg\'>\n  <div class=\'bg\'>\n    <div class=\'wrapper\'>\n  <!-- No friends yet to start a conversation with -->\n  <div class="empty-list" *ngIf="friends && friends.length == 0">\n    <h1><ion-icon name="md-contacts"></ion-icon></h1>\n    <p>Uh-oh! You have not added any friends yet.</p>\n    <button ion-button icon-left tappable (click)="searchPeople()"><ion-icon name="md-search"></ion-icon>Search People</button>\n  </div>\n  <!-- Show friends to start a conversation with -->\n  <ion-list class="avatar-list" *ngIf="friends && friends.length > 0">\n    <ion-searchbar [(ngModel)]="searchFriend" placeholder="Search for friend or username" showCancelButton="true" cancelButtonText="Done"></ion-searchbar>\n    <ion-list-header mode=\'md\' no-lines>\n        <h2>Users</h2>\n            </ion-list-header>\n    <ion-item *ngFor="let friend of friends | searchFilter:[excludedIds, searchUser]" no-lines tappable (click)="message(friend.$key)">\n      <ion-avatar item-left>\n        <img src="{{friend.img}}">\n      </ion-avatar>\n      <h2>{{friend.name}}</h2>\n    </ion-item>\n  </ion-list>\n</div>\n</div>\n</ion-content>'/*ion-inline-end:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/new-message/new-message.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_3__providers_data_data__["a" /* DataProvider */],
        __WEBPACK_IMPORTED_MODULE_4__providers_loading_loading__["a" /* LoadingProvider */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]])
], NewMessagePage);

//# sourceMappingURL=new-message.js.map

/***/ }),

/***/ 463:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the UserInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var UserInfoPage = (function () {
    function UserInfoPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    UserInfoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UserInfoPage');
    };
    return UserInfoPage;
}());
UserInfoPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-user-info',template:/*ion-inline-start:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/user-info/user-info.html"*/'<!--\n  Generated template for the UserInfoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>userInfo</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/user-info/user-info.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */]])
], UserInfoPage);

//# sourceMappingURL=user-info.js.map

/***/ }),

/***/ 464:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImageModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ImageModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ImageModalPage = (function () {
    function ImageModalPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ImageModalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ImageModalPage');
    };
    return ImageModalPage;
}());
ImageModalPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-image-modal',template:/*ion-inline-start:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/image-modal/image-modal.html"*/'<!--\n  Generated template for the ImageModalPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>imageModal</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/image-modal/image-modal.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */]])
], ImageModalPage);

//# sourceMappingURL=image-modal.js.map

/***/ }),

/***/ 468:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewGroupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_image_image__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_loading_loading__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_data_data__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_alert_alert__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__validator__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2_database__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__message_message__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__add_members_add_members__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_firebase__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













//import { SearchPeoplePage } from '../search-people/search-people';
var NewGroupPage = (function () {
    // NewGroupPage
    // This is the page where the user can start a new group chat with their friends.
    function NewGroupPage(navCtrl, navParams, imageProvider, dataProvider, formBuilder, alertProvider, alertCtrl, angularfire, app, loadingProvider, camera, ref, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.imageProvider = imageProvider;
        this.dataProvider = dataProvider;
        this.formBuilder = formBuilder;
        this.alertProvider = alertProvider;
        this.alertCtrl = alertCtrl;
        this.angularfire = angularfire;
        this.app = app;
        this.loadingProvider = loadingProvider;
        this.camera = camera;
        this.ref = ref;
        this.modalCtrl = modalCtrl;
        // private excludedIds: any
        this.showToolbar = false;
        this.headerImgSize = '100%';
        this.headerImgUrl = '';
        this.transition = false;
        // Create our groupForm based on Validator.ts
        this.userId = __WEBPACK_IMPORTED_MODULE_12_firebase__["auth"]().currentUser.uid;
        this.groupForm = formBuilder.group({
            name: __WEBPACK_IMPORTED_MODULE_7__validator__["a" /* Validator */].groupNameValidator
            //description: Validator.groupDescriptionValidator
        });
        this.trip = this.navParams.get('type');
    }
    NewGroupPage.prototype.addMember = function () {
        var _this = this;
        var searchPage = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_11__add_members_add_members__["a" /* AddMembersPage */]);
        var that = this;
        searchPage.onDidDismiss(function (data) {
            if (that.groupMembers.indexOf(data) == -1) {
                that.groupMembers.push(data);
                console.log(JSON.stringify(_this.groupMembers));
            }
        });
        searchPage.present();
    };
    NewGroupPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // Initialize
        this.group = {
            img: 'assets/images/set.png'
        };
        this.searchFriend = '';
        // Get user's friends to add to the group.
        this.dataProvider.getCurrentUser().subscribe(function (account) {
            _this.excludedIds = [];
            if (!_this.groupMembers) {
                _this.groupMembers = [account];
            }
            if (_this.excludedIds.indexOf(account.$key) == -1) {
                _this.excludedIds.push(account.$key);
            }
            _this.dataProvider.getUsers().subscribe(function (accounts) {
                if (accounts) {
                    for (var i = 0; i < accounts.length; i++) {
                        _this.dataProvider.getUser(accounts[i].userId).subscribe(function (account) {
                            _this.addOrUpdateFriend(account);
                        });
                    }
                }
                else {
                    _this.friends = [];
                }
            });
        });
    };
    NewGroupPage.prototype.onScroll = function ($event) {
        var scrollTop = $event.scrollTop;
        this.showToolbar = scrollTop >= 120;
        if (scrollTop < 0) {
            this.transition = false;
            this.headerImgSize = Math.abs(scrollTop) / 2 + 100 + "%";
        }
        else {
            this.transition = true;
            this.headerImgSize = '100%';
        }
        this.ref.detectChanges();
    };
    // Add or update friend for real-time sync.
    NewGroupPage.prototype.addOrUpdateFriend = function (friend) {
        if (!this.friends) {
            this.friends = [friend];
        }
        else {
            var index = -1;
            for (var i = 0; i < this.friends.length; i++) {
                if (this.friends[i].$key == friend.$key) {
                    index = i;
                }
            }
            if (index > -1) {
                this.friends[index] = friend;
            }
            else {
                this.friends.push(friend);
            }
        }
    };
    // Back
    NewGroupPage.prototype.back = function () {
        if (this.group)
            this.imageProvider.deleteImageFile(this.group.img);
        this.navCtrl.pop();
    };
    // Proceed with group creation.
    NewGroupPage.prototype.done = function () {
        var _this = this;
        this.loadingProvider.show();
        var messages = [];
        // Add system message that group is created.
        messages.push({
            date: new Date().toString(),
            sender: __WEBPACK_IMPORTED_MODULE_12_firebase__["auth"]().currentUser.uid,
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
        this.angularfire.list('groups').push(this.group).then(function (success) {
            var groupId = success.key;
            // Add group reference to users.
            _this.angularfire.object('/accounts/' + _this.groupMembers[0].$key + '/groups/' + groupId).update({
                messagesRead: 1
            });
            for (var i = 1; i < _this.groupMembers.length; i++) {
                _this.angularfire.object('/accounts/' + _this.groupMembers[i].$key + '/groups/' + groupId).update({
                    messagesRead: 0
                });
            }
            // Open the group chat of the just created group.
            _this.navCtrl.popToRoot().then(function () {
                _this.loadingProvider.hide();
                _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_10__message_message__["a" /* MessagePage */], { groupId: groupId });
            });
        });
    };
    // Add friend to members of group.
    NewGroupPage.prototype.addToGroup = function (friend) {
        this.groupMembers.push(friend);
    };
    // Remove friend from members of group.
    NewGroupPage.prototype.removeFromGroup = function (friend) {
        var index = -1;
        for (var i = 1; i < this.groupMembers.length; i++) {
            if (this.groupMembers[i].$key == friend.$key) {
                index = i;
            }
        }
        if (index > -1) {
            this.groupMembers.splice(index, 1);
        }
    };
    // Check if friend is already added to the group or not.
    NewGroupPage.prototype.inGroup = function (friend) {
        for (var i = 0; i < this.groupMembers.length; i++) {
            if (this.groupMembers[i].$key == friend.$key) {
                return true;
            }
        }
        return false;
    };
    // Toggle to add/remove friend from the group.
    NewGroupPage.prototype.addOrRemoveFromGroup = function (friend) {
        if (this.inGroup(friend)) {
            this.removeFromGroup(friend);
        }
        else {
            this.addToGroup(friend);
            //console.log(this.friends);
        }
    };
    NewGroupPage.prototype.getStatus = function (user) {
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
    };
    // Set group photo.
    NewGroupPage.prototype.setGroupPhoto = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Set Group Photo',
            message: 'Do you want to take a photo or choose from your photo gallery?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Choose from Gallery',
                    handler: function () {
                        _this.imageProvider.setGroupPhoto(_this.group, _this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Take Photo',
                    handler: function () {
                        _this.imageProvider.setGroupPhoto(_this.group, _this.camera.PictureSourceType.CAMERA);
                    }
                }
            ]
        }).present();
    };
    return NewGroupPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */])
], NewGroupPage.prototype, "content", void 0);
NewGroupPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-new-group',template:/*ion-inline-start:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/new-group/new-group.html"*/'<ion-header  mode=\'ios\'  [hidden]="!showToolbar">\n    \n      <ion-navbar  mode=\'ios\' [class.show-background]="showToolbar">\n          <ion-buttons start>\n              <button ion-button tappable (click)=\'back()\'><ion-icon color=\'light\' class=\'menuButton\' name="ios-close" item-right></ion-icon></button>\n            </ion-buttons>\n            <ion-buttons start>\n                <button class=\'profileTxt\' ion-button>New Group</button>\n              </ion-buttons>\n              <ion-buttons end>\n                  <button ion-button color=\'light\' tappable (click)="done()" [disabled]="!groupForm.valid || group.img == \'\' || groupMembers.length <= 1">Done</button>\n                </ion-buttons>\n      </ion-navbar>\n    </ion-header>\n<ion-header  [hidden]="showToolbar">\n      <ion-navbar mode=\'ios\'class=\'tool\'>\n         <ion-buttons  mode=\'ios\' start>\n          <button ion-button tappable (click)=\'back()\'><ion-icon color=\'light\' class=\'menuButton\' name="ios-close" item-right></ion-icon></button>\n        </ion-buttons>\n        <ion-buttons  mode=\'ios\' start>\n            <button class=\'profileTxt\' ion-button>New Group</button>\n          </ion-buttons>\n          <ion-buttons end>\n              <button ion-button color=\'light\' tappable (click)="done()" [disabled]="!groupForm.valid || group.img == \'\' || groupMembers.length <= 1">Done</button>\n            </ion-buttons>\n        </ion-navbar>\n    </ion-header>\n    <ion-content class="content"\n    (ionScroll)="onScroll($event)"\n    [class.transition]="transition">\n    <img src=\'assets/images/bgAdd.jpeg\'>\n      <div class=\'bg\'>\n        <div class=\'wrapper\'>\n      <!-- No friends yet to start a conversation with -->\n  <div class="empty-list" *ngIf="friends && friends.length == 0">\n        <h1><ion-icon name="md-contacts"></ion-icon></h1>\n        <p>Uh-oh! You have not added any friends yet.</p>\n        <button ion-button icon-left tappable (click)="addMember()"><ion-icon name="md-search"></ion-icon>Search People</button>\n      </div>\n      <!-- Show friends to start a conversation with -->\n      <div *ngIf="group">\n          <ion-list no-lines>\n              <button ion-button tappable (click)="addMember()" block color=\'teal\'>Add Member</button>\n            <ion-list-header no-lines mode=\'md\'>\n              <h2>Group Info</h2>\n            </ion-list-header>\n            <form [formGroup]="groupForm">\n              <ion-item no-lines>\n                <ion-avatar item-left>\n                  <img src="{{group.img}}" *ngIf="group.img != \'\'" tappable (click)="setGroupPhoto()" />\n                  <img src="assets/images/set.png" *ngIf="group.img == \'\'" tappable (click)="setGroupPhoto()" />\n                </ion-avatar>\n                <ion-input type="text" formControlName="name" placeholder="Name of Group" style=\'color:white;\'></ion-input>\n              </ion-item>\n              <div *ngIf="groupMembers">\n              <ion-list-header no-lines mode=\'md\'>\n                <h2>Group Members ({{groupMembers.length}})</h2>\n              </ion-list-header>\n              \n              <ion-item  *ngFor="let member of groupMembers">\n                <ion-avatar item-left>\n                  <img src="{{member.img}}"/>\n                </ion-avatar>\n                <h2>{{member.name}}</h2>\n                <ion-icon *ngIf=\'member.userId!=userId\'color=\'danger\' name="close-circle" item-right tappable (click)="removeFromGroup(member)"></ion-icon>\n              </ion-item>\n              </div>\n            </form>\n          </ion-list>\n          </div>\n        </div>\n      </div>\n    </ion-content>\n\n        '/*ion-inline-end:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/new-group/new-group.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_image_image__["a" /* ImageProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_data_data__["a" /* DataProvider */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"],
        __WEBPACK_IMPORTED_MODULE_6__providers_alert_alert__["a" /* AlertProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_9_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_4__providers_loading_loading__["a" /* LoadingProvider */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ModalController */]])
], NewGroupPage);

//# sourceMappingURL=new-group.js.map

/***/ }),

/***/ 469:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(682);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__loading_loading__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__alert_alert__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { NavController, NavParams, Content, AlertController, ModalController, ActionSheetController } from 'ionic-angular';



/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var FirebaseProvider = (function () {
    function FirebaseProvider(angularfire, loadingProvider, alertProvider) {
        this.angularfire = angularfire;
        this.loadingProvider = loadingProvider;
        this.alertProvider = alertProvider;
        console.log('Hello FirebaseProvider Provider');
    }
    FirebaseProvider.prototype.deleteConversation = function (userId, conversation, convo) {
        var _this = this;
        console.log(userId);
        var temp = conversation.users.splice(conversation.users.indexOf(userId), 1);
        this.angularfire.object('/conversations/' + conversation.$key).update({
            users: temp,
            messages: conversation.messages
        }).then(function (success) {
            _this.angularfire.object('/accounts/' + __WEBPACK_IMPORTED_MODULE_3_firebase__["auth"]().currentUser.uid + '/conversations/' + convo.$key).remove().then(function () {
                conversation = null;
                console.log('success');
                setTimeout(function () {
                    _this.loadingProvider.hide();
                    //this.navCtrl.popToRoot();
                }, 300);
            });
        }).catch(function (error) {
            _this.loadingProvider.hide();
            _this.alertProvider.showErrorMessage('group/error-leave-group');
        });
    };
    return FirebaseProvider;
}());
FirebaseProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_4__loading_loading__["a" /* LoadingProvider */],
        __WEBPACK_IMPORTED_MODULE_5__alert_alert__["a" /* AlertProvider */]])
], FirebaseProvider);

//# sourceMappingURL=firebase.js.map

/***/ }),

/***/ 470:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VerificationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_logout_logout__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loading_loading__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_alert_alert__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__validator__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var VerificationPage = (function () {
    function VerificationPage(navCtrl, alertCtrl, navParams, app, logoutProvider, loadingProvider, angularfire, alertProvider) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.app = app;
        this.logoutProvider = logoutProvider;
        this.loadingProvider = loadingProvider;
        this.angularfire = angularfire;
        this.alertProvider = alertProvider;
        // Hook our logout provider with the app.
        this.logoutProvider.setApp(this.app);
    }
    VerificationPage.prototype.ionViewDidLoad = function () {
        // Set our routeGuard variables to false, to not allow rereouting.
        this.emailVerified = false;
        this.isLoggingOut = false;
        // Get user data and send an email verification automatically.
        this.getUserData();
        this.sendEmailVerification();
        // Create the emailVerification checker.
        var that = this;
        that.checkVerified = setInterval(function () {
            __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.reload();
            if (__WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.emailVerified) {
                clearInterval(that.checkVerified);
                that.emailVerified = true;
                that.alertProvider.showEmailVerifiedMessageAndRedirect(that.navCtrl);
            }
        }, 1000);
    };
    VerificationPage.prototype.ionViewCanLeave = function () {
        // routeGuard to prevent from leaving this view unless email is verified, or user is logging out.
        if (this.emailVerified || this.isLoggingOut) {
            return true;
        }
        else {
            return false;
        }
    };
    // Get user data from the logged in Firebase user to show on html markup.
    VerificationPage.prototype.getUserData = function () {
        var user = __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser;
        var userId, name, provider, img, email;
        var providerData = user.providerData[0];
        userId = user.uid;
        // Retrieve name from Firebase user
        if (user.displayName || providerData.displayName) {
            name = user.displayName;
            name = providerData.displayName;
        }
        else {
            name = "codesundar.com";
        }
        // Retrieve provider from Firebase user
        if (providerData.providerId == 'password') {
            provider = "Firebase";
        }
        else if (providerData.providerId == 'facebook.com') {
            provider = "Facebook";
        }
        else if (providerData.providerId == 'google.com') {
            provider = "Google";
        }
        // Retrieve photoURL from Firebase user
        if (user.photoURL || providerData.photoURL) {
            img = user.photoURL;
            img = providerData.photoURL;
        }
        else {
            img = "assets/images/profile.png";
        }
        // Retrieve email from Firebase user
        email = user.email;
        // Set to user variable for our markup html
        this.user = {
            userId: userId,
            name: name,
            provider: provider,
            img: img,
            email: email,
            pushToken: localStorage.getItem('pushToken')
        };
    };
    // Send an email verification to the user's email.
    VerificationPage.prototype.sendEmailVerification = function () {
        var _this = this;
        this.loadingProvider.show();
        __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.sendEmailVerification()
            .then(function (success) {
            _this.alertProvider.showEmailVerificationSentMessage(__WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.email);
            _this.loadingProvider.hide();
        });
    };
    // Set the user email
    VerificationPage.prototype.setEmail = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Change Email Address',
            message: "Please enter a new email address.",
            inputs: [
                {
                    name: 'email',
                    placeholder: 'Your Email Address',
                    value: __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.email
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) { }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        var email = data["email"];
                        // Check if entered email is different from the current email
                        if (__WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.email != email) {
                            // Check if email is valid.
                            if (__WEBPACK_IMPORTED_MODULE_6__validator__["a" /* Validator */].profileEmailValidator.pattern.test(email)) {
                                _this.loadingProvider.show();
                                // Update email on Firebase
                                __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.updateEmail(email)
                                    .then(function (success) {
                                    __WEBPACK_IMPORTED_MODULE_6__validator__["a" /* Validator */].profileEmailValidator.pattern.test(email);
                                    _this.loadingProvider.hide();
                                    // Clear the existing interval because when we call ionViewDidLoad, another interval will be created.
                                    clearInterval(_this.checkVerified);
                                    // Call ionViewDidLoad again to update user on the markup and automatically send verification mail.
                                    _this.ionViewDidLoad();
                                    // Update the user data on the database if it exists.
                                    __WEBPACK_IMPORTED_MODULE_7_firebase__["database"]().ref('accounts/' + __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.uid).once('value')
                                        .then(function (account) {
                                        if (account.val()) {
                                            _this.angularfire.object('/accounts/' + __WEBPACK_IMPORTED_MODULE_7_firebase__["auth"]().currentUser.uid).update({
                                                email: email
                                            });
                                        }
                                    });
                                })
                                    .catch(function (error) {
                                    //Show error
                                    _this.loadingProvider.hide();
                                    var code = error["code"];
                                    _this.alertProvider.showErrorMessage(code);
                                    if (code == 'auth/requires-recent-login') {
                                        _this.logoutProvider.logout();
                                    }
                                });
                            }
                            else {
                                _this.alertProvider.showErrorMessage('profile/invalid-email');
                            }
                        }
                    }
                }
            ]
        }).present();
    };
    // Clear the interval, and log the user out.
    VerificationPage.prototype.logout = function () {
        var _this = this;
        this.alert = this.alertCtrl.create({
            title: 'Confirm Logout',
            message: 'Are you sure you want to logout?',
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Logout',
                    handler: function (data) {
                        // Clear the verification check interval.
                        clearInterval(_this.checkVerified);
                        // Set our routeGuard to true, to enable changing views.
                        _this.isLoggingOut = true;
                        // Log the user out.
                        _this.logoutProvider.logout();
                    }
                }
            ]
        }).present();
    };
    return VerificationPage;
}());
VerificationPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-verification',template:/*ion-inline-start:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/verification/verification.html"*/'<ion-content>\n  \n   <div *ngIf="user" class="page">\n     <h4 class="title">Verify your account</h4>\n     <p>Please verify <span>{{user.email}}</span> to continue</p>\n     <!-- Verification Menu -->\n     <ion-row style="text-align: center;">\n       <ion-col>\n         <ion-icon name="refresh" tappable (click)="sendEmailVerification()"></ion-icon>\n         <p>Resend</p>\n       </ion-col>\n       <ion-col>\n         <ion-icon name="mail" tappable (click)="setEmail()"></ion-icon>\n         <p>Update Email</p>\n       </ion-col>\n       <ion-col>\n         <ion-icon name="log-out" tappable (click)="logout()"></ion-icon>\n         <p>Logout</p>\n       </ion-col>\n     </ion-row>\n   </div>\n \n </ion-content>\n \n '/*ion-inline-end:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/verification/verification.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
        __WEBPACK_IMPORTED_MODULE_2__providers_logout_logout__["a" /* LogoutProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_loading_loading__["a" /* LoadingProvider */],
        __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_4__providers_alert_alert__["a" /* AlertProvider */]])
], VerificationPage);

//# sourceMappingURL=verification.js.map

/***/ }),

/***/ 476:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(477);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(492);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 492:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CustomCurrencyMaskConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_verification_verification__ = __webpack_require__(470);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_intro_intro__ = __webpack_require__(683);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__login__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_plus__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic2_super_tabs__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_message_message__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__ = __webpack_require__(457);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_add_trip_add_trip__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_add_event_add_event__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_home_home__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_tabs_tabs__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_storage__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_status_bar__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_splash_screen__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_login_login__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_loading_loading__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_alert_alert__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_logout_logout__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_data_data__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_camera__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_facebook__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_firebase__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_26_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_angularfire2__ = __webpack_require__(684);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_angularfire2_auth__ = __webpack_require__(685);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29_angularfire2_database__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__providers_image_image__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ionic_native_media_capture__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_file__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_email_composer__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_feedback_feedback__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_account_account__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_messages_messages__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_new_message_new_message__ = __webpack_require__(462);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_new_group_new_group__ = __webpack_require__(468);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__ionic_native_social_sharing__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__pipes_date__ = __webpack_require__(687);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__pipes_day__ = __webpack_require__(688);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__pipes_conversation__ = __webpack_require__(689);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__pages_add_members_add_members__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45_ng2_currency_mask__ = __webpack_require__(690);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45_ng2_currency_mask___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_45_ng2_currency_mask__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46_ng2_currency_mask_src_currency_mask_config__ = __webpack_require__(475);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46_ng2_currency_mask_src_currency_mask_config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_46_ng2_currency_mask_src_currency_mask_config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__pages_user_info_user_info__ = __webpack_require__(463);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48_ion2_calendar__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__pages_agenda_agenda__ = __webpack_require__(695);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__pipes_date2__ = __webpack_require__(696);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__pipes_friend__ = __webpack_require__(697);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__pipes_search__ = __webpack_require__(698);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__pipes_messages__ = __webpack_require__(699);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__ionic_native_geolocation__ = __webpack_require__(467);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__ionic_native_keyboard__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__ionic_native_contacts__ = __webpack_require__(465);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__pages_image_modal_image_modal__ = __webpack_require__(464);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__providers_firebase_firebase__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__pages_virtualcard_virtualcard__ = __webpack_require__(178);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








































//import { DatePicker } from '@ionic-native/date-picker';















//import { Camera } from '@ionic-native/camera';





__WEBPACK_IMPORTED_MODULE_26_firebase__["initializeApp"](__WEBPACK_IMPORTED_MODULE_7__login__["a" /* Login */].firebaseConfig);
var CustomCurrencyMaskConfig = {
    align: "center",
    allowNegative: true,
    allowZero: true,
    decimal: ".",
    precision: 2,
    prefix: "$",
    suffix: "",
    thousands: ","
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_42__pipes_day__["a" /* DayFormatPipe */],
            __WEBPACK_IMPORTED_MODULE_12__pages_add_trip_add_trip__["a" /* AddTripPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_add_event_add_event__["a" /* AddEventPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_intro_intro__["a" /* IntroPage */],
            __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_verification_verification__["a" /* VerificationPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_34__pages_feedback_feedback__["a" /* FeedbackPage */],
            __WEBPACK_IMPORTED_MODULE_35__pages_account_account__["a" /* AccountPage */],
            __WEBPACK_IMPORTED_MODULE_36__pages_messages_messages__["a" /* MessagesPage */],
            __WEBPACK_IMPORTED_MODULE_41__pipes_date__["a" /* DateFormatPipe */],
            __WEBPACK_IMPORTED_MODULE_44__pages_add_members_add_members__["a" /* AddMembersPage */],
            __WEBPACK_IMPORTED_MODULE_47__pages_user_info_user_info__["a" /* UserInfoPage */],
            __WEBPACK_IMPORTED_MODULE_49__pages_agenda_agenda__["a" /* AgendaPage */],
            __WEBPACK_IMPORTED_MODULE_43__pipes_conversation__["a" /* ConversationPipe */],
            __WEBPACK_IMPORTED_MODULE_50__pipes_date2__["a" /* Date2FormatPipe */],
            __WEBPACK_IMPORTED_MODULE_37__pages_new_message_new_message__["a" /* NewMessagePage */],
            __WEBPACK_IMPORTED_MODULE_51__pipes_friend__["a" /* FriendPipe */],
            __WEBPACK_IMPORTED_MODULE_52__pipes_search__["a" /* SearchPipe */],
            __WEBPACK_IMPORTED_MODULE_10__pages_message_message__["a" /* MessagePage */],
            __WEBPACK_IMPORTED_MODULE_38__pages_new_group_new_group__["a" /* NewGroupPage */],
            __WEBPACK_IMPORTED_MODULE_57__pages_image_modal_image_modal__["a" /* ImageModalPage */],
            __WEBPACK_IMPORTED_MODULE_53__pipes_messages__["a" /* MessagesPipe */],
            __WEBPACK_IMPORTED_MODULE_59__pages_virtualcard_virtualcard__["a" /* VirtualcardPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_45_ng2_currency_mask__["CurrencyMaskModule"],
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_16__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {
                scrollPadding: false,
                scrollAssist: true,
                autoFocusAssist: false
            }, {
                links: [
                    { loadChildren: '../pages/group/group.module#GroupPageModule', name: 'GroupPage', segment: 'group', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/virtualcard/virtualcard.module#VirtualcardPageModule', name: 'VirtualcardPage', segment: 'virtualcard', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_27_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_7__login__["a" /* Login */].firebaseConfig, 'ionic3chat'),
            __WEBPACK_IMPORTED_MODULE_9_ionic2_super_tabs__["b" /* SuperTabsModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_28_angularfire2_auth__["a" /* AngularFireAuthModule */],
            __WEBPACK_IMPORTED_MODULE_29_angularfire2_database__["b" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_40__angular_forms__["ReactiveFormsModule"],
            __WEBPACK_IMPORTED_MODULE_48_ion2_calendar__["b" /* CalendarModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_12__pages_add_trip_add_trip__["a" /* AddTripPage */],
            __WEBPACK_IMPORTED_MODULE_36__pages_messages_messages__["a" /* MessagesPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_intro_intro__["a" /* IntroPage */],
            __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_verification_verification__["a" /* VerificationPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_34__pages_feedback_feedback__["a" /* FeedbackPage */],
            __WEBPACK_IMPORTED_MODULE_35__pages_account_account__["a" /* AccountPage */],
            __WEBPACK_IMPORTED_MODULE_44__pages_add_members_add_members__["a" /* AddMembersPage */],
            __WEBPACK_IMPORTED_MODULE_47__pages_user_info_user_info__["a" /* UserInfoPage */],
            __WEBPACK_IMPORTED_MODULE_49__pages_agenda_agenda__["a" /* AgendaPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_add_event_add_event__["a" /* AddEventPage */],
            __WEBPACK_IMPORTED_MODULE_37__pages_new_message_new_message__["a" /* NewMessagePage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_message_message__["a" /* MessagePage */],
            __WEBPACK_IMPORTED_MODULE_38__pages_new_group_new_group__["a" /* NewGroupPage */],
            __WEBPACK_IMPORTED_MODULE_57__pages_image_modal_image_modal__["a" /* ImageModalPage */],
            __WEBPACK_IMPORTED_MODULE_59__pages_virtualcard_virtualcard__["a" /* VirtualcardPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_17__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_18__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* IonicErrorHandler */] },
            { provide: __WEBPACK_IMPORTED_MODULE_46_ng2_currency_mask_src_currency_mask_config__["CURRENCY_MASK_CONFIG"], useValue: CustomCurrencyMaskConfig },
            __WEBPACK_IMPORTED_MODULE_19__providers_login_login__["a" /* LoginProvider */],
            __WEBPACK_IMPORTED_MODULE_20__providers_loading_loading__["a" /* LoadingProvider */],
            __WEBPACK_IMPORTED_MODULE_21__providers_alert_alert__["a" /* AlertProvider */],
            __WEBPACK_IMPORTED_MODULE_22__providers_logout_logout__["a" /* LogoutProvider */],
            __WEBPACK_IMPORTED_MODULE_23__providers_data_data__["a" /* DataProvider */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_google_plus__["a" /* GooglePlus */],
            __WEBPACK_IMPORTED_MODULE_24__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_55__ionic_native_keyboard__["a" /* Keyboard */],
            __WEBPACK_IMPORTED_MODULE_56__ionic_native_contacts__["a" /* Contacts */],
            __WEBPACK_IMPORTED_MODULE_25__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_30__providers_image_image__["a" /* ImageProvider */],
            __WEBPACK_IMPORTED_MODULE_24__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_31__ionic_native_media_capture__["a" /* MediaCapture */],
            __WEBPACK_IMPORTED_MODULE_32__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_33__ionic_native_email_composer__["a" /* EmailComposer */],
            __WEBPACK_IMPORTED_MODULE_39__ionic_native_social_sharing__["a" /* SocialSharing */],
            __WEBPACK_IMPORTED_MODULE_23__providers_data_data__["a" /* DataProvider */],
            __WEBPACK_IMPORTED_MODULE_20__providers_loading_loading__["a" /* LoadingProvider */],
            __WEBPACK_IMPORTED_MODULE_54__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_58__providers_firebase_firebase__["a" /* FirebaseProvider */],
            __WEBPACK_IMPORTED_MODULE_58__providers_firebase_firebase__["a" /* FirebaseProvider */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 532:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_virtualcard_virtualcard__ = __webpack_require__(178);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = (function () {
    //rootPage:any = LoginPage;
    function MyApp(platform, statusBar, splashScreen, storage) {
        var _this = this;
        this.storage = storage;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_virtualcard_virtualcard__["a" /* VirtualcardPage */];
        platform.ready().then(function () {
            _this.storage.get('introShown').then(function (result) {
                if (result) {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_virtualcard_virtualcard__["a" /* VirtualcardPage */];
                    //this.rootPage = LoginPage;
                }
                else {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_virtualcard_virtualcard__["a" /* VirtualcardPage */];
                    //this.rootPage = IntroPage;
                    _this.storage.set('introShown', true);
                }
                //this.loader.dismiss();
            });
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 629:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 335,
	"./af.js": 335,
	"./ar": 336,
	"./ar-dz": 337,
	"./ar-dz.js": 337,
	"./ar-kw": 338,
	"./ar-kw.js": 338,
	"./ar-ly": 339,
	"./ar-ly.js": 339,
	"./ar-ma": 340,
	"./ar-ma.js": 340,
	"./ar-sa": 341,
	"./ar-sa.js": 341,
	"./ar-tn": 342,
	"./ar-tn.js": 342,
	"./ar.js": 336,
	"./az": 343,
	"./az.js": 343,
	"./be": 344,
	"./be.js": 344,
	"./bg": 345,
	"./bg.js": 345,
	"./bn": 346,
	"./bn.js": 346,
	"./bo": 347,
	"./bo.js": 347,
	"./br": 348,
	"./br.js": 348,
	"./bs": 349,
	"./bs.js": 349,
	"./ca": 350,
	"./ca.js": 350,
	"./cs": 351,
	"./cs.js": 351,
	"./cv": 352,
	"./cv.js": 352,
	"./cy": 353,
	"./cy.js": 353,
	"./da": 354,
	"./da.js": 354,
	"./de": 355,
	"./de-at": 356,
	"./de-at.js": 356,
	"./de-ch": 357,
	"./de-ch.js": 357,
	"./de.js": 355,
	"./dv": 358,
	"./dv.js": 358,
	"./el": 359,
	"./el.js": 359,
	"./en-au": 360,
	"./en-au.js": 360,
	"./en-ca": 361,
	"./en-ca.js": 361,
	"./en-gb": 362,
	"./en-gb.js": 362,
	"./en-ie": 363,
	"./en-ie.js": 363,
	"./en-nz": 364,
	"./en-nz.js": 364,
	"./eo": 365,
	"./eo.js": 365,
	"./es": 366,
	"./es-do": 367,
	"./es-do.js": 367,
	"./es.js": 366,
	"./et": 368,
	"./et.js": 368,
	"./eu": 369,
	"./eu.js": 369,
	"./fa": 370,
	"./fa.js": 370,
	"./fi": 371,
	"./fi.js": 371,
	"./fo": 372,
	"./fo.js": 372,
	"./fr": 373,
	"./fr-ca": 374,
	"./fr-ca.js": 374,
	"./fr-ch": 375,
	"./fr-ch.js": 375,
	"./fr.js": 373,
	"./fy": 376,
	"./fy.js": 376,
	"./gd": 377,
	"./gd.js": 377,
	"./gl": 378,
	"./gl.js": 378,
	"./gom-latn": 379,
	"./gom-latn.js": 379,
	"./he": 380,
	"./he.js": 380,
	"./hi": 381,
	"./hi.js": 381,
	"./hr": 382,
	"./hr.js": 382,
	"./hu": 383,
	"./hu.js": 383,
	"./hy-am": 384,
	"./hy-am.js": 384,
	"./id": 385,
	"./id.js": 385,
	"./is": 386,
	"./is.js": 386,
	"./it": 387,
	"./it.js": 387,
	"./ja": 388,
	"./ja.js": 388,
	"./jv": 389,
	"./jv.js": 389,
	"./ka": 390,
	"./ka.js": 390,
	"./kk": 391,
	"./kk.js": 391,
	"./km": 392,
	"./km.js": 392,
	"./kn": 393,
	"./kn.js": 393,
	"./ko": 394,
	"./ko.js": 394,
	"./ky": 395,
	"./ky.js": 395,
	"./lb": 396,
	"./lb.js": 396,
	"./lo": 397,
	"./lo.js": 397,
	"./lt": 398,
	"./lt.js": 398,
	"./lv": 399,
	"./lv.js": 399,
	"./me": 400,
	"./me.js": 400,
	"./mi": 401,
	"./mi.js": 401,
	"./mk": 402,
	"./mk.js": 402,
	"./ml": 403,
	"./ml.js": 403,
	"./mr": 404,
	"./mr.js": 404,
	"./ms": 405,
	"./ms-my": 406,
	"./ms-my.js": 406,
	"./ms.js": 405,
	"./my": 407,
	"./my.js": 407,
	"./nb": 408,
	"./nb.js": 408,
	"./ne": 409,
	"./ne.js": 409,
	"./nl": 410,
	"./nl-be": 411,
	"./nl-be.js": 411,
	"./nl.js": 410,
	"./nn": 412,
	"./nn.js": 412,
	"./pa-in": 413,
	"./pa-in.js": 413,
	"./pl": 414,
	"./pl.js": 414,
	"./pt": 415,
	"./pt-br": 416,
	"./pt-br.js": 416,
	"./pt.js": 415,
	"./ro": 417,
	"./ro.js": 417,
	"./ru": 418,
	"./ru.js": 418,
	"./sd": 419,
	"./sd.js": 419,
	"./se": 420,
	"./se.js": 420,
	"./si": 421,
	"./si.js": 421,
	"./sk": 422,
	"./sk.js": 422,
	"./sl": 423,
	"./sl.js": 423,
	"./sq": 424,
	"./sq.js": 424,
	"./sr": 425,
	"./sr-cyrl": 426,
	"./sr-cyrl.js": 426,
	"./sr.js": 425,
	"./ss": 427,
	"./ss.js": 427,
	"./sv": 428,
	"./sv.js": 428,
	"./sw": 429,
	"./sw.js": 429,
	"./ta": 430,
	"./ta.js": 430,
	"./te": 431,
	"./te.js": 431,
	"./tet": 432,
	"./tet.js": 432,
	"./th": 433,
	"./th.js": 433,
	"./tl-ph": 434,
	"./tl-ph.js": 434,
	"./tlh": 435,
	"./tlh.js": 435,
	"./tr": 436,
	"./tr.js": 436,
	"./tzl": 437,
	"./tzl.js": 437,
	"./tzm": 438,
	"./tzm-latn": 439,
	"./tzm-latn.js": 439,
	"./tzm.js": 438,
	"./uk": 440,
	"./uk.js": 440,
	"./ur": 441,
	"./ur.js": 441,
	"./uz": 442,
	"./uz-latn": 443,
	"./uz-latn.js": 443,
	"./uz.js": 442,
	"./vi": 444,
	"./vi.js": 444,
	"./x-pseudo": 445,
	"./x-pseudo.js": 445,
	"./yo": 446,
	"./yo.js": 446,
	"./zh-cn": 447,
	"./zh-cn.js": 447,
	"./zh-hk": 448,
	"./zh-hk.js": 448,
	"./zh-tw": 449,
	"./zh-tw.js": 449
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 629;

/***/ }),

/***/ 632:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OverviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js__ = __webpack_require__(633);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__add_event_add_event__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the OverviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var OverviewPage = (function () {
    function OverviewPage(navCtrl, navParams, ref, modalCtrl, db) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ref = ref;
        this.modalCtrl = modalCtrl;
        this.db = db;
        this.showToolbar = false;
        this.headerImgSize = '100%';
        this.headerImgUrl = '';
        this.transition = false;
        this.view = "0";
        this.categories = [];
        this.tripKey = this.navParams.get('trip');
        this.s1 = this.db.object('/trips/' + this.tripKey).subscribe(function (res) {
            _this.trip = res;
            _this.remaining = (_this.trip.cost - _this.trip.allocated);
        });
    }
    OverviewPage.prototype.onScroll = function ($event) {
        var scrollTop = $event.scrollTop;
        this.showToolbar = scrollTop >= 120;
        if (scrollTop < 0) {
            this.transition = false;
            this.headerImgSize = Math.abs(scrollTop) / 2 + 100 + "%";
        }
        else {
            this.transition = true;
            this.headerImgSize = '100%';
        }
        this.ref.detectChanges();
    };
    OverviewPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    OverviewPage.prototype.ionViewDidLoad = function () {
        this.doughnutChart = new __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"](this.doughnutCanvas.nativeElement, {
            type: 'doughnut',
            data: {
                labels: ["Allocated Funds (USD)", "Remaining Budget (USD)"],
                datasets: [{
                        label: 'Budget Overview',
                        data: [this.trip.allocated, this.remaining],
                        backgroundColor: [
                            'rgba(198, 166, 32, 1)',
                            'rgba(236, 237, 239, 1)'
                        ]
                    }]
            },
            options: {
                cutoutPercentage: 80,
                rotation: 0.5 * Math.PI,
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: ['Total Budget', Math.round(this.trip.allocated / this.trip.cost) + '%'],
                    position: 'bottom'
                }
            },
        });
    };
    OverviewPage.prototype.addEvent = function () {
        var addEventModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__add_event_add_event__["a" /* AddEventPage */], { trip: this.trip });
        addEventModal.present();
    };
    return OverviewPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('doughnutCanvas'),
    __metadata("design:type", Object)
], OverviewPage.prototype, "doughnutCanvas", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('doughnutCanvas'),
    __metadata("design:type", Object)
], OverviewPage.prototype, "doughnutCanvasAdventure", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* Slides */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* Slides */])
], OverviewPage.prototype, "slides", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */])
], OverviewPage.prototype, "content", void 0);
OverviewPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-overview',template:/*ion-inline-start:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/overview/overview.html"*/'<!--\n  Generated template for the AgendaPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header [hidden]="!showToolbar">\n  \n  <ion-navbar hideBackButton [class.show-background]="showToolbar">\n      <ion-buttons start>\n          <button ion-button tappable (click)="back()"><ion-icon color=\'light\' class=\'menuButton\' name="ios-arrow-back" item-right></ion-icon></button>\n        </ion-buttons>\n        <ion-buttons start>\n            <button class=\'profileTxt\' ion-button>{{trip.location}}</button>\n          </ion-buttons>\n          <ion-buttons end>\n              <button ion-button tappable (click)="menu()"><ion-icon color=\'light\' class=\'menuButton\' name="ios-more-outline" item-right></ion-icon></button>\n            </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-header hidebackbutton [hidden]="showToolbar">\n    <ion-navbar hideBackButton class=\'tool\'>\n       <ion-buttons start>\n        <button ion-button tappable (click)="back()"><ion-icon color=\'light\' class=\'menuButton\' name="ios-arrow-back" item-right></ion-icon></button>\n      </ion-buttons>\n      <ion-buttons start>\n          <button class=\'profileTxt\' ion-button>{{trip.location}}</button>\n        </ion-buttons>\n        <ion-buttons end>\n            <button ion-button tappable (click)="menu()"><ion-icon color=\'light\' class=\'menuButton\' name="ios-more-outline" item-right></ion-icon></button>\n          </ion-buttons>\n    </ion-navbar>\n  </ion-header>\n\n<ion-content  class="content"\n(ionScroll)="onScroll($event)"\n[class.transition]="transition">\n  <div>\n<div class=\'img\' tappable (click)=\'addEvent()\'>\n     <h2>$+</h2>\n        </div>\n<div class=\'wrapper\'> \n    <div class=\'bg\'>\n      <div class=\'wrapper2\'>\n          <ion-grid class=\'halfway\'>\n              <ion-row>\n                  <ion-col>\n                      <h1 class=\'profileName\'>Budget</h1>\n                  </ion-col>\n                </ion-row>\n              <ion-row>\n                <ion-col>\n                    <p class=\'userName\'>Total: {{trip.cost}} USD</p>\n                </ion-col>\n              </ion-row>\n            </ion-grid>\n      </div>\n      <img class=\'bgImg\' src=\'{{trip.img}}\'/>\n    </div>\n</div>\n<ion-segment mode=\'md\' [(ngModel)]="view" color="primary" (ionChange)="segmentChanged($event)">\n    <ion-segment-button value="0">\n      Overview\n    </ion-segment-button>\n    <ion-segment-button value="1">\n      Make Payment\n    </ion-segment-button>\n    <ion-segment-button value="2">\n      History\n      </ion-segment-button>\n  </ion-segment>\n  <ion-list-header no-lines style="text-align:center;">\n      <h2>{{this.remaining}}</h2>\n  </ion-list-header>\n  <ion-item no-lines style=\'padding:0; margin:0;\'>\n      <canvas #doughnutCanvas>\n      </canvas>\n  </ion-item>\n  <ion-list-header no-lines mode=\'md\' center style=\'text-align:center;\'>\n    <h2>Categories</h2>\n  </ion-list-header>\n            <canvas #doughnutCanvasAdventure>\n              </canvas>\n <ion-row>\n   <ion-item class=\'alert\' text-wrap no-lines *ngIf=\'remaining == trip.cost\'>\n   Looks like you haven\'t allocated any funds yet. Add an event to your itenerary here!\n   </ion-item>\n </ion-row>\n <ion-list-header no-lines mode=\'md\'>\n  <h2 item-left>Itenerary Overview</h2>\n  <button item-right ion-button clear item-right icon-only (click)=\'addEvent()\'>\n      <ion-icon color=\'primary\' name=\'add-circle\'></ion-icon>\n  </button>\n </ion-list-header>\n <ion-item no-lines>\n   <p style=\'text-align:center\' *ngIf=\'!trip.events || trip.events.length<=0\'>No events to show at this time.</p>\n </ion-item>\n</div>\n</ion-content>\n'/*ion-inline-end:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/overview/overview.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ModalController */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */]])
], OverviewPage);

//# sourceMappingURL=overview.js.map

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImageProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__alert_alert__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loading_loading__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_media_capture__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__ = __webpack_require__(332);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ImageProvider = (function () {
    // All files to be uploaded on Firebase must have DATA_URL as the destination type.
    // This will return the imageURI which can then be processed and uploaded to Firebase.
    // For the list of cameraOptions, please refer to: https://github.com/apache/cordova-plugin-camera#module_camera.CameraOptions
    function ImageProvider(angularfire, alertProvider, loadingProvider, camera, mediaCapture, file) {
        this.angularfire = angularfire;
        this.alertProvider = alertProvider;
        this.loadingProvider = loadingProvider;
        this.camera = camera;
        this.mediaCapture = mediaCapture;
        this.file = file;
        // Image Provider
        // This is the provider class for most of the image processing including uploading images to Firebase.
        // Take note that the default function here uploads the file in .jpg. If you plan to use other encoding types, make sure to
        // set the encodingType before uploading the image on Firebase.
        // Example for .png:
        // data:image/jpeg;base64 -> data:image/png;base64
        // generateFilename to return .png
        this.profilePhotoOptions = {
            quality: 50,
            targetWidth: 384,
            targetHeight: 384,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            correctOrientation: true
        };
        this.photoMessageOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            correctOrientation: true
        };
        this.groupPhotoOptions = {
            quality: 50,
            targetWidth: 384,
            targetHeight: 384,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            correctOrientation: true
        };
        console.log("Initializing Image Provider");
    }
    // Function to convert dataURI to Blob needed by Firebase
    ImageProvider.prototype.imgURItoBlob = function (dataURI) {
        var binary = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var array = [];
        for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {
            type: mimeString
        });
    };
    // Generate a random filename of length for the image to be uploaded
    ImageProvider.prototype.generateFilename = function () {
        var length = 8;
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text + ".jpg";
    };
    // Set ProfilePhoto given the user and the cameraSourceType.
    // This function processes the imageURI returned and uploads the file on Firebase,
    // Finally the user data on the database is updated.
    ImageProvider.prototype.setProfilePhoto = function (user, sourceType) {
        var _this = this;
        this.profilePhotoOptions.sourceType = sourceType;
        this.loadingProvider.show();
        // Get picture from camera or gallery.
        this.camera.getPicture(this.profilePhotoOptions).then(function (imageData) {
            // Process the returned imageURI.
            var imgBlob = _this.imgURItoBlob("data:image/jpeg;base64," + imageData);
            var metadata = {
                'contentType': imgBlob.type
            };
            // Generate filename and upload to Firebase Storage.
            __WEBPACK_IMPORTED_MODULE_4_firebase__["storage"]().ref().child('images/' + user.userId + '/' + _this.generateFilename()).put(imgBlob, metadata).then(function (snapshot) {
                // Delete previous profile photo on Storage if it exists.
                _this.deleteImageFile(user.img);
                // URL of the uploaded image!
                var url = snapshot.metadata.downloadURLs[0];
                var profile = {
                    displayName: user.name,
                    photoURL: url
                };
                // Update Firebase User.
                __WEBPACK_IMPORTED_MODULE_4_firebase__["auth"]().currentUser.updateProfile(profile)
                    .then(function (success) {
                    // Update User Data on Database.
                    _this.angularfire.object('/accounts/' + user.userId).update({
                        img: url
                    }).then(function (success) {
                        _this.loadingProvider.hide();
                        _this.alertProvider.showProfileUpdatedMessage();
                    }).catch(function (error) {
                        _this.loadingProvider.hide();
                        _this.alertProvider.showErrorMessage('profile/error-change-photo');
                    });
                })
                    .catch(function (error) {
                    _this.loadingProvider.hide();
                    _this.alertProvider.showErrorMessage('profile/error-change-photo');
                });
            }).catch(function (error) {
                _this.loadingProvider.hide();
                _this.alertProvider.showErrorMessage('image/error-image-upload');
            });
        }).catch(function (error) {
            _this.loadingProvider.hide();
        });
    };
    // Upload and set the group object's image.
    ImageProvider.prototype.setGroupPhoto = function (group, sourceType) {
        var _this = this;
        this.groupPhotoOptions.sourceType = sourceType;
        this.loadingProvider.show();
        // Get picture from camera or gallery.
        this.camera.getPicture(this.groupPhotoOptions).then(function (imageData) {
            // Process the returned imageURI.
            var imgBlob = _this.imgURItoBlob("data:image/jpeg;base64," + imageData);
            var metadata = {
                'contentType': imgBlob.type
            };
            __WEBPACK_IMPORTED_MODULE_4_firebase__["storage"]().ref().child('images/' + __WEBPACK_IMPORTED_MODULE_4_firebase__["auth"]().currentUser.uid + '/' + _this.generateFilename()).put(imgBlob, metadata).then(function (snapshot) {
                _this.deleteImageFile(group.img);
                // URL of the uploaded image!
                var url = snapshot.metadata.downloadURLs[0];
                group.img = url;
                _this.loadingProvider.hide();
            }).catch(function (error) {
                _this.loadingProvider.hide();
                _this.alertProvider.showErrorMessage('image/error-image-upload');
            });
        }).catch(function (error) {
            _this.loadingProvider.hide();
        });
    };
    // Set group photo and return the group object as promise.
    ImageProvider.prototype.setGroupPhotoPromise = function (group, sourceType) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.groupPhotoOptions.sourceType = sourceType;
            _this.loadingProvider.show();
            // Get picture from camera or gallery.
            _this.camera.getPicture(_this.groupPhotoOptions).then(function (imageData) {
                // Process the returned imageURI.
                var imgBlob = _this.imgURItoBlob("data:image/jpeg;base64," + imageData);
                var metadata = {
                    'contentType': imgBlob.type
                };
                __WEBPACK_IMPORTED_MODULE_4_firebase__["storage"]().ref().child('images/' + __WEBPACK_IMPORTED_MODULE_4_firebase__["auth"]().currentUser.uid + '/' + _this.generateFilename()).put(imgBlob, metadata).then(function (snapshot) {
                    _this.deleteImageFile(group.img);
                    // URL of the uploaded image!
                    var url = snapshot.metadata.downloadURLs[0];
                    group.img = url;
                    _this.loadingProvider.hide();
                    resolve(group);
                }).catch(function (error) {
                    _this.loadingProvider.hide();
                    _this.alertProvider.showErrorMessage('image/error-image-upload');
                });
            }).catch(function (error) {
                _this.loadingProvider.hide();
            });
        });
    };
    //Delete the image given the url.
    ImageProvider.prototype.deleteImageFile = function (path) {
        var fileName = path.substring(path.lastIndexOf('%2F') + 3, path.lastIndexOf('?'));
        __WEBPACK_IMPORTED_MODULE_4_firebase__["storage"]().ref().child('images/' + __WEBPACK_IMPORTED_MODULE_4_firebase__["auth"]().currentUser.uid + '/' + fileName).delete().then(function () { }).catch(function (error) { });
    };
    //Delete the user.img given the user.
    ImageProvider.prototype.deleteUserImageFile = function (user) {
        var fileName = user.img.substring(user.img.lastIndexOf('%2F') + 3, user.img.lastIndexOf('?'));
        __WEBPACK_IMPORTED_MODULE_4_firebase__["storage"]().ref().child('images/' + user.userId + '/' + fileName).delete().then(function () { }).catch(function (error) { });
    };
    // Delete group image file on group storage reference.
    ImageProvider.prototype.deleteGroupImageFile = function (groupId, path) {
        var fileName = path.substring(path.lastIndexOf('%2F') + 3, path.lastIndexOf('?'));
        __WEBPACK_IMPORTED_MODULE_4_firebase__["storage"]().ref().child('images/' + groupId + '/' + fileName).delete().then(function () { }).catch(function (error) { });
    };
    // Upload photo message and return the url as promise.
    ImageProvider.prototype.uploadPhotoMessage = function (conversationId, sourceType) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.photoMessageOptions.sourceType = sourceType;
            _this.loadingProvider.show();
            // Get picture from camera or gallery.
            _this.camera.getPicture(_this.photoMessageOptions).then(function (imageData) {
                // Process the returned imageURI.
                var imgBlob = _this.imgURItoBlob("data:image/jpeg;base64," + imageData);
                var metadata = {
                    'contentType': imgBlob.type
                };
                // Generate filename and upload to Firebase Storage.
                __WEBPACK_IMPORTED_MODULE_4_firebase__["storage"]().ref().child('images/' + conversationId + '/' + _this.generateFilename()).put(imgBlob, metadata).then(function (snapshot) {
                    // URL of the uploaded image!
                    var url = snapshot.metadata.downloadURLs[0];
                    _this.loadingProvider.hide();
                    resolve(url);
                }).catch(function (error) {
                    _this.loadingProvider.hide();
                    _this.alertProvider.showErrorMessage('image/error-image-upload');
                });
            }).catch(function (error) {
                _this.loadingProvider.hide();
            });
        });
    };
    // Upload group photo message and return a promise as url.
    ImageProvider.prototype.uploadGroupPhotoMessage = function (groupId, sourceType) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.photoMessageOptions.sourceType = sourceType;
            _this.loadingProvider.show();
            // Get picture from camera or gallery.
            _this.camera.getPicture(_this.photoMessageOptions).then(function (imageData) {
                // Process the returned imageURI.
                var imgBlob = _this.imgURItoBlob("data:image/jpeg;base64," + imageData);
                var metadata = {
                    'contentType': imgBlob.type
                };
                // Generate filename and upload to Firebase Storage.
                __WEBPACK_IMPORTED_MODULE_4_firebase__["storage"]().ref().child('images/' + groupId + '/' + _this.generateFilename()).put(imgBlob, metadata).then(function (snapshot) {
                    // URL of the uploaded image!
                    var url = snapshot.metadata.downloadURLs[0];
                    _this.loadingProvider.hide();
                    resolve(url);
                }).catch(function (error) {
                    _this.loadingProvider.hide();
                    _this.alertProvider.showErrorMessage('image/error-image-upload');
                });
            }).catch(function (error) {
                _this.loadingProvider.hide();
            });
        });
    };
    ImageProvider.prototype.uploadGroupVideoMessage = function (groupId) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.loadingProvider.show();
            _this.mediaCapture.captureVideo().then(function (data) {
                var videoUrl = data[0].fullPath;
                console.log("video path: " + videoUrl);
                var x = videoUrl.split("/");
                var filepath = videoUrl.substring(0, videoUrl.lastIndexOf("/"));
                var name = x[x.length - 1];
                console.log(filepath + " - " + name);
                _this.file.readAsArrayBuffer(filepath, name).then(function (success) {
                    console.log(success);
                    var blob = new Blob([success], { type: "video/mp4" });
                    console.log(blob);
                    var timestamp = (Math.floor(Date.now() / 1000)).toString();
                    var storageRef = __WEBPACK_IMPORTED_MODULE_4_firebase__["storage"]().ref();
                    var upload = storageRef.child('videos/' + groupId + "/" + name).put(blob);
                    upload.on('state_changed', function (snapshot) {
                        var process = '1'; //modified
                        console.log(process);
                    }, function (err) {
                        _this.loadingProvider.hide();
                        console.log("error in uploading" + err);
                    }, function () {
                        _this.loadingProvider.hide();
                        resolve(upload.snapshot.downloadURL);
                    });
                });
            }, function (err) {
                _this.loadingProvider.hide();
                console.log("Media Err = " + err);
            });
        });
    };
    ImageProvider.prototype.uploadVideoMessage = function (conversationId) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.loadingProvider.show();
            _this.mediaCapture.captureVideo().then(function (data) {
                var videoUrl = data[0].fullPath;
                console.log("video path: " + videoUrl);
                var x = videoUrl.split("/");
                var filepath = videoUrl.substring(0, videoUrl.lastIndexOf("/"));
                var name = x[x.length - 1];
                console.log(filepath + " - " + name);
                _this.file.readAsArrayBuffer(filepath, name).then(function (success) {
                    console.log(success);
                    var blob = new Blob([success], { type: "video/mp4" });
                    console.log(blob);
                    var timestamp = (Math.floor(Date.now() / 1000)).toString();
                    var storageRef = __WEBPACK_IMPORTED_MODULE_4_firebase__["storage"]().ref();
                    var upload = storageRef.child('videos/' + name).put(blob);
                    upload.on('state_changed', function (snapshot) {
                        var process = '3'; // snapshot.bytesTransferred / snapshot.totalBytes * 100;
                        console.log(process);
                    }, function (err) {
                        _this.loadingProvider.hide();
                        console.log("error in uploading" + err);
                    }, function () {
                        _this.loadingProvider.hide();
                        resolve(upload.snapshot.downloadURL);
                    });
                });
            }, function (err) {
                _this.loadingProvider.hide();
                console.log("Media Err = " + err);
            });
        });
    };
    return ImageProvider;
}());
ImageProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1__alert_alert__["a" /* AlertProvider */], __WEBPACK_IMPORTED_MODULE_2__loading_loading__["a" /* LoadingProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_media_capture__["a" /* MediaCapture */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__["a" /* File */]])
], ImageProvider);

//# sourceMappingURL=image.js.map

/***/ }),

/***/ 683:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntroPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(272);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the IntroPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var IntroPage = (function () {
    function IntroPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    IntroPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad IntroPage');
    };
    IntroPage.prototype.goToHome = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    return IntroPage;
}());
IntroPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-intro',template:/*ion-inline-start:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/intro/intro.html"*/'<ion-slides pager="true">\n  <ion-slide>\n    <ion-row>\n      <ion-col class="header">\n        Plan your next getaway with friends.\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <img src="assets/images/slide1.png"/>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n         <button ion-button round outline color="light" (click)="goToHome()">Get Started with Nautical</button>\n      </ion-col>\n    </ion-row>\n  </ion-slide>\n \n  <ion-slide>\n    <ion-row>\n      <ion-col class="header">\n       Save money for important expenses.\n      </ion-col>\n    </ion-row>\n     <ion-row>\n      <ion-col>\n        <img src="assets/images/slide2.png"/>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n   <button ion-button round outline color="light" (click)="goToHome()">Get Started with Nautical</button>\n      </ion-col>\n    </ion-row>\n  </ion-slide>\n\n  <ion-slide>\n    <ion-row>\n      <ion-col class="header">\n        Make memories that will last a lifetime.\n      </ion-col>\n    </ion-row>\n     <ion-row>\n      <ion-col>\n        <img src="assets/images/slide3.png"/>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <button ion-button round outline color="light" (click)="goToHome()">Get Started with Nautical</button>\n      </ion-col>\n    </ion-row>\n  </ion-slide>\n'/*ion-inline-end:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/intro/intro.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */]])
], IntroPage);

//# sourceMappingURL=intro.js.map

/***/ }),

/***/ 687:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DateFormatPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DateFormatPipe = (function () {
    function DateFormatPipe() {
    }
    // DateFormatPipe
    // Show moment.js dateFormat for time elapsed.
    DateFormatPipe.prototype.transform = function (date, args) {
        return __WEBPACK_IMPORTED_MODULE_1_moment__().diff(date, 'hours');
    };
    return DateFormatPipe;
}());
DateFormatPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'DateFormat'
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], DateFormatPipe);

//# sourceMappingURL=date.js.map

/***/ }),

/***/ 688:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DayFormatPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DayFormatPipe = (function () {
    function DayFormatPipe() {
    }
    // DateFormatPipe
    // Show moment.js dateFormat for time elapsed.
    DayFormatPipe.prototype.transform = function (date, args) {
        return __WEBPACK_IMPORTED_MODULE_1_moment__(date).format('dddd MMMM Do,YYYY');
    };
    return DayFormatPipe;
}());
DayFormatPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'DayFormat'
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], DayFormatPipe);

//# sourceMappingURL=day.js.map

/***/ }),

/***/ 689:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConversationPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ConversationPipe = (function () {
    function ConversationPipe() {
    }
    // ConversationPipe
    // Filter conversation based on friend's name or username.
    ConversationPipe.prototype.transform = function (conversations, search) {
        if (!conversations) {
            return;
        }
        else if (!search) {
            return conversations;
        }
        else {
            var term_1 = search.toLowerCase();
            return conversations.filter(function (conversation) { return conversation.friend.name.toLowerCase().indexOf(term_1) > -1 || conversation.friend.username.toLowerCase().indexOf(term_1) > -1 || conversation.name.toLowerCase().indexOf(term_1) > -1; });
        }
    };
    return ConversationPipe;
}());
ConversationPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'conversationFilter'
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], ConversationPipe);

//# sourceMappingURL=conversation.js.map

/***/ }),

/***/ 695:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AgendaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__add_event_add_event__ = __webpack_require__(177);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the AgendaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AgendaPage = (function () {
    function AgendaPage(navCtrl, navParams, ref, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ref = ref;
        this.modalCtrl = modalCtrl;
        this.showToolbar = false;
        this.headerImgSize = '100%';
        this.headerImgUrl = '';
        this.transition = false;
        this.trip = this.navParams.get('trip');
        var temp = __WEBPACK_IMPORTED_MODULE_2_moment__(this.trip.start);
        var Temp = __WEBPACK_IMPORTED_MODULE_2_moment__(this.trip.end);
        var month = temp.format('M');
        var Month = Temp.format('M');
        if (month == Month) {
            this.trip.header = __WEBPACK_IMPORTED_MODULE_2_moment__(this.trip.start).format("MMM DD") + ' - ' + __WEBPACK_IMPORTED_MODULE_2_moment__(this.trip.end).format("DD");
        }
        else {
            if (month != Month) {
                this.trip.header = __WEBPACK_IMPORTED_MODULE_2_moment__(this.trip.start).format("MMM DD") + ' - ' + __WEBPACK_IMPORTED_MODULE_2_moment__(this.trip.end).format("MMM DD");
            }
        }
    }
    AgendaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AgendaPage');
    };
    AgendaPage.prototype.onScroll = function ($event) {
        var scrollTop = $event.scrollTop;
        this.showToolbar = scrollTop >= 120;
        if (scrollTop < 0) {
            this.transition = false;
            this.headerImgSize = Math.abs(scrollTop) / 2 + 100 + "%";
        }
        else {
            this.transition = true;
            this.headerImgSize = '100%';
        }
        this.ref.detectChanges();
    };
    AgendaPage.prototype.addEvent = function () {
        var eventModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__add_event_add_event__["a" /* AddEventPage */]);
        eventModal.present();
    };
    return AgendaPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Content */])
], AgendaPage.prototype, "content", void 0);
AgendaPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-agenda',template:/*ion-inline-start:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/agenda/agenda.html"*/'<!--\n  Generated template for the AgendaPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header  [hidden]="!showToolbar">\n  \n    <ion-navbar [class.show-background]="showToolbar">\n        <ion-buttons start>\n            <button ion-button tappable (click)="menu()"><ion-icon color=\'light\' class=\'menuButton\' name="md-menu" item-right></ion-icon></button>\n          </ion-buttons>\n          <ion-buttons start>\n              <button class=\'profileTxt\' ion-button>Agenda</button>\n            </ion-buttons>\n            <ion-buttons end>\n                <button ion-button tappable (click)="menu()"><ion-icon color=\'light\' class=\'menuButton\' name="ios-more-outline" item-right></ion-icon></button>\n              </ion-buttons>\n    </ion-navbar>\n  \n  </ion-header>\n  <ion-header  [hidden]="showToolbar">\n    \n      <ion-navbar class=\'tool\'>\n         <ion-buttons start>\n          <button ion-button tappable (click)="menu()"><ion-icon color=\'light\' class=\'menuButton\' name="md-menu" item-right></ion-icon></button>\n        </ion-buttons>\n        <ion-buttons start>\n            <button class=\'profileTxt\' ion-button>Agenda</button>\n          </ion-buttons>\n          <ion-buttons end>\n              <button ion-button tappable (click)="menu()"><ion-icon color=\'light\' class=\'menuButton\' name="ios-more-outline" item-right></ion-icon></button>\n            </ion-buttons>\n          \n       \n      </ion-navbar>\n    \n    </ion-header>\n\n\n    <ion-content class="content"\n    (ionScroll)="onScroll($event)"\n    [class.transition]="transition">\n    <div>\n        <div class=\'img\' tappable (click)=\'addEvent()\'>\n            <ion-icon color=\'white\' name=\'md-add\'>\n            </ion-icon>\n            \n            </div>\n    <div class=\'wrapper\'> \n        <div class=\'bg\'>\n            \n          <div class=\'wrapper2\'>\n              <ion-grid class=\'halfway\'>\n                  <ion-row>\n                      <ion-col>\n                          <button ion-button clear color=\'light\' icon-only>\n                              <ion-icon name="ios-arrow-back-outline"></ion-icon>\n                            </button>\n                      </ion-col>\n                      <ion-col>\n                          <h1 class=\'profileName\'>{{trip.location}}</h1>\n                      </ion-col>\n                      <ion-col>\n                          <button clear ion-button color=\'light\' icon-only>\n                              <ion-icon name="ios-arrow-forward-outline"></ion-icon>\n                            </button>\n                      </ion-col>\n                    </ion-row>\n                  <ion-row>\n                    <ion-col>\n                        <p class=\'userName\'>{{trip.header}}</p>\n                    </ion-col>\n                  </ion-row>\n                </ion-grid>\n             <!-- <h1 class=\'profileName\'>{{trip.location}}</h1>\n              <p class=\'userName\'>{{trip.header}}</p>-->\n             <!-- <div class=\'profImage\'>\n                </div>-->\n           \n          </div>\n        <img class=\'bgImg\' src=\'{{trip.img}}\'/>\n      </div>\n      </div>\n      <ion-list no-lines inset class=\'list\'>\n        <ion-item>\n          <h4>No events to display at this time.</h4>\n        </ion-item>\n        <ion-item>\n          <div class=\'timeLine\' item-left>\n          </div>\n        </ion-item>\n        <ion-item>\n          </ion-item>\n      </ion-list>\n          \n    </div>\n  \n    </ion-content>\n'/*ion-inline-end:"/Users/karlhenderson/Documents/GitHub/NauticalV1/src/pages/agenda/agenda.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ModalController */]])
], AgendaPage);

//# sourceMappingURL=agenda.js.map

/***/ }),

/***/ 696:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Date2FormatPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var Date2FormatPipe = (function () {
    function Date2FormatPipe() {
    }
    // DateFormatPipe
    // Show moment.js dateFormat for time elapsed.
    Date2FormatPipe.prototype.transform = function (date, args) {
        return __WEBPACK_IMPORTED_MODULE_1_moment__(new Date(date)).fromNow();
    };
    return Date2FormatPipe;
}());
Date2FormatPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'Date2Format'
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], Date2FormatPipe);

//# sourceMappingURL=date2.js.map

/***/ }),

/***/ 697:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FriendPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FriendPipe = (function () {
    function FriendPipe() {
    }
    // FriendPipe
    // Filter friend by name or username.
    FriendPipe.prototype.transform = function (friends, search) {
        if (!friends) {
            return;
        }
        else if (!search) {
            return friends;
        }
        else {
            var term_1 = search.toLowerCase();
            return friends.filter(function (friend) { return friend.name.toLowerCase().indexOf(term_1) > -1 || friend.username.toLowerCase().indexOf(term_1) > -1; });
        }
    };
    return FriendPipe;
}());
FriendPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'friendFilter'
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], FriendPipe);

//# sourceMappingURL=friend.js.map

/***/ }),

/***/ 698:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SearchPipe = (function () {
    function SearchPipe() {
    }
    // SearchPipe
    // Filter user search results for name or username excluding the excludedIds.
    SearchPipe.prototype.transform = function (accounts, data) {
        var excludedIds = data[0];
        var term = data[1];
        if (!accounts) {
            return;
        }
        else if (!excludedIds) {
            return accounts;
        }
        else if (excludedIds && !term) {
            return accounts.filter(function (account) { return excludedIds.indexOf(account.userId) == -1; });
        }
        else {
            term = term.toLowerCase();
            return accounts.filter(function (account) { return excludedIds.indexOf(account.userId) == -1 && (account.name.toLowerCase().indexOf(term) > -1 || account.username.toLowerCase().indexOf(term) > -1); });
        }
    };
    return SearchPipe;
}());
SearchPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'searchFilter'
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], SearchPipe);

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 699:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagesPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var MessagesPipe = (function () {
    function MessagesPipe() {
    }
    // MessagesPipe
    // Filter messages by name
    MessagesPipe.prototype.transform = function (messages, search) {
        if (!messages) {
            return;
        }
        else if (!search) {
            return messages;
        }
        else {
            var term_1 = search.toLowerCase();
            return messages.filter(function (message) { return message.friend.name.toLowerCase().indexOf(term_1) > -1 || message.friend.username.toLowerCase().indexOf(term_1) > -1 || message.name.toLowerCase().indexOf(term_1) > -1; });
        }
    };
    return MessagesPipe;
}());
MessagesPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'messageFilter'
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], MessagesPipe);

//# sourceMappingURL=messages.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Validator; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__(19);
// Validators
// This file contains all your validators for the formGroups and for inputPrompts.
// Patterns can be tested by using a RegEx validator such as http://www.regexpal.com, https://regex101.com, among others.

var Validator;
(function (Validator) {
    // Set your validators here, don't forget to import and use them in the appropriate class that uses formGroups.
    // In this example, they are used on LoginPage where a formGroup for email and passwords is used.
    Validator.emailValidator = ['', [
            __WEBPACK_IMPORTED_MODULE_0__angular_forms__["Validators"].minLength(5),
            __WEBPACK_IMPORTED_MODULE_0__angular_forms__["Validators"].required,
            __WEBPACK_IMPORTED_MODULE_0__angular_forms__["Validators"].pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')
        ]
    ];
    Validator.passwordValidator = ['', [
            __WEBPACK_IMPORTED_MODULE_0__angular_forms__["Validators"].minLength(5),
            __WEBPACK_IMPORTED_MODULE_0__angular_forms__["Validators"].required,
            __WEBPACK_IMPORTED_MODULE_0__angular_forms__["Validators"].pattern('^[a-zA-Z0-9!@#$%^&*()_+-=]*$')
        ]
    ];
    // Set your prompt input validators here, don't forget to import and use them on the AlertController prompt.
    // In this example they are used by home.ts where the user are allowed to change their profile.
    // errorMessages are used by the AlertProvider class and is imported inside AlertProvider.errorMessages which is used by showErrorMessage().
    Validator.profileNameValidator = {
        minLength: 5,
        lengthError: { title: 'Name Too Short!', subTitle: 'Sorry, but name must be more than 4 characters.' },
        pattern: /^[a-zA-Z0-9\s]*$/g,
        patternError: { title: 'Invalid Name!', subTitle: 'Sorry, but the name you entered contains special characters.' }
    };
    Validator.profileEmailValidator = {
        pattern: /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/g,
        patternError: { title: 'Invalid Email Address!', subTitle: 'Sorry, but the email you have entered is invalid.' }
    };
    Validator.profilePasswordValidator = {
        minLength: 5,
        lengthError: { title: 'Password Too Short!', subTitle: 'Sorry, but password must be more than 4 characters.' },
        pattern: /^[a-zA-Z0-9!@#$%^&*()_+-=]*$/g,
        patternError: { title: 'Invalid Password!', subTitle: 'Sorry, but the password you have entered contains special characters.' }
    };
    // Group Form Validators
    Validator.groupNameValidator = ['', [__WEBPACK_IMPORTED_MODULE_0__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["Validators"].minLength(1)]];
    Validator.groupDescriptionValidator = ['', [__WEBPACK_IMPORTED_MODULE_0__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_0__angular_forms__["Validators"].minLength(1)]];
})(Validator || (Validator = {}));
//# sourceMappingURL=validator.js.map

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogoutProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loading_loading__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_data__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LogoutProvider = (function () {
    // Logout Provider
    // This is the provider class for logging out.
    // Before logout function can be used it's important to set the app to the Provider
    // by calling setApp(app) in the constructor of the controller that needs the logout functionality.
    function LogoutProvider(app, loadingProvider, dataProvider) {
        this.app = app;
        this.loadingProvider = loadingProvider;
        this.dataProvider = dataProvider;
        console.log("Initializing Logout Provider");
    }
    // Hooks the app to this provider, this is needed to clear the navigation views when logging out.
    LogoutProvider.prototype.setApp = function (app) {
        this.app = app;
    };
    // Logs the user out on Firebase, and clear navigation stacks.
    // It's important to call setApp(app) on the constructor of the controller that calls this function.
    LogoutProvider.prototype.logout = function () {
        var _this = this;
        this.loadingProvider.show();
        // Sign the user out on Firebase
        __WEBPACK_IMPORTED_MODULE_4_firebase__["auth"]().signOut().then(function (success) {
            // Clear navigation stacks
            _this.app.getRootNav().popToRoot().then(function () {
                _this.loadingProvider.hide();
                // Restart the entire app
                document.location.href = 'index.html';
            });
        });
    };
    return LogoutProvider;
}());
LogoutProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */], __WEBPACK_IMPORTED_MODULE_2__loading_loading__["a" /* LoadingProvider */], __WEBPACK_IMPORTED_MODULE_3__data_data__["a" /* DataProvider */]])
], LogoutProvider);

//# sourceMappingURL=logout.js.map

/***/ })

},[476]);
//# sourceMappingURL=main.js.map