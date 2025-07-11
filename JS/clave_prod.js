const productKeyInput = document.getElementById('productKey');
        const charCounter = document.getElementById('charCounter');
        
        // Caracteres prohibidos
        const forbiddenChars = ['A', 'E', 'I', 'O', 'U', 'S', 'L', 'Ñ', 'Z', '1', '0'];
        
        productKeyInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^A-Z0-9]/gi, '').toUpperCase();
            
            // Verificar caracteres prohibidos
            let invalidChar = null;
            for (let char of value) {
                if (forbiddenChars.includes(char)) {
                    invalidChar = char;
                    // Remover el caracter prohibido
                    value = value.replace(new RegExp(char, 'g'), '');
                    break;
                }
            }
            
            // Limitar a 25 caracteres (sin contar guiones)
            if (value.length > 25) {
                value = value.substring(0, 25);
            }
            
            // Agregar guiones automáticamente
            let formattedValue = '';
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 5 === 0) {
                    formattedValue += '-';
                }
                formattedValue += value[i];
            }
            
            e.target.value = formattedValue;
            
            // Mostrar mensaje de carácter inválido
            if (invalidChar) {
                charCounter.textContent = `"${invalidChar}" no es un carácter válido`;
                charCounter.style.color = '#2a8dd4';
                return;
            }
            
            // Actualizar contador (25 caracteres max sin guiones)
            const remainingChars = 25 - value.length;
            
            if (remainingChars === 1) {
                charCounter.textContent = `1 carácter restante`;
                charCounter.style.color = '#2a8dd4';
            } else if (remainingChars === 0) {
                // Mostrar "Comprobando la clave" por 1.5 segundos
                charCounter.textContent = `Comprobando la clave`;
                charCounter.style.color = '#2a8dd4';
                setTimeout(() => {
                    charCounter.textContent = `Esta clave de producto no funciona. Compruébala e inténtalo de nuevo, o prueba con una clave distinta.`;
                    charCounter.style.color = '#2a8dd4';
                }, 1500);
            } else {
                charCounter.textContent = `Quedan ${remainingChars} caracteres`;
                charCounter.style.color = '#2a8dd4';
            }
        });
        
        // Permitir solo letras y números, pero verificar caracteres prohibidos
        productKeyInput.addEventListener('keypress', function(e) {
            const char = String.fromCharCode(e.which).toUpperCase();
            
            // Bloquear caracteres especiales
            if (!/[A-Z0-9]/i.test(char) && e.which !== 8 && e.which !== 46) {
                e.preventDefault();
                charCounter.textContent = `"${String.fromCharCode(e.which)}" no es un carácter válido`;
                charCounter.style.color = '#2a8dd4';
                return;
            }
            
            // Bloquear caracteres prohibidos
            if (forbiddenChars.includes(char)) {
                e.preventDefault();
                charCounter.textContent = `"${char}" no es un carácter válido`;
                charCounter.style.color = '#2a8dd4';
                return;
            }
        });

        // Modal de Ayuda
        const privacyLink = document.getElementById('privacyLink');
        const modalOverlay = document.getElementById('modalOverlay');
        const modalHelp = document.getElementById('modalHelp');
        const modalClose = document.getElementById('modalClose');
        const modalOk = document.getElementById('modalOk');
        
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            modalOverlay.style.display = 'block';
            modalHelp.style.display = 'block';
        });
        
        modalClose.addEventListener('click', function() {
            modalOverlay.style.display = 'none';
            modalHelp.style.display = 'none';
        });
        
        modalOk.addEventListener('click', function() {
            modalOverlay.style.display = 'none';
            modalHelp.style.display = 'none';
        });
        
        modalOverlay.addEventListener('click', function() {
            modalOverlay.style.display = 'none';
            modalHelp.style.display = 'none';
        });
        