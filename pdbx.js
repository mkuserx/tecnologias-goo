  document.addEventListener("DOMContentLoaded", function () {
    const botones = document.querySelectorAll(".btn-descarga");

    botones.forEach(btn => {
      const id = btn.getAttribute("data-id");
      const contador = document.querySelector(`.contador[data-id="${id}"]`);
      const ref = firebase.database().ref("descargas/" + id);

      ref.on("value", snapshot => {
        contador.innerText = snapshot.val() || 0;
      });

      btn.addEventListener("click", () => {
        ref.transaction(current => (current || 0) + 1);
      });
    });
  });
