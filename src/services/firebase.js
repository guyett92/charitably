import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDVyjvVOTQcm6LPer616RPO1VdUbWjeYGs",
    authDomain: "charitably-e3477.firebaseapp.com",
    databaseURL: "https://charitably-e3477.firebaseio.com",
    projectId: "charitably-e3477",
    storageBucket: "charitably-e3477.appspot.com",
    messagingSenderId: "573631215161",
    appId: "1:573631215161:web:92fe73f0bb55381048bfe8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Google oAuth provider
const provider = new firebase.auth.GoogleAuthProvider();

// Auth object initialization
const auth = firebase.auth();

// DB object initialization
const db = firebase.database();

// Login
function login() {
    auth.signInWithPopup(provider);
}

// Logout
function logout() {
    auth.signOut();
}

export { auth, db, login, logout };