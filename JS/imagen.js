document.addEventListener('DOMContentLoaded', function () {

    const descriptions = {
        'standard': '(Recomendado) Esta opción omite la mayor parte del entorno gráfico de Windows. Lleva a cabo la administración con un símbolo del sistema y PowerShell, o de forma remota con Windows Admin Center u otras herramientas.',
        'standard-desktop': 'Esta opción instala el entorno gráfico de Windows completo y consume espacio adicional de la unidad. Puede resultarte útil si quieres utilizar el escritorio de Windows o tienes una aplicación que lo requiere.',
        'datacenter': '(Recomendado) Esta opción omite la mayor parte del entorno gráfico de Windows. Lleva a cabo la administración con un símbolo del sistema y PowerShell, o de forma remota con Windows Admin Center u otras herramientas.',
        'datacenter-desktop': 'Esta opción instala el entorno gráfico de Windows completo y consume espacio adicional de la unidad. Puede resultarte útil si quieres utilizar el escritorio de Windows o tienes una aplicación que lo requiere.'
    };

    // Obtener elementos
    const options = document.querySelectorAll('.os-option');
    const descriptionElement = document.getElementById('description');

    // Función para actualizar la selección (sin cambios)
    function updateSelection(selectedOption) {
        // Remover selección anterior
        options.forEach(option => option.classList.remove('selected'));
        
        // Agregar selección a la opción clickeada
        selectedOption.classList.add('selected');
        
        // Actualizar descripción
        const osType = selectedOption.getAttribute('data-os');
        descriptionElement.style.opacity = '0';
        
        setTimeout(() => {
            descriptionElement.textContent = descriptions[osType];
            descriptionElement.style.opacity = '1';
        }, 20); // Una pequeña transición para la opacidad
    }

    // Agregar event listeners a todas las opciones
    options.forEach(option => {
        option.addEventListener('click', () => {
            // 1. Ejecuta la lógica original de la página
            updateSelection(option);

            // 2. AÑADIDO: Dispara un evento personalizado para que el tutorial lo escuche
            document.dispatchEvent(new CustomEvent('customActionTriggered', {
                detail: {
                    actionId: 'osOptionClicked', // Nombre de la acción que definimos en los pasos
                    elementId: option.getAttribute('data-os') // El identificador único del elemento clickeado
                }
            }));
        });
    });
});