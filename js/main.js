// Script general para extras
document.addEventListener("DOMContentLoaded", () => {
  // Forzar inicio siempre en Hero al refrescar
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual"; // desactiva recordar posición
  }
  window.scrollTo({ top: 0, behavior: "instant" });

  // Botón volver arriba
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
});

/* typing hero */
/*const lines = document.querySelectorAll('.type-line');

lines.forEach((line, index) => {
  const text = line.getAttribute('data-full');
  let i = 0;

  setTimeout(() => {
    const interval = setInterval(() => {
      line.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, 50); // velocidad de escritura
  }, index * 1200); // espera entre líneas
});
*/
/*
const lines = document.querySelectorAll('.type-line');

lines.forEach((line, index) => {
  const text = line.getAttribute('data-full');
  line.textContent = '';
  let i = 0;

  line.classList.add('typing'); // cursor

  setTimeout(() => {
    const interval = setInterval(() => {
      line.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        line.classList.remove('typing'); // quita cursor al terminar
      }
    }, 50);
  }, index * 1200); // delay entre líneas
});

*/
const lines = document.querySelectorAll('.type-line');

lines.forEach((line, index) => {
  const text = line.getAttribute('data-full');
  line.textContent = '';
  let i = 0;

  setTimeout(() => {
    line.classList.add('typing'); // cursor mientras escribe
    const interval = setInterval(() => {
      line.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        line.classList.remove('typing'); // quita cursor al terminar
      }
    }, 50);
  }, index * 1200); // delay entre líneas
});

// Swiper Proyectos

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


// seccion cta cambio de palabra
const words = document.querySelectorAll(".dynamic-word");
let current = 0;

// Inicializamos la primera palabra
words[current].classList.add("active");

function rotateWords() {
  const prev = current;
  
  // Desaparece hacia abajo con blur
  words[prev].classList.remove("active");
  words[prev].classList.add("leave");

  // Próxima palabra
  current = (current + 1) % words.length;
  words[current].classList.add("active");

  // Limpiar clase leave después de la transición
  setTimeout(() => {
    words[prev].classList.remove("leave");
  }, 600); // mismo tiempo que la transición
}

// Repetir cada 3 segundos
setInterval(rotateWords, 4000);
