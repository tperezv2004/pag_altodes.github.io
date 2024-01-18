import csv

# Datos a escribir en el CSV
datos = [
    ["Nombre", "Edad", "Ciudad"],
    ["Juan", 25, "Ciudad A"],
    ["María", 30, "Ciudad B"],
    ["Pedro", 22, "Ciudad C"]
]

# Nombre del archivo CSV
nombre_archivo = "ejemplo.csv"

# Escribir en el archivo CSV
with open(nombre_archivo, mode='w', newline='') as archivo_csv:
    escritor_csv = csv.writer(archivo_csv)
    escritor_csv.writerows(datos)

print(f"Se ha creado el archivo CSV '{nombre_archivo}' con éxito.")
