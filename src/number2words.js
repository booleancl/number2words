var LANGUAGES = {
      SPANISH: 'es'
    },
    dictionary = {
      // Regla del español.fuente: http://goo.gl/QbJci0
      //segun la cantidad de ceros sabremos como nombrarlos
      
      //utilizar esta herramienta para conocer los nombres de los exponentes muy altos 
      //http://tip.dis.ulpgc.es/numeros-texto/default.aspx
      'exponentes': {
        'singulares': {
          '2': 'cien',
          '6': 'millón',
          '12': 'billón',
          '18': 'trillón',
          '24': 'cuatrillón',
          '30': 'quintillón',
          '36': 'sextillón'
        },
        'plurales': {
          '3': 'mil',
          '6': 'millones',
          '12': 'billones',
          '18': 'trillones',
          '24': 'cuatrillones',
          '30': 'quintillones',
          '36': 'sextillones'
        }
      },
      
      'apocopados': {
        '1': 'un',
        '21': 'veintiún',
        '100': 'ciento'
      },
      
      //Las decenas están divididas en 2 subconjuntos
      'decenas': {
        '0-29': {
          '0': 'cero','1': 'uno', '2': 'dos', '3': 'tres', '4': 'cuatro', '5': 'cinco',
          '6': 'seis','7': 'siete', '8': 'ocho', '9': 'nueve', '10': 'diez',
          '11': 'once', '12': 'doce', '13': 'trece', '14': 'catorce', '15': 'quince',
          '16': 'dieciséis', '17': 'diecisiete', '18': 'dieciocho', '19': 'diecinueve','20': 'veinte',
          '21': 'veintiuno', '22':'veintidós', '23': 'veintitrés', '24': 'veinticuatro', '25': 'veinticinco',
          '26': 'veintiséis', '27': 'veintisiete', '28': 'veintiocho', '29': 'veintinueve'
        },
        '30-90': {
          '30': 'treinta',
          '40': 'cuarenta',
          '50': 'cincuenta',
          '60': 'sesenta',
          '70': 'setenta',
          '80': 'ochenta',
          '90': 'noventa'
        }
      }, //decenas
      
      'centenas': {
        '100': 'ciento',
        '200': 'doscientos',
        '300': 'trescientos',
        '400': 'cuatrocientos',
        '500': 'quinientos',
        '600': 'seiscientos',
        '700': 'setecientos',
        '800': 'ochocientos',
        '900': 'novecientos'
      }//centenas
    };


//Pseudo-clase
module.exports = ConverterToWords;

function ConverterToWords(){
  this.language = 'en';
}

ConverterToWords.prototype.setLanguage = function(language){
  this.language = language;
};

ConverterToWords.prototype.rules = function(chunk, number_length){
  
  var chunk_text = '',
      parsed_chunk = parseInt(chunk, 10),
      
      tensBase,
      tensUnity,
      
      hundredsBase,
      hundredsTens;

  switch(chunk.length){
    case 1:
      chunk_text = dictionary['decenas']['0-29'][chunk];
      break;
    case 2:
      tensBase =  chunk.slice(0,1) + '0';
      tensUnity = chunk.slice(-1);
      
      if(parsed_chunk > 29){
        chunk_text += dictionary['decenas']['30-90'][tensBase];
        chunk_text += tensUnity !== '0' ? ' y ' + dictionary['decenas']['0-29'][tensUnity]  : '';
      }
      else{
        chunk_text = dictionary['decenas']['0-29'][chunk];
      }
      break;
    case 3:

      if(chunk === '100'){
        chunk_text += dictionary['exponentes']['singulares']['2'];
      }

      else{
        hundredsBase = chunk.slice(0,1) + '00';
        hundredsTens = chunk.slice(-2);

        chunk_text += hundredsTens === '00' ? dictionary['centenas'][hundredsBase]
                                            : dictionary['centenas'][hundredsBase] + ' ' + (hundredsTens[0] === '0' ? dictionary['decenas']['0-29'][hundredsTens.slice(-1)] : this.rules(hundredsTens));
      }
        
      break;
  }

  return chunk_text;
};

ConverterToWords.prototype.convert = function(number, chunk_index, total_chunks, converted_text){
  number += '';
  
  var length = total_chunks || Math.ceil(number.length/3),
      regex = /\d{1,3}(?=(\d{3})*$)/g, //http://goo.gl/oxhsya
      text = converted_text || '';
      
  if(!chunk_index) chunk_index = 0;
  
  chunk = (number).match(regex)[chunk_index++];
  text += this.rules(chunk);
  
  if(chunk_index === length ){
    return text;
  }
  return this.convert(number, chunk_index, length, text);
};