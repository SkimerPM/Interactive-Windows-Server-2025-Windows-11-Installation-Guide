const descriptions = {
            'home': 'Windows 11 Home',
            'home-n': 'Windows 11 Home N',
            'home-sl': 'Windows 11 Home Single Language',
            'education': 'Windows 11 Education',
            'education-n': 'Windows 11 Education N',
            'pro': 'Windows 11 Pro',
            'pro-n': 'Windows 11 Pro N',
            'pro-education': 'Windows 11 Pro Education',
            'pro-education-n': 'Windows 11 Pro Education N',
            'pro-workstations': 'Windows 11 Pro for Workstations',
            'pro-workstations-n': 'Windows 11 Pro for Workstations N',
        };

        // Obtener elementos
        const options = document.querySelectorAll('.os-option');
        const descriptionElement = document.getElementById('description');

        // Función para actualizar la selección
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
            }, 20);
        }

        // Agregar event listeners a todas las opciones
        options.forEach(option => {
            option.addEventListener('click', () => {
                updateSelection(option);
            });
        });