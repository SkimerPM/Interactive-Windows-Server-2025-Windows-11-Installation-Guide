document.addEventListener('DOMContentLoaded', () => {
    // Array con todas las frases que se mostrarán en orden
    const loadingPhrases = [
        "Mantén tu PC encendida.",
        "Un momento, estamos configurando.",
        "Ponte cómodo mientras sucede la magia.",
        "Estamos preparando todo para ti.",
        "Gracias por tu paciencia.",
        "Lo bueno está por llegar.",
    ];

    const loadingTextElement = document.getElementById('loadingText');
    let phraseIndex = 0;

    // Función que se ejecutará para cambiar el texto
    const changePhrase = () => {
        // Si el índice supera la cantidad de frases, detenemos el ciclo.
        if (phraseIndex >= loadingPhrases.length) {
            clearInterval(phraseInterval); // Detiene las repeticiones
            setTimeout(() => {
                window.location.href = 'nombre_dispositivo.html';
            }, 4000); // Espera 4 segundos en el último mensaje antes de "reiniciar"
            
            return;
        }

        // Actualiza el texto en la pantalla
        loadingTextElement.textContent = loadingPhrases[phraseIndex];
        
        // Prepara el índice para la siguiente frase
        phraseIndex++;
    };

    // Inicia el ciclo: Llama a la función changePhrase cada 5 segundos
    // El primer cambio ocurrirá 5 segundos después de que aparezca "Comprobando si hay actualizaciones."
    const phraseInterval = setInterval(changePhrase, 5000);
});