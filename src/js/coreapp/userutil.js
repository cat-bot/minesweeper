export class UserUtil {
    constructor() {
      this.user = firebase.auth().currentUser;
    }
  
    get IsLoggedIn() {
      return this.user != null;
    }
  
    get User() {
      return this.user;
    }
  }