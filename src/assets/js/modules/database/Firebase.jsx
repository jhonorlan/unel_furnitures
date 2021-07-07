import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
	appId: process.env.REACT_APP_APP_ID,
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: "unelfrntr-358af.firebaseapp.com",
	projectId: "unelfrntr-358af",
	storageBucket: "unelfrntr-358af.appspot.com",
	messagingSenderId: "52473999798",
	measurementId: "G-K8L22NP7FE",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const database = firebase.database();

export default firebase;
