document.addEventListener('DOMContentLoaded', function () {
    const installRadio = document.getElementById('install');
    const repairRadio = document.getElementById('repair');
    const installText = document.getElementById('install-text');
    const repairText = document.getElementById('repair-text');
    const checkboxContainer = document.getElementById('agreement-checkbox');
    const agreementCheck = document.getElementById('agreement-check');
    const nextButton = document.getElementById('next-button');

    // --- LÓGICA DE LA INTERFAZ (Original) ---

    function updateButtonState() {
        if (installRadio.checked) {
            if (agreementCheck.checked) {
                nextButton.classList.remove('btn-disabled');
                nextButton.classList.add('btn-next');
                nextButton.style.pointerEvents = 'auto';
            } else {
                nextButton.classList.add('btn-disabled');
                nextButton.classList.remove('btn-next');
                nextButton.style.pointerEvents = 'none';
            }
        } else if (repairRadio.checked) {
            nextButton.classList.remove('btn-disabled');
            nextButton.classList.add('btn-next');
            nextButton.style.pointerEvents = 'auto';
        }
    }

    function updateInterface() {
        if (installRadio.checked) {
            installText.classList.add('option-bordered');
            repairText.classList.remove('option-bordered');
            checkboxContainer.style.display = 'flex';
        } else if (repairRadio.checked) {
            repairText.classList.add('option-bordered');
            installText.classList.remove('option-bordered');
            checkboxContainer.style.display = 'none';
        }
        updateButtonState();
    }

    // --- EVENT LISTENERS Y DISPARADORES PARA EL TUTORIAL ---

    installRadio.addEventListener('change', updateInterface);
    repairRadio.addEventListener('change', updateInterface);

    agreementCheck.addEventListener('change', () => {
        // Primero, ejecuta la lógica original de la página
        updateButtonState();

        // Luego, si se marca, dispara el evento para el tutorial
        if (agreementCheck.checked) {
            document.dispatchEvent(new CustomEvent('customActionTriggered', {
                detail: {
                    actionId: 'checkboxChanged',
                    elementId: 'agreement-check'
                }
            }));
        }
    });

    nextButton.addEventListener('click', (event) => {
        // Comprueba si el tutorial está esperando este clic
        // Nota: esto asume que tutorialManager.js expone estas variables globalmente (ej. window.currentStepIndex)
        const step = window.currentTutorialSteps[window.currentStepIndex];

        if (step && step.triggerEvent === 'buttonClicked' && step.nextStepAction === 'next-button') {
            // Detiene la navegación para que el usuario pueda ver el último modal
            event.preventDefault();

            // Dispara el evento para que el tutorial avance
            document.dispatchEvent(new CustomEvent('customActionTriggered', {
                detail: {
                    actionId: 'buttonClicked',
                    elementId: 'next-button'
                }
            }));

            // Escucha una sola vez el cierre del modal para luego redirigir
            document.addEventListener('modalClosedCustom', function onFinalModalClose() {
                window.location.href = nextButton.href;
            }, { once: true });

        }
        // Si el tutorial no está en este paso, el botón funciona normalmente y navega a la siguiente página.
    });


    // --- ESTADO INICIAL ---
    updateInterface();
});