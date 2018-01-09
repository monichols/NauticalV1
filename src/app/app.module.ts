import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { VerificationPage } from '../pages/verification/verification';
import {IntroPage} from '../pages/intro/intro';
import { Login } from '../login';
import { GooglePlus } from '@ionic-native/google-plus';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { MessagePage } from '../pages/message/message';
import { SettingsPage } from '../pages/settings/settings';
import {AddTripPage} from '../pages/add-trip/add-trip';
import {AddEventPage} from '../pages/add-event/add-event';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginProvider } from '../providers/login/login';
import { LoadingProvider } from '../providers/loading/loading';
import { AlertProvider } from '../providers/alert/alert';
import { LogoutProvider } from '../providers/logout/logout';
import { DataProvider } from '../providers/data/data';
import { Camera } from '@ionic-native/camera';
import {Facebook} from '@ionic-native/facebook';
import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ImageProvider } from '../providers/image/image';
import { MediaCapture } from '@ionic-native/media-capture'
import { File } from '@ionic-native/file';
import { EmailComposer } from '@ionic-native/email-composer';
import { FeedbackPage } from '../pages/feedback/feedback';
import {AccountPage} from '../pages/account/account';
import {MessagesPage} from '../pages/messages/messages';
import {NewMessagePage} from '../pages/new-message/new-message';
import {NewGroupPage} from '../pages/new-group/new-group';
import { SocialSharing } from '@ionic-native/social-sharing';

//import { DatePicker } from '@ionic-native/date-picker';
import { ReactiveFormsModule } from '@angular/forms';
import { DateFormatPipe } from '../pipes/date';
import { DayFormatPipe } from '../pipes/day';
import {ConversationPipe} from '../pipes/conversation';
import {AddMembersPage} from '../pages/add-members/add-members';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from "ng2-currency-mask/src/currency-mask.config";
import {UserInfoPage} from '../pages/user-info/user-info';
import { CalendarModule } from "ion2-calendar";
import {AgendaPage} from '../pages/agenda/agenda';
import {Date2FormatPipe} from '../pipes/date2';
import { FriendPipe } from '../pipes/friend';
import { SearchPipe } from '../pipes/search';
import { MessagesPipe } from '../pipes/messages';
import { Geolocation } from '@ionic-native/geolocation';
//import { Camera } from '@ionic-native/camera';
import { Keyboard } from '@ionic-native/keyboard';
import { Contacts } from '@ionic-native/contacts';
import{ImageModalPage} from'../pages/image-modal/image-modal';
import { FirebaseProvider } from '../providers/firebase/firebase';
<<<<<<< HEAD
import { OverviewPage } from '../pages/overview/overview';
=======
import { VirtualcardPage } from '../pages/virtualcard/virtualcard';
>>>>>>> 13e174e5e08359026723884d6d2a0a0a312513f1
firebase.initializeApp(Login.firebaseConfig);
export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
   align: "center",
   allowNegative: true,
   allowZero: true,
   decimal: ".",
   precision: 2,
   prefix: "$",
   suffix: "",
   thousands: ","
};


@NgModule({
  declarations: [
    MyApp,
    DayFormatPipe,
    AddTripPage,
    AddEventPage,
    HomePage,
    TabsPage,
    LoginPage,
    IntroPage,
    LoginPage,
    VerificationPage,
    SettingsPage,
    FeedbackPage,
    AccountPage,
    MessagesPage,
    DateFormatPipe,
    AddMembersPage,
    UserInfoPage,
    AgendaPage,
    ConversationPipe,
    Date2FormatPipe,
    NewMessagePage,
    FriendPipe,
    SearchPipe,
    MessagePage,
    NewGroupPage,
    ImageModalPage,
    MessagesPipe,
<<<<<<< HEAD
    OverviewPage
=======
    VirtualcardPage
>>>>>>> 13e174e5e08359026723884d6d2a0a0a312513f1
     
  ],
  imports: [
    CurrencyMaskModule,
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp,{
      scrollPadding: false,
      scrollAssist: true, 
      autoFocusAssist: false
    }),
    AngularFireModule.initializeApp(Login.firebaseConfig, 'ionic3chat'),
    SuperTabsModule.forRoot(),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    CalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddTripPage,
    MessagesPage,
    HomePage,
    TabsPage,
    IntroPage,
    LoginPage,
    VerificationPage,
    SettingsPage,
    FeedbackPage,
    AccountPage,
    AddMembersPage,
    UserInfoPage,
    AgendaPage,
    AddEventPage,
    NewMessagePage,
    MessagePage,
    NewGroupPage,
    ImageModalPage,
<<<<<<< HEAD
    OverviewPage
=======
    VirtualcardPage
>>>>>>> 13e174e5e08359026723884d6d2a0a0a312513f1
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig},
    LoginProvider,
    LoadingProvider,
    AlertProvider,
    LogoutProvider,
    DataProvider,
    GooglePlus,
    Camera,
    Keyboard,
    Contacts,
    Facebook,
    ImageProvider,
    Camera,
    MediaCapture,
    File,
    EmailComposer,
    SocialSharing,
    DataProvider,
    LoadingProvider,
    Geolocation,
    FirebaseProvider,
    FirebaseProvider

  ]
})
export class AppModule {}
