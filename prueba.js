fetch('archivos/tabla_pin.csv')
  .then(response => response.text())
  .then(csvData => {
    // Aquí puedes procesar los datos del CSV
  })
  .catch(error => console.error('Error al cargar el archivo CSV:', error));

const csv = require('csv-parse');
const fs = require('fs');

const csvData = 'animales;numeros;nombres;leon;21,5;Paula;...'; // Datos del CSV

csv(csvData, { delimiter: ';' }, (err, records) => {
  if (err) {
    console.error('Error al analizar el CSV:', err);
    return;
  }

  // Agregar una nueva fila
  const newRow = ["00", true]; // Ejemplo de nueva fila
  records.push(newRow);

  // Convertir los registros nuevamente a formato CSV
  const updatedCsv = records.map(row => row.join(';')).join('\n');

  // Guardar los datos actualizados en el mismo archivo
  fs.writeFileSync('archivos/tabla_pin.csv', updatedCsv);
  console.log('Fila agregada y archivo guardado correctamente.');
});
