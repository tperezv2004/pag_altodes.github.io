function verificarAcceso() {
    var codigoAcceso = document.getElementById("codigoAcceso").value;
    // Obtiene el valor ingresado en el campo de código de acceso.

    fetch('archivos/tabla_pin.csv')
        .then(response => response.text())
        .then(data => {
            // Realiza una solicitud para obtener el contenido del archivo 'tabla_pin.csv'.

            const codesTable = data.split('\n');
            // Divide el contenido del archivo en filas.

            const codeInfo = codesTable.map(row => row.split(','));
            // Para cada fila, divide los valores por coma para obtener una matriz bidimensional.

            const accessData = codeInfo.find(row => row[1].toString() === codigoAcceso.toString());
            // Busca en la matriz de información del código de acceso aquel cuyo valor en la segunda columna coincida con el código ingresado.

            
            alert(accessData);
            

            if (accessData && accessData[2] === 'false') {
                // Comprueba si se encontró el código de acceso y si la tercera columna indica que no está ocupado.

                accessData[2] = 'true';
                // Marca el código de acceso como ocupado actualizando el valor en la tercera columna.

                const updatedCodesTable = codeInfo.map(row => row.join(',')).join('\n');
                // Convierte la matriz bidimensional actualizada de nuevo en un formato de cadena similar al original.

                fetch('https://api.github.com/repos/tu_usuario/tu_repositorio/contents/tabla_pin.csv', {
                    method: 'PUT',
                    headers: {
                        'Authorization': 'token TU_TOKEN_DE_ACCESO',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: 'Actualización de códigos de acceso',
                        content: btoa(updatedCodesTable),
                        sha: 'SHA_ACTUAL_DEL_ARCHIVO',
                    }),
                })
                // Realiza una solicitud PUT a la API de GitHub para actualizar el archivo 'tabla_pin.csv'.

                .then(response => {
                    if (response.status === 200 || response.status === 201) {
                        window.location.href = 'otherPage.html';
                        // Si la actualización es exitosa, redirige a la otra página.
                    } else {
                        alert('Error al actualizar el código de acceso.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error al actualizar el código de acceso.');
                });
            } else {
                alert('Acceso denegado. Verifica el código de acceso.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al verificar el código de acceso.');
        });
}

