function verificarAcceso() {
    var codigoAcceso = document.getElementById("codigoAcceso").value;

    fetch('archivos/tabla_pin.csv')
        .then(response => response.text())
        .then(data => {

            const codesTable = data.split('\n');
            const codeInfo = codesTable.map(row => row.split(',')); // matriz

            const accessData = codeInfo.find(row => row[1].toString() === codigoAcceso.toString()); // valor en la segunda columna coincida con el numero.
            alert(accessData)

            if (accessData && accessData[2].toString().trim() === "false") {
                accessData[2] = true;
                window.location.href = 'otherPage.html';

            } else {
                alert('Acceso denegado. Verifica el código de acceso.estoy aca');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al verificar el código de acceso.');
        });
}
