/* CWS CodeLab protected dashboard bootstrap.
 *
 * This module verifies the Firebase session, enforces email verification for
 * password accounts, reads only the signed-in learner's permitted documents
 * and hands presentation-safe data to dashboard.js.
 */

import { auth, db } from "./firebase-config.js";
import {
  onAuthStateChanged,
  reload,
  sendEmailVerification,
  signOut
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

const LOGIN_URL = new URL("../pages/login.html", import.meta.url);
const RESEND_COOLDOWN_MS = 60_000;

let activeUser = null;
let dashboard = null;
let resendAvailableAt = 0;
let loadingPromise = null;

void initialiseDashboardAccess();

async function initialiseDashboardAccess() {
  dashboard = await waitForDashboardController();
  bindAccountActions();
  dashboard.setLoading(true);

  onAuthStateChanged(auth, user => {
    if (!user) {
      redirectToLogin();
      return;
    }

    activeUser = user;
    loadingPromise = loadStudentDashboard(user);
  }, () => {
    showBlockingState(
      "We could not verify your sign-in",
      "Check your connection and sign in again. No account changes were made."
    );
  });
}

async function loadStudentDashboard(user) {
  dashboard.clearMessage();
  dashboard.setLoading(true);

  if (requiresEmailVerification(user)) {
    showVerificationState();
    return;
  }

  try {
    const profile = await getOrCreateStudentProfile(user);

    if (String(profile.accountStatus || "active").toLowerCase() !== "active") {
      showBlockingState(
        "This account is not active",
        "Contact CWS CodeLab support if you believe this account status is incorrect."
      );
      return;
    }

    const summary = await getDashboardSummary(user.uid);

    dashboard.setStudent({
      ...profile,
      displayName: profile.displayName || user.displayName || deriveName(user.email),
      email: user.email || profile.email || "",
      emailVerified: user.emailVerified === true
    });
    dashboard.setStats(normaliseSummary(summary));
    dashboard.setVerificationState({ required: false });
    dashboard.setLoading(false);
  } catch (error) {
    console.error("CWS CodeLab dashboard initialization failed.", error);
    showBlockingState(
      "Your dashboard could not be loaded",
      friendlyDashboardError(error)
    );
  }
}

async function getOrCreateStudentProfile(user) {
  const reference = doc(db, "users", user.uid);
  const snapshot = await getDoc(reference);

  if (snapshot.exists()) {
    return snapshot.data() || {};
  }

  const profile = {
    uid: user.uid,
    displayName: normaliseName(user.displayName || deriveName(user.email)),
    email: user.email || "",
    photoURL: user.photoURL || "",
    role: "student",
    plan: "free",
    accountStatus: "active",
    lastSignInProvider: getProviderName(user),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    lastLoginAt: serverTimestamp()
  };

  await setDoc(reference, profile);

  return {
    ...profile,
    createdAt: new Date()
  };
}

async function getDashboardSummary(userId) {
  const snapshot = await getDoc(doc(db, "users", userId, "dashboard", "summary"));
  return snapshot.exists() ? snapshot.data() || {} : {};
}

function normaliseSummary(value) {
  const summary = isPlainObject(value) ? value : {};
  const recentCourse = isPlainObject(summary.recentCourse)
    ? {
        label: shortText(summary.recentCourse.label, 60),
        title: shortText(summary.recentCourse.title, 160),
        description: shortText(summary.recentCourse.description, 320),
        href: safeDashboardHref(summary.recentCourse.href),
        progress: percentage(summary.recentCourse.progress)
      }
    : null;

  return {
    courses: nonNegativeInteger(summary.courses),
    progress: percentage(summary.progress),
    projects: nonNegativeInteger(summary.projects),
    certificates: nonNegativeInteger(summary.certificates),
    recentCourse
  };
}

function bindAccountActions() {
  document.getElementById("sign-out-button")?.addEventListener("click", signOutUser);
  document.getElementById("verification-signout-button")?.addEventListener("click", signOutUser);
  document.getElementById("verification-refresh-button")?.addEventListener("click", refreshVerification);
  document.getElementById("resend-verification-button")?.addEventListener("click", resendVerification);
}

async function signOutUser() {
  setActionButtonsDisabled(true);

  try {
    await signOut(auth);
  } catch (error) {
    console.error("CWS CodeLab sign-out failed.", error);
    dashboard.showMessage("Sign-out could not be completed. Please try again.", "error", 0);
    setActionButtonsDisabled(false);
  }
}

async function refreshVerification() {
  if (!activeUser) {
    redirectToLogin();
    return;
  }

  setActionButtonsDisabled(true);
  dashboard.setVerificationState({
    required: true,
    message: "Refreshing your verification status…"
  });

  try {
    await reload(activeUser);
    activeUser = auth.currentUser;

    if (activeUser?.emailVerified) {
      await loadStudentDashboard(activeUser);
      return;
    }

    dashboard.setVerificationState({
      required: true,
      message: "Your email is still unverified. Open the newest verification email, then refresh again."
    });
  } catch (error) {
    console.error("CWS CodeLab verification refresh failed.", error);
    dashboard.setVerificationState({
      required: true,
      message: "Verification status could not be refreshed. Check your connection and try again."
    });
  } finally {
    setActionButtonsDisabled(false);
  }
}

async function resendVerification() {
  if (!activeUser) {
    redirectToLogin();
    return;
  }

  const remaining = resendAvailableAt - Date.now();

  if (remaining > 0) {
    dashboard.setVerificationState({
      required: true,
      message: `Please wait ${Math.ceil(remaining / 1000)} seconds before requesting another email.`
    });
    return;
  }

  setActionButtonsDisabled(true);

  try {
    await sendEmailVerification(activeUser);
    resendAvailableAt = Date.now() + RESEND_COOLDOWN_MS;
    dashboard.setVerificationState({
      required: true,
      message: "A new verification email was sent. Check your inbox and spam folder before refreshing."
    });
  } catch (error) {
    console.error("CWS CodeLab verification email failed.", error);
    dashboard.setVerificationState({
      required: true,
      message: friendlyVerificationError(error)
    });
  } finally {
    setActionButtonsDisabled(false);
  }
}

function showVerificationState() {
  dashboard.setStudent({
    displayName: activeUser?.displayName || deriveName(activeUser?.email),
    email: activeUser?.email || "",
    plan: "free",
    accountStatus: "active",
    emailVerified: false
  });
  dashboard.setVerificationState({
    required: true,
    message: `We sent a verification link to ${activeUser?.email || "your email address"}. Verify it before opening your learner workspace.`
  });
  dashboard.setLoading(true);
}

function showBlockingState(title, description) {
  const titleElement = document.getElementById("dashboard-loading-title");
  const descriptionElement = document.getElementById("dashboard-loading-description");
  const loader = document.getElementById("dashboard-loader");
  const actions = document.getElementById("dashboard-loading-actions");

  if (titleElement) titleElement.textContent = title;
  if (descriptionElement) descriptionElement.textContent = description;
  if (loader) loader.hidden = true;
  if (actions) actions.hidden = false;
  document.getElementById("resend-verification-button")?.setAttribute("hidden", "");
  document.getElementById("verification-refresh-button")?.setAttribute("hidden", "");
  dashboard.setLoading(true);
}

function setActionButtonsDisabled(disabled) {
  [
    "sign-out-button",
    "resend-verification-button",
    "verification-refresh-button",
    "verification-signout-button"
  ].forEach(id => {
    const button = document.getElementById(id);
    if (button) button.disabled = Boolean(disabled);
  });
}

function requiresEmailVerification(user) {
  const providers = new Set((user.providerData || []).map(item => item?.providerId));
  return providers.has("password") && user.emailVerified !== true;
}

function getProviderName(user) {
  const providerId = user?.providerData?.[0]?.providerId || "password";

  return ({
    "password": "password",
    "google.com": "google",
    "github.com": "github",
    "apple.com": "apple"
  })[providerId] || "other";
}

function deriveName(email) {
  const localPart = String(email || "").split("@")[0];
  const words = localPart.replace(/[._-]+/g, " ").trim();
  return normaliseName(words || "Student");
}

function normaliseName(value) {
  return String(value || "Student").trim().replace(/\s+/g, " ").slice(0, 120) || "Student";
}

function shortText(value, limit) {
  return String(value || "").trim().slice(0, limit);
}

function nonNegativeInteger(value) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.max(0, Math.round(number)) : 0;
}

