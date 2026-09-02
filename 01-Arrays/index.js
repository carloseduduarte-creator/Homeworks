console.log("01-ARRAYS");

const numeros = [1, 2, 3, 4, 5];

console.log(numeros);


// length
// muestra cuantos elementos tiene el array
console.log("length:", numeros.length);


// at
// sirve para buscar un elemento por su posicion
// tambien se puede hacer con numeros[2]
console.log("at:", numeros.at(2));


// push
// agrega un elemento al final
// unshift lo agrega al principio
numeros.push(6);
console.log("push:", numeros);


// pop
// elimina el ultimo elemento
// shift elimina el primero
numeros.pop();
console.log("pop:", numeros);


// unshift
// agrega un elemento al principio
numeros.unshift(0);
console.log("unshift:", numeros);


// shift
// elimina el primer elemento
numeros.shift();
console.log("shift:", numeros);


// concat
// sirve para unir arrays
// a diferencia de push no modifica el array original
const otrosNumeros = [6, 7, 8];
const nuevoArray = numeros.concat(otrosNumeros);

console.log("concat:", nuevoArray);


// includes
// revisa si un elemento existe
// devuelve true o false
console.log("includes:", numeros.includes(3));


// indexOf
// busca la posicion de un elemento
// includes devuelve true o false
console.log("indexOf:", numeros.indexOf(3));


// lastIndexOf
// busca la ultima posicion donde aparece un elemento
const repetidos = [1, 2, 3, 2, 4, 2];

console.log("lastIndexOf:", repetidos.lastIndexOf(2));


// join
// convierte los elementos en un solo texto
console.log("join:", numeros.join("-"));


// slice
// saca una parte del array
// no modifica el array original
const parte = numeros.slice(1, 4);

console.log("slice:", parte);


// splice
// sirve para quitar o agregar elementos
// a diferencia de slice si modifica el array
const arraySplice = [1, 2, 3, 4, 5];

arraySplice.splice(2, 1);

console.log("splice:", arraySplice);


// reverse
// cambia el orden de los elementos
const invertido = [1, 2, 3, 4, 5];

invertido.reverse();

console.log("reverse:", invertido);


// sort
// ordena los elementos
const desordenados = [5, 2, 8, 1, 4];

desordenados.sort();

console.log("sort:", desordenados);


// find
// busca el primer elemento que cumpla
// filter puede encontrar varios
const encontrado = numeros.find(numero => numero > 3);

console.log("find:", encontrado);


// findIndex
// igual que find pero devuelve la posicion
const posicion = numeros.findIndex(numero => numero > 3);

console.log("findIndex:", posicion);


// filter
// crea un array con los elementos que cumplen
const mayores = numeros.filter(numero => numero > 2);

console.log("filter:", mayores);


// map
// modifica los elementos y crea otro array
// forEach solo recorre el array
const multiplicados = numeros.map(numero => numero * 2);

console.log("map:", multiplicados);


// forEach
// recorre cada elemento
numeros.forEach(numero => {
    console.log("forEach:", numero);
});


// some
// revisa si por lo menos uno cumple
// every revisa que todos cumplan
const hayMayor = numeros.some(numero => numero > 4);

console.log("some:", hayMayor);


// every
// revisa si todos cumplen la condicion
const todosPositivos = numeros.every(numero => numero > 0);

console.log("every:", todosPositivos);


// reduce
// sirve para juntar todos los valores en uno
const suma = numeros.reduce((total, numero) => total + numero, 0);

console.log("reduce:", suma);


// reduceRight
// hace algo parecido a reduce pero empieza desde el final
const sumaDerecha = numeros.reduceRight((total, numero) => total + numero, 0);

console.log("reduceRight:", sumaDerecha);


// flat
// sirve para sacar arrays que estan dentro de otro array
const arrayDentro = [1, 2, [3, 4], [5, 6]];

console.log("flat:", arrayDentro.flat());


// flatMap
// combina map y flat
const nombres = ["Juan", "Carlos"];

const resultadoNombres = nombres.flatMap(nombre => [nombre, "Universidad"]);

console.log("flatMap:", resultadoNombres);


// fill
// cambia algunos valores por el valor que indiquemos
const arrayFill = [1, 2, 3, 4, 5];

arrayFill.fill(0, 1, 3);

console.log("fill:", arrayFill);


// entries
// muestra la posicion y el valor
const entradas = numeros.entries();

for (const entrada of entradas) {
    console.log("entries:", entrada);
}


// keys
// muestra las posiciones del array
const claves = numeros.keys();

for (const clave of claves) {
    console.log("keys:", clave);
}


// values
// muestra los valores
// keys muestra las posiciones
const valores = numeros.values();

for (const valor of valores) {
    console.log("values:", valor);
}


console.log("FIN");