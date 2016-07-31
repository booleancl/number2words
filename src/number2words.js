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
  
  '0-29':[
    'cero',
    'uno',
    'dos',
    'tres',
    'cuatro',
    'cinco',
    'seis',
    'siete',
    'ocho',
    'nueve',
    'diez',
    'once',
    'doce',
    'trece',
    'catorce',
    'quince',
    'dieciséis',
    'diecisiete',
    'dieciocho',
    'diecinueve',
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
  
  'postfijo': [
    'mil',
    'millones',
    'billones'
  ],

  '1.000.000': 'millón',

  '1.000.000.000': 'billón',

  //apocopados : http://goo.gl/3NNc0p
  'apocopados': {
    '1': ['y un','un'],
    '21': 'veintiún'
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
    case 1:
      specialNumber = numerals['apocopados']['1'][0];
      break;
    case 21:
      specialNumber = numerals['apocopados']['21']; //veintiún
      break;
  
  }
  return specialNumber;
};
/* Think about this when you refactoring the function convert
    http://stackoverflow.com/questions/32347732/efficiency-vs-legibility-of-code
*/
ConverterToWords.prototype.convert = function(number, special){
  
  var result = '',
      numberLength,
      recoursiveCallsCount;
  
  if(this.isValidFormat(number)){
    number = parseInt(('' + number).replace(/\./g,''), 10);
  }

  if(number >= 0 && number <= 29){
    result = (number === 21 && special) ? this.getSpecial(21)
                                        : numerals['0-29'][number];
  }
  else if(number >= 30 && number <= 99){
    result = numerals['30-90'][parseInt(number/10,10) - 3];
    if(number % 10 !== 0){
      result += (number%10 === 1 && special) ? ' ' + this.getSpecial(1)
                                             : ' y ' + this.convert(number%10);
    }
  }
  else if(number >= 100 && number <= 999){
    if(number === 100){
      result = numerals['100-900'][0];
    }
    else{
      result = (number/100)%1 === 0 ? numerals['100-900'][parseInt(number/100,10)]
                                    : numerals['100-900'][parseInt(number/100,10)] + ' ' + ((number%100 === 21 && special) ? this.getSpecial(21) : this.convert(number%100));
    }
  }
  else{

    if(number === 1000){
      result = numerals['postfijo'][0];
    }
    else if(number === 1000000){
      result = numerals['apocopados']['1'][1] + ' ' + numerals['1.000.000'];
    }
    else if(number === 1000000000){
      result = numerals['apocopados']['1'][1] + ' ' + numerals['1.000.000.000'];
    }
    else{
      splitedNumber = number.toString().match(/(\d{1,3})(?=(\d{3})+(?!\d))/g);

      for(var i = 0; i < splitedNumber.length; i++){
        if(parseInt(splitedNumber[i], 10) !== 0){
          result += ' ' + this.convert(parseInt(splitedNumber[i], 10), true) + ' ' + numerals['postfijo'][splitedNumber.length - i - 1];
        }
      }

      if(parseInt(number.toString().slice(-3), 10) !== 0){
        result += ' ' + this.convert(parseInt(number.toString().slice(-3), 10));
      }
      
    }

  }
  return result.trim();

};