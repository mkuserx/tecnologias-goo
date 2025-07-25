
  document.addEventListener("DOMContentLoaded", function () {
    const btn = document.querySelector(".btn-descarga");
    const contador = document.getElementById("contador");

    if (btn && contador) {
      const postID = location.pathname.replace(/\W+/g, "_");
      const ref = db.ref("descargas/" + postID);

      ref.on("value", (snapshot) => {
        contador.innerText = snapshot.val() || 0;
      });

      btn.addEventListener("click", () => {
        ref.transaction(current => (current || 0) + 1);
      });
    }
  });
