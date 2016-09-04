module.exports = {
  //Regla del español.fuente: http://goo.gl/QbJci0
  //segun la cantidad de ceros sabremos como nombrarlos
  
  //Utilizar esta herramienta para conocer los nombres de los exponentes muy altos 
  //http://tip.dis.ulpgc.es/numeros-texto/default.aspx
  
  //Bloques correspondientes a los chunks que le darán "apellido" a cada chunk analizado
  'bloques': {
    
    'singulares': {
      '0': 'cien',
      '2': 'millón',
      '4': 'billón',
      '6': 'trillón',
      '8': 'cuatrillón',
      '10': 'quintillón',
      '12': 'sextillón',
      '14': 'septillón'
      //...
    },
    
    'plurales': {
      '1': 'mil',
      '2': 'millones',
      '4': 'billones',
      '6': 'trillones',
      '8': 'cuatrillones',
      '10': 'quintillones',
      '12': 'sextillones',
      '14': 'septillones'
      //...
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
      '0': 'cero',
      '1': 'uno',
      '2': 'dos',
      '3': 'tres',
      '4': 'cuatro',
      '5': 'cinco',
      '6': 'seis',
      '7': 'siete',
      '8': 'ocho',
      '9': 'nueve',
      '10': 'diez',
      '11': 'once',
      '12': 'doce',
      '13': 'trece',
      '14': 'catorce',
      '15': 'quince',
      '16': 'dieciséis',
      '17': 'diecisiete',
      '18': 'dieciocho',
      '19': 'diecinueve',
      '20': 'veinte',
      '21': 'veintiuno',
      '22': 'veintidós',
      '23': 'veintitrés',
      '24': 'veinticuatro',
      '25': 'veinticinco',
      '26': 'veintiséis',
      '27': 'veintisiete',
      '28': 'veintiocho',
      '29': 'veintinueve'
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