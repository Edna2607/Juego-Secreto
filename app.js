//El document.querySelector = es como un puente entre javascript y HTML.
/* 
1- FORMA = utilizando el querySelector para cada etiqueta HTML

let titulo = document.querySelector("h1");
titulo.innerHTML = "Juego del Número secreto";

let parrafo = document.querySelector("p");
parrafo.innerHTML = "Indica un número del 1 al 10";

function intentoDeUsuario() {
   alert("Click desde el botón");
}*/

//2- FORMA = utilizando una funcion generica que afecta las  etiquetas del HTML

let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSortedos = []; 
let numeroMaximo = 10;


function asignartextoElemento(elemento, texto){
   let elementoHTML = document.querySelector(elemento);
   elementoHTML.innerHTML = texto;
   return;
}

function verificarIntento() {
   let numeroDeusuario = parseInt(document.getElementById('valorUsuario').value);
   
   if(numeroDeusuario === numeroSecreto){
      // se realiza una condicion dentro del template string donde (? = si )(: sino ó de lo contrario) 
      asignartextoElemento("p",`Acertaste el Número en = ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
      document.getElementById("reiniciar").removeAttribute("disabled");
   }
   else{
      //El usuario no Acertó.
      if(numeroDeusuario > numeroSecreto){
         asignartextoElemento("p","El numero secreto es menor");
      }
      else{
         asignartextoElemento("p", "El numero secreto es mayor");
      }
      intentos++;
      limpiarCaja();
   }
   return;
}

function limpiarCaja(){
   let valorCaja = document.querySelector("#valorUsuario");
   valorCaja.value = ""; 
}

function generarNumeroSecreto() {
   let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;

   console.log(numeroGenerado);
   console.log(listaNumerosSortedos);
   //si ya sorteamos todos los numeros.
   if (listaNumerosSortedos.length == numeroMaximo){
      asignartextoElemento("p", "ya se Sortearon todos los números posibles");
   }
   else{
         //Si el numero generado está incluido en la lista
         // Metodo : includes = recorre todo el arreglo y verifica si algo ya existe en la lista por lo tanto nos devuelve un boolean.
         if(listaNumerosSortedos.includes(numeroGenerado)){
            return generarNumeroSecreto();
         }
         else{
            listaNumerosSortedos.push(numeroGenerado);
            return numeroGenerado;
         } 
      }
}

function condicionesIniciales(){
   asignartextoElemento("h1", "Juego del número secreto");
   asignartextoElemento("p", `Indica un número del 1 al ${numeroMaximo}`);
   numeroSecreto = generarNumeroSecreto();
   intentos =1; 
}

function reiniciarJuego(){
   //Limpiar la caja.
   limpiarCaja();
   //Indicar el mensaje de intervalos de Números.
   //Generar el numero aleatorio.
    //Inicializar el número de intentos.
    condicionesIniciales();
   //deshabilitar el botón de nuevo juego. 
   document.querySelector('#reiniciar').setAttribute('disabled','true');
  
}

condicionesIniciales();