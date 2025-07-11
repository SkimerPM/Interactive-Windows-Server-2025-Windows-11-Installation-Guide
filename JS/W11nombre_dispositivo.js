document.addEventListener('DOMContentLoaded', () => {
    // --- Selección de elementos ---
    const deviceNameInput = document.getElementById('deviceNameInput');
    const nextButton = document.getElementById('nextButton');
    const skipButton = document.getElementById('skipButton');
    const backButton = document.getElementById('backButton');

    // --- Función de validación ---
    function validateInput() {
        const name = deviceNameInput.value;
        let isNameValid = true;

        // Regla 1: No debe estar vacío
        if (name.trim() === '') {
            isNameValid = false;
        }

        // Regla 2: No debe ser solo números
        if (/^[0-9]+$/.test(name)) {
            isNameValid = false;
        }
        
        // Regla 3: No debe contener espacios ni caracteres especiales (solo letras, números, guiones)
        if (!/^[a-zA-Z0-9-]*$/.test(name)) {
            isNameValid = false;
        }

        // Si el nombre es válido, habilita el botón. Si no, lo deshabilita.
        nextButton.disabled = !isNameValid;
    }

    // --- Event Listeners ---
    if (deviceNameInput) {
        // Valida en tiempo real mientras el usuario escribe
        deviceNameInput.addEventListener('input', validateInput);
    }

    if (backButton) {
        backButton.addEventListener('click', () => window.history.back());
    }

    if (skipButton) {
        skipButton.addEventListener('click', () => {
            console.log("Acción: Omitir y continuar al siguiente paso.");
            // Aquí iría la navegación a la siguiente página
            // window.location.href = 'siguiente_paso.html';
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            // Esta función solo se ejecuta si el botón no está deshabilitado
            if (!nextButton.disabled) {
                window.location.href = 'momento2.html';
            }
        });
    }
});