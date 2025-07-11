document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA ORIGINAL DE LA PÁGINA ---

    // Mostrar/Ocultar contraseña
    document.querySelectorAll('.password-in').forEach(container => {
        const input = container.querySelector('input');
        const icon = container.querySelector('img');
        icon.style.cursor = 'pointer';
        icon.addEventListener('click', () => {
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            icon.src = isPassword ? '../../recursos/iconos/ojoCerrado.svg' : '../../recursos/iconos/ojoAbierto.svg';
        });
    });

    // Validación de coincidencia de contraseñas
    const pass1 = document.getElementById('pass');
    const pass2 = document.getElementById('passV');
    const errorMsg = document.getElementById('error-msg');

    function checkPasswords() {
        if (pass2.value === '') {
            errorMsg.textContent = '';
        } else if (pass1.value !== pass2.value) {
            errorMsg.textContent = 'Las contraseñas no coinciden';
        } else {
            // Cuando las contraseñas coinciden...
            errorMsg.textContent = '';
            // Disparador del tutorial: Avisa que las contraseñas ya coinciden
            document.dispatchEvent(new CustomEvent('customActionTriggered', {
                detail: {
                    actionId: 'passwordsMatch',
                    elementId: 'passV'
                }
            }));
        }
    }

    pass1.addEventListener('input', checkPasswords);
    pass2.addEventListener('input', checkPasswords);
    
    // --- LÓGICA DEL TUTORIAL (DISPARADORES DE EVENTOS DE ENTRADA) ---

    const userInput = document.getElementById('name_user');
    userInput.addEventListener('input', () => {
        document.dispatchEvent(new CustomEvent('customActionTriggered', {
            detail: { actionId: 'userInputted', elementId: 'name_user' }
        }));
    });
    
    pass1.addEventListener('input', () => {
        document.dispatchEvent(new CustomEvent('customActionTriggered', {
            detail: { actionId: 'userInputted', elementId: 'pass' }
        }));
    });

    // --- LÓGICA DE ENVÍO DEL FORMULARIO (UNIFICADA CON TUTORIAL) ---

    const form = document.querySelector('.form');
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevenir siempre el envío por defecto

        // Validar que los campos no estén vacíos
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Validar que las contraseñas coincidan
        if (pass1.value !== pass2.value) {
            errorMsg.textContent = 'Las contraseñas no coinciden';
            pass2.focus();
            return;
        }

        // --- MANEJO DEL TUTORIAL Y REDIRECCIÓN ---
        const step = window.currentTutorialSteps && window.currentTutorialSteps[window.currentStepIndex];

        // Función para ejecutar al final
        const finalAction = () => {
            localStorage.setItem('usuario', document.getElementById('name_user').value);
            localStorage.setItem('password', pass1.value);
            window.location.href = './reiniciar_inicioSesion.html';
        };

        // Si el tutorial está esperando este clic
        if (step && step.triggerEvent === 'buttonClicked' && step.nextStepAction === 'btnFinalizar') {
            document.dispatchEvent(new CustomEvent('customActionTriggered', {
                detail: { actionId: 'buttonClicked', elementId: 'btnFinalizar' }
            }));
            document.addEventListener('modalClosedCustom', finalAction, { once: true });
        } else {
            // Si el tutorial no está activo o ya pasó este paso, ejecuta la acción directamente
            finalAction();
        }
    });

});