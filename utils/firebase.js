import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_API,
	authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
	projectId: process.env.NEXT_PUBLIC_PROJECTID,
	storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_SENDERID,
	appId: process.env.NEXT_PUBLIC_APPID,
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
export const db = firebaseApp.firestore();
