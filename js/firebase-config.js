/* =========================================================
   CWS CODELAB
   FIREBASE CONFIGURATION

   Firebase Project:
   cws-codelab

   Provides:
   - Firebase App
   - Authentication
   - Cloud Firestore
   - Analytics

   IMPORTANT:
   Firebase web configuration is not a server-side secret.

   Never place the following in frontend code:
   - GitHub Client Secret
   - Apple private keys
   - Firebase service-account private keys
   - Payment secret keys
========================================================= */


/* =========================================================
   FIREBASE APP
========================================================= */

import {
    initializeApp
} from
    "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";


/* =========================================================
   FIREBASE AUTHENTICATION
========================================================= */

import {
    getAuth
} from
    "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";


/* =========================================================
   CLOUD FIRESTORE
========================================================= */

import {
    getFirestore
} from
    "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


/* =========================================================
   FIREBASE ANALYTICS

   Analytics is optional and is initialized only when
   supported by the current browser.
========================================================= */

import {
    getAnalytics,
    isSupported
} from
    "https://www.gstatic.com/firebasejs/12.18.0/firebase-analytics.js";


/* =========================================================
   FIREBASE PROJECT CONFIGURATION
========================================================= */

const firebaseConfig = {

    apiKey:
        "AIzaSyDTeS57epXo0Z-4g94iXnLSsfBFJUnJmGg",

    authDomain:
        "cws-codelab.firebaseapp.com",

    projectId:
        "cws-codelab",

    storageBucket:
        "cws-codelab.firebasestorage.app",

    messagingSenderId:
        "304619370407",

    appId:
        "1:304619370407:web:8d3ad7a5ed6f6e02a6a882",

    measurementId:
        "G-Y8RCM15YM1"

};


/* =========================================================
   INITIALIZE FIREBASE
========================================================= */

const app =
    initializeApp(
        firebaseConfig
    );


/* =========================================================
   INITIALIZE AUTHENTICATION
========================================================= */

const auth =
    getAuth(
        app
    );


/* =========================================================
   INITIALIZE FIRESTORE
========================================================= */

const db =
    getFirestore(
        app
    );


/* =========================================================
   INITIALIZE ANALYTICS SAFELY

   Analytics may be unavailable in:
   - Some privacy-focused browsers
   - Blocked environments
   - Browsers where required APIs are unavailable

   Authentication and Firestore should still work if
   Analytics cannot initialize.
========================================================= */

let analytics =
    null;


isSupported()
    .then(
        supported => {


            if (!supported) {


                console.info(
                    "CWS CodeLab: Firebase Analytics is not supported in this browser."
                );


                return;


            }


            analytics =
                getAnalytics(
                    app
                );


            console.log(
                "CWS CodeLab: Firebase Analytics initialized."
            );


        }
    )
    .catch(
        error => {


            console.warn(
                "CWS CodeLab: Firebase Analytics could not initialize.",
                error
            );


        }
    );


/* =========================================================
   INITIALIZATION STATUS
========================================================= */

console.log(
    "CWS CodeLab Firebase initialized successfully."
);


console.log(
    `Firebase project: ${firebaseConfig.projectId}`
);


/* =========================================================
   EXPORTS

   Other CodeLab modules can now use:

   import {
       auth,
       db
   } from "./firebase-config.js";
========================================================= */

export {

    app,

    auth,

    db,

    analytics,

    firebaseConfig

};
