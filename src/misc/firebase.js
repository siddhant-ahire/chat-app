import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyDTAE9e5SCMK9Gfry1Ot-Q6KtOE7utE_SI",
    authDomain: "chat-web-app-6b977.firebaseapp.com",
    databaseURL: "https://chat-web-app-6b977.firebaseio.com",
    projectId: "chat-web-app-6b977",
    storageBucket: "chat-web-app-6b977.appspot.com",
    messagingSenderId: "361034204823",
    appId: "1:361034204823:web:8c9e2c1b6fd2422cf8cbd2"
  };

// eslint-disable-next-line no-unused-vars
const app = firebase.initializeApp(config);

export const auth = app.auth();
export const database = app.database();