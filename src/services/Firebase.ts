import firebase from 'firebase/app';
import 'firebase/auth';

export default class Firebase {
  private app: firebase.app.App;
  private auth: firebase.auth.Auth;

  constructor(config: Object) {
    this.app = firebase.initializeApp(config);
    this.auth = firebase.auth();
  }

  createUser(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  signIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  
  signOut() {
    return this.auth.signOut();
  }

  resetPassword(email: string) {
    return this.auth.sendPasswordResetEmail(email);
  }

  changePassword(password: string) {
    if (this.auth.currentUser) {
      return this.auth.currentUser.updatePassword(password);
    }

    return Promise.reject();
  }

  onAuthStateChange(listener: (user: unknown) => void) {
    return this.auth.onAuthStateChanged(listener);
  }
}
