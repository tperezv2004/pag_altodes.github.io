function subirTablaPin(updatedCodesTable) {
    // FALTA

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


function subirTablaUsuario(){
    // FALTA
}

function verificarDatos() {

    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var correo = document.getElementById('correo').value;
    var celular = document.getElementById('celular').value;
    var cargo = document.getElementById('cargo').value;
    var codigoAcceso = document.getElementById('codigoAcceso').value;
    
    if (codigoAcceso && codigoAcceso.toString() === "2615"){
        // aca seria pag mama
        window.location.href = 'index2.html';
    } else {
    
        if (nombre && apellido && correo && celular && cargo && codigoAcceso) {
            verificarAcceso(nombre, apellido, correo, celular, cargo, codigoAcceso)
        }
    }
}

function verificarAcceso(nombre, apellido, correo, celular, cargo, codigoAcceso) {
    
    fetch('archivos/tabla_pin.csv')
        .then(response => response.text())
        .then(data => {

            const tabla = data.split('\n');
            const info_tabla = tabla.map(row => row.split(',')); // matriz

            const fila = info_tabla.find(row => row[0].toString() === codigoAcceso.toString()); // valor en la segunda columna coincida con el numero.

            if (fila && fila[1].toString().trim() === "false") {
                fila[1] = true; // falta

                const updatedCodesTable = info_tabla.map(row => row.join(',')).join('\n');
                //subirTablaPin(updatedCodesTable);
                //subirTablaUsuario(x,x,x)
                
                window.location.href = 'index2.html';



            } else {
                alert('Acceso denegado. Verifica el código de acceso');
            }
        })
        .catch(error => {
            alert("estoy aca" + error);
        });
}
