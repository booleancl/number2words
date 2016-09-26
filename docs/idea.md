Algoritmo básico

La conversión de los números se lleva a cabo utilizando un algoritmo recursivo dado por la función: 

`function convert(number, chunk_index, total_chunks, converted_text, flag)`  

**Descripción de los argumentos**
  
  - number: Input dado
  - chunk_index: Índice del chunk analizado
  - total_chunks: Total de los chunks a analizar. Se pasa como argumento para evitar recalcular este valor en las futuras iteraciones
  - converted_text: texto parcial calculado
  - flag: advierte que el próximo postfijo será "mil" para aplicarlo en números > 1 millón

La función recursiva se encarga de tomar trozos de hasta 3 números que representan al número en su totalidad.
Por cada uno de los trozos o "chunks" la función recursiva es llamada hasta completar la totalidad del número.
Por ejemplo: para el número 11.234.867.322 la función recursiva analizará los chunks 11, 234, 867, 322. 

Una vez obtenido el chunk a procesar, debemos calcular la posición de este chunk con respecto al número total de chunks obtenidos, así sabremos qué "apellido" o "postfijo" tiene el número (por ejemplo: 11 mil, 234 millones, etc).

Luego viene el proceso más importante que es el que convierte el chunk dado en palabras.
Este proceso se lleva a cabo en 2 pasos. El primero es aplicarle al chunk las reglas ortográficas según el archivo definido en la carpeta /dictionaries y el segundo proceso es agregarle el postfijo al chunk analizado.

Por ejemplo para el número dado como ejemplo, el procesamiento sería el siguiente:

Número: 11234867322

- Primera llamada a la función
  chunk 11
  primer paso del procesamiento da como resultado el string "once"
  el segundo paso da como resultado "once mil"

- Segunda llamada a la función
  chunk 234
  segundo paso del procesamiento da como resultado el string "doscientos treinta y cuatro"
  el segundo paso da como resultado "doscientos treinta y cuatro millones"
 
etc...





