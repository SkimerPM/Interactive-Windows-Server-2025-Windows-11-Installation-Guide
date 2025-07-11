// tutorialManager.js

const DEFAULT_PRESENTER_IMG_URL = "https://static.vecteezy.com/system/resources/previews/027/191/074/non_2x/pixel-art-robot-cartoon-character-png.png";

let currentTutorialSteps = [];
let currentStepIndex = 0;
let isProcessingStep = false;
const customActionHandlers = new Map(); // Para guardar los handlers de los listeners dinámicos

function startTutorial(stepsArray, presenterImgUrl = DEFAULT_PRESENTER_IMG_URL) {
    if (!stepsArray || stepsArray.length === 0) {
        console.warn("startTutorial: No se proporcionaron pasos para el tutorial.");
        return;
    }

    currentTutorialSteps = stepsArray;
    currentStepIndex = 0;
    isProcessingStep = false;

    // Remueve listeners de acciones específicas del usuario del tutorial anterior para evitar conflictos
    customActionHandlers.forEach((handler, elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
            // La clave aquí es remover el listener con la MISMA función handler
            if (handler.eventType === 'click') {
                element.removeEventListener('click', handler.fn);
            } else if (handler.eventType === 'change') {
                element.removeEventListener('change', handler.fn);
            }
            // ... añadir más tipos de eventos si los usas
        }
    });
    customActionHandlers.clear();


    // === Importante: El tutorialManager ya no configura listeners directos en los elementos DOM. ===
    // === Solo escucha el evento genérico 'customActionTriggered' que disparan las páginas. ===
    // Esto simplifica el `tutorialManager` y lo hace más robusto frente a cambios en el DOM.

    showCurrentStepModal();
}

function showCurrentStepModal() {
    if (isProcessingStep || currentStepIndex >= currentTutorialSteps.length) {
        if (currentStepIndex >= currentTutorialSteps.length) {
            console.log("¡Tutorial completado!");
            document.dispatchEvent(new Event('tutorialCompleted'));
        }
        return;
    }

    isProcessingStep = true;
    const step = currentTutorialSteps[currentStepIndex];

    window.createModal(
        step.title,
        step.content,
        step.presenter ? step.presenter.url : DEFAULT_PRESENTER_IMG_URL,
        step.presenter ? step.presenter.position : 'bottom-left',
        step.modalAlignment || 'center'
    );

    setTimeout(() => {
        isProcessingStep = false;
    }, 500);
}

function advanceToNextStep() {
    if (!isProcessingStep) {
        currentStepIndex++;
        showCurrentStepModal();
    }
}

// --- Event Listeners Globales para el Tutorial Manager ---

// Listener para el evento personalizado de cierre de modal (desde modal.js)
document.addEventListener('modalClosedCustom', () => {
    const step = currentTutorialSteps[currentStepIndex];
    if (step && step.triggerEvent === 'modalClosed') {
        advanceToNextStep();
    }
});

// Listener para el evento genérico 'customActionTriggered' que disparan las páginas HTML
document.addEventListener('customActionTriggered', (event) => {
    const { actionId, elementId } = event.detail; // Obtiene los detalles de la acción
    const step = currentTutorialSteps[currentStepIndex];

    // Verificar si el paso actual espera este tipo de acción de este elemento
    if (step && step.triggerEvent === actionId && step.nextStepAction === elementId) {
        // Asegurarse de que no haya un modal abierto para evitar avances accidentales
        if (document.querySelector('.modal-overlay') === null) {
            advanceToNextStep();
        } else {
            console.log(`El modal actual debe cerrarse primero para que la acción '${actionId}' en '${elementId}' avance el tutorial.`);
        }
    }
});


window.startTutorial = startTutorial;