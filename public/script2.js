import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, doc, setDoc, collection } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";


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
const db = getFirestore(app);
const auth = getAuth(app);

// Mendengarkan Status Login
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Logged in as:", user.uid);
    } else {
        console.log("No user is logged in");
    }
});

// Form Handling
const donationForm = document.querySelector(".donation-form");

donationForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Cegah reload halaman

    const donorName = document.getElementById("donor-name").value;
    const donationAmount = document.getElementById("donation-amount").value;
    const paymentMethod = document.getElementById("payment-method").value;

    const donationData = {
        donorName: donorName,
        donationAmount: parseFloat(donationAmount),
        paymentMethod: paymentMethod,
        timestamp: new Date().toISOString(),
    };

    try {
        if (!auth.currentUser) {
            alert("Please log in to make a donation.");
            return;
        }
      
        const userDonationsRef = collection(db, `users/${auth.currentUser.uid}/donations`);
        await setDoc(doc(userDonationsRef), donationData);
        alert("Donation recorded successfully!");
        donationForm.reset(); // Reset form
    } catch (error) {
        console.error("Error saving donation:", error);
        alert("Failed to save donation. Please try again.");
    }
});
