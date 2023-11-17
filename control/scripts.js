'use strict'

console.log('Empieza el programa')

// ------------------- VARIABLES GLOBALES ------------------------

// capturamos el formulario de introduccion de socios - Ejercicio 1
const formulario = document.querySelector('#formNombre')

// capturamos el contenedor donde escribiremos los socios - Ejercicio 2
const contenedorEscribirSocios = document.getElementById(
  'contenedorPintarSocios'
)
var numSocios=0;                //contador de socios
var arraySocios = new Array();  //array de socios

// -------------------- CLASE SOCIO -------------------------------
class Socio {                           
  //constructor
  constructor(nombre, apellido,id){
    this.nombre = nombre;
    this.apellido = apellido;
    this.id=id;
  }
  // metodos
  getSocio () {
    return this.id+' '+this.nombre+' '+this.apellido
  }
  getIdSocio () {
    return this.id
  }
  getNombreSocio () {
    return this.nombre
  }
  getApellidoSocio () {
    return this.apellido
  }
}
// ------------------- FUNCIONES ------------------------

// EJERCICIO 1

/*
  funcion para leer del JSON
*/
function cargarSociosJSON () {
  let path = 'model/datosSocios.json'

  let request = new Request(path, {
    headers: new Headers({
      'Content-Type': 'text/json'
    }),
    method: 'GET'
  })

  fetch(request).then(response => {
    response.json().then(data => {
      console.log('Datos', data)
      aniadirSociosInicialesArray (data) //llamo a la función 
    })
  })
}
/* 
TODO:  metodo para añadir socios al array 
    cuando arranca la pagina web
*/
function aniadirSociosInicialesArray (data) {
  //  TODO: cargar el fichero JSON, parsearlo a objetos tipo "socio" y añadirlos al array
  var myJSON=JSON.stringify(data)
  var objetoParseado = JSON.parse(myJSON)
  for (let i = 0; i < objetoParseado.socio.length; i++) {
    var nuevoSocio=new Socio(objetoParseado.socio[i].nombre,objetoParseado.socio[i].apellido,objetoParseado.socio[i].id);
    // TODO: añadir el objeto al array
    arraySocios.push(nuevoSocio)
  }
  console.log('arraySocios: ',arraySocios)
}

/*
    TODO: Metodo para capturar los datos del socio introducidor en el formulario
*/
function capturarDatosSocio () {
  // TODO: recoger los el nombre y apellido del HTML
    var nombre    = document.getElementById("fnombre").value;
    var apellido  = document.getElementsByName("apellido")[0].value;
    var id        = crearID();
  //PARA MOSTRARLOS (QUITAR)
//    document.getElementById("escribir").innerHTML=" \ Tu nombre es: "+nombre+" \
//     <br>Tu apellido es: "+apellido+"<br>Tu id es: "+id;
     console.log("Nombre:"+nombre);
     console.log("Apellido:"+apellido);
     console.log("Id:"+id);
  // TODO: crear el socio y añadirlo al array
  if(nombre === '' || apellido === ''){
    alert("Introduce los dos campos (Nombre y Apellidos)!!!");
   }else{
     crearSocio(nombre,apellido,id);
   }
}

/* 
TODO: 
    Metodo para crear un socio pasandole el nombre y el apellido
    y añadirlo al array
 */
function crearSocio (nombre, apellido, id) {
  // TODO: crear objeto socio
  var nuevoSocio=new Socio(nombre,apellido,id);
  // TODO: añadir el objeto al array
  arraySocios.push(nuevoSocio)
  console.log('arraySocios: ',arraySocios)
}

/*
TODO: 
    Metodo para crear el ID del socio en funcion del ultimo
    ID que hay en el array de socios
*/
function crearID () {
  // TODO: mirar el id del ultimo socio del array y sumarle uno
  console.log(arraySocios[arraySocios.length-1].id)
  return arraySocios[arraySocios.length-1].id+1;
}

// EJERCICIO 2

/*
  TODO: metodo que elimina la lista previamente pintada en el contenedor asignado 
  para pintar socios, recorre el array con un bucle y pinta los socios 
*/
function pintarListaSocios () {
  //TODO: borramos todo lo que hay en el div
  document.getElementById("contenedorPintarSocios").innerHTML=" " ;
  //TODO: bucle para recorrer y pintar el array de socios
  var sociosapintar=""
  for (let i=0;i<arraySocios.length;i++){
    console.log(arraySocios[i])
    console.log(arraySocios[i].getSocio())
    sociosapintar=sociosapintar+"Socio numero "+arraySocios[i].getIdSocio()+": "+arraySocios[i].getNombreSocio()+" "+arraySocios[i].getApellidoSocio()+" "+"<br>";
  }
  //TODO: debemos añadir los socios a la pagina web
  document.getElementById("contenedorPintarSocios").innerHTML=sociosapintar
}

// ------------------- MAIN ------------------------

// TODO: añadimos los socios iniciales cuando empieza el programa

cargarSociosJSON()                //carga el fichero JSON 
console.log("Socios cargados!!!")
console.log(arraySocios)
console.log('Acaba el programa')
