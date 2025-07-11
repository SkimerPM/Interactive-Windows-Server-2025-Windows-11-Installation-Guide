document.addEventListener('DOMContentLoaded', () => {
    // 1. Funcionalidad para el botón "Atrás" (se mantiene)
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.history.back();
        });
    }

    // 2. Funcionalidad para los nuevos botones
    const addButton = document.getElementById('addButton');
    const skipButton = document.getElementById('skipButton');

    if (addButton) {
        addButton.addEventListener('click', () => {
            // Esta acción debería llevarte de nuevo a la pantalla anterior para elegir otra distribución.
            console.log("Acción: Agregar otra distribución.");
            window.location.href = 'teclado_dist.html'; // Vuelve a la primera pantalla de teclado
        });
    }

    if (skipButton) {
        skipButton.addEventListener('click', () => {
            // Esta acción te llevaría al siguiente paso de la instalación.
            console.log("Acción: Omitir y continuar.");
            window.location.href = 'comprobando.html'; 
        });
    }
});