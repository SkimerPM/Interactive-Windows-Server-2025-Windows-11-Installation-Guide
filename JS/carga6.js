document.addEventListener('DOMContentLoaded', function() {
    const titleElement = document.querySelector('.main-title');
    const urlParams = new URLSearchParams(window.location.search);
    const targetPage = urlParams.get('next') || 'particion.html';
    
    // Secuencia de tiempos
    setTimeout(() => titleElement.textContent = 'Comprobando discos', 4000);
    setTimeout(() => window.location.href = targetPage, 5000);
});