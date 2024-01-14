function verificarAcceso() {
    var codigoAcceso = document.getElementById("codigoAcceso").value;
    
    // Verificar el código de acceso en tabla_pin.csv
    fetch('archivos/tabla_pin.csv')
        .then(response => response.text())
        .then(data => {
            const codesTable = data.split('\n');
            const codeInfo = codesTable.map(row => row.split(','));

            // Buscar el código de acceso en la tabla y verificar la disponibilidad
            const accessData = codeInfo.find(row => row[1] === codigoAcceso);

            if (accessData && accessData[2] === 'false') {
                // Marcar el código de acceso como ocupado
                accessData[2] = 'true';

                // Actualizar el archivo tabla_pin.csv en GitHub
                const updatedCodesTable = codeInfo.map(row => row.join(',')).join('\n');
                fetch('https://api.github.com/repos/tu_usuario/tu_repositorio/contents/tabla_pin.csv', {
                    method: 'PUT',
                    headers: {
                        'Authorization': 'token TU_TOKEN_DE_ACCESO', // Reemplazar con tu token de acceso
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: 'Actualización de códigos de acceso',
                        content: btoa(updatedCodesTable),
                        sha: 'SHA_ACTUAL_DEL_ARCHIVO',
                    }),
                })
                .then(response => {
                    if (response.status === 200 || response.status === 201) {
                        window.location.href = 'pagina2.html';
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

