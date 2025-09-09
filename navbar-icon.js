import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyChXYUhXG3GliFPb5vp736Hhp7Msllxj68",
  authDomain: "mlaab-city.firebaseapp.com",
  projectId: "mlaab-city",
  storageBucket: "mlaab-city.appspot.com",
  messagingSenderId: "910383180422",
  appId: "1:910383180422:web:3feb8fad61d2cab5917f07",
  measurementId: "G-YQ0016JLVH",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const accountIcon = document.getElementById("accountIcon");
const dropdownMenu = document.getElementById("dropdownMenu");
const dropdownWrapper = document.getElementById("dropdownWrapper");
const userName = document.getElementById("userName");
const userUsername = document.getElementById("userUsername");
const profilePic = document.getElementById("profilePic");
const settingsBtn = document.getElementById("settingsBtn");
const logoutBtn = document.getElementById("logoutBtn");
const loginBtn = document.getElementById("loginBtn");

accountIcon.addEventListener("click", () => {
  dropdownMenu.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!dropdownWrapper.contains(e.target)) {
    dropdownMenu.classList.remove("active");
  }
});

onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        userName.textContent = data.name || "User";
        userUsername.textContent = data.username ? "@" + data.username : "@unknown";
      } else {
        userName.textContent = "User";
        userUsername.textContent = "@unknown";
      }
      profilePic.src = user.photoURL || "img/personal.png";
      settingsBtn.disabled = false;
      logoutBtn.style.display = "block";
      loginBtn.style.display = "none";
    } catch (err) {
      console.error(err);
    }
  } else {
    userName.textContent = "Unknown";
    userUsername.textContent = "@guest";
    profilePic.src = "img/personal.png";
    settingsBtn.disabled = true;
    logoutBtn.style.display = "none";
    loginBtn.style.display = "block";
  }
});

settingsBtn.addEventListener("click", () => {
  if (!settingsBtn.disabled) {
    window.location.href = "settings.html";
  }
});

logoutBtn.addEventListener("click", () => {
  signOut(auth);
});

loginBtn.addEventListener("click", () => {
  window.location.href = "index12.html";
});
