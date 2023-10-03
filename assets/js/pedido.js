        document.getElementById('agregarOtraPrenda').addEventListener('change', function() {
            const segundaPrenda = document.getElementById('segundaPrenda');

            if (this.checked) {
                segundaPrenda.style.display = 'block';
            } else {
                segundaPrenda.style.display = 'none';
            }
        });

        document.getElementById('envioDomicilio').addEventListener('change', function() {
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

        document.getElementById('generar-enlace').addEventListener('click', function() {
            const talle1 = document.getElementById('talle').value;
            const color1 = document.getElementById('color').value;
			const cantidad1 = document.getElementById('cantidad').value;
            const envioDomicilio = document.getElementById('envioDomicilio').checked;
            const ubicacion = document.getElementById('ubicacion').value;

            let mensaje = `¡Hola! Quiero ordenar ${cantidad1} remera Oversize 100% algodón con Talle: ${talle1} y Color: ${color1}.`;

            // Si el usuario ha marcado "Agregar otra prenda", agregamos los detalles de la segunda prenda al mensaje
            if (document.getElementById('agregarOtraPrenda').checked) {
                const talle2 = document.getElementById('talle2').value;
                const color2 = document.getElementById('color2').value;
			const cantidad2 = document.getElementById('cantidad2').value;

                mensaje += ` También quiero ${cantidad2} remera de Talle: ${talle2} y Color: ${color2}.`;
            }
			
			            if (envioDomicilio) {
                mensaje += ` Mi ubicación de entrega es: ${ubicacion}.`;
            } else {
                mensaje += ' Deseo retirar mi producto en un punto de encuentro.';
            }

            const mensajeCodificado = encodeURIComponent(mensaje);
            const enlaceWhatsApp = `https://api.whatsapp.com/send?phone=5492612527052&text=${mensajeCodificado}`;
            window.open(enlaceWhatsApp, '_blank');
        });