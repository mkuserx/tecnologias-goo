  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  function observarTarjetas() {
    document.querySelectorAll('.homePost__block:not(.visible)').forEach(el => observer.observe(el));
  }

  observarTarjetas();

  let cargando = false;
  let siguienteUrl = document.getElementById("load-more-btn")?.getAttribute("href");

  window.addEventListener("scroll", () => {
    if (cargando || !siguienteUrl) return;

    const btn = document.getElementById("load-more-btn");
    const rect = btn.getBoundingClientRect();

    if (rect.top < window.innerHeight + 200) {
      cargando = true;

      fetch(siguienteUrl)
        .then(res => res.text())
        .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");

          const nuevosPosts = doc.querySelectorAll('#blog-posts-container .homePost__block');
          const nuevoBoton = doc.getElementById("load-more-btn");
          const contenedor = document.getElementById("blog-posts-container");

          nuevosPosts.forEach(post => contenedor.appendChild(post));
          observarTarjetas();

          // Actualizar la siguiente URL
          if (nuevoBoton) {
            siguienteUrl = nuevoBoton.getAttribute("href");
          } else {
            siguienteUrl = null;
            document.getElementById("load-more-container")?.remove();
          }

          cargando = false;
        }).catch(err => {
          console.error("Error al cargar más entradas:", err);
          cargando = false;
        });
    }
  });
