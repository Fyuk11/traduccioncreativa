// nav.js (versión modular, comentada y robusta)
document.addEventListener("DOMContentLoaded", () => {
  const hamburger     = document.getElementById("hamburger");
  const mobileOverlay = document.getElementById("mobile-overlay");
  const mobileMenu    = document.querySelector(".mobile-menu");
  const navbar        = document.querySelector(".navbar");

  if (!hamburger || !mobileOverlay || !mobileMenu) return;

  // =============================
  // Helpers
  // =============================
  const isOpen = () => mobileOverlay.classList.contains("active");

  // Bloquea scroll sin que salte el contenido (compensa scrollbar)
  function lockScroll() {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;
  }

  // Restaura scroll normal
  function unlockScroll() {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }

  // =============================
  // Menu handlers
  // =============================
  function openMenu() {
    hamburger.classList.add("active");
    mobileOverlay.classList.add("active");
    lockScroll();
  }

  function closeMenu() {
    hamburger.classList.remove("active");
    mobileOverlay.classList.remove("active");
    unlockScroll();
  }

  function toggleMenu(forceClose = false) {
    if (forceClose) return closeMenu();
    return isOpen() ? closeMenu() : openMenu();
  }

  // =============================
  // Event Listeners
  // =============================

  // 1. Toggle con hamburguesa
  hamburger.addEventListener("click", () => toggleMenu());

  // 2. Cerrar al hacer click en cualquier link del menú
  mobileMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => toggleMenu(true));
  });

  // 3. Cerrar al presionar ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) toggleMenu(true);
  });

  // 4. Cerrar al scrollear después de abrir
  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);

    if (isOpen() && window.scrollY !== lastScrollY) {
      toggleMenu(true);
    }

    lastScrollY = window.scrollY;
  }, { passive: true });

  // 5. Cerrar si se redimensiona a desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 900 && isOpen()) toggleMenu(true);
  });

  // 6. Cerrar al hacer click fuera del menú
  document.addEventListener("click", (e) => {
    if (!isOpen()) return;
    const clickEnMenu = mobileMenu.contains(e.target);
    const clickEnHamb = hamburger.contains(e.target);
    if (!clickEnMenu && !clickEnHamb) toggleMenu(true);
  });

  // 7. Cerrar si cambia el hash (#seccion)
  window.addEventListener("hashchange", () => { 
    if (isOpen()) closeMenu(); 
  });
});
