/*
DEV: Monique Nichols
Product: Nautical
File: Tabs.Ts (tabs page)
Last Modified: 12/18/2017
*/
//Pages, Packages, and Provider imports.
import { Component, ViewChild } from '@angular/core';
import { SuperTabsModule, SuperTabsConfig, SuperTabs } from 'ionic2-super-tabs';
import { HomePage } from '../home/home';
import {AccountPage} from '../account/account';
import {MessagesPage} from '../messages/messages';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingProvider } from '../../providers/loading/loading';
import * as firebase from 'firebase';
//This page controls the tabs that appear at the bottom of the screen. This page
//serves as the home page in the event that a user is logged in.
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  //gets the tabs view in html
  @ViewChild(SuperTabs) superTabs: SuperTabs;
  private tab1Root = MessagesPage;//sets first root to messages
  private tab2Root = HomePage;//sets second root to home(trips page)
  private tab3Root = AccountPage;//sets third root to profile(account page)
  constructor(private angularfire:AngularFireDatabase, private loadingProvider: LoadingProvider) {
    this.createUserData();
  }
   ionViewDidLoad(){
    this.superTabs.showToolbar(false);//hides the tabs from view.
  }
    // Create userData on the database if it doesn't exist yet.
    createUserData() {
      firebase.database().ref('accounts/' + firebase.auth().currentUser.uid).once('value')
        .then((account) => {
          // No database data yet, create user data on database
          if (!account.val()) {
            this.loadingProvider.show();
            let user = firebase.auth().currentUser;
            var userId, name, provider, img, email;
            let providerData = user.providerData[0];
            userId = user.uid;
            // Get name from Firebase user.
            if (user.displayName || providerData.displayName) {
              name = user.displayName;
              name = providerData.displayName;
            } else {
              name = "App User";
            }
            // Set default username based on name and userId.
            let username = name.replace(/ /g, '') + userId.substring(0, 8);
            // Get provider from Firebase user.
            if (providerData.providerId == 'password') {
              provider = "Firebase";
            } else if (providerData.providerId == 'facebook.com') {
              provider = "Facebook";
            } else if (providerData.providerId == 'google.com') {
              provider = "Google";
            }
            // Get photoURL from Firebase user.
            if (user.photoURL || providerData.photoURL) {
              img = user.photoURL;
              img = providerData.photoURL;
            } else {
              img = "assets/images/profile.png";
            }
            // Get email from Firebase user.
            email = user.email;
            // Set default description.
            let description = "I'm Available for chat";
            // Insert data on our database using AngularFire.
            this.angularfire.object('/accounts/' + userId).set({
              userId: userId,
              name: name,
              username: username,
              provider: provider,
              img: img,
              email: email,
              description: description,
              dateCreated: new Date().toString()
            }).then(() => {
              this.loadingProvider.hide();
            });
          }
        });
    }

  
}
