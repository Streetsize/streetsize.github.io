import tkinter as tk
from tkinter import messagebox
import os
import re

def actualizar_precio():
    try:
        nuevo_precio = float(precio_entry.get())  # Convertir a número
        nuevo_precio_tachado = nuevo_precio * 2  # Calcular el precio tachado
        nuevo_precio_envio = precio_envio_entry.get()

        # Eliminar ceros innecesarios después del punto decimal
        nuevo_precio_str = str(nuevo_precio).rstrip('0').rstrip('.')
        nuevo_precio_tachado_str = str(nuevo_precio_tachado).rstrip('0').rstrip('.')

        # Actualizar los campos Entry
        precio_entry.delete(0, tk.END)
        precio_entry.insert(0, nuevo_precio_str)
        precio_tachado_entry.delete(0, tk.END)
        precio_tachado_entry.insert(0, nuevo_precio_tachado_str)

        with open('index.html', 'r', encoding='utf-8') as file:
            contenido = file.read()

        # Utiliza expresiones regulares para buscar y reemplazar los valores específicos
        contenido = re.sub(r'<span id="total">.*?</span>', f'<span id="total">{nuevo_precio}</span>', contenido)
        contenido = re.sub(r'<span id="precioTachado">.*?</span>', f'<span id="precioTachado"><s>{nuevo_precio_tachado}</s></span></h3>', contenido)
        contenido = re.sub(r'<div class="alert alert-info" id="costoEnvio" style="display: none;">\s*El costo de envío es de \$<span id="precioEnvio">\d+\.\d+\s*</span>\s*</div>', f'<div class="alert alert-info" id="costoEnvio" style="display: none;">\nEl costo de envío es de $<span id="precioEnvio">{nuevo_precio_str}</span>\n</div>', contenido)
        contenido = re.sub(r'const precioUnitario\s*=\s*\d+\.\d+;', f'const precioUnitario = {nuevo_precio};', contenido)
        contenido = re.sub(r'<span id="precioEnvio">\d+</span>', f'<span id="precioEnvio">{nuevo_precio_envio}</span>', contenido)
        contenido = re.sub(r'const envío\s*=\s*document.getElementById\("envioDomicilio"\).checked \? \d+ : \d+;', f'const envío = document.getElementById("envioDomicilio").checked ? {nuevo_precio_envio} : 0;', contenido)


        with open('index.html', 'w', encoding='utf-8') as file:
            file.write(contenido)

        messagebox.showinfo('Éxito', 'Precios actualizados correctamente.')
        ventana.destroy()  # Cierra la ventana

    except Exception as e:
        messagebox.showerror('Error', f'Ocurrió un error: {str(e)}')

# Crear una ventana
ventana = tk.Tk()
ventana.title('Actualizar Precios')

# Etiqueta Precio
tk.Label(ventana, text="Nuevo Precio:").pack()
precio_entry = tk.Entry(ventana)
precio_entry.pack()

# Etiqueta Precio Tachado (calculado automáticamente)
tk.Label(ventana, text="Nuevo Precio Tachado:").pack()
precio_tachado_entry = tk.Entry(ventana)
precio_tachado_entry.pack()
precio_tachado_entry.config(state=tk.DISABLED)  # Deshabilita la edición del campo

# Etiqueta Precio de Envío
tk.Label(ventana, text="Nuevo Precio de Envío:").pack()
precio_envio_entry = tk.Entry(ventana)
precio_envio_entry.pack()

# Botón para actualizar
tk.Button(ventana, text="Actualizar Precios", command=actualizar_precio).pack()

ventana.mainloop()
