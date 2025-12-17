// script.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('La página del supermercado se ha cargado correctamente.');

    // --- Contador Regresivo Simulado ---
    const countdownElement = document.getElementById('countdown');
    
    // Tiempo inicial de la oferta (simulado: 1 hora)
    let timeRemaining = 60 * 60; // Segundos

    function updateCountdown() {
        const hours = Math.floor(timeRemaining / 3600);
        const minutes = Math.floor((timeRemaining % 3600) / 60);
        const seconds = timeRemaining % 60;

        // Formato de dos dígitos (ej: 05, 12)
        const displayHours = String(hours).padStart(2, '0');
        const displayMinutes = String(minutes).padStart(2, '0');
        const displaySeconds = String(seconds).padStart(2, '0');

        countdownElement.textContent = `${displayHours}:${displayMinutes}:${displaySeconds}`;

        if (timeRemaining <= 0) {
            clearInterval(timer);
            countdownElement.textContent = '¡Oferta Terminada!';
            // Opcional: Deshabilitar el botón de CTA o cambiar su texto
            const ctaButton = document.querySelector('.btn-cta');
            if (ctaButton) {
                ctaButton.textContent = 'Ver Productos Regulares';
                ctaButton.style.backgroundColor = '#999';
            }
        } else {
            timeRemaining--;
        }
    }

    // Iniciar el contador
    const timer = setInterval(updateCountdown, 1000);
    updateCountdown(); // Llamada inicial para evitar el retraso de 1 segundo
    
    // --- Ejemplo de Interacción (Manteniendo el código anterior) ---
    const buttons = document.querySelectorAll('.btn-details');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // En un proyecto real, esto manejaría la navegación o el carrito
            console.log(`Intento de navegación a: ${e.target.href}`);
        });
    });
});
