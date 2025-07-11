document.addEventListener('DOMContentLoaded', () => {
    // --- Selección de elementos (con nuevos IDs) ---
    const passwordInput = document.getElementById('passwordInput');
    const nextButton = document.getElementById('nextButton');
    const backButton = document.getElementById('backButton');

    // --- Función de validación (la lógica es la misma) ---
    function validateInput() {
        // El botón "Siguiente" se activa si el campo de contraseña no está vacío.
        // En un caso real, podrías añadir más reglas (longitud, caracteres, etc.).
        const isPasswordValid = passwordInput.value !== ''; // No usamos trim() por si el usuario quiere usar espacios
        
        // Habilita o deshabilita el botón "Siguiente"
        nextButton.disabled = !isPasswordValid;
    }

    // --- Event Listeners ---
    if (passwordInput) {
        // Valida en tiempo real mientras el usuario escribe
        passwordInput.addEventListener('input', validateInput);
    }

    // CÓDIGO ACTUALIZADO para W11contrasena.js
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            if (!nextButton.disabled) {
                // ¡CAMBIO CLAVE! Guardamos la contraseña en la memoria de sesión.
                sessionStorage.setItem('tempPassword', passwordInput.value);
                // Navegamos a la nueva pantalla que vamos a crear.
                window.location.href = 'confirmar_contrasena.html';
            }
        });
    }

    if (backButton) {
        backButton.addEventListener('click', () => {
            window.history.back();
        });
    }
    
    // Ejecuta la validación una vez al cargar
    validateInput();
});