// Obtener referencia al elemento de imagen
const imagenRemera = document.getElementById('imagenRemera');

// Obtener referencia al elemento de selección de color
const selectColor = document.getElementById('color');

// Agregar un evento para detectar cambios en la selección de color
selectColor.addEventListener('change', function() {
    const selectedColor = this.value; // Obtener el valor seleccionado

    // Definir un objeto que mapea los colores a las rutas de las imágenes
    const colorImagenes = {
        Blanco: 'image1.jpg',
        Negro: 'image2.jpg',
        'Azul Petroleo': 'ruta_a_la_imagen_azul_petroleo.jpg',
        // Agrega más rutas de imágenes para otros colores aquí
    };

    // Verificar si hay una ruta de imagen para el color seleccionado
    if (colorImagenes[selectedColor]) {
        // Actualizar la fuente de la imagen con la ruta correspondiente
        imagenRemera.src = colorImagenes[selectedColor];
    }
});
