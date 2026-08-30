/* CWS CodeLab Firebase client configuration.
 * Firebase web configuration identifies the public project; it is not a
 * server credential. Authorization still belongs in Firebase Auth,
 * Firestore Security Rules, App Check and trusted backend code.
 */

import { initializeApp, getApps, getApp } from
  "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getAuth } from
  "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import { getFirestore } from
  "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";
import { getAnalytics, isSupported, setAnalyticsCollectionEnabled } from
  "https://www.gstatic.com/firebasejs/12.18.0/firebase-analytics.js";

const firebaseConfig = Object.freeze({
  apiKey: "AIzaSyDTeS57epXo0Z-4g94iXnLSsfBFJUnJmGg",
  authDomain: "cws-codelab.firebaseapp.com",
  projectId: "cws-codelab",
  storageBucket: "cws-codelab.firebasestorage.app",
  messagingSenderId: "304619370407",
  appId: "1:304619370407:web:8d3ad7a5ed6f6e02a6a882",
  measurementId: "G-Y8RCM15YM1"
});

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
let analytics = null;

const ANALYTICS_CONSENT_KEY = "cws.analytics-consent";

async function initialiseAnalytics() {
  try {
    if (readAnalyticsConsent() === "granted" && await isSupported()) {
      analytics = getAnalytics(app);
      setAnalyticsCollectionEnabled(analytics, true);
    }
  } catch (error) {
    // Analytics must never prevent authentication or course access.
    console.info("CWS CodeLab analytics is unavailable in this browser.", error);
  }
}

void initialiseAnalytics();

window.addEventListener("cws:analytics-consent", async event => {
  if (event.detail === "granted") {
    await initialiseAnalytics();
    return;
  }

  if (analytics) {
    setAnalyticsCollectionEnabled(analytics, false);
  }
});

function readAnalyticsConsent() {
  try {
    return localStorage.getItem(ANALYTICS_CONSENT_KEY);
  } catch {
    return null;
  }
}

export { app, auth, db, analytics, firebaseConfig };
