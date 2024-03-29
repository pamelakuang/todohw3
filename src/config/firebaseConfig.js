import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyDqgyjGYytcKtxCyv6WapDR6Fj9fVGKsIk",
    authDomain: "hw3-cse316.firebaseapp.com",
    databaseURL: "https://hw3-cse316.firebaseio.com",
    projectId: "hw3-cse316",
    storageBucket: "hw3-cse316.appspot.com",
    messagingSenderId: "810127603439",
    appId: "1:810127603439:web:4f1ee1e4a91a8d604d0d1a",
    measurementId: "G-29HGR88V10"
    // apiKey: "AIzaSyCJxkqx-6PMJrZ7ACkrgbO55b5wmJdop1Y",
    // authDomain: "todo-rrf-316.firebaseapp.com",
    // databaseURL: "https://todo-rrf-316.firebaseio.com",
    // projectId: "todo-rrf-316",
    // storageBucket: "todo-rrf-316.appspot.com",
    // messagingSenderId: "892398996038",
    // appId: "1:892398996038:web:1fb9157fc6c5d266e01847",
    // measurementId: "G-TEGQB3MZ23"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;