function percentage(value) {
  return Math.min(100, nonNegativeInteger(value));
}

function safeDashboardHref(value) {
  const fallback = "../pages/courses.html";
  const raw = String(value || "").trim();

  if (!raw || raw.startsWith("//") || /^[a-z][a-z\d+.-]*:/i.test(raw)) {
    return fallback;
  }

  try {
    const resolved = new URL(raw, window.location.href);
    return resolved.origin === window.location.origin
      ? `${resolved.pathname}${resolved.search}${resolved.hash}`
      : fallback;
  } catch {
    return fallback;
  }
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function friendlyDashboardError(error) {
  const code = String(error?.code || "").replace("firestore/", "");

  if (code === "permission-denied") {
    return "Your account does not currently have permission to read this learner record. Sign out and contact support if the problem continues.";
  }

  if (code === "unavailable") {
    return "The learning service is temporarily unavailable. Check your connection and try again.";
  }

  return "Try refreshing the page. If the problem continues, sign out and contact CWS CodeLab support.";
}

function friendlyVerificationError(error) {
  const code = String(error?.code || "").replace("auth/", "");

  if (code === "too-many-requests") {
    return "Too many verification requests were made. Wait a few minutes before trying again.";
  }

  if (code === "network-request-failed") {
    return "The verification email could not be sent because the network request failed.";
  }

  return "The verification email could not be sent. Wait a moment and try again.";
}

function redirectToLogin() {
  const target = new URL(LOGIN_URL.href);
  target.searchParams.set("redirect", "student/dashboard.html");
  window.location.replace(target.href);
}

function waitForDashboardController() {
  if (window.CWSDashboard) return Promise.resolve(window.CWSDashboard);

  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => {
      reject(new Error("Dashboard presentation controller did not initialize."));
    }, 5000);

    window.addEventListener("cws:dashboard-ready", () => {
      window.clearTimeout(timeout);
      resolve(window.CWSDashboard);
    }, { once: true });
  });
}

export { loadingPromise };
