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

function comprobar_w12(){
    var valorPregunta = "1"
    localStorage.setItem('valorPregunta', valorPregunta);

    window.location.href = 'index3.html';

}

function comprobar_td(){
    var valorPregunta = "2"
    localStorage.setItem('valorPregunta', valorPregunta);

    window.location.href = 'index3.html';
}


desbloqueo()