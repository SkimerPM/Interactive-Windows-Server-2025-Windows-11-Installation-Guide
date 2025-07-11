document.addEventListener('DOMContentLoaded', () => {
    // --- Selección de elementos ---
    const contentArea = document.getElementById('privacyContent');
    const actionButton = document.getElementById('actionButton');

    // --- Función para detectar si se llegó al final del scroll ---
    function checkScroll() {
        // Se considera "final" si falta 1 pixel o menos para llegar.
        const isAtBottom = contentArea.scrollHeight - contentArea.scrollTop <= contentArea.clientHeight + 1;

        if (isAtBottom) {
            actionButton.textContent = 'Aceptar';
        } else {
            actionButton.textContent = 'Siguiente';
        }
    }

    // --- Función para manejar el clic en el botón de acción ---
    function handleActionClick() {
        if (actionButton.textContent === 'Aceptar') {
            window.location.href = 'actualizaciones.html';
        } else {
            // Si el botón dice "Siguiente", hacemos scroll suave hacia abajo.
            contentArea.scrollBy({
                top: contentArea.clientHeight * 0.8, // Baja un 80% de la altura visible
                behavior: 'smooth'
            });
        }
    }

    // --- Event Listeners ---
    if (contentArea) {
        // Cada vez que el usuario hace scroll, revisamos la posición.
        contentArea.addEventListener('scroll', checkScroll);
    }
    
    if (actionButton) {
        actionButton.addEventListener('click', handleActionClick);
    }

    // Comprobamos el estado del scroll una vez al cargar la página.
    checkScroll(); 
});