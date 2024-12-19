import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCyMp66UDY1H6DELyhZxo4DidzGB231g9Q",
    authDomain: "auth-funraise.firebaseapp.com",
    databaseURL: "https://auth-funraise-default-rtdb.firebaseio.com",
    projectId: "auth-funraise",
    storageBucket: "auth-funraise.firebasestorage.app",
    messagingSenderId: "49376417232",
    appId: "1:49376417232:web:fb2315061b0cf7881715d5"
  };
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let totalDon = 0;
const fstore = getFirestore(app);

// Function to save user data
async function saveDonation(userId, username, via, donasi, totalDonasi) {
  try {
    console.log("Saving data to Firestore:", { userId, username });
    await setDoc(
      doc(fstore, "users", userId), // Koleksi "users"
      { username: username },
      { Via: via },
      { Donasi: donasi },
      { Total : totalDonasi + donasi},  // Data yang disimpan
      { merge: true } // Tidak overwrite data lama jika ada
    );
    console.log("Data berhasil disimpan!");
  } catch (error) {
    console.error("Error menyimpan data:", error);
  }
}

// Handle registration
const submit = document.getElementById("submitDon");
submit.addEventListener('click', async function (event) {
  console.log("Submit button clicked");

  const auth = getAuth();
  const name = document.getElementById("donor-name").value;
  const donationAm = document.getElementById("donation-amount").value;
  const method = document.getElementById("payment-method").value;

totalDon = totalDon + donasi;
  try {
   
    const user = userCredential.user;

    console.log("Attempting to save user data...");
    await saveDonation(user.uid, username, method, donationAm,totalDon);

    alert("Donasi berhasil!");
    window.location.href = "homepage.html";
  } catch (error) {
    console.error("Error:", error.message);
    alert(error.message);
  }
});