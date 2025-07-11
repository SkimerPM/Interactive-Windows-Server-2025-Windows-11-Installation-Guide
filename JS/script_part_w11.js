function cancelar(id) {
            const el = document.getElementById(id);
            if (el) {
                el.classList.remove('visible');
            }
        }

        const btnsig = document.getElementById("btnSiguiente");

        btnsig.addEventListener("click", function() {
            if (!this.disabled) {
                window.location.href = "./listo.html";
            }
        });

        let filaSeleccionada = null;
        let conta = 0;

        document.addEventListener('DOMContentLoaded', () => {
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
            const tr6 = document.getElementById('tr6');

            filas.forEach(fila => {
                fila.addEventListener("click", () => {
                    filas.forEach(f => f.classList.remove("fila-seleccionada"));
                    fila.classList.add("fila-seleccionada");

                    filaSeleccionada = fila;

                    const nombre = fila.children[0]?.textContent || "";

                    if (formatear) {
                        if (nombre.includes("Partición 3") || nombre.includes("Partición 4")) {
                            formatear.classList.remove("gris");
                            formatear.querySelector('svg').setAttribute('stroke', '#3C78B7');
                        } else {
                            formatear.classList.add("gris");
                            formatear.querySelector('svg').setAttribute('stroke', '#96989b');
                        }
                        
                        if(conta === 0){
                            formatear.addEventListener("click", () => {
                                if (!formatear.classList.contains("gris")) {
                                    alert("Formateado correctamente");
                                }
                            });
                            conta += 1;
                        }
                    }

                    const tamaño = fila.children[1]?.textContent || "";
                    const espacio = fila.children[2]?.textContent || "";
                    const tipo = fila.children[3]?.textContent || "";
                    console.log({ nombre, tamaño, espacio, tipo });
                });
            });

            if (crear && formCrear) {
                crear.addEventListener("click", () => {
                    if (filaSeleccionada && filaSeleccionada.children[0]?.textContent.includes("Espacio sin asignar")) {
                        formCrear.classList.add('visible');
                        // Limpiar el input cuando se abre el formulario
                        inputTamaño.value = "";
                    } else {
                        alert("Selecciona un espacio sin asignar para crear una partición");
                    }
                });
            }

            if (aplicar && inputTamaño && errorCard) {
                aplicar.addEventListener("click", () => {
                    const valor = parseInt(inputTamaño.value.trim());

                    if (!filaSeleccionada) {
                        alert("Debes seleccionar una partición.");
                        return;
                    }

                    const nombre = filaSeleccionada.children[0]?.textContent || "";
                    const tamanoTotal = filaSeleccionada.children[1]?.textContent || "";

                    if (nombre === "Disco 0 Espacio sin asignar") {
                        // Primera partición - 80 GB inicial
                        if (tamanoTotal === "80.0 GB") {
                            if (valor !== 53248) { // 52 GB en MB (53248 MB)
                                errorCard.innerHTML = `
                                    <h3>Ups, algo no está bien</h3>
                                    <p><strong>El valor debe ser 53248 MB para la partición principal.</strong></p>
                                    <p>Inténtalo de nuevo. Tú puedes.</p>
                                `;
                                errorCard.classList.add("activo");
                                setTimeout(() => errorCard.classList.remove("activo"), 4000);
                            } else {
                                // Crear particiones automáticamente (100MB + 16MB) y la de 52GB
                                tr1.classList.add('none');
                                tr2.classList.add("visibleTabla");
                                tr3.classList.add("visibleTabla");
                                tr4.classList.add("visibleTabla");
                                tr5.classList.add("visibleTabla");
                                formCrear.classList.remove("visible");
                                errorCard.classList.remove("activo");
                            }
                        }
                        // Segunda partición - espacio restante (27.9 GB)
                        else if (tamanoTotal === "27.9 GB") {
                            const espacioRestante = 28554; // 28554 MB aproximadamente
                            if (valor !== 28554) {
                                errorCard.innerHTML = `
                                    <h3>Ups, algo no está bien</h3>
                                    <p><strong>Debes usar todo el espacio restante (que es ${espacioRestante} MB).</strong></p>
                                    <p>Inténtalo de nuevo. Tú puedes.</p>
                                `;
                                errorCard.classList.add("activo");
                                setTimeout(() => errorCard.classList.remove("activo"), 4000);
                            } else {
                                // Al crear la última partición, ocultar el espacio sin asignar restante
                                tr5.classList.remove("visibleTabla"); // Quitar la clase visibleTabla
                                tr5.classList.add('none'); // Ocultar definitivamente el espacio sin asignar
                                tr6.classList.add("visibleTabla"); // Mostrar la partición 4
                                formCrear.classList.remove("visible");
                                errorCard.classList.remove("activo");

                                // Habilitar botón siguiente cuando se completen todas las particiones
                                btnsig.disabled = false;
                                btnsig.classList.remove("btn-disabled");
                                btnsig.classList.add("btn-next");
                            }
                        }
                    }
                });
            }
        });