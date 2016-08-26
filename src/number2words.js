var dictionary = require('./dictionaries/dictionary_es');

//Pseudo-clase
module.exports = ConverterToWords;

function ConverterToWords(){
  this.language = 'en';
}

ConverterToWords.prototype.setLanguage = function(language){
  this.language = language;
  this.validationRegex = /^(?!0)(?:\d+|\d{1,3}(?:\.\d{3})+)$|^0$/;
};

ConverterToWords.prototype.isValidFormat = function(number){
  if(this.validationRegex.test(number)){
    return true;
  }
  throw 'Provide an entire in a valid format';
};

ConverterToWords.prototype.rules = function(chunk, chunk_index, total_chunks){
  
  var chunk_text = '',
      parsed_chunk = parseInt(chunk, 10),
      
      tensBase,
      tensUnity,
      
      hundredsBase,
      hundredsTens;

  switch(chunk.length){
    
    case 1:
      
      //apocopado 1
      if( (chunk.slice(-1) === '1') && (total_chunks - chunk_index) > 1){
        chunk_text = dictionary['apocopados']['1'];
      }
      else{
        chunk_text = dictionary['decenas']['0-29'][chunk];
      }
      break;
    
    case 2:
      tensBase =  chunk.slice(0,1) + '0';
      tensUnity = chunk.slice(-1);
      
      if(parsed_chunk > 29){
        chunk_text += dictionary['decenas']['30-90'][tensBase];
        
        if(tensUnity !== '0'){
          if(tensUnity === '1' && (total_chunks - chunk_index) >= 1){
            chunk_text += ' y ' + dictionary['apocopados']['1'];
          }
          else{
            chunk_text += ' y ' + this.rules(tensUnity, chunk_index, total_chunks);
          }
        }
      }
      else{
        if(chunk === '21' && (total_chunks - chunk_index) >= 1){
          chunk_text = dictionary['apocopados']['21'];
        }
        else{
          chunk_text = dictionary['decenas']['0-29'][chunk];
        }
      }
      break;
    
    case 3:
      if(chunk === '100'){
        chunk_text += dictionary['exponentes']['singulares']['2'];
      }
      else if(chunk !== '000'){

        if(chunk.slice(0,2) === '00'){
          chunk_text += dictionary['decenas']['0-29'][chunk.slice(-1)];
        }
        else{
          hundredsBase = chunk.slice(0,1) + '00';
          hundredsTens = chunk.slice(-2);

          if(hundredsTens === '00'){
            chunk_text +=  dictionary['centenas'][hundredsBase];
          }
          else if(chunk.slice(0,1) === '0'){
            chunk_text += this.rules(hundredsTens, chunk_index, total_chunks);
          }
          else{
            chunk_text += dictionary['centenas'][hundredsBase] + ' ';
            
            if(hundredsTens[0] === '0'){
              if(chunk.slice(-2) === '01' && (total_chunks - chunk_index) > 0){
                chunk_text += dictionary['apocopados']['1'];
              }
              else{
                chunk_text += dictionary['decenas']['0-29'][hundredsTens.slice(-1)];
              }
            }
            else{
              chunk_text += this.rules(hundredsTens, chunk_index, total_chunks);
            }
          }
        }
      }
      
      break;
  }
  
  return chunk_text;
};

ConverterToWords.prototype.convert = function(number, chunk_index, total_chunks, converted_text){
  
  if(this.isValidFormat(number)){
    number = parseInt(('' + number).replace(/\./g,''), 10);
  }

  number += '';
  
  var regex = /\d{1,3}(?=(\d{3})*$)/g, //http://goo.gl/oxhsya
      text = converted_text || '';

  total_chunks = total_chunks || Math.ceil(number.length/3);

  if(!chunk_index) chunk_index = 0;
  
  chunk = (number).match(regex)[chunk_index++];
  
  var numberexp = (total_chunks - chunk_index) * 3;
  //SE ESTÁ VOLVIENDO POCO ENTENDIBLE, SE DEBE MEJORAR LEGIBILIDAD.
  if ((chunk === '1' || chunk === '01' || chunk === '001' ) && (total_chunks - chunk_index) % 2 != 0){
  
  }
  else if(number !== '1000'){
    text += this.rules(chunk, chunk_index, total_chunks) + ' ';
  }
  if(chunk !== '000' || (numberexp >= 6 && total_chunks > 3)){
    
    if(numberexp >= 9 && numberexp % 3 === 0 && numberexp % 2 !== 0){
      numberexp = 3;
    }
    numberexp += '';
    
    if ((chunk === '1' || chunk === '01') && (total_chunks - chunk_index) > 1){
      text += dictionary['exponentes']['singulares'][numberexp] + ' ';
      console.log(chunk, number,dictionary['exponentes']['plurales'][numberexp], numberexp);
    }
    else if((total_chunks - chunk_index) % 2 != 0 || (total_chunks - chunk_index) > 0){
      text += dictionary['exponentes']['plurales'][numberexp] + ' ';
      console.log(chunk, number, dictionary['exponentes']['singulares'][numberexp], numberexp);
    }
  }
  //End of recursivity
  if(chunk_index === total_chunks){
    return text.trim();
  }

  return this.convert(number, chunk_index, total_chunks, text);
};