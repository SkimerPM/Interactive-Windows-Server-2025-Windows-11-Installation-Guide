// createModal: Función para crear y mostrar un modal dinámico
// Parámetros:
//   title: El texto del título del modal.
//   content: El contenido HTML del cuerpo del modal (puede ser texto, HTML complejo, etc.).
//   presenterImageUrl: (Opcional) La URL de la imagen del presentador. Si es null, no se muestra el presentador.
//   presenterPosition: (Opcional) La posición del presentador relativa al modal ('top-left', 'bottom-right', etc.).
//   modalAlignment: (Opcional) La posición de todo el modal en el viewport ('center', 'left', 'top-right', etc.).
const createModal = (title, content, presenterImageUrl = null, presenterPosition = 'bottom-left', modalAlignment = 'center') => {
    // 1. Crear los elementos del DOM para el modal
    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modal-overlay');
    // Añade la clase para la alineación global del modal (ej. modal-align-left)
    modalOverlay.classList.add(`modal-align-${modalAlignment}`);


    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');

    const modalTitle = document.createElement('h2');
    modalTitle.classList.add('modal-title');
    modalTitle.textContent = title;

    const closeButton = document.createElement('span');
    closeButton.classList.add('modal-close-button');
    closeButton.innerHTML = '&times;'; // Carácter 'x' para cerrar

    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
    // Nota: La alineación del contenido dentro del modal-body ya no se controla
    // con una clase dinámica aquí, sino que se gestiona por el diseño Flexbox
    // por defecto o por el propio HTML de 'content'.

    // Parte para el presentador
    if (presenterImageUrl) {
        const presenterContainer = document.createElement('div');
        presenterContainer.classList.add('modal-presenter');
        // Añade la clase para la posición del presentador (ej. presenter-top-left)
        presenterContainer.classList.add(`presenter-${presenterPosition}`);

        const presenterImg = document.createElement('img');
        presenterImg.src = presenterImageUrl;
        presenterImg.alt = 'Presentador del modal';
        presenterImg.classList.add('modal-presenter-img');
        presenterContainer.appendChild(presenterImg);

        // El presentador se añade directamente al modalContainer,
        // permitiendo posicionamiento absoluto relativo al modal-container.
        modalContainer.appendChild(presenterContainer);
    }

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalContent.innerHTML = content; // Inserta el contenido HTML

    // 2. Ensamblar los elementos
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);

    modalBody.appendChild(modalContent); // El contenido va dentro del modalBody

    modalContainer.appendChild(modalHeader);
    modalContainer.appendChild(modalBody);

    modalOverlay.appendChild(modalContainer);

    // 3. Agregar el modal al cuerpo del documento (lo hace visible)
    document.body.appendChild(modalOverlay);

    // 4. Lógica para cerrar el modal
    const closeModal = () => {
        // Elimina el overlay del DOM, ocultando y destruyendo el modal
        document.body.removeChild(modalOverlay);
        document.dispatchEvent(new Event('modalClosedCustom'));
    };

    // Event Listeners para cerrar el modal
    closeButton.addEventListener('click', closeModal); // Clic en el botón 'x'
    modalOverlay.addEventListener('click', (e) => {
        // Clic en el overlay (fuera del modal-container)
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    // Cerrar con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.body.contains(modalOverlay)) {
            closeModal();
        }
    });
};

// Exporta la función para que sea global o accesible en otros scripts
window.createModal = createModal;