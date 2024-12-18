// JavaScript to make navbar transparent on scroll
document.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mengecek status login
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
const navbarLogin = document.getElementById("navbarlogout");
const navbarLogout = document.getElementById("navbarlogin");

// Mengatur tampilan elemen berdasarkan status login
if (isLoggedIn) {
  // Tampilkan elemen untuk pengguna yang sudah login
  navbarLogin.classList.add("hidden");
  navbarLogout.classList.remove("hidden");
} else {
  // Tampilkan elemen untuk pengguna yang belum login
  navbarLogin.classList.remove("hidden");
  navbarLogout.classList.add("hidden");
}