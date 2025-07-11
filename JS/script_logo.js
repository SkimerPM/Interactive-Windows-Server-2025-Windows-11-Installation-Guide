// Script para simular la experiencia de la ventana de Windows
        document.addEventListener("DOMContentLoaded", function() {

            // Logo de Microsoft
            const msLogo = document.querySelector('.ms-logo');
            const msLogoContainer = document.createElement('div');
            msLogoContainer.style.display = 'flex';
            msLogoContainer.style.alignItems = 'center';
            
            // Recrear el logo de Microsoft de Windows Server
            const logoDiv = document.createElement('div');
            logoDiv.style.display = 'flex';
            logoDiv.style.alignItems = 'center';
            
            // Crear el cuadrado del logo de Windows
            const square = document.createElement('div');
            square.style.width = '18px';
            square.style.height = '18px';
            square.style.display = 'grid';
            square.style.gridTemplateColumns = '1fr 1fr';
            square.style.gridTemplateRows = '1fr 1fr';
            square.style.gap = '2px';
            square.style.marginRight = '6px';
            
            // Los 4 cuadrados del logo de Windows
            const squares = ['#F25022', '#7FBA00', '#00A4EF', '#FFB900'];
            for (let i = 0; i < 4; i++) {
                const miniSquare = document.createElement('div');
                miniSquare.style.backgroundColor = squares[i];
                square.appendChild(miniSquare);
            }
            
            const text = document.createElement('span');
            text.textContent = 'Microsoft';
            text.style.fontSize = '12px';
            text.style.fontWeight = 'bold';
            text.style.marginRight = '15px';
            
            logoDiv.appendChild(square);
            logoDiv.appendChild(text);
            
            msLogoContainer.appendChild(logoDiv);
            msLogo.parentElement.replaceChild(msLogoContainer, msLogo);

            // Mostrar la barra de título
            document.querySelector('.window-header').style.display = 'flex';
        });

