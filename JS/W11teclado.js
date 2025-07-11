// Country selection functionality
        const countryOptions = document.querySelectorAll('.country-option');
        let selectedCountry = 'espanol';

        countryOptions.forEach(option => {
            option.addEventListener('click', () => {
                countryOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                selectedCountry = option.dataset.country;
            });
        });

        // Confirm selection and show loading
        function confirmSelection() {
            const loadingScreen = document.getElementById('loadingScreen');
            const btn = document.querySelector('.btn-yes');
            
            // Disable button to prevent multiple clicks
            btn.disabled = true;
            
            // Show loading screen with fade-in effect
            loadingScreen.classList.add('active', 'fade-in');
            
            // Simulate loading process
            setTimeout(() => {
                console.log(`País seleccionado: ${selectedCountry}`);
                
                // For demo purposes, hide loading after 3 seconds
                // In real implementation, you'd navigate to the next step
                setTimeout(() => {
                    window.location.href = 'teclado_2dist.html';
                }, 2000); // 1000ms = 1 segundo de espera

            }, 500);
        }

        // Optional: Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                confirmSelection();
            }
        });

        document.addEventListener('DOMContentLoaded', () => {
            const backButton = document.getElementById('backButton');
            
            if (backButton) {
                backButton.addEventListener('click', () => {
                    // Esta función es como presionar el botón "Atrás" del navegador.
                    window.history.back();
                });
            }

        });