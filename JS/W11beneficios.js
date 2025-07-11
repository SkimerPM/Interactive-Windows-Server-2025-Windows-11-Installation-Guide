document.addEventListener('DOMContentLoaded', () => {
    const continueButton = document.getElementById('continueButton');

    if (continueButton) {
        continueButton.addEventListener('click', () => {
            window.location.href = 'cuenta.html';
        });
    }
});