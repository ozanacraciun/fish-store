import Rebase from 're-base';
import firebase from 'firebase';


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCJ9DR6NL70hy7bW1FLYKWIVOijGNjFZGM",
    authDomain: "catch-of-the-day-ozana.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-ozana.firebaseio.com",
    // projectId: "catch-of-the-day-ozana",
    // storageBucket: "catch-of-the-day-ozana.appspot.com",
    // messagingSenderId: "756806572627",
    // appId: "1:756806572627:web:a4dcbe954bf13466ef84a6",
    // measurementId: "G-GGHMB8MQ7N"
  });
const base = Rebase.createClass(firebaseApp.database());

export {firebaseApp};

export default base;