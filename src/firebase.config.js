import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCxAsRRL51wSZ3IJ27hwDpGpyY1Jq3gP6E",

	authDomain: "goodreads-clone-350901.firebaseapp.com",

	projectId: "goodreads-clone-350901",

	storageBucket: "goodreads-clone-350901.appspot.com",

	messagingSenderId: "1010861772470",

	appId: "1:1010861772470:web:7dbfdf2e489ef746ad2017",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
