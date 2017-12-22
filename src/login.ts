import { TabsPage } from './pages/tabs/tabs';
import { VerificationPage } from './pages/verification/verification';

export namespace Login {
  // replace with your key
  export const firebaseConfig = {
  apiKey: "AIzaSyDSi0_SLp_7bXS-sIVVygO331d_T_LMzQ4",
    authDomain: "nautical-549b8.firebaseapp.com",
    databaseURL: "https://nautical-549b8.firebaseio.com",
    projectId: "nautical-549b8",
    storageBucket: "nautical-549b8.appspot.com",
    messagingSenderId: "459609963569"
  };
  export const facebookAppId: string = "128706657699939";
  export const googleClientId: string = "978363958341-3ubj5f0qo6qcj2dtbbq7a5utt1ijp45j.apps.googleusercontent.com";
  export const homePage = TabsPage;
  export const verificationPage = VerificationPage;
  export const emailVerification: boolean = true;
}



