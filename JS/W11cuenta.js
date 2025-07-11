document.addEventListener('DOMContentLoaded', () => {
    // --- Selección de elementos ---
    const loginInput = document.getElementById('loginInput');
    const nextButton = document.getElementById('nextButton');
    const moreInfoButton = document.getElementById('moreInfoButton');
    
    // (Si mantienes el botón de atrás en el HTML, necesitarías esta línea)
    // const backButton = document.getElementById('backButton');

    // --- Función para validar la entrada ---
    function validateInput() {
        // La validación más simple: el botón se activa si el campo no está vacío.
        const isInputValid = loginInput.value.trim() !== '';
        
        // Habilita o deshabilita el botón "Siguiente"
        nextButton.disabled = !isInputValid;
    }

    // --- Event Listeners ---
    if (loginInput) {
        // Valida en tiempo real mientras el usuario escribe
        loginInput.addEventListener('input', validateInput);
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            if (!nextButton.disabled) {
                console.log(`Iniciando sesión con: ${loginInput.value}`);
                // Navegar a la siguiente pantalla (ej: pedir contraseña)
                // window.location.href = 'contrasena.html';
            }
        });
    }

    if (moreInfoButton) {
        moreInfoButton.addEventListener('click', () => {
            // Acción para el botón de más información, por ejemplo, abrir un enlace.
            console.log("Mostrando más información.");
        });
    }

    // if (backButton) {
    //     backButton.addEventListener('click', () => window.history.back());
    // }
});