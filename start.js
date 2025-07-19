let menuBtn = document.querySelector("#menu-btn");
let cerrarBtn = document.getElementById("cerrarbtn");
let navbar = document.querySelector(".menu");

cerrarBtn.onclick = function() {
  if (navbar.classList.contains("active")) {
    // Animación de salida
    navbar.classList.add("closing");
    setTimeout(() => {
      navbar.classList.remove("active", "closing");
    }, 400); // duración del slideUp
  } else {
    navbar.classList.add("active");
  }
};
//BTN CLIC
cerrarBtn.addEventListener('click', function () {
  cerrarBtn.style.display = 'none';
  menuBtn.style.display = 'block';
  // Tab to edit
});
menuBtn.addEventListener('click', function () {
  cerrarBtn.style.display = 'block';
  menuBtn.style.display = 'none';
  // Tab to edit
});


menuBtn.onclick = function() {
  if (navbar.classList.contains("active")) {
    // Animación de salida
    navbar.classList.add("closing");
    setTimeout(() => {
      navbar.classList.remove("active", "closing");
    }, 400); // duración del slideUp
  } else {
    navbar.classList.add("active");
  }
};

// Manejo de los submenús
let dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(dropdown => {
  dropdown.addEventListener("click", function(e) {
    e.stopPropagation(); // Evita que el evento se propague
    this.classList.toggle("active");
  });
});

// Cerrar los submenús si se hace clic fuera de ellos
window.onclick = function(event) {
  if (!event.target.matches('.dropdown a') && !event.target.matches('#menu-btn')) {
    let dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove("active");
    });
  }
}













document.addEventListener('DOMContentLoaded', function () {
  const openBtn = document.getElementById('openSearch');
  const closeBtn = document.getElementById('closeSearch');
  const searchBar = document.getElementById('searchBar');

  openBtn.addEventListener('click', function () {
    searchBar.classList.add('active');
  });

  closeBtn.addEventListener('click', function () {
    searchBar.classList.remove('active');
  });

  document.addEventListener('click', function (e) {
    if (
      searchBar.classList.contains('active') &&
      !searchBar.contains(e.target) &&
      e.target !== openBtn
    ) {
      searchBar.classList.remove('active');
    }
  });
});
