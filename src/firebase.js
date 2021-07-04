import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqNrD_iSB7oUCkv32n0utiEYssy2i5TsM",
  authDomain: "test-chatapp-466d7.firebaseapp.com",
  projectId: "test-chatapp-466d7",
  storageBucket: "test-chatapp-466d7.appspot.com",
  messagingSenderId: "1050661143539",
  appId: "1:1050661143539:web:d10cc1a8a611e902778886"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = firebase.storage();
export const firestore = firebase.firestore();