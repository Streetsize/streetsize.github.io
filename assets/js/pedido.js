// Función para calcular y actualizar el total
function calcularTotal() {
    const cantidad1 = parseInt(document.getElementById("cantidad").value);
    const precioUnitario = 3700.0;
    const envío = document.getElementById("envioDomicilio").checked ? 400 : 0;

    let total = cantidad1 * precioUnitario;

    if (document.getElementById("agregarOtraPrenda").checked) {
        const cantidad2 = parseInt(document.getElementById("cantidad2").value);
        total += cantidad2 * precioUnitario; // Agrega el costo de la segunda prenda al total
    }

    total += envío;

    // Actualiza el texto en el elemento "total"
    document.getElementById("total").textContent = total.toLocaleString();
    document.getElementById("precioTachado").innerHTML = `<s>${(total * 2).toLocaleString()}`;

}

// Escucha el evento "input" en el campo de cantidad y en la casilla de envío
document.getElementById("cantidad").addEventListener("input", calcularTotal);
document.getElementById("cantidad2").addEventListener("input", calcularTotal);
document.getElementById("envioDomicilio").addEventListener("change", calcularTotal);

// Muestra u oculta los campos de ubicación y costo de envío según la casilla de envío
document.getElementById("envioDomicilio").addEventListener("change", function () {
    const ubicacionDiv = document.getElementById("ubicacionDiv");
    const costoEnvio = document.getElementById("costoEnvio");
    if (this.checked) {
        ubicacionDiv.style.display = "block";
        costoEnvio.style.display = "block";
    } else {
        ubicacionDiv.style.display = "none";
        costoEnvio.style.display = "none";
    }
    calcularTotal();
});

// Muestra u oculta el segundo conjunto de campos según la casilla "Agregar otra prenda"
document.getElementById("agregarOtraPrenda").addEventListener("change", function () {
    const segundaPrenda = document.getElementById("segundaPrenda");
    if (this.checked) {
        segundaPrenda.style.display = "block";
    } else {
        segundaPrenda.style.display = "none";
    }
    calcularTotal();
});

// Asegurarse de que el código se ejecute después de que el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    // Obtener referencia al elemento de imagen de la primera prenda
    const imagenRemera = document.getElementById('imagenRemera');
    // Obtener referencia al elemento de imagen de la segunda prenda
    const imagenRemera2 = document.getElementById('imagenRemera2');

    // Obtener referencia al elemento de selección de color de la primera prenda
    const selectColor = document.getElementById('color');
    // Obtener referencia al elemento de selección de color de la segunda prenda
    const selectColor2 = document.getElementById('color2');

    // Definir un objeto que mapea los colores a las rutas de las imágenes para la primera prenda
    const colorImagenes = {
        Blanco: 'assets/img/remera/blanco.webp',
        Negro: 'assets/img/remera/negro.webp',
        AzulPetroleo: 'assets/img/remera/azulpetroleo.webp',
        Mostaza: 'assets/img/remera/mostaza.webp',
        Celeste: 'assets/img/remera/celeste.webp',
        Bordo: 'assets/img/remera/bordo.webp',
        Rosado: 'assets/img/remera/rosado.webp',
        // Agrega más rutas de imágenes para otros colores aquí
    };

    // Definir un objeto que mapea los colores a las rutas de las imágenes para la segunda prenda
    const colorImagenes2 = {
        Blanco: 'assets/img/remera/blanco.webp',
        Negro: 'assets/img/remera/negro.webp',
        AzulPetroleo: 'assets/img/remera/azulpetroleo.webp',
        Mostaza: 'assets/img/remera/mostaza.webp',
        Celeste: 'assets/img/remera/celeste.webp',
        Bordo: 'assets/img/remera/bordo.webp',
        Rosado: 'assets/img/remera/rosado.webp',
        // Agrega más rutas de imágenes para otros colores aquí
    };

    // Agregar un evento para detectar cambios en la selección de color de la primera prenda
    selectColor.addEventListener('change', function () {
        const selectedColor = this.value; // Obtener el valor seleccionado

        // Verificar si hay una ruta de imagen para el color seleccionado en la primera prenda
        if (colorImagenes[selectedColor]) {
            // Actualizar la fuente de la imagen de la primera prenda con la ruta correspondiente
            imagenRemera.src = colorImagenes[selectedColor];
        }
    });

    // Agregar un evento para detectar cambios en la selección de color de la segunda prenda
    selectColor2.addEventListener('change', function () {
        const selectedColor = this.value; // Obtener el valor seleccionado

        // Verificar si hay una ruta de imagen para el color seleccionado en la segunda prenda
        if (colorImagenes2[selectedColor]) {
            // Actualizar la fuente de la imagen de la segunda prenda con la ruta correspondiente
            imagenRemera2.src = colorImagenes2[selectedColor];
        }
    });

    // Agregar evento al checkbox "Agregar otra prenda" para mostrar u ocultar la segunda prenda
    document.getElementById('agregarOtraPrenda').addEventListener('change', function () {
        const segundaPrenda = document.getElementById('segundaPrenda');

        if (this.checked) {
            segundaPrenda.style.display = 'block';
        } else {
            segundaPrenda.style.display = 'none';
        }
    });

    // Agregar evento al checkbox "Envío a domicilio" para mostrar u ocultar la ubicación y el costo de envío
    document.getElementById('envioDomicilio').addEventListener('change', function () {
        const ubicacionDiv = document.getElementById('ubicacionDiv');
        const costoEnvio = document.getElementById('costoEnvio');

        if (this.checked) {
            ubicacionDiv.style.display = 'block';
            costoEnvio.style.display = 'block';
        } else {
            ubicacionDiv.style.display = 'none';
            costoEnvio.style.display = 'none';
        }
    });

    // Agregar evento al botón "Continuar" para generar el enlace de WhatsApp con los detalles del pedido
    document.getElementById('generar-enlace').addEventListener('click', function () {
        const talle1 = document.getElementById('talle').value;
        const color1 = document.getElementById('color').value;
        const cantidad1 = document.getElementById('cantidad').value;
        const envioDomicilio = document.getElementById('envioDomicilio').checked;
        const ubicacion = document.getElementById('ubicacion').value;

        let mensaje = `¡Hola! Mi pedido es el siguiente:\n\n-${cantidad1} REMERA Talle: *${talle1}* Color: *${color1}*.`;

        // Si el usuario ha marcado "Agregar otra prenda", agregamos los detalles de la segunda prenda al mensaje
        if (document.getElementById('agregarOtraPrenda').checked) {
            const talle2 = document.getElementById('talle2').value;
            const color2 = document.getElementById('color2').value;
            const cantidad2 = document.getElementById('cantidad2').value;

            mensaje += `\n\n-${cantidad2} REMERA Talle: *${talle2}* Color: *${color2}*.`;
        }

        if (envioDomicilio) {
            mensaje += `\n\nMi ubicación de entrega es: ${ubicacion}.\n\nAguardare indicaciones para realizar el pago.`;
        } else {
            mensaje += '%0A%0ADeseo retirar mi producto en un punto de encuentro.\n\nAguardare indicaciones para realizar el pago.';
        }

        const mensajeCodificado = encodeURIComponent(mensaje);
        const enlaceWhatsApp = `https://api.whatsapp.com/send?phone=5492612527052&text=${mensajeCodificado}`;
        window.open(enlaceWhatsApp, '_blank');
    });
});
