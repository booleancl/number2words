module.exports = {
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