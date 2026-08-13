// --- 0. FORZAR SCROLL AL INICIO AL RECARGAR ---
if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. LÓGICA DEL NAVBAR (Mobile Menu) --- */
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links li a");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            hamburger.classList.toggle("toggle");
        });

        // Cerrar menú al hacer clic en un link
        links.forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                hamburger.classList.remove("toggle");
            });
        });
    }

    /* --- 2. ANIMACIONES DE SCROLL (Intersection Observer) --- */
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    /* --- 3. LÓGICA DEL MODAL, TÍTULO DINÁMICO Y BOTÓN FLOTANTE --- */
    const modal = document.getElementById("leadModal");
    const btnOpenHero = document.getElementById("openModalBtn");
    const btnFloating = document.getElementById("floatingBtn");
    const spanClose = document.getElementsByClassName("close-btn")[0];
    const btnCloseAndShop = document.getElementById("closeAndShopBtn");
    
    // Contenedores internos
    const modalFormContent = document.getElementById("modalFormContent");
    const modalSuccessContent = document.getElementById("modalSuccessContent");
    const modalTitle = document.querySelector('#modalFormContent h2');

    // Función inteligente para abrir el modal
    function openModal(isExitIntent = false) {
        modal.style.display = "flex";

        // Ajustamos el título según cómo se abrió el modal
        if (modalTitle) {
            if (isExitIntent) {
                modalTitle.innerHTML = "¡Pará! ✋ Llevate la estrategia gratis antes de irte";
                modalTitle.style.color = "#ff4d4d"; // Tono rojo para llamar la atención
            } else {
                modalTitle.innerHTML = "Generador de Ideas IA 🤖";
                modalTitle.style.color = ""; // Vuelve al color blanco/default de tu CSS
            }
        }

        // Revisamos si ya pidió el prompt para mostrarle el éxito o el formulario
        if (localStorage.getItem('prompt_solicitado')) {
            modalFormContent.style.display = "none";
            modalSuccessContent.style.display = "block";
        } else {
            modalFormContent.style.display = "block";
            modalSuccessContent.style.display = "none";
        }
    }

    // Eventos de apertura manuales (Le pasamos "false" para que sepa que NO es exit-intent)
    if (btnOpenHero) btnOpenHero.addEventListener('click', () => openModal(false));
    if (btnFloating) btnFloating.addEventListener('click', () => openModal(false));

    // Eventos de cierre
    function closeModal() {
        modal.style.display = "none";
    }

    if (spanClose) spanClose.addEventListener('click', closeModal);
    if (btnCloseAndShop) {
        btnCloseAndShop.addEventListener('click', () => {
            closeModal();
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });

    /* --- 4. MANEJO DEL FORMULARIO Y CONEXIÓN (MAKE) --- */
    const leadForm = document.getElementById('leadForm');
    const formMessage = document.getElementById('formMessage');

    if (leadForm && formMessage) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validar límite
            if (localStorage.getItem('prompt_solicitado')) return;

            const email = document.getElementById('email').value;
            const rubro = document.getElementById('rubro').value;
            const objetivo = document.getElementById('objetivo').value;
            const tono = document.getElementById('tono').value;

            formMessage.innerText = "Procesando tu estrategia...";
            formMessage.style.color = "white";
            leadForm.querySelector('button').disabled = true;

      // Enviar datos a Make
            fetch('https://hook.us2.make.com/7sxsnni64339xghndrq9lafk51xf4o6y', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    email: email, 
                    rubro: rubro, 
                    objetivo: objetivo, 
                    tono: tono 
                })
            })
            .then(response => {
                console.log("Datos enviados a Make correctamente");
            })
            .catch(error => {
                console.error("Error de conexión:", error);
            });




            // Simulamos el envío exitoso por ahora
            setTimeout(() => {
                localStorage.setItem('prompt_solicitado', 'true');
                
                modalFormContent.style.display = "none";
                modalSuccessContent.style.display = "block";
                
                formMessage.innerText = "";
                leadForm.reset();
                leadForm.querySelector('button').disabled = false;
                
            }, 1500);
        });
    }

    /* --- 5. LÓGICA DE LAS FAQs (Acordeón) --- */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Cerrar los otros
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Abrir/Cerrar el cliqueado
            item.classList.toggle('active');
        });
    });

    /* --- 6. OCULTAR BOTÓN FLOTANTE EN EL FOOTER --- */
    const footer = document.querySelector('.footer');
    
    if (footer && btnFloating) {
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    btnFloating.classList.add('hidden');
                } else {
                    btnFloating.classList.remove('hidden');
                }
            });
        }, {
            rootMargin: "0px",
            threshold: 0.1
        });
        
        footerObserver.observe(footer);
    }

    /* --- 7. EXIT-INTENT POPUP (Intención de salida) --- */
    let exitIntentTriggered = false;

    document.addEventListener("mouseleave", (e) => {
        // Si el mouse va hacia la barra de direcciones (arriba)
        if (e.clientY < 10 && !exitIntentTriggered) {
            
            // Si no pidió el prompt aún, lo disparamos
            if (!localStorage.getItem('prompt_solicitado')) {
                exitIntentTriggered = true; 
                openModal(true); // Pasamos "true" para activar el título de "¡Pará!"
            }
        }
    });

});