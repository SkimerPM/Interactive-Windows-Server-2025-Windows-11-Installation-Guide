// Es global para que la función onclick del HTML la vea.
function cancelar(id) {
    const el = document.getElementById(id);
    if (el) {
        el.classList.remove('visible');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA ORIGINAL DE LA PÁGINA ---

    let filaSeleccionada = null;
    let conta = 0;

    const btnsig = document.getElementById("btnSiguiente");
    const filas = document.querySelectorAll("tbody tr");
    const formatear = document.getElementById('formatear');
    const crear = document.getElementById('crearParticion');
    const formCrear = document.getElementById('apply-cancel-bar');
    const aplicar = document.getElementById('apply-button');
    const inputTamaño = document.getElementById("tamaño");
    const errorCard = document.getElementById("error-card");

    const tr1 = document.getElementById('tr1');
    const tr2 = document.getElementById('tr2');
    const tr3 = document.getElementById('tr3');
    const tr4 = document.getElementById('tr4');
    const tr5 = document.getElementById('tr5');

    filas.forEach(fila => {
        fila.addEventListener("click", () => {
            filas.forEach(f => f.classList.remove("fila-seleccionada"));
            fila.classList.add("fila-seleccionada");
            filaSeleccionada = fila;

            const nombre = fila.children[0]?.textContent || "";

            if (formatear) {
                if (nombre === "Disco 0 partición 2" || nombre === "Disco 0 partición 3") {
                    formatear.classList.remove("gris");
                } else {
                    formatear.classList.add("gris");
                }
                if (conta === 0) {
                    formatear.addEventListener("click", () => {
                        alert("Formateado correctamente");
                    });
                    conta += 1;
                }
            }
        });
    });

    if (crear && formCrear) {
        crear.addEventListener("click", () => {
            formCrear.classList.add('visible');
        });
    }

    if (aplicar && inputTamaño && errorCard) {
        aplicar.addEventListener("click", () => {
            const valor = inputTamaño.value.trim();

            if (!filaSeleccionada) {
                alert("Debes seleccionar una partición.");
                return;
            }

            const nombre = filaSeleccionada.children[0]?.textContent || "";
            const tamanoTotal = filaSeleccionada.children[1]?.textContent || "";

            if (nombre === "Disco 0 Espacio sin asignar") {
                if (parseInt(valor) !== 25599 && tamanoTotal === "50.0 GB") {
                    errorCard.innerHTML = `<p><strong>El valor ingresado no es la mitad del total (50.0 GB).</strong> Inténtalo de nuevo.</p>`;
                    errorCard.classList.add("activo");
                } else if (parseInt(valor) === 25599 && tamanoTotal === "50.0 GB") {
                    tr1?.classList.add('none');
                    tr2?.classList.add("visibleTabla");
                    tr3?.classList.add("visibleTabla");
                    tr4?.classList.add("visibleTabla");
                    formCrear.classList.remove("visible");
                    errorCard.classList.remove("activo");
                } else if (tamanoTotal === "24.9 GB") {
                    if (parseInt(valor) !== 25497) {
                        errorCard.innerHTML = `<p><strong>El valor ingresado no coincide.</strong> Inténtalo de nuevo.</p>`;
                        errorCard.classList.add("activo");
                    } else {
                        tr5?.classList.add("visibleTabla");
                        tr4?.classList.remove("visibleTabla");
                        errorCard.classList.remove("activo");
                        formCrear.classList.remove("visible");

                        btnsig.disabled = false;
                        btnsig.classList.remove("btn-disabled");
                        btnsig.classList.add("btn-next");
                    }
                } else {
                    errorCard.classList.remove("activo");
                }
            }
        });
    }

    // --- LÓGICA DEL TUTORIAL (DISPARADORES DE EVENTOS) ---
    // Esta sección se integra aquí para unificar todo en un solo archivo.

    // 1. Escuchar clics en todas las filas de la tabla para el tutorial
    filas.forEach(fila => {
        fila.addEventListener("click", () => {
            document.dispatchEvent(new CustomEvent('customActionTriggered', {
                detail: {
                    actionId: 'rowClicked',
                    elementId: fila.id
                }
            }));
        });
    });

    // 2. Escuchar clics en los botones de acción para el tutorial
    if (crear) {
        crear.addEventListener("click", () => {
            document.dispatchEvent(new CustomEvent('customActionTriggered', {
                detail: {
                    actionId: 'buttonClicked',
                    elementId: 'crearParticion'
                }
            }));
        });
    }

    if (aplicar) {
        aplicar.addEventListener("click", () => {
            document.dispatchEvent(new CustomEvent('customActionTriggered', {
                detail: {
                    actionId: 'buttonClicked',
                    elementId: 'apply-button'
                }
            }));
        });
    }
    
    // 3. Listener unificado para el botón "Siguiente" que maneja el tutorial y la navegación
    if (btnsig) {
        btnsig.addEventListener("click", (event) => {
            const step = window.currentTutorialSteps && window.currentTutorialSteps[window.currentStepIndex];
            
            // Si el tutorial está esperando este clic específico
            if (step && step.triggerEvent === 'buttonClicked' && step.nextStepAction === 'btnSiguiente') {
                event.preventDefault(); // Detiene cualquier acción por defecto (aunque sea un botón)

                document.dispatchEvent(new CustomEvent('customActionTriggered', {
                    detail: { actionId: 'buttonClicked', elementId: 'btnSiguiente' }
                }));

                // Navega solo después de que se cierre el último modal
                document.addEventListener('modalClosedCustom', function onFinalModalClose() {
                    window.location.href = "./listo.html";
                }, { once: true });
            
            } else if (!btnsig.disabled) {
                // Si el tutorial NO está esperando este clic, se comporta como un botón normal
                window.location.href = "./listo.html";
            }
        });
    }
});