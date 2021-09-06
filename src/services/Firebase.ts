import {
  initializeApp,
  FirebaseApp as App,
  FirebaseOptions as Options
} from 'firebase/app';

export default class Firebase {
  public app: App;

  constructor(config: Options) {
    this.app = initializeApp(config);
  }
}
