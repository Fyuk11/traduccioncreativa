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


// =========================================
// LEAD MAGNET - EXIT INTENT & CLIC MANUAL
// =========================================

// La función ahora recibe un parámetro ('exit' o 'manual')
function abrirModalLeadMagnet(tipo) {
    const modal = document.getElementById('modalLeadMagnet');
    const modalKicker = document.getElementById('modal-kicker');
    const modalTitle = document.getElementById('modal-title');

    // Cambiamos los textos según cómo se abrió el modal
    if (tipo === 'exit') {
        modalKicker.innerText = "¡ESPERÁ UN SEGUNDO!";
        modalTitle.innerText = "¿Te vas sin medir tus datos?";
    } else if (tipo === 'manual') {
        modalKicker.innerText = "RECURSO GRATUITO";
        modalTitle.innerText = "Descubrí las fugas invisibles de tu web";
    }

    modal.style.display = 'flex'; 
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function cerrarModalLeadMagnet() {
    const modal = document.getElementById('modalLeadMagnet');
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300); 
}

// Cierra el modal si el usuario hace clic en el fondo oscuro
window.addEventListener('click', function(e) {
    const modal = document.getElementById('modalLeadMagnet');
    if (e.target === modal) {
        cerrarModalLeadMagnet();
    }
});

// 1. Lógica de Exit Intent (Salta cuando el mouse va hacia la cruz del navegador)
document.addEventListener("mouseleave", (event) => {
    if (event.clientY < 50 && !sessionStorage.getItem('leadMagnetMostrado')) {
        abrirModalLeadMagnet('exit'); // Lo abrimos en modo "escape"
        sessionStorage.setItem('leadMagnetMostrado', 'true');
    }
});

// =========================================
// CONEXIÓN LEAD MAGNET -> MAKE WEBHOOK
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const formLeadMagnet = document.getElementById('lead-magnet-form');
    const statusText = document.getElementById('lm-status');

    if (formLeadMagnet) {
        formLeadMagnet.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita que la página se recargue

            // 1. Cambiamos el texto del botón para que el usuario sepa que está cargando
            const btnSubmit = formLeadMagnet.querySelector('button[type="submit"]');
            const textoOriginal = btnSubmit.innerText;
            btnSubmit.innerText = "Enviando...";
            btnSubmit.style.opacity = "0.7";
            btnSubmit.disabled = true;

            // 2. Capturamos los datos del formulario
            const formData = new FormData(formLeadMagnet);
            const data = {
                name: formData.get('name'),    // Cambiado de 'nombre' a 'name'
                email: formData.get('email'),  // Esto ya estaba bien
                origen: "Lead Magnet - Exit Intent"
            };

            // 3. Enviamos los datos al Webhook de Make
            // REEMPLAZÁ ESTA URL POR LA DE TU WEBHOOK REAL
            const webhookUrl = "https://hook.us2.make.com/y3odpexac2k5najin300nh11twp61r8n";

            fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) {
                    // ÉXITO: Mostramos mensaje verde
                    statusText.style.color = "#4CAF50";
                    statusText.innerText = "¡Listo! Revisá tu bandeja de entrada (y la de SPAM por las dudas).";
                    formLeadMagnet.reset(); // Limpiamos el formulario
                    
                    // Cerramos el modal automáticamente después de 3 segundos
                    setTimeout(() => {
                        cerrarModalLeadMagnet();
                        statusText.innerText = ""; // Limpiamos el texto
                        btnSubmit.innerText = textoOriginal; // Restauramos el botón
                        btnSubmit.style.opacity = "1";
                        btnSubmit.disabled = false;
                    }, 3500);
                } else {
                    throw new Error('Error en el envío');
                }
            })
            .catch(error => {
                // ERROR: Mostramos mensaje rojo
                statusText.style.color = "#f44336";
                statusText.innerText = "Hubo un error al enviar. Por favor, intentá de nuevo.";
                btnSubmit.innerText = textoOriginal;
                btnSubmit.style.opacity = "1";
                btnSubmit.disabled = false;
                console.error("Error capturado:", error);
            });
        });
    }
});