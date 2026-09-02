console.log("FUNCIONES");

// Funcion normal
function numeroParImpar(numero) {
    if (numero % 2 === 0) {
        console.log(numero + " es par");
    } else {
        console.log(numero + " es impar");
    }
}

numeroParImpar(4);
numeroParImpar(7);


// Funcion arrow
const parImpar = (numero) => {
    if (numero % 2 === 0) {
        console.log(numero + " es par");
    } else {
        console.log(numero + " es impar");
    }
};

parImpar(10);
parImpar(5);
