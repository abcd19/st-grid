
 
  import ST from './core'
  /**
   * Случайное название длиной от lengthMax до lengthMin (границы включительно)
   * В кирилическом алфавите. Первая буква - заглавная
   * @param {number} lengthMax макс длина
   * @param {number} lengthMin мин длина
   */
  function genName(lengthMin, lengthMax)
  {
    
  var min = lengthMin; 
  if(ST.isUndefined(min))
   {
     min = 3;
   }
   
   var max = max;    
   if(ST.isUndefined(max))
   {
     max = 10;
   }
   
    var sogl = 'цкнгшзхфвпрлджчсмтб';
    var gl = 'уеаоэяию';
    var result = '';
    var length = ST.random.genNumber(min, max);
    for(var i = 0; i < length; i++)
    {
      var source;
	  //чере символ печатает согласную
	  var devBy2 = (i%2 === 0);
	  if(devBy2){
      source = sogl;
	  }else{
      source = gl;
	  }
      var pos = Math.floor(Math.random() * source.length);
      result = result + source[pos];  
    }
	
    var firstToUpper = result.charAt(0).toUpperCase() + result.substr(1);
    return firstToUpper;
  };
  



  /**
   * gen random string length between lengthMin and lengthMax
   * @param {type} lengthMin
   * @param {type} lengthMax
   * @returns {unresolved}
   */
  function genString(lengthMin, lengthMax)
  {
    
  var min = lengthMin; 
  if(ST.isUndefined(min))
   {
     min = 3;
   }
   
   var max = max;    
   if(ST.isUndefined(max))
   {
     max = 10;
   }
   
    var lit = 'qwertyuiopasdfghjklzxcvbnm';
    var result = '';
    var length = genNumber(min, max);
    for(var i = 0; i < length; i++)
    {
      var pos = Math.floor(Math.random() * lit.length);
      result = result + lit[pos];  
    }
	
    var firstToUpper = result.charAt(0).toUpperCase() + result.substr(1);
    return firstToUpper;
  };
  
  function genUuid()
  {
    return genString(3,12) + '-' + 
    genString(3,12) + '-' + 
    genString(3,12) + '-' + 
    genString(3,12) ;
  }

  /**
  * Случайное целое число между min и max (границы включительно)
  */
  function genNumber(min, max)
  {
	return Math.floor(Math.random() * (max - min + 1)) + min;  
  };
  
  
  /**
  * true или fale случайно
  */
 function genBoolean ()
  {
	return Boolean(genNumber(0,1)); 
  };
  
  /**
  * Генерация даты в виде начала месяца между 2000 и 2100 годами
  */
 function genDate()
  {
	  var year_s = String(genNumber(2000,2100));
	  var month = genNumber(1,12);
	  var day = genNumber(1,28);
	  var month_s;
	  if(month < 10)
	  {
		month_s = '0'+String(month);  
	  }else {
		 month_s = String(month); 
	  }

	  
	  return '01' + '.' + month_s + '.' + year_s;
  }
  
  /**
  * Вернуть случайный элемент массива
  */
 function getRandomArrayElement(array)
  {
    var length = array.length;
    if(length == 0)
    {
      return undefined
    }
    var rand = genNumber(1,length) - 1;
    return array[rand];
  }

  export {genUuid};