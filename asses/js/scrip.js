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
            

            if (accessData && accessData[2] === 'false') {
                // Comprueba si se encontró el código de acceso y si la tercera columna indica que no está ocupado.

                accessData[2] = 'true';
                // Marca el código de acceso como ocupado actualizando el valor en la tercera columna.

                const updatedCodesTable = codeInfo.map(row => row.join(',')).join('\n');
                // Convierte la matriz bidimensional actualizada de nuevo en un formato de cadena similar al original.

                fetch('https://api.github.com/repos/tperezv2004/pag_altodes.github.io/contents/archivos/tabla_pin.csv', {
                    method: 'PUT',  // Método HTTP para la solicitud (PUT para actualizar).
                    headers: {
                        'Authorization': 'token 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',  // Token de acceso de GitHub. vence el 15 de abril
                        'Content-Type': 'application/json',  // Tipo de contenido que estás enviando (en este caso, JSON).
                    },
                    body: JSON.stringify({
                        message: 'Actualización de códigos de acceso',  // Mensaje asociado con el commit.
                        content: btoa(updatedCodesTable),  // Contenido del archivo codificado en Base64.
                        sha: '9469bb1532a23a8c15b89fdf129e3169c7da7736',  // SHA actual del archivo que estás intentando actualizar.
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

