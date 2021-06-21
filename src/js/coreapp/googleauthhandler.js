import { AppFirebaseConfig } from './config/config-APPTARGET.js';

export class GoogleAuthHandler {
  constructor(onSignIn, onSignOut) {
    this.onSignIn = onSignIn;
    this.onSignOut = onSignOut;

    // Initialize Firebase, config defined elsewhere
    firebase.initializeApp(AppFirebaseConfig);
    
    // use only goog
    this.g_provider = new firebase.auth.GoogleAuthProvider();
    this.g_provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    this.g_provider.setCustomParameters({
      'login_hint': 'user@example.com'
    }); 

    // set a handler for when tokens are recieved
    firebase.auth().onAuthStateChanged(user=>{
        if (user) {
            this.FireOnSignInHandler(user);
        } else {
          // this can fire when there is no logged in user on load
            this.FireOnSignOutHandler();
        }
    });
  }

  // methods
  FireOnSignInHandler(oAuthUser) {
    if (this.onSignIn) {
      this.onSignIn(oAuthUser);
    }
  }

  FireOnSignOutHandler() {
    if (this.onSignOut) {
      this.onSignOut();
    }
  }

  SignInPopup() {
    firebase.auth().signInWithPopup(this.g_provider);
  }

  SignInRedirect() {
    firebase.auth().signInWithRedirect(this.g_provider);
  }

  SignOut() {
    firebase.auth().signOut();
  }
}

