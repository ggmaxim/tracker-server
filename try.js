const admin = require("firebase-admin");
// The topic name can be optionally prefixed with "/topics/".
const topic = 'highScores';

const message = {
  notification: {
    title: "TITLE",
    text: "TEXT",
  },
  topic: "topic",
};

// const serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "<your database URL here>"
// });

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnU16iig5knUlYSNfPPmJE0vsx27cOqq4",
  authDomain: "tracker-74597.firebaseapp.com",
  projectId: "tracker-74597",
  storageBucket: "tracker-74597.appspot.com",
  messagingSenderId: "751773949592",
  appId: "1:751773949592:web:c87db415c5e2e3c323baed",
  measurementId: "G-LN8HTJ5P78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Send a message to devices subscribed to the provided topic.
admin.messaging().sendMulticast(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });