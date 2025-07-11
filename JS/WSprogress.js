document.addEventListener('DOMContentLoaded', function () {
    const progressText = document.getElementById('progressText');
    const cancelBtn = document.querySelector('.cancel-btn');
    const spinner = document.querySelector('.windows-spinner');

    let progress = 0;
    const totalSteps = 100;
    let installationInterval;
    let installationCompleted = false;

    // Función para velocidad variable
    function getCurrentSpeed() {
        if (progress < 20) return 200 + Math.random() * 10;
        if (progress < 60) return 100 + Math.random() * 60;
        return 50 + Math.random() * 30;
    }

    function updateProgress() {
        if (progress < totalSteps) {
            progress += 1;
            progressText.textContent = `${progress}% completado`;
            installationInterval = setTimeout(updateProgress, getCurrentSpeed());
        } else {
            // Instalación completada CALLA EMO .l.
            progressText.textContent = "100% completado";
            spinner.style.display = 'none';
            cancelBtn.textContent = "Finalizar";
            installationCompleted = true;
            window.location.href = "/vistas/wserver/reiniciar.html";
        }
    }

    function handleCancelBtnClick() {
        if (!installationCompleted) {
            clearTimeout(installationInterval);
            progressText.textContent = "Instalación cancelada";
            spinner.style.display = 'none';
            cancelBtn.textContent = "Cerrar";
            cancelBtn.style.display = 'none'
            setTimeout(() => {
                window.location.href = "/vistas/wserver/particion.html";
            }, 2000);
            // Redirigir a la siguiente página
            // window.location.href = "/vistas/wserver/personalizar_config.html";
        }
    }

    // Iniciar con delay para mostrar el spinner
    setTimeout(() => {
        updateProgress();
    }, 800);

    cancelBtn.addEventListener('click', handleCancelBtnClick);
});
