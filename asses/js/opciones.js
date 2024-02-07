
document.getElementById("button_w12").disabled = true;
document.getElementById("button_td").disabled = true;

function desbloqueo(){
    var codigoAcceso = localStorage.getItem('codigoAcceso');
    var numero = codigoAcceso.toString();

    if (numero.includes('1')) {
        document.getElementById("button_w12").disabled = false;
    }
    if (numero.includes('2')) {
        document.getElementById("button_td").disabled = false;
    }

}

function comprobar_w12() {
    var valorPregunta = "1"
    localStorage.setItem('valorPregunta', valorPregunta);

    fetch('../archivos/tabla_pin.csv')
        .then(response => response.text())
        .then(data => {
            const tabla = data.split('\n');
            const info_tabla = tabla.map(row => row.split(',')); // matriz
            
            const nuevaFila = ['NuevoDato1', 'NuevoDato2'];
        
            // Agregar la nueva fila a la matriz
            info_tabla.push(nuevaFila);
    
            console.log(info_tabla);
        })
        .catch(error => {
            alert("estoy aca" + error);

        });

}



function comprobar_td(){
    var valorPregunta = "2"
    localStorage.setItem('valorPregunta', valorPregunta);

    window.location.href = 'index3.html';
}


desbloqueo()