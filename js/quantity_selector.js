// js/quantity_selector.js

document.addEventListener('DOMContentLoaded', () => {
    const quantityInput = document.querySelector('.quantity-input');
    const minusBtn = document.querySelector('.minus-btn');
    const plusBtn = document.querySelector('.plus-btn');
    const totalPriceElement = document.getElementById('total-price');

    // Verificar que todos los elementos necesarios existan en la página
    if (!quantityInput || !minusBtn || !plusBtn || !totalPriceElement) {
        // Esto es normal si el script se carga en una página que no es de detalle de producto
        return;
    }

    // Obtener el precio unitario del atributo data-price
    const unitPrice = parseFloat(quantityInput.dataset.price);

    // Función para formatear el precio a moneda (€)
    const formatPrice = (price) => {
        // Usamos toLocaleString para un formato de moneda correcto en español
        return price.toLocaleString('es-ES', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    // Función principal para actualizar el precio total
    const updateTotalPrice = () => {
        let quantity = parseInt(quantityInput.value);
        
        // Asegurar que la cantidad mínima sea 1
        if (quantity < 1) {
            quantity = 1;
            quantityInput.value = 1;
        }

        const totalPrice = unitPrice * quantity;
        totalPriceElement.textContent = formatPrice(totalPrice);
    };

    // Event listener para el botón de disminuir
    minusBtn.addEventListener('click', () => {
        let quantity = parseInt(quantityInput.value);
        if (quantity > 1) {
            quantityInput.value = quantity - 1;
            updateTotalPrice();
        }
    });

    // Event listener para el botón de aumentar
    plusBtn.addEventListener('click', () => {
        let quantity = parseInt(quantityInput.value);
        quantityInput.value = quantity + 1;
        updateTotalPrice();
    });

    // Event listener para la entrada manual (por si el usuario escribe)
    quantityInput.addEventListener('change', updateTotalPrice);
    quantityInput.addEventListener('keyup', updateTotalPrice);

    // Inicializar el precio total al cargar la página
    updateTotalPrice();
    
    console.log('Selector de cantidad interactivo inicializado.');
});
