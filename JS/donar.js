document.addEventListener('DOMContentLoaded', () => {
    const graciasView = document.getElementById('gracias-view');
    const btnCerrar = document.getElementById('btn-cerrar');
    const numeroTexto = document.querySelector('.numero-texto');
    const feedback = document.querySelector('.copiado-feedback');
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    document.body.appendChild(confetti);

    // 1. Copiar número y preparar agradecimiento
    numeroTexto.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText('Es Broma, todo esto fue hecho con cariño para ayudarte :]');
            feedback.textContent = '¡Copiado!';
            feedback.style.opacity = '1';
            setTimeout(() => feedback.style.opacity = '0', 2000);
            
            // Marcamos para mostrar agradecimiento al regresar
            localStorage.setItem('mostrarAgradecimiento', 'true');
        } catch {
            feedback.textContent = 'Error al copiar';
            feedback.style.opacity = '1';
            setTimeout(() => feedback.style.opacity = '0', 2000);
        }
    });

    // 2. Verificar si debe mostrar agradecimiento
    if (localStorage.getItem('mostrarAgradecimiento') === 'true') {
        graciasView.classList.add('active');
        confetti.style.opacity = '1';
        setTimeout(() => confetti.style.opacity = '0', 3000);
        localStorage.removeItem('mostrarAgradecimiento');
    }

    // 3. Cerrar notificación
    btnCerrar.addEventListener('click', () => {
        graciasView.classList.remove('active');
    });

    // 4. Detectar cuando el usuario regresa a la pestaña
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && localStorage.getItem('mostrarAgradecimiento') === 'true') {
            graciasView.classList.add('active');
            confetti.style.opacity = '1';
            setTimeout(() => confetti.style.opacity = '0', 3000);
            localStorage.removeItem('mostrarAgradecimiento');
        }
    });
});