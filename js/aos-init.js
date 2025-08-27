// Inicialización de AOS (animaciones al hacer scroll)
document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 1000, // duración en ms
    once: true,     // la animación solo ocurre una vez
    offset: 100     // distancia antes de activar animación
  });
});
