document.addEventListener('DOMContentLoaded', () => {
    // --- Selección de elementos ---
    const skipButton = document.getElementById('skipButton');
    const backButton = document.getElementById('backButton');

    // --- Event Listeners ---
    if (skipButton) {
        skipButton.addEventListener('click', () => {
            window.location.href = 'nombre.html';
        });
    }

    if (backButton) {
        // Esta es la acción principal aquí. Devuelve al usuario a la pantalla anterior.
        backButton.addEventListener('click', () => {
            window.history.back();
        });
    }
});