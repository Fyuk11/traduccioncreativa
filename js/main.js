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

