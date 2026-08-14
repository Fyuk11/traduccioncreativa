document.addEventListener('DOMContentLoaded', () => {
    // 1. MENÚ HAMBURGUESA
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer clic en un enlace (en celular)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                navLinks.classList.remove('active');
            }
        });
    });

    // 2. PAUSA INTELIGENTE (Para videos con audio)
    // Si el usuario scrollea y el video desaparece de la pantalla, lo pausamos automáticamente
    // para que no siga sonando de fondo.
    const explainerVideos = document.querySelectorAll('.explainer-video');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    entry.target.pause(); // Pausa el video si sale de la pantalla
                }
            });
        }, { threshold: 0.1 }); // Se dispara cuando se deja de ver casi todo el video

        explainerVideos.forEach(video => {
            observer.observe(video);
        });
    }
});