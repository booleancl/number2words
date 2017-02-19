var dictionary = require('./dictionaries/dictionary_es');
//Constructor
function ConverterToWords(){
  this.validationRegex = /^(?!0)(?:\d+|\d{1,3}(?:\.\d{3})+)$|^0$/;
}
//Métodos
ConverterToWords.prototype = {
  isValidFormat : isValidFormat,
  rules : rules,
  convert : convert
};
//Función que valida el formato del número ingresado
function isValidFormat(number){
  if(this.validationRegex.test(number)){
    return true;
  }
  throw 'Ingresa un formato de texto válido';
}
//REFACTORIZAR!!!!!!!!!
//Reglas aplicadas a un chunk
function rules(chunk, chunk_index, total_chunks, chunk_block){
  
  var chunk_text = '',
      parsed_chunk = parseInt(chunk, 10),
      tensBase,
      tensUnity,
      hundredsBase,
      hundredsTens;

  switch(chunk.length){
    
    case 1:
      chunk_text = (chunk === '1' && chunk_block > 1) ? dictionary['apocopados']['1']
                                                      : dictionary['decenas']['0-29'][chunk];
      break;
    case 2:
      tensBase =  chunk.slice(0,1) + '0';
      tensUnity = chunk.slice(-1);
      
      if(parsed_chunk > 29){
        chunk_text += dictionary['decenas']['30-90'][tensBase];
        
        if(tensUnity !== '0'){
          chunk_text += ' y ';
          chunk_text += (tensUnity === '1' && chunk_block >= 1) ? dictionary['apocopados']['1']
                                                                : this.rules(tensUnity, chunk_index, total_chunks, chunk_block);
        }
      }
      else{
        chunk_text = (chunk === '21' && chunk_block >= 1) ? dictionary['apocopados']['21']
                                                          : dictionary['decenas']['0-29'][chunk];
      }
      break;
    case 3:
      if(chunk === '100'){
        chunk_text += dictionary['bloques']['singulares']['0'];
      }
      else if(chunk !== '000'){
        if(chunk.slice(0,2) === '00'){
          chunk_text += dictionary['decenas']['0-29'][chunk.slice(-1)];
        }
        else{
          hundredsBase = chunk.slice(0,1) + '00';
          hundredsTens = chunk.slice(-2);
          if(hundredsTens === '00'){
            chunk_text += dictionary['centenas'][hundredsBase];
          }
          else if(chunk.slice(0,1) === '0'){
            chunk_text += this.rules(hundredsTens, chunk_index, total_chunks, chunk_block);
          }
          else{
            chunk_text += dictionary['centenas'][hundredsBase] + ' ';
            if(hundredsTens[0] === '0'){
              chunk_text += (chunk.slice(-2) === '01' && chunk_block > 0) ? dictionary['apocopados']['1']
                                                                          : dictionary['decenas']['0-29'][hundredsTens.slice(-1)];
            }
            else{
              chunk_text += this.rules(hundredsTens, chunk_index, total_chunks, chunk_block);
            }
          }
        }
      }
      break;
  }
  return chunk_text;
}
//Agrega el postfijo correspondiente al bloque de chunks analizado
function addPostfix(chunk_block, chunk_number, chunk_index, flag){
  var isOdd = chunk_block % 2 !== 0,
      postfix_text = '';
  if(chunk_number > 0 || flag) {
    if(isOdd){
      postfix_text = dictionary['bloques']['plurales']['1'];
    }
    else{
      chunk_block += '';
      postfix_text = chunk_number === 1 ? dictionary['bloques']['singulares'][chunk_block]
                                        : dictionary['bloques']['plurales'][chunk_block];
    }
  }
  else if(!isOdd && chunk_block > 1 && chunk_index === 2){
    postfix_text = dictionary['bloques']['plurales'][chunk_block];
  }
  return postfix_text;
}
      //Función recursiva que realiza la conversión de número a texto
      /*********** ARGUMENTOS ******************
        number: Input dado
        chunk_index: Índice del chunk analizado
        total_chunks: Total de los chunks a analizar. Se pasa como argumento para evitar recalcular este valor en las futuras iteraciones
        converted_text: texto parcial calculado
        flag: advierte que el proximo postfijo será "mil" para aplicarlo en números > 1 millón
      */
      function convert(number, chunk_index, total_chunks, converted_text, flag){
        //**********      VARIABLES INICIALES  ********************************
        var chunk_regex = /\d{1,3}(?=(\d{3})*$)/g, //http://goo.gl/oxhsya
            text = converted_text || '',
            chunk,
            chunk_number,
            chunk_block;
        //***********     VALIDACIÓN Y SANITIZACIÓN DE FORMATO *******************
        if(this.isValidFormat(number)){
          number = (number + '').replace(/\./g,'');
        }
        number += '';
        //**********       INICIALIZACIONES  **********************
        total_chunks = total_chunks || Math.ceil(number.length/3);
        chunk_index = chunk_index || 0;
        //Tomamos el match correspondiente al índice que la función recursiva está analizando. 
        //Aprovechamos de aplicar el operador ++. Este operador es un shortcut para aplicar la operación ++ en la línea siguiente.
        //más información acá --> https://goo.gl/KD687e
        chunk = (number).match(chunk_regex)[chunk_index++];
        chunk_number = parseInt(chunk, 10);
        //Calculamos el bloque correspondiente al exponente del número.
        chunk_block = total_chunks - chunk_index;
        //************   LÓGICA DE CONVERSIÓN **********************
        //Le aplicamos al chunk analizado las reglas ortográficas
        if(!(chunk_block > 0 && chunk_number === 0) && !(chunk_block % 2 !== 0 && chunk_number === 1)){
          text += this.rules(chunk, chunk_index, total_chunks, chunk_block) + ' ';
        }
        //Definimos si es necesario agregar postfijo al texto resultante que se aplicaron las reglas.
        if(chunk_block > 0 || flag === 1){
          text += addPostfix(chunk_block, chunk_number, chunk_index,flag) + ' ';
          flag = 0;
          //Si el siguiente número postfijo es "mil", entra esta y en la proxima iteración de la recursión, este tendrá el postfijo plural
          //(inclusive si es 0)
          if(chunk_block > 3 && chunk_block * 3 % 3 === 0 && chunk_block * 3 % 2 !== 0 && chunk_number > 0){
            flag = true;
          }
        }
        //************   RECURSIVIDAD **********************
        //Consultamos si la función recursiva debe terminar de invocarse
        if(chunk_index === total_chunks){
          return text.trim();
        }
        else{
          return this.convert(number, chunk_index, total_chunks, text, flag);
        }
      }
      module.exports = ConverterToWords;