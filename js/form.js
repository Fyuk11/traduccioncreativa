// Validación + envío del formulario (Formspree)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");
  const phoneInput = document.getElementById("phone");

  // Evitar letras en el campo teléfono
  phoneInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9+\s-]/g, "");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validación extra: mínimo 8 dígitos
    const phoneValue = phoneInput.value.replace(/[^0-9]/g, ""); // solo números
    if (phoneValue.length < 8) {
      statusEl.textContent = "⚠️ Por favor ingresa un teléfono válido (mínimo 8 dígitos).";
      statusEl.className = "form-status error";
      return;
    }

    const data = new FormData(form);
    const action = "https://formspree.io/f/mdklkokw"; // tu endpoint real

    // Estado inicial
    statusEl.textContent = "Enviando...";
    statusEl.className = "form-status";

    try {
      const response = await fetch(action, {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      statusEl.className = "form-status"; // reset clases previas

      if (response.ok) {
        statusEl.textContent = "✅ ¡Gracias! Tu mensaje fue enviado con éxito. Nos pondremos en contacto contigo a la brevedad.";
        statusEl.classList.add("success");
        form.reset();
      } else {
        statusEl.textContent = "⚠️ Ocurrió un error, por favor inténtalo de nuevo.";
        statusEl.classList.add("error");
      }
    } catch (error) {
      statusEl.className = "form-status"; // reset clases previas
      statusEl.textContent = "❌ Error de red. Intenta más tarde.";
      statusEl.classList.add("error");
    }
  });
});
