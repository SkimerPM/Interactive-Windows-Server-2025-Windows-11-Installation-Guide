// Variables para el control del deslizamiento en móviles
let startX = 0;
let endX = 0;
const swipeThreshold = 100; // Mínimo de píxeles para considerar un deslizamiento

// Actualizar hora y fecha
function updateDateTime() {
    const now = new Date();

    // Formatear la hora
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('current-time').textContent = `${hours}:${minutes}`;

    // Formatear la fecha
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const dateStr = now.toLocaleDateString('es-ES', options);
    document.getElementById('current-date').textContent = dateStr;
}

// Función para mostrar el formulario de login
function showLoginForm() {
    const lockIcon = document.getElementById('lock-icon');
    lockIcon.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAr0lEQVR4nO2TTQrCMBCFs1d3ep/aE+hxxI32SPYe9Sj+bssntq8bQQl0UojMB4FAHjMv8xOCkxvACqiABnjqvO9HYJk6+Ra48Z0rsEmZvFWiE1AAM501UOutNTdBX/bh57sfur00F9N20Pe8+3mEdqjEwdLAWUGLCG0pbWNp4KGg8wjtQtq7pYGOVHrzgP9hAGPyNRBG4gbwFggfwuBrONnwfOBDyNg1tCI/A06YiBezS/qBMHmeLQAAAABJRU5ErkJggg==";
    lockIcon.style.transform = 'scale(1.1)';

    setTimeout(() => {
        document.querySelector('.window-background').classList.add('darkened');
        document.getElementById('lock-screen').classList.add('hidden');
        document.getElementById('login-form').classList.add('visible');

        // Enfocar el input de la contraseña después de que el formulario sea visible
        const passwordInput = document.querySelector('.login-form input[type="password"]');
        if (passwordInput) {
            passwordInput.focus();
        }
    }, 300);
}

document.addEventListener('DOMContentLoaded', function () {
    const lockScreen = document.getElementById('lock-screen');
    if (lockScreen) {
        lockScreen.tabIndex = 0;

        setTimeout(() => {
            lockScreen.focus();
        }, 100);

        lockScreen.addEventListener('keydown', function (e) {
            console.log('Tecla presionada:', e.key, 'Ctrl:', e.ctrlKey, 'Alt:', e.altKey);
            if (e.ctrlKey && e.altKey && (e.key === 'Delete' || e.key === 'Del' || e.key === 'Backspace')) {
                showLoginForm();
            }
        });

        document.querySelector('.window').addEventListener('click', function () {
            // lockScreen.focus();
        });
    }

    updateDateTime();
    checkIfMobile();
    setInterval(updateDateTime, 60000);
});


const lockScreenSwipe = document.getElementById('lock-screen');
if (lockScreenSwipe) {
    lockScreenSwipe.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
    });

    lockScreenSwipe.addEventListener('touchmove', function (e) {
        endX = e.touches[0].clientX;
    });

    lockScreenSwipe.addEventListener('touchend', function () {
        const distance = endX - startX;
        if (Math.abs(distance) > swipeThreshold) {
            showLoginForm();
        }
        startX = 0;
        endX = 0;
    });
}
// >>>>>> INICIO DE LOS CAMBIOS <<<<<<
const togglePasswordIcon = document.getElementById('next-page-button'); // El icono de la IZQUIERDA (ojo cerrado inicialmente)
const passwordInput = document.getElementById('password-input');
const nextPageButton = document.getElementById('toggle-password'); // El icono de la DERECHA (flecha inicialmente)
const eyeOpenIconURL = "https://img.icons8.com/?size=100&id=85028&format=png&color=000000"; // URL del ojo ABIERTO
const eyeClosedIconURL = "https://img.icons8.com/?size=100&id=96151&format=png&color=000000"; // URL del ojo CERRADO
const nextPageURL = "gui/principal.html"; // URL de la página siguiente

const loadingIndicator = document.getElementById('loading-indicator'); // Obtener referencia al indicador de carga
const loginForm = document.getElementById('login-form');
const userIcon = document.querySelector('.user-icon'); // Obtener el icono de usuario
const userDisplay = document.getElementById('user'); // Obtener el nombre de usuario
const passwordInputContainer = document.querySelector('.password-input-container'); // Obtener el contenedor del input

function startLoadingAnimation() {
    if (loginForm && loadingIndicator && userIcon && userDisplay && passwordInputContainer) {
        loginForm.classList.add('loading-state'); // Aplicar la clase para mostrar el estado de carga
        // Simular carga y luego redirigir
        setTimeout(() => {
            window.location.href = nextPageURL;
        }, 1000); // Espera 2 segundos antes de redirigir
    } else {
        window.location.href = nextPageURL;
    }
}

// Funcionalidad del icono de la IZQUIERDA (ojo cerrado inicialmente) para mostrar/ocultar contraseña
if (togglePasswordIcon && passwordInput) {
    togglePasswordIcon.addEventListener('click', function() {
        console.log("¡Se hizo clic en el icono del ojo izquierdo!");
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        // 'this' AHORA es la etiqueta <img>, así que usamos 'this.src' directamente
        this.src = type === 'password' ? eyeClosedIconURL : eyeOpenIconURL;
        console.log("Cambiando la fuente a:", this.src);
    });
}

// Funcionalidad del icono de la DERECHA (flecha inicialmente) para ir a la siguiente página
if (nextPageButton) {
    nextPageButton.addEventListener('click', startLoadingAnimation);
}

// Funcionalidad de la tecla Enter en el input de la contraseña (ir a la siguiente página)
if (passwordInput) {
    passwordInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            startLoadingAnimation();
        }
    });
}
// >>>>>> FIN DE LOS CAMBIOS <<<<<<


function checkIfMobile() {
    if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        document.querySelector('.unlock-instruction').style.display = 'none';
        document.querySelector('.swipe-instruction').style.display = 'block';
    }
}



// mi parte

const user = document.getElementById('user');

const nombreUsuario = localStorage.getItem('usuario') || 'Desconocido';

user.innerText = nombreUsuario;
const password = localStorage.getItem('password')