document.addEventListener('DOMContentLoaded', () => {
    // --- Selección de elementos ---
    const securityKeyOption = document.getElementById('securityKeyOption');
    const offlineAccountOption = document.getElementById('offlineAccountOption');
    const backButtonFooter = document.getElementById('backButtonFooter');

    // --- Event Listeners ---
    if (securityKeyOption) {
        securityKeyOption.addEventListener('click', () => {
            // Aquí iría la lógica para ese tipo de inicio de sesión.
        });
    }

    if (offlineAccountOption) {
        offlineAccountOption.addEventListener('click', () => {
            window.location.href = 'cuenta_microsoft.html';
        });
    }

    if (backButtonFooter) {
        // El botón "Atrás" del footer simplemente nos devuelve a la pantalla anterior.
        backButtonFooter.addEventListener('click', () => {
            window.history.back();
        });
    }
});