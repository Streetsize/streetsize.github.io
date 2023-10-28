// Función para mostrar el popup solo la primera vez
function mostrarPopup() {
    // Verificar si se ha establecido una cookie que indica que el popup ya se ha mostrado
    if (document.cookie.indexOf("popupShown=true") === -1) {
        // Establecer un temporizador de 15 segundos antes de mostrar el popup
        setTimeout(function() {
            var popupig = document.getElementById("popupig");
            popupig.style.display = "block";
        
            // Habilitar la función de cierre después de 3 segundos
            setTimeout(function() {
                document.body.addEventListener("click", cerrarPopupig);
            }, 3000); // 3 segundos en milisegundos
        
            // Establecer una cookie que indica que el popup se ha mostrado
            document.cookie = "popupShown=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
        }, 15000); // 15 segundos en milisegundos
    }
}

// Función para cerrar el popup
function cerrarPopupig() {
    var popupig = document.getElementById("popupig");
    popupig.style.display = "none";
    // Deshabilitar la función de cierre
    document.body.removeEventListener("click", cerrarPopupig);
}

// Llamar a la función mostrarPopup después de que se haya cargado la página
window.addEventListener("load", mostrarPopup);

document.getElementById("close-popupig").addEventListener("click", cerrarPopupig);
