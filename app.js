// Configuración personalizable
const config = {
  // Número de WhatsApp configurado para Bolivia (+591)
  phoneNumber: "59177220757", 
  whatsappMessage: "Bueno, acepto el vale... pero pagas tú la comida y el helado 😉🍨"
};

// Navegación entre pantallas
function nextScreen(screenNum) {
  switchScreen(screenNum);
}

function prevScreen(screenNum) {
  switchScreen(screenNum);
}

function switchScreen(screenNum) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
  });
  
  const target = document.getElementById(`screen-${screenNum}`);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Si llega a la pantalla 4, reiniciamos el botón esquivo a una posición inicial
  if (screenNum === 4) {
    resetNoButton();
  }
}

// Revelar contenido de tarjetas en pantalla 2
function revealCard(cardElement) {
  cardElement.classList.toggle('revealed');
}

// Botón travieso que huye
let fleeCount = 0;
const funnyPhrases = [
  "¿En serio le diste ahí? 🥺",
  "¡Ey, ese botón no funciona!",
  "El botón verde está más bonito ✨",
  "Dale una oportunidad al chico...",
  "¡Casi, pero no! 😂",
  "Ya ríndete y dale al botón verde 💚"
];

function fleeButton(button, event) {
  if (event) {
    event.preventDefault();
  }
  fleeCount++;
  const arena = document.getElementById('arena');
  const rect = arena.getBoundingClientRect();
  
  // Rango para moverse dentro del contenedor
  const maxX = Math.max(20, rect.width - button.offsetWidth - 16);
  const maxY = Math.max(20, rect.height - button.offsetHeight - 16);
  
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);
  
  button.style.position = 'absolute';
  button.style.left = `${randomX}px`;
  button.style.top = `${randomY}px`;
  
  // Mensajes juguetones
  const sneakyNote = document.getElementById('sneaky-note');
  if (sneakyNote) {
    sneakyNote.textContent = funnyPhrases[fleeCount % funnyPhrases.length];
    sneakyNote.style.color = '#ff758f';
    sneakyNote.style.opacity = '1';
  }

  // Hacer que el botón "Sí" crezca ligeramente con cada intento fallido
  const yesBtn = document.getElementById('btn-yes');
  if (yesBtn && fleeCount <= 6) {
    const currentScale = 1 + (fleeCount * 0.05);
    yesBtn.style.transform = `scale(${currentScale})`;
  }
}

function resetNoButton() {
  const btnNo = document.getElementById('btn-no');
  if (btnNo) {
    btnNo.style.position = 'relative';
    btnNo.style.left = 'auto';
    btnNo.style.top = 'auto';
  }
  const yesBtn = document.getElementById('btn-yes');
  if (yesBtn) {
    yesBtn.style.transform = 'scale(1)';
  }
  fleeCount = 0;
}

// Celebración final con confeti
function celebrateSuccess() {
  switchScreen(5);

  // Disparo de fuegos artificiales de confeti
  const duration = 3.5 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#ffccd5', '#a0c4ff', '#ffb3c1', '#ffffff', '#ffd166']
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#ffccd5', '#a0c4ff', '#ffb3c1', '#ffffff', '#ffd166']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());

  // Disparo central de corazones
  confetti({
    particleCount: 50,
    spread: 100,
    origin: { y: 0.6 },
    shapes: ['circle', 'square']
  });

  // Configurar enlace de WhatsApp
  setupWhatsAppLink();
}

function setupWhatsAppLink() {
  const waLink = document.getElementById('whatsapp-link');
  if (!waLink) return;

  const encodedMsg = encodeURIComponent(config.whatsappMessage);
  if (config.phoneNumber && config.phoneNumber.trim() !== "") {
    waLink.href = `https://wa.me/${config.phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMsg}`;
  } else {
    waLink.href = `https://api.whatsapp.com/send?text=${encodedMsg}`;
  }
}

function restartApp() {
  switchScreen(1);
  resetNoButton();
  const sneakyNote = document.getElementById('sneaky-note');
  if (sneakyNote) {
    sneakyNote.textContent = "💡 Pista: El botón rojo tiene problemas de compromiso y escapa si intentas tocarlo.";
    sneakyNote.style.color = "";
    sneakyNote.style.opacity = "0.7";
  }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  setupWhatsAppLink();
});
