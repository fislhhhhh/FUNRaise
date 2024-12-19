import {  query, orderBy, limit,getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";



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


// Fungsi untuk Menghitung Total Donasi
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false, // Format 24 jam
    };
    return date.toLocaleString("id-ID", options); // Format lokal Indonesia
}
async function calculateTotalDonations(uid) {
    try {
        const userDonationsRef = collection(db, `users/${uid}/donations`);
        const querySnapshot = await getDocs(userDonationsRef);

        let totalDonations = 0;
        let donateTimes = 0;
        let dofun = 0;

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log("Data fetched:", data); // Debugging
            if (data.donationAmount) {
                totalDonations += parseFloat(data.donationAmount);
                donateTimes+=1;
            }
            if (data.paymentMethod === "DofunCoin"){
                dofun+=1;
            }
        });

        const donTimeElement = document.getElementById("donTimes");
        if (donTimeElement) {
            donTimeElement.textContent = `${donateTimes}`;
        }
        const donAvgElement = document.getElementById("donAvg");
        if (donAvgElement) {
            donAvgElement.textContent = `${totalDonations/donateTimes}`;
        }
        // Update elemen portValue
        const portValueElement = document.getElementById("donValue");
        if (portValueElement) {
            portValueElement.textContent = `Rp${totalDonations.toLocaleString("id-ID")}`;
        }
        const dofunElement = document.getElementById("doFun");
        if (dofunElement) {
            dofunElement.textContent = `${dofun}`;
        }
        console.log(`Total donations: Rp${totalDonations}`);
    } catch (error) {
        console.error("Error fetching donations:", error);
    }
}

async function getLastDonationAndUpdate(uid) {
    try {
        // Query untuk mendapatkan dokumen terakhir berdasarkan timestamp
        const userDonationsRef = collection(db, `users/${uid}/donations`);
        const lastDonationQuery = query(userDonationsRef, orderBy("timestamp", "desc"), limit(1));

        const querySnapshot = await getDocs(lastDonationQuery);

        if (!querySnapshot.empty) {
            const lastDoc = querySnapshot.docs[0]; // Dokumen terakhir
            const lastData = lastDoc.data(); // Data dari dokumen terakhir

            console.log("Last donation data:", lastData);

            // Update elemen HTML dengan data dari dokumen terakhir
            document.getElementById("donName").textContent = lastData.donorName || "N/A";
            document.getElementById("donAm").textContent = `Rp${lastData.donationAmount?.toLocaleString("id-ID") || "0"}`;
            document.getElementById("donMet").textContent = lastData.paymentMethod || "Unknown";
            document.getElementById("dlTime").textContent = formatTimestamp(lastData.timestamp) || "Unknown";
            document.getElementById("donPer").textContent = `+ Rp${lastData.donationAmount?.toLocaleString("id-ID") || "0"}`;

            return lastData;
        } else {
            console.warn("No donations found.");
            document.getElementById("donorName").textContent = "No data available";
            document.getElementById("donationAmount").textContent = "Rp0";
            document.getElementById("paymentMethod").textContent = "N/A";
            return null;
        }
    } catch (error) {
        console.error("Error fetching last donation:", error);
        document.getElementById("donorName").textContent = "Error fetching data";
        document.getElementById("donationAmount").textContent = "Error";
        document.getElementById("paymentMethod").textContent = "Error";
        return null;
    }
}

async function calculateTotalDepo(uid) {
    try {
        const userDonationsRef = collection(db, `users/${uid}/Deposito`);
        const querySnapshot = await getDocs(userDonationsRef);

        let totalDepo = 0;
        let depoTimes = 0;

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log("Data fetched:", data); // Debugging
            if (data.depoAmount) {
                totalDepo += parseFloat(data.depoAmount);
            }
        });

       let totalasss = totalDepo + totalDepo *0.03;
       let perctotal = totalDepo*0.03;
        const totalASS = document.getElementById("assetTotal");
        if (totalASS) {
            totalASS.textContent = `${totalasss.toLocaleString("id-ID") }`;
        }
        // Update elemen portValue
        const depoValueElement = document.getElementById("portValue");
        if (depoValueElement) {
            depoValueElement.textContent = `Rp${totalDepo.toLocaleString("id-ID")}`;
        }
        const doValueElement = document.getElementById("dofunValue");
        if (doValueElement) {
            doValueElement.textContent = `${perctotal.toLocaleString("id-ID") }`;
        }
        const investValueElement = document.getElementById("investTotal");
        if (investValueElement) {
            investValueElement.textContent = `Rp${totalDepo.toLocaleString("id-ID")}`;
        }
        const gainValueElement = document.getElementById("gain");
        if (gainValueElement) {
            gainValueElement.textContent = `+ Rp${perctotal.toLocaleString("id-ID")}`;
        }
        console.log(`Total donations: Rp${totalDonations}`);
    } catch (error) {
        console.error("Error fetching donations:", error);
    }
}
async function getLastDepoAndUpdate(uid) {
    try {
        // Query untuk mendapatkan dokumen terakhir berdasarkan timestamp
        const userDonationsRef = collection(db, `users/${uid}/Deposito`);
        const lastDonationQuery = query(userDonationsRef, orderBy("timestamp", "desc"), limit(1));

        const querySnapshot = await getDocs(lastDonationQuery);

        if (!querySnapshot.empty) {
            const lastDoc = querySnapshot.docs[0]; // Dokumen terakhir
            const lastData = lastDoc.data(); // Data dari dokumen terakhir

            console.log("Last donation data:", lastData);
            let pectlast = lastData.depoAmount *0.03;
            // Update elemen HTML dengan data dari dokumen terakhir
            document.getElementById("depoBank").textContent = lastData.depoMethod || "N/A";
            document.getElementById("depoAm").textContent = `Rp${lastData.depoAmount?.toLocaleString("id-ID") || "0"} `;
            document.getElementById("dpTime").textContent = formatTimestamp(lastData.timestamp) || "Unknown";
            document.getElementById("portPercent").textContent = `+ Rp${lastData.depoAmount?.toLocaleString("id-ID") || "0"} `;
            document.getElementById("dofunPercent").textContent = `+ ${pectlast?.toLocaleString("id-ID") || "0"} `;
           

            return lastData;
        } 
    } catch (error) {
        console.error("Error fetching last donation:", error);
        return null;
    }
}

// Event Listener Ketika Halaman Dimuat dan User Login
document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("User logged in:", user.uid);
            calculateTotalDonations(user.uid);
            calculateTotalDepo(user.uid);
            getLastDonationAndUpdate(user.uid);
            getLastDepoAndUpdate(user.uid);
        } else {
            console.warn("No user logged in.");
            document.getElementById("portValue").textContent = "Please log in to see donations.";
        }
    });
});
