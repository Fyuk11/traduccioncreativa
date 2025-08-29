document.addEventListener("DOMContentLoaded", () => {
  // --- Forzar inicio siempre en Hero al refrescar
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual"; // desactiva recordar posición
  }
  window.scrollTo({ top: 0, behavior: "instant" });

  // --- Botón volver arriba
  const btnTop = document.querySelector(".btn-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      btnTop.classList.add("show");
    } else {
      btnTop.classList.remove("show");
    }
  });

  btnTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // --- Typing hero
 const lines = [
    { el: document.getElementById("line1"), text: "Traducción Creativa" },
    { el: document.getElementById("line2"), text: "Damos vida digital a tus ideas." },
    { el: document.getElementById("line3"), text: "Porque toda idea necesita un espacio propio para crecer, inspirar y conectar." }
  ];

  let lineIndex = 0;
  let charIndex = 0;
  const typingSpeed = 70;
  const delayBetweenLines = 800;
  const startDelay = 1500;

  function typeLine() {
    const line = lines[lineIndex];
    line.el.style.visibility = "visible";

    let currentText = line.text.slice(0, charIndex + 1);

    // Insertamos el span "creativa" cuando corresponde
    if (currentText.includes("Creativa")) {
      currentText = currentText.replace(
        "Creativa",
        `<span class="creativa">Creativa</span>`
      );
    }

    line.el.innerHTML = currentText + `<span class="cursor"></span>`;
    charIndex++;

    if (charIndex < line.text.length) {
      setTimeout(typeLine, typingSpeed);
    } else {
      // Terminó de escribir la línea → dejar cursor 2 parpadeos y sacarlo
      setTimeout(() => {
        line.el.innerHTML = currentText; // sin cursor
        lineIndex++;
        charIndex = 0;
        if (lineIndex < lines.length) {
          setTimeout(typeLine, delayBetweenLines);
        } else {
          document.querySelector(".btn-hero").classList.add("show");
        }
      }, 1200); // tiempo extra de parpadeo antes de borrar cursor
    }
  }

  setTimeout(typeLine, startDelay);
});

// --- Swiper Proyectos (esto sí va afuera del DOMContentLoaded)
const swiperProyectos = new Swiper('.proyectos-swiper', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  loop: true,
  coverflowEffect: {
    rotate: 20,
    stretch: 0,
    depth: 120,
    modifier: 1,
    slideShadows: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
