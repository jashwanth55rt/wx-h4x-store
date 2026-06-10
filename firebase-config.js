// WX H4X STORE - Firebase Configuration
// Phase 1: Firebase Architecture & Authentication

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase Services
const auth = firebase.auth();
const db = firebase.firestore();
const realtimeDb = firebase.database();
const storage = firebase.storage();
const analytics = firebase.analytics();

// Enable Firebase App Check (Production)
if (location.hostname !== 'localhost') {
  firebase.appCheck().activate('YOUR_APP_CHECK_KEY', { isTokenAutoRefreshEnabled: true });
}

// Firebase Security & Configuration
db.settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
});

// Enable offline persistence
db.enablePersistence().catch((err) => {
  if (err.code == 'failed-precondition') {
    console.log('Multiple tabs open, persistence can only be enabled in one tab at a a time.');
  } else if (err.code == 'unimplemented') {
    console.log('The current browser does not support all of the features required to enable persistence');
  }
});

// Export Firebase services
window.firebaseServices = {
  auth,
  db,
  realtimeDb,
  storage,
  analytics
};
