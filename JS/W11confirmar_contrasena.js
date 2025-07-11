document.addEventListener('DOMContentLoaded', () => {
    // --- Selección de elementos ---
    const confirmPasswordInput = document.getElementById('confirmPasswordInput');
    const nextButton = document.getElementById('nextButton');
    const backButton = document.getElementById('backButton');

    // --- ¡LÓGICA CLAVE! Leemos la contraseña guardada desde la pantalla anterior ---
    const originalPassword = sessionStorage.getItem('tempPassword');

    // Si por alguna razón el usuario llega aquí sin haber puesto una contraseña,
    // lo devolvemos para evitar errores.
    if (!originalPassword) {
        console.error("No se encontró la contraseña original. Redirigiendo...");
        window.location.href = 'contrasena.html';
        return; // Detenemos la ejecución del script
    }

    // --- Función para validar y comparar las contraseñas ---
    function validateAndMatch() {
        const confirmationValue = confirmPasswordInput.value;

        // La validación ahora requiere dos cosas:
        // 1. Que el campo no esté vacío.
        // 2. Que el texto coincida con la contraseña original.
        const isMatch = confirmationValue === originalPassword;
        
        // El botón solo se activa si ambas condiciones son verdaderas.
        nextButton.disabled = !isMatch;
    }

    // --- Event Listeners ---
    if (confirmPasswordInput) {
        // Valida en tiempo real mientras el usuario escribe
        confirmPasswordInput.addEventListener('input', validateAndMatch);
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            if (!nextButton.disabled) {
                // IMPORTANTE: Limpiamos la contraseña de la memoria por seguridad.
                sessionStorage.removeItem('tempPassword');
                window.location.href = 'privacidad.html';
            }
        });
    }

    if (backButton) {
        backButton.addEventListener('click', () => {
            // Limpiamos también si el usuario decide volver.
            sessionStorage.removeItem('tempPassword');
            window.history.back();
        });
    }
    
    validateAndMatch();
});