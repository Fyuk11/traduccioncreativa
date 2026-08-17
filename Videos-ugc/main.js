document.addEventListener('DOMContentLoaded', () => {
    // 0. FORZAR INICIO DESDE ARRIBA AL ACTUALIZAR LA PÁGINA
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

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
    const explainerVideos = document.querySelectorAll('.explainer-video');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    entry.target.pause();
                }
            });
        }, { threshold: 0.1 });

        explainerVideos.forEach(video => {
            observer.observe(video);
        });
    }
});