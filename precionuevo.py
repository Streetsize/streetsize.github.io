import tkinter as tk
from tkinter import messagebox
import os
import re

def actualizar_precio():
    try:
        nuevo_precio = float(precio_entry.get())  # Convertir a número
        nuevo_precio_tachado = nuevo_precio * 2  # Calcular el precio tachado
        nuevo_precio_envio = precio_envio_entry.get()
        nuevo_precio_colores = nuevo_precio * 0.90 * 3
        nuevo_precio_clasico = nuevo_precio * 0.95 * 2

        # Eliminar ceros innecesarios después del punto decimal
        nuevo_precio_str = str(nuevo_precio) if nuevo_precio % 1 != 0 else str(int(nuevo_precio))
        nuevo_precio_tachado_str = str(nuevo_precio_tachado) if nuevo_precio_tachado % 1 != 0 else str(int(nuevo_precio_tachado))



        # Actualizar los campos Entry
        precio_entry.delete(0, tk.END)
        precio_entry.insert(0, nuevo_precio_str)
        precio_tachado_entry.delete(0, tk.END)
        precio_tachado_entry.insert(0, nuevo_precio_tachado_str)
        
        # Actualizar las variables en el archivo pedido.js
        with open('assets/js/pedido.js', 'r', encoding='utf-8') as js_file:
            js_code = js_file.read()

        js_code = re.sub(r'const precioUnitario\s*=\s*\d+\.\d+;', f'const precioUnitario = {nuevo_precio};', js_code)
        js_code = re.sub(r'const envío\s*=\s*document.getElementById\("envioDomicilio"\).checked \? \d+ : \d+;', f'const envío = document.getElementById("envioDomicilio").checked ? {nuevo_precio_envio} : 0;', js_code)

        with open('assets/js/pedido.js', 'w', encoding='utf-8') as js_file:
            js_file.write(js_code)

        with open('index.html', 'r', encoding='utf-8') as file:
            contenido = file.read()

        contenido = re.sub(r'<span id="total">.*?</span>', f'<span id="total">{nuevo_precio}</span>', contenido)        
        contenido = re.sub(r'<span id="colores">.*?</span>', f'<span id="colores">{nuevo_precio_colores}</span>', contenido)
        contenido = re.sub(r'<span id="clasico">.*?</span>', f'<span id="clasico">{nuevo_precio_clasico}</span>', contenido)        
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

# Etiqueta Precio de Pack Colores
tk.Label(ventana, text="Nuevo Precio de Pack Colores:").pack()
precio_colores_entry = tk.Entry(ventana)
precio_colores_entry.pack()
precio_colores_entry.config(state=tk.DISABLED)  # Deshabilita la edición del campo

# Etiqueta Precio de Pack Clásico
tk.Label(ventana, text="Nuevo Precio de Pack Clásico:").pack()
precio_clasico_entry = tk.Entry(ventana)
precio_clasico_entry.pack()
precio_clasico_entry.config(state=tk.DISABLED)  # Deshabilita la edición del campo

# Botón para actualizar
tk.Button(ventana, text="Actualizar Precios", command=actualizar_precio).pack()

ventana.mainloop()
