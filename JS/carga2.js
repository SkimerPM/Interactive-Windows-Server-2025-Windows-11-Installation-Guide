document.addEventListener('DOMContentLoaded', function() {
    const titleElement = document.querySelector('.main-title');
    const urlParams = new URLSearchParams(window.location.search);
    const targetPage = urlParams.get('next') || 'terminos.html';
    
    // Secuencia de tiempos
    setTimeout(() => titleElement.textContent = 'Comprobando el equipo', 2000);
    setTimeout(() => window.location.href = targetPage, 2500);
});