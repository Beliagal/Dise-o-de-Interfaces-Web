// js/cart_manager.js

document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeBtn = document.querySelector('.cart-modal-content .close-btn');
    const cartCount = document.getElementById('cart-count');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotalElement = document.getElementById('cart-total');
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');

    // Estado del Carrito (Simulado)
    let cart = [];

    // Función para formatear el precio a moneda (€)
    const formatPrice = (price) => {
        return price.toLocaleString('es-ES', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    // Función para actualizar la visualización del carrito
    const updateCartDisplay = () => {
        cartItemsList.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsList.innerHTML = '<p class="empty-cart-message">Tu cesta está vacía.</p>';
            cartCount.textContent = '0';
            cartTotalElement.textContent = formatPrice(0);
            return;
        }

        let totalItems = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            totalItems += item.quantity;

            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <div class="cart-item-info">
                    <strong>${item.name}</strong>
                    <p>Cantidad: ${item.quantity} x ${formatPrice(item.price)}</p>
                </div>
                <span class="cart-item-price">${formatPrice(itemTotal)}</span>
            `;
            cartItemsList.appendChild(itemElement);
        });

        cartCount.textContent = totalItems.toString();
        cartTotalElement.textContent = formatPrice(total);
    };

    // Función para añadir un producto al carrito
    const addToCart = (productName, price, quantity) => {
        const existingItem = cart.find(item => item.name === productName);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name: productName, price: price, quantity: quantity });
        }

        updateCartDisplay();
        // Mostrar un feedback visual (opcional: animación o mensaje)
        alert(`Añadido al carrito: ${quantity} x ${productName}`);
    };

    // Event Listeners para los botones "Añadir a la Cesta"
    addToCartBtns.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            
            // Lógica para la página de detalle de producto
            if (document.body.classList.contains('product-detail-page')) {
                const productPanel = button.closest('.product-info-panel');
                const productName = productPanel.querySelector('h1').textContent.trim();
                const quantityInput = productPanel.querySelector('.quantity-input');
                
                // Usamos el precio unitario del input (ya que el selector de cantidad lo tiene)
                const unitPrice = parseFloat(quantityInput.dataset.price);
                const quantity = parseInt(quantityInput.value);

                addToCart(productName, unitPrice, quantity);
            } 
            // Lógica para la página principal (index.html) - Usamos datos simulados
            else {
                const productCard = button.closest('.product-card');
                const productName = productCard.querySelector('.product-title').textContent.trim();
                const priceText = productCard.querySelector('.current-price').textContent.replace(' €', '').replace(',', '.');
                const unitPrice = parseFloat(priceText);
                
                // En la página principal, asumimos que se añade 1 unidad por defecto
                addToCart(productName, unitPrice, 1);
            }
        });
    });

    // Event Listeners para el Modal
    cartIcon.addEventListener('click', () => {
        cartModal.classList.add('open');
        updateCartDisplay(); // Asegurar que el contenido esté actualizado al abrir
    });

    closeBtn.addEventListener('click', () => {
        cartModal.classList.remove('open');
    });

    // Cerrar el modal al hacer clic fuera de él
    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            cartModal.classList.remove('open');
        }
    });

    // Inicializar el carrito al cargar la página
    updateCartDisplay();
    console.log('Gestor de Carrito inicializado.');
});
