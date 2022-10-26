// PRE-ENTREGA DEL PROYECTO FINAL

/*

Para hacer este programa me basé en la forma en la cual
se manejan en la empresa en la que trabajo para calcular los sueldos, 
sumando el sueldo base mas la comisión del total de las ventas que el empleado genera al mes.


º Si el empleado supera los 200000 del total de ventas, se le sumara un 25% al sueldo base.
º Si el empleado supera los 100000 pero no los 20000 del total de ventas, se le sumara un 10% al sueldo base.
º Si el empleado supera los 50000 del total de ventas, se le sumara un 2% al sueldo base.

*/

let arrayHistorial = []
let arrayImporteVta = []

class Calculador {
    constructor(
        antiguedad,
        fecha,
        importeVenta,
        sueldoBase,
        totalVenta,
        totalAcumulado
    ) {
        this.antiguedad = antiguedad;
        this.fecha = fecha;
        this.importeVenta = importeVenta
        this.sueldoBase = sueldoBase;
        this.totalVenta = totalVenta;
        this.totalAcumulado = totalAcumulado;

    }

    agregarImporteVtaHTML() {
        document.getElementById("importeVenta").innerHTML = `
        <b>Total importe ventas:</b>
        <li>$${this.importeVenta}</li>
        `;
    }

    imprimirHistorial() {
        let objeto = []
        //Recupero lo que hay en el localstorage
        objeto = JSON.parse(localStorage.getItem("historialCalculo"))
        //Recorro el objeto y genero los HTML que se van a inyectar en el HTML
        let objetoHTML = objeto.map(function (item) {

            return `
            <tr>
                <td>${item.fecha}</td>
                <td>${item.sueldo}</td>
                <td>${item.totalVenta}</td>
                <td>${item.totalAcumulado}</td>
            </tr>
            `;
        })

        //Inserta el HTML 
        document.getElementById("list-tabla").innerHTML = objetoHTML

    }

}

function calcularSueldo() {
    let objHistorial = []
    let fecha = ''
    let totalVentas = 0;
    let totalAcumulado = 0;
    let sueldoBase = 0;

    // Recupera el valor del campo fecha
    fecha = document.getElementById('fecha').value

    // Recupera el valor del campo sueldoBase
    sueldoBase = parseInt(document.getElementById('sueldoBase').value);

    //Acumulador de los valores de los importes agregados
    totalVentas = arrayImporteVta.reduce((a, b) => a + b, 0);

    //Calculos
    if (totalVentas > 200000) {
        totalAcumulado = sueldoBase + ((totalVentas * 25) / 100)
    } else if (totalVentas >= 100000 && totalVentas < 200000) {
        totalAcumulado = sueldoBase + ((totalVentas * 10) / 100)
    } else if (totalVentas >= 50000 && totalVentas < 100000) {
        totalAcumulado = sueldoBase + ((totalVentas * 2) / 100)
    }

    //Operador ternario. Guarda en una variable objeto lo que esta almacenado en el localstorage para luego agregarle el que se calcule nuevamente
    localStorage.getItem("historialCalculo") ?  objHistorial = JSON.parse(localStorage.getItem("historialCalculo")) : null

    //Almacena en una variable para que no se pise lo que tenemos guardado anteriormente
    objHistorial = [
        ...objHistorial, //Esto acumula para que no se pise lo que ya tiene el array
        {
            fecha: fecha,
            sueldo: sueldoBase,
            totalVenta: totalVentas,
            totalAcumulado: totalAcumulado
        }
    ]

    //Agrego el objeto al localstorage
    localStorage.setItem("historialCalculo", JSON.stringify(objHistorial));
     
    //Funcion para limpiar campos 
    limpiarCampos();

    //Insanciamos el objeto para poder llamar a la funcion.
    let historialHTML = new Calculador()
    historialHTML.imprimirHistorial();

}

//Funcion para agregar los importes de las ventas.
function agregarImporte() {
    let totalImporteVta
    let impVta

    //Agrega valor al array
    arrayImporteVta.push(parseInt(document.getElementById('importeVta').value))

    //Acumula los valores del array
    totalImporteVta = arrayImporteVta.reduce((a, b) => a + b, 0);

    //Instanciamos el objeto para llamar a la funcion
    impVta = new Calculador('', '', totalImporteVta, '', '', '');
    impVta.agregarImporteVtaHTML();

    //Limpiamos el campo inmporte de ventas
    document.getElementById('importeVta').value = "";

}

//Funcion para limpiar todos los campos.
function limpiarCampos() {
    let impVta
    arrayImporteVta = []
    document.getElementById('fecha').value = ""
    document.getElementById('importeVta').value = "";
    document.getElementById('sueldoBase').value = "";

    //Instanciamos el objeto para llamar a la funcion
    impVta = new Calculador('', '', 0, '', '', '');
    impVta.agregarImporteVtaHTML();
}