// Función para mostrar el popup después de 30 segundos
function mostrarPopup() {
    setTimeout(function() {
        var popupig = document.getElementById("popupig");
        popupig.style.display = "block";
    }, 15000); // 30 segundos en milisegundos
}

// Función para cerrar el popup
function cerrarPopupig() {
    var popupig = document.getElementById("popupig");
    popupig.style.display = "none";
}

// Mostrar el popup después de 30 segundos al cargar la página
window.addEventListener("load", mostrarPopup);

// Cerrar el popup al hacer clic en cualquier parte de la página
document.body.addEventListener("click", function(event) {
    if (event.target === popupig) {
        cerrarPopupig();
    }
});

document.getElementById("close-popupig").addEventListener("click", cerrarPopupig);
