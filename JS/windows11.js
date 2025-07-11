document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const steps = document.querySelectorAll('.step');
    const btnBack = document.getElementById('btn-back');
    const btnNext = document.getElementById('btn-next');
    let currentStep = 0;
    
    // Mostrar el primer paso al cargar
    showStep(currentStep);
    
    // Evento para el botón Siguiente
    btnNext.addEventListener('click', function() {
        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);
            
            // Si es el paso de instalación, simular progreso
            if (currentStep === 3) {
                simulateInstallation();
            }
            
            // Si es el último paso, cambiar texto del botón
            if (currentStep === steps.length - 1) {
                btnNext.textContent = 'Finalizar';
            }
        } else {
            // Aquí podrías redirigir o reiniciar el simulador
            alert('Instalación completada. ¡Gracias por usar el simulador!');
            resetSimulator();
        }
    });
    
    // Evento para el botón Atrás
    btnBack.addEventListener('click', function() {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
            
            // Restaurar texto del botón si no es el último paso
            if (currentStep < steps.length - 1) {
                btnNext.textContent = 'Siguiente';
            }
        }
    });
    
    // Selección de tipo de instalación
    document.querySelectorAll('.install-option').forEach(option => {
        option.addEventListener('click', function() {
            // Remover selección previa
            document.querySelectorAll('.install-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Resaltar opción seleccionada
            this.classList.add('selected');
        });
    });
    
    // Función para mostrar el paso actual
    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });
        
        // Ocultar botón Atrás en el primer paso
        btnBack.style.visibility = stepIndex === 0 ? 'hidden' : 'visible';
    }
    
    // Función para simular la instalación
    function simulateInstallation() {
        const progressBar = document.getElementById('progress-bar');
        const statusText = document.getElementById('install-status');
        const messages = [
            "Preparando archivos...",
            "Copiando archivos de Windows...",
            "Instalando características...",
            "Instalando actualizaciones...",
            "Finalizando instalación..."
        ];
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress > 100) progress = 100;
            
            progressBar.style.width = `${progress}%`;
            
            // Cambiar mensaje según progreso
            if (progress < 20) {
                statusText.textContent = messages[0];
            } else if (progress < 40) {
                statusText.textContent = messages[1];
            } else if (progress < 60) {
                statusText.textContent = messages[2];
            } else if (progress < 80) {
                statusText.textContent = messages[3];
            } else {
                statusText.textContent = messages[4];
            }
            
            // Cuando llegue al 100%, avanzar automáticamente
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    if (currentStep === 3) { // Solo avanzar si aún estamos en este paso
                        btnNext.click();
                    }
                }, 1500);
            }
        }, 500);
    }
    
    // Función para reiniciar el simulador
    function resetSimulator() {
        currentStep = 0;
        showStep(currentStep);
        btnNext.textContent = 'Siguiente';
        document.getElementById('progress-bar').style.width = '0%';
        
        // Resetear selección de instalación
        document.querySelectorAll('.install-option').forEach(opt => {
            opt.classList.remove('selected');
        });
    }
    
    // Contador regresivo para el último paso
    function startCountdown() {
        let seconds = 10;
        const countdownElement = document.getElementById('countdown');
        const interval = setInterval(() => {
            seconds--;
            countdownElement.textContent = seconds;
            
            if (seconds <= 0) {
                clearInterval(interval);
            }
        }, 1000);
    }
    
    // Observar cuando se llega al último paso para iniciar el contador
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                if (mutation.target.id === 'step5' && mutation.target.classList.contains('active')) {
                    startCountdown();
                }
            }
        });
    });
    
    // Configurar el observador
    observer.observe(document.getElementById('step5'), {
        attributes: true
    });
});