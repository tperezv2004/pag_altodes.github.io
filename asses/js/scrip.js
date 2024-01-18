function subirTablaPin(updatedCodesTable) {
    return fetch('https://api.github.com/repos/tperezv2004/pag_altodes.github.io/contents/archivos/tabla_pin.csv', {
        method: 'PUT',
        headers: {
            'Authorization': 'token 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',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: 'Actualización de códigos de acceso',
            content: btoa(updatedCodesTable),
            sha: '9f797175d19f106993bb9aaf4ee51813dc3c699d',
        }),
    });
}


function verificarAcceso() {
    var codigoAcceso = document.getElementById("codigoAcceso").value;

    fetch('archivos/tabla_pin.csv')
        .then(response => response.text())
        .then(data => {

            const tabla = data.split('\n');
            const info_tabla = tabla.map(row => row.split(',')); // matriz

            const fila = info_tabla.find(row => row[0].toString() === codigoAcceso.toString()); // valor en la segunda columna coincida con el numero.

            if (fila && fila[1].toString().trim() === "false") {
                fila[1] = true; // falta
                alert(fila)

                const updatedCodesTable = info_tabla.map(row => row.join(',')).join('\n');
                alert(updatedCodesTable)
                //subirTablaPin(updatedCodesTable);
            
                if (response.status === 200 || response.status === 201) {
                    window.location.href = 'index2.html';

                } else {
                    alert('Error al actualizar el código de acceso. hgoassd');
                }
                


            } else {
                alert('Acceso denegado. Verifica el código de acceso');
            }
        })
        .catch(error => {
            alert("estoy aca" + error);
        });
}

