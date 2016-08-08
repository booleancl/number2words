var ConverterToWords = require('../src/number2words');
describe('Convertir números a palabras', libDescription);

function libDescription(){
  //////////////        GLOBALS     //////////////////////
  var converterToWords,
      expectationsArr,
      possitiveAssertionsArr,
      negativeAssertionsArr;

  function runningArrayExpectations(expectationsArr, compareArr){
    expectationsArr.forEach(function(convertedWord, index){
      //Arrange: basics conditions to run the assertion (in this case this conditions are resolved in the beforeEach block)
      // - NO -
      //Act: execute the action that triggers the functionality that we are testing
      var wordAssertion = converterToWords.convert(compareArr[index]);
      //Assertion && Logging: The fact that it's expected to happen
      expect(wordAssertion).toEqual(convertedWord);
    });
  }
  
  function eachSetup(){
    converterToWords = new ConverterToWords();
    converterToWords.setLanguage('es');
  }

  describe('Casos Especiales', cornerCasesDescription);
  function cornerCasesDescription(){
    
    beforeEach(eachSetup);
    
    it('1. Debería manejar números negativos',spec1);
    function spec1(){
      
    }
    it('2. Debería manejar strings inclusive con formato de miles. Debe transformar la entrada a number ',spec2);
    function spec2(){
      expect(converterToWords.convert('12456')).toEqual('doce mil cuatrocientos cincuenta y seis');
      expect(converterToWords.convert('120.456')).toEqual('ciento veinte mil cuatrocientos cincuenta y seis');
    }
    
    
    it('3. Debería manejar numerales apocopados',spec3);
    function spec3(){

      possitiveAssertionsArr = [121021,21021,31021,41021,51028,61744,71453,81224,91003,101202,201322, 301000];
      expectationsArr = [ 'ciento veintiún mil veintiuno','veintiún mil veintiuno',
                          'treinta y un mil veintiuno','cuarenta y un mil veintiuno',
                          'cincuenta y un mil veintiocho','sesenta y un mil setecientos cuarenta y cuatro',
                          'setenta y un mil cuatrocientos cincuenta y tres','ochenta y un mil doscientos veinticuatro',
                          'noventa y un mil tres', 'ciento un mil doscientos dos','doscientos un mil trescientos veintidós',
                          'trescientos un mil'];
      
      runningArrayExpectations(expectationsArr, possitiveAssertionsArr);
    }
    
    it('4. Debería arrojar una excepción cuando se entregue un formato no válido', spec4);
    function spec4(){
      negativeAssertionsArr = ['.12adada1','10000.0','100,000','1.2000','15000.0', 1.22];
      
      negativeAssertionsArr.forEach(function(value){
        expect(function(){
          converterToWords.convert(value);
        }).toThrow();
      });
    }
    
  }
 describe('Números del 0 al 9', description1);
  function description1(){
    
    beforeEach(eachSetup);
    
    it('1. Debería convertir números del 0 al 9 en palabras', spec1);
    //numerals['0-9']:['cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve']
    function spec1(){
      possitiveAssertionsArr = [0,1,2,3,4,5,6,7,8,9];
      expectationsArr = ['cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve'];
      runningArrayExpectations(expectationsArr, possitiveAssertionsArr);
    }
  }
 describe('Números del 10 al 19', description2);
  function description2(){
    it('1. Debería convertir números del 11 al 19 en palabras',spec1);
    function spec1(){
      possitiveAssertionsArr = [10,11,12,13,14,15,16,17,18,19];
      expectationsArr = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince','dieciséis','diecisiete','dieciocho','diecinueve'];
      runningArrayExpectations(expectationsArr, possitiveAssertionsArr);
    }
  }
  
 describe('Números del 20 al 29', description3);
  function description3(){
    it('1. Debería convertir números del 20 al 29 en palabras',spec1);
    function spec1(){
      possitiveAssertionsArr = [20,22,23,24,25,26,27,28,29];
      expectationsArr = ['veinte', 'veintidós', 'veintitrés','veinticuatro','veinticinco','veintiséis', 'veintisiete','veintiocho','veintinueve'];
      runningArrayExpectations(expectationsArr, possitiveAssertionsArr);
    }
  }
  
 describe('Números del 30 al 99', description4);
  function description4(){
    it('1. Debería convertir números del 30 al 99 en palabras',spec1);
    function spec1(){
      possitiveAssertionsArr = [30,41,52,63,64,75,77,88,99];
      expectationsArr = ['treinta', 'cuarenta y uno', 'cincuenta y dos', 'sesenta y tres', 'sesenta y cuatro', 'setenta y cinco', 'setenta y siete',
                         'ochenta y ocho', 'noventa y nueve'];
      runningArrayExpectations(expectationsArr, possitiveAssertionsArr);
    }
  }
  
 describe('Números del 100 al 999', description5);
  function description5(){
    it('1. Debería convertir las centenas entre 100 y 900',spec1);
    function spec1(){
      possitiveAssertionsArr = [100,200,300,400,500,600,700,800,900];
      expectationsArr = ['cien','doscientos','trescientos','cuatrocientos','quinientos','seiscientos','setecientos','ochocientos','novecientos'];
      runningArrayExpectations(expectationsArr, possitiveAssertionsArr);
    }
    
    it('2. Debería convertir números entre 100 y 900 de dos palabras',spec2);
    function spec2(){
      possitiveAssertionsArr = [101,110,202,211,303,312,404,413,505,514,606,615,707,716,808,817,
                                909,918,819,720,621,522,423,324,225,126,227,328,429,530,640,750,860,970,880,790,
                                681,572,483,394,285,176];
      expectationsArr = ['ciento uno', 'ciento diez', 'doscientos dos', 'doscientos once', 'trescientos tres',
                         'trescientos doce','cuatrocientos cuatro','cuatrocientos trece','quinientos cinco',
                         'quinientos catorce','seiscientos seis','seiscientos quince','setecientos siete',
                         'setecientos dieciséis','ochocientos ocho','ochocientos diecisiete','novecientos nueve',
                         'novecientos dieciocho','ochocientos diecinueve','setecientos veinte','seiscientos veintiuno',
                         'quinientos veintidós','cuatrocientos veintitrés','trescientos veinticuatro','doscientos veinticinco',
                         'ciento veintiséis','doscientos veintisiete','trescientos veintiocho','cuatrocientos veintinueve',
                         'quinientos treinta','seiscientos cuarenta','setecientos cincuenta','ochocientos sesenta',
                         'novecientos setenta','ochocientos ochenta','setecientos noventa',
                         'seiscientos ochenta y uno','quinientos setenta y dos','cuatrocientos ochenta y tres',
                         'trescientos noventa y cuatro','doscientos ochenta y cinco','ciento setenta y seis' ];
      runningArrayExpectations(expectationsArr,possitiveAssertionsArr);
    }
  }
  
 describe('Números del 1000 al 999.999',description6);
  function description6(){
    it('1. Debería convertir los múltiplos de 1000 hasta el 900.000 de 1 o dos palabras',spec1);
    function spec1(){
      possitiveAssertionsArr = [1000,2000,3000,4000,5000,6000,7000,8000,9000,10000,11000,12000,13000,14000,15000,16000,17000,18000,19000,20000,
                                22000,23000,24000,25000,26000,27000,28000,29000,30000,40000,50000,60000,70000,80000,90000,100000,200000,300000,
                                400000,500000,600000,700000,800000,900000];
      expectationsArr = ['mil','dos mil','tres mil','cuatro mil','cinco mil','seis mil','siete mil','ocho mil','nueve mil','diez mil',
                         'once mil','doce mil','trece mil','catorce mil','quince mil','dieciséis mil','diecisiete mil','dieciocho mil',
                         'diecinueve mil','veinte mil','veintidós mil','veintitrés mil','veinticuatro mil','veinticinco mil','veintiséis mil',
                         'veintisiete mil','veintiocho mil','veintinueve mil','treinta mil','cuarenta mil','cincuenta mil','sesenta mil',
                         'setenta mil','ochenta mil','noventa mil','cien mil','doscientos mil','trescientos mil','cuatrocientos mil','quinientos mil',
                         'seiscientos mil','setecientos mil','ochocientos mil','novecientos mil'];
      runningArrayExpectations(expectationsArr,possitiveAssertionsArr);
    }
    
    it('2. Debería convertir números entre 102.000 y 990.000 de tres palabras',spec2);
    function spec2(){
      possitiveAssertionsArr = [102000,103000,104000,105000,106000,107000,108000,109000,110000,111000,112000,113000,114000,115000,116000,
                                117000,118000,119000,120000,122000,123000,124000,125000, 126000, 127000, 128000, 129000, 130000, 140000, 150000,
                                160000, 170000, 180000, 190000,200000, 310000, 420000, 530000,640000, 750000,860000,970000,990000];
      expectationsArr = ['ciento dos mil', 'ciento tres mil','ciento cuatro mil','ciento cinco mil','ciento seis mil','ciento siete mil',
                         'ciento ocho mil','ciento nueve mil','ciento diez mil','ciento once mil','ciento doce mil','ciento trece mil',
                         'ciento catorce mil', 'ciento quince mil','ciento dieciséis mil', 'ciento diecisiete mil','ciento dieciocho mil',
                         'ciento diecinueve mil','ciento veinte mil', 'ciento veintidós mil','ciento veintitrés mil', 'ciento veinticuatro mil',
                         'ciento veinticinco mil','ciento veintiséis mil','ciento veintisiete mil','ciento veintiocho mil','ciento veintinueve mil',
                         'ciento treinta mil','ciento cuarenta mil','ciento cincuenta mil', 'ciento sesenta mil','ciento setenta mil',
                         'ciento ochenta mil','ciento noventa mil','doscientos mil','trescientos diez mil','cuatrocientos veinte mil',
                         'quinientos treinta mil','seiscientos cuarenta mil','setecientos cincuenta mil','ochocientos sesenta mil',
                         'novecientos setenta mil','novecientos noventa mil'];
      runningArrayExpectations(expectationsArr, possitiveAssertionsArr);
    }
    
    it('3. Debería convertir números entre 102.001 y 990.900 de cuatro palabras',spec3);
    function spec3(){
      possitiveAssertionsArr = [102001,990900];
      expectationsArr = ['ciento dos mil uno','novecientos noventa mil novecientos'];
      runningArrayExpectations(expectationsArr, possitiveAssertionsArr);
    }
    
    it('4. Debería convertir números entre 102.031 y 990.990 de cinco palabras',spec4);
    function spec4(){
      possitiveAssertionsArr = [102031,990990];
      expectationsArr = ['ciento dos mil treinta y uno','novecientos noventa mil novecientos noventa'];
      runningArrayExpectations(expectationsArr, possitiveAssertionsArr);
    }
    
    it('5. Debería convertir números entre 102.131 y 990.999 de seis palabras',spec5);
    function spec5(){
      possitiveAssertionsArr = [102131,990999];
      expectationsArr = ['ciento dos mil ciento treinta y uno','novecientos noventa mil novecientos noventa y nueve'];
      runningArrayExpectations(expectationsArr, possitiveAssertionsArr);
    }
    
    it('6. Debería convertir números entre 132.131 y 999.999 de siete palabras',spec6);
    function spec6(){
      possitiveAssertionsArr = [132131,999999];
      expectationsArr = ['ciento treinta y dos mil ciento treinta y uno','novecientos noventa y nueve mil novecientos noventa y nueve'];
      runningArrayExpectations(expectationsArr, possitiveAssertionsArr);
    }
  }


 describe('Números del 1.000.000 al 999.999.999', description7);
  function description7(){
    
    it('1. Debería convertir números desde el 1.000.000 al 9.999.999',spec1);
    
    function spec1(){
      possitiveAssertionsArr = [1000000,2000000,3000000,4000000,5000000,6000000,7000000,8000000,9000000];
      expectationsArr = ['un millón','dos millones','tres millones','cuatro millones','cinco millones','seis millones','siete millones','ocho millones','nueve millones'];
      runningArrayExpectations(expectationsArr, possitiveAssertionsArr);
    }

    it('2. Debería convertir números desde el 10.000.000 al 19.000.000',spec2);
    function spec2(){
      possitiveAssertionsArr = [10000000,11000000,12000000,13000000,14000000,15000000,16000000,17000000,18000000,19000000];
      expectationsArr = ['diez millones','once millones','doce millones','trece millones','catorce millones','quince millones','dieciséis millones',
                         'diecisiete millones','dieciocho millones','diecinueve millones'];
      runningArrayExpectations(expectationsArr, possitiveAssertionsArr);
    }

    it('3. Debería convertir números desde el 20.000.000 al 29.000.000',spec3);
    function spec3(){
      possitiveAssertionsArr = [20000000,21000000,22000000,23000000,24000000,25000000,26000000,27000000,28000000,29000000];
      expectationsArr = ['veinte millones','veintiún millones','veintidós millones','veintitrés millones','veinticuatro millones','veinticinco millones',
                         'veintiséis millones','veintisiete millones','veintiocho millones','veintinueve millones'];
      runningArrayExpectations(expectationsArr, possitiveAssertionsArr);
    }

    it('4. Debería convertir números desde el 30.000.000 al 99.000.000',spec4);
    function spec4(){
      possitiveAssertionsArr = [31000000,42000000,53000000,64000000,75000000,86000000,97000000,88000000,79000000,60000000];
      expectationsArr = ['treinta y un millones','cuarenta y dos millones','cincuenta y tres millones','sesenta y cuatro millones','setenta y cinco millones','ochenta y seis millones',
                         'noventa y siete millones','ochenta y ocho millones','setenta y nueve millones','sesenta millones'];
      runningArrayExpectations(expectationsArr, possitiveAssertionsArr);
    }

    it('5. Debería convertir números las centenas de millón (100.000.000 - 900.000.000)',spec5);
    function spec5(){
      possitiveAssertionsArr = [100000000,200000000, 300000000, 400000000, 500000000, 600000000, 700000000, 800000000, 900000000];
      expectationsArr = ['cien millones', 'doscientos millones', 'trescientos millones', 'cuatrocientos millones', 'quinientos millones', 'seiscientos millones','setecientos millones', 'ochocientos millones', 'novecientos millones'];
      runningArrayExpectations(expectationsArr, possitiveAssertionsArr);
    }
    
    it('6. Debería convertir números desde el 101.000.000 al 129.000.000 de tres palabras', spec6);
    function spec6(){
      possitiveAssertionsArr = [101000000,102000000, 103000000, 104000000, 105000000, 106000000, 107000000, 108000000, 109000000];
      expectationsArr = [
        'ciento un millones', 'ciento dos millones', 'ciento tres millones', 'ciento cuatro millones', 'ciento cinco millones',
        'ciento seis millones', 'ciento siete millones', 'ciento ocho millones','ciento nueve millones'
      ];
      runningArrayExpectations(expectationsArr, possitiveAssertionsArr);
    }
    
    it('7. Debería convertir números desde el 132.000.000 al 999.000.000 de cuatro palabras', spec7);
    function spec7(){
      possitiveAssertionsArr = [142000000, 153000000, 164000000, 175000000, 186000000, 197000000, 188000000, 179000000];
      expectationsArr = ['ciento cuarenta y dos millones', 'ciento cincuenta y tres millones', 'ciento sesenta y cuatro millones',
        'ciento setenta y cinco millones', 'ciento ochenta y seis millones', 'ciento noventa y siete millones','ciento ochenta y ocho millones', 'ciento setenta y nueve millones'
      ];
      runningArrayExpectations(expectationsArr, possitiveAssertionsArr);
    }
    // xit('8. Debería convertir números desde de 1.100.001 al 900.900.030 de cinco palabras', spec8);
    // xit('9. Debería convertir números desde de 1.100.031 al 900.900.990 de seis palabras', spec9);
    
    it('10. Debería convertir números desde de el 1.100.131 al 900.900.999 de siete palabras', spec10);
    
    function spec10(){
      possitiveAssertionsArr = [1100131,1111111,2222222,3333333,4444444,5555555,6666666,7777777,
        8888888,9999999,900900999];
      expectationsArr = ['un millón cien mil ciento treinta y uno','un millón ciento once mil ciento once',
        'dos millones doscientos veintidós mil doscientos veintidós','tres millones trescientos treinta y tres mil trescientos treinta y tres',
        'cuatro millones cuatrocientos cuarenta y cuatro mil cuatrocientos cuarenta y cuatro','cinco millones quinientos cincuenta y cinco mil quinientos cincuenta y cinco',
        'seis millones seiscientos sesenta y seis mil seiscientos sesenta y seis','siete millones setecientos setenta y siete mil setecientos setenta y siete',
        'ocho millones ochocientos ochenta y ocho mil ochocientos ochenta y ocho','nueve millones novecientos noventa y nueve mil novecientos noventa y nueve',
        'novecientos millones novecientos mil novecientos noventa y nueve'
      ];
      runningArrayExpectations(expectationsArr, possitiveAssertionsArr);
    }

  }



}