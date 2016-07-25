var numerals,
    LANGUAGES;

LANGUAGES = {
  SPANISH: 'es'
};
//SPANISH SOURCE
//SOURCE: http://www.reglasdeortografia.com/numerales.html
//        http://hispanoteca.eu/Foro-preguntas/ARCHIVO-Foro/Numerales%20uno-una%20-%20formas%20apocopadas.htm
//        http://smartcubofiles.com/Libros_flip/r3/01secundaria/Leccion02.pdf
numerals = {
  
  '0-9':[
    'cero',
    'uno',
    'dos',
    'tres',
    'cuatro',
    'cinco',
    'seis',
    'siete',
    'ocho',
    'nueve'
  ],
  
  '10-19':[
    'diez',
    'once',
    'doce',
    'trece',
    'catorce',
    'quince',
    'dieciséis',
    'diecisiete',
    'dieciocho',
    'diecinueve'
  ],
  
  '20-29':[
    'veinte',
    'veintiuno',
    'veintidós',
    'veintitrés',
    'veinticuatro',
    'veinticinco',
    'veintiséis',
    'veintisiete',
    'veintiocho',
    'veintinueve'
  ],
  '30-90':[
    'treinta',
    'cuarenta',
    'cincuenta',
    'sesenta',
    'setenta',
    'ochenta',
    'noventa'
  ],
  
  '100-900':[
    'cien',
    'ciento',
    'doscientos',
    'trescientos',
    'cuatrocientos',
    'quinientos',
    'seiscientos',
    'setecientos',
    'ochocientos',
    'novecientos'
  ],
  
  '1000': 'mil',

  '1000000': [
    'millón',
    'millones'
  ],
  
  '1000000000': [
    'billón',
    'billones'
  ],
  
  //apocopados : http://goo.gl/3NNc0p
  'apocopados': {
    '1': ['y un','un'],
    '21': 'veintiún',
   }
};


module.exports = ConverterToWords;

function ConverterToWords(){
  var self = this;
  this.validationRegex = /^(?!0)(?:\d+|\d{1,3}(?:\.\d{3})+)$|^0$/;
}
ConverterToWords.prototype.setLanguage = function(languageKey){
  this.language = LANGUAGES[''+languageKey];
};
ConverterToWords.prototype.isValidFormat = function(number){
  if(this.validationRegex.test(number)){
    return true;
  }
  throw 'Provide an entire in a valid format';
};
ConverterToWords.prototype.getSpecial = function(number){
  
  var specialNumber;

  
  switch(number){
    case 21:
      specialNumber = numerals['apocopados']['21']; //veintiún
      break;
    case 31:
    case 41:
    case 51:
    case 61:
    case 71:
    case 81:
    case 91:
      specialNumber = numerals['30-90'][parseInt(number/10,10) - 3] + ' ' + numerals['apocopados']['1'][0]; //y un
      break;
    case 121:         //ciento                        //veintiún
      specialNumber = numerals['100-900'][1] + ' '  + numerals['apocopados']['21'];
      break;
    case 101:
    case 201:
    case 301:
    case 401:
    case 501:
    case 601:
    case 701:
    case 801:
    case 901:
      specialNumber = numerals['100-900'][parseInt(number/100,10)] + ' ' + numerals['apocopados']['1'][1]; //un
      break;
  }
  return specialNumber;
};
/* Think about this when you refactoring the function convert
    http://stackoverflow.com/questions/32347732/efficiency-vs-legibility-of-code
*/
ConverterToWords.prototype.convert = function(number){
  var result,
      specialNumbers = [101,201,301,401,501,601,701,801,901,121,21,31,41,51,61,71,81,91];
  //Valid format
  if(this.isValidFormat(number)){
    number = parseInt(('' + number).replace(/\./g,''), 10);
  }
  //Spanish strategy
  if(number >= 0 && number <= 9){
    result = numerals['0-9'][number];
  }
  else if(number >= 10 && number <= 19){
    result = numerals['10-19'][number - 10];
  }
  else if(number >= 20 && number <= 29){
    result = numerals['20-29'][number - 20];
  }
  else if(number >= 30 && number <= 99){
    result  = numerals['30-90'][parseInt(number/10,10) - 3];
    if(number%10 > 0) result += ' y ' + numerals['0-9'] [number%10];
  }
  else if(number >= 100 && number <= 999){
    if(number === 100){
      result = numerals['100-900'][0];
    }
    else {
      if((number/100)%1 === 0){
        result = numerals['100-900'][parseInt(number/100,10)];
      }
      if((number/100)%1 !== 0){
        result = numerals['100-900'][parseInt(number/100,10)];
        result += ' ' + this.convert(parseInt(number%100,10)); //recursive call
      }
    }
  }
  else if(number >= 1000 && number <= 999999){
    if(number === 1000){
      result = numerals['1000'];
    }
    else{
      var isThousandsMultiple = (number/1000)%1 === 0,
        thousandsDivisionInt = parseInt(number/1000, 10);
      
      //recursive call
      result  = specialNumbers.indexOf(thousandsDivisionInt) !== -1 ? this.getSpecial(thousandsDivisionInt)
                                                                    : this.convert(thousandsDivisionInt);
      if(isThousandsMultiple){
        result += ' ' + numerals['1000'];
      }
      else{
        //double recursive call
        result += ' ' + [numerals['1000'], this.convert(parseInt(number%1000,10))].join(' ');
      }
      
    }
  }
  else if(number >= 1000000 && number <= 999999999){

    var isMillionMultiple = (number/1000000)%1 === 0,
        millionDivisionInt = parseInt(number/1000000, 10);
    
    if(millionDivisionInt === 1){
      result = numerals['apocopados']['1'][1] + ' ' + numerals['1000000'][0];
    }
    else if(isMillionMultiple){
      result  = specialNumbers.indexOf(millionDivisionInt) !== -1 ? this.getSpecial(millionDivisionInt)
                                                                  : this.convert(millionDivisionInt);
      result += ' ' + numerals['1000000'][1];
    }
    else{
      
    }
  }

  return result;
};