import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import {IntroPage} from '../pages/intro/intro';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { VirtualcardPage } from '../pages/virtualcard/virtualcard';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any = VirtualcardPage;
  //rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage) {
    platform.ready().then(() => {
      this.storage.get('introShown').then((result) => {
 
        if(result){
          this.rootPage = VirtualcardPage;
          //this.rootPage = LoginPage;
        } else {
          this.rootPage = VirtualcardPage;
          //this.rootPage = IntroPage;
          this.storage.set('introShown', true);
        }
 
        //this.loader.dismiss();
 
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
