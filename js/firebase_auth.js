var firebaseConfig = {
    apiKey: "AIzaSyBitkDr3o8hJBh-lm5tZntwmKhTWiSPEpk",
    authDomain: "mein-sweeper-d5995.firebaseapp.com",
    projectId: "mein-sweeper-d5995",
    storageBucket: "mein-sweeper-d5995.appspot.com",
    messagingSenderId: "703933725685",
    appId: "1:703933725685:web:2eebce5b1d7a16efba7ebc"
};

// AUTH
class GoogleUser {
    constructor(user, token) {
      this.user = user;
      this.token = token;
    }

    get Token() {
      return this.token;
    }

    get User() {
      return this.user;
    }
}

class GoogleAuthHandler {
  constructor(onSignIn, onSignOut) {

    this.onSignIn = onSignIn;
    this.onSignOut = onSignOut;

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

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
    })
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

  GoogleSignInPopup() {
      firebase.auth().signInWithPopup(this.g_provider);
  }

  GoogleSignOut() {
      firebase.auth().signOut();
  }
}
