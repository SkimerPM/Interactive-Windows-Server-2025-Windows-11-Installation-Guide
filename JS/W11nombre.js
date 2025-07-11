document.addEventListener('DOMContentLoaded', () => {
    // --- Selección de elementos ---
    const userNameInput = document.getElementById('userNameInput');
    const nextButton = document.getElementById('nextButton');
    const backButton = document.getElementById('backButton');

    // --- Función para validar la entrada ---
    function validateInput() {
        // El botón se activa si el campo de nombre no está vacío.
        const isNameValid = userNameInput.value.trim() !== '';
        
        // Habilita o deshabilita el botón "Siguiente"
        nextButton.disabled = !isNameValid;
    }

    // --- Event Listeners ---
    if (userNameInput) {
        // Valida en tiempo real mientras el usuario escribe
        userNameInput.addEventListener('input', validateInput);
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            // Esta función solo se ejecuta si el botón no está deshabilitado
            if (!nextButton.disabled) {
                window.location.href = 'contrasena.html';
            }
        });
    }

    if (backButton) {
        backButton.addEventListener('click', () => {
            window.history.back();
        });
    }
    
    // Ejecuta la validación una vez al cargar por si el campo ya tiene texto (poco probable aquí)
    validateInput();
});