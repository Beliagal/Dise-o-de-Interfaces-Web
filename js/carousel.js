// js/carousel.js

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('category-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!carousel || !prevBtn || !nextBtn) {
        console.error('Elementos del carrusel no encontrados.');
        return;
    }

    // Función para desplazar el carrusel
    const scrollCarousel = (direction) => {
        // Obtenemos el ancho de una tarjeta (incluyendo el gap de 1rem)
        // Usamos clientWidth para obtener el ancho visible del contenedor
        const cardWidth = 120 + 16; // 120px (ancho de tarjeta) + 16px (gap de 1rem)
        
        // Calculamos la cantidad de desplazamiento
        const scrollAmount = direction * cardWidth * 3; // Desplazamos 3 tarjetas a la vez (ajuste para mejor visualización con menos elementos)

        // Desplazamos el contenedor
        carousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    };

    // Lógica para el carrusel infinito (simulado)
    // Cuando el usuario llega al final, volvemos al inicio sin que se note.
    carousel.addEventListener('scroll', () => {
        // Si el usuario se desplaza al final (donde están las tarjetas duplicadas)
        if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 1) {
            // Volvemos al inicio de forma instantánea
            carousel.scrollLeft = 0;
        }
        
        // Si el usuario se desplaza al inicio (donde están las tarjetas duplicadas del final)
        if (carousel.scrollLeft === 0) {
            // Volvemos al punto donde termina el contenido original (antes de los duplicados)
            // Esto requiere un cálculo más complejo para un carrusel 100% infinito,
            // pero para un proyecto de DAW, un simple reset al final es suficiente.
            // Para simular el "infinito" en ambas direcciones, se necesitaría clonar dinámicamente.
            // Por simplicidad y el requisito de "código de estudiante", nos enfocamos en el desplazamiento.
        }
    });

    // Event listeners para los botones
    prevBtn.addEventListener('click', () => {
        scrollCarousel(-1); // Desplazar hacia la izquierda
    });

    nextBtn.addEventListener('click', () => {
        scrollCarousel(1); // Desplazar hacia la derecha
    });
    
    console.log('Carrusel de categorías inicializado.');
});
