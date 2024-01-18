import csv

"""# Datos a escribir en el CSV
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
"""

# prueba.py

from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/prueba.py/<parametro>', methods=['POST'])
def ejecutar_prueba(parametro):
    try:
        # Obtener datos JSON de la solicitud
        data = request.get_json()

        # Realizar alguna operación con el parámetro y los datos recibidos
        resultado = f'Ejecutando prueba.py con parámetro: {parametro}, Datos recibidos: {data}'

        # Devolver el resultado como JSON
        return jsonify({'resultado': resultado})

    except Exception as e:
        # Manejar cualquier error que pueda ocurrir
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
