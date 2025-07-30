
  // Observer para animaciones
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  // Aplicar a nuevas tarjetas
  function observarTarjetas() {
    document.querySelectorAll('.homePost__block:not(.visible)').forEach(el => observer.observe(el));
  }

  observarTarjetas(); // inicial

  // Scroll infinito
  let cargando = false;

  window.addEventListener("scroll", () => {
    const btn = document.getElementById("load-more-btn");
    if (!btn || cargando) return;

    const rect = btn.getBoundingClientRect();
    if (rect.top < window.innerHeight + 100) {
      cargando = true;
      const url = btn.getAttribute("href");

      fetch(url)
        .then(res => res.text())
        .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");

          // Extraer nuevos posts
          const nuevosPosts = doc.querySelectorAll('#blog-posts-container .homePost__block');
          const contenedor = document.getElementById("blog-posts-container");
          nuevosPosts.forEach(post => contenedor.appendChild(post));

          // Extraer nuevo botón
          const nuevoBoton = doc.getElementById("load-more-btn");
          if (nuevoBoton) {
            document.getElementById("load-more-container").innerHTML = "";
            document.getElementById("load-more-container").appendChild(nuevoBoton);
          } else {
            document.getElementById("load-more-container").remove(); // Si no hay más páginas
          }

          observarTarjetas(); // Activar animaciones
          cargando = false;
        });
    }
  });
