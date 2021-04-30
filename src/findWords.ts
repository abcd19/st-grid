
/**
 * calc rank elements of string array by input string
 * @param {type} str
 * @param {type} arrayWords
 * @returns {array} of shorted by rank elements
 * {
 *  'rank': 2,    
 *  'elemLink': 1
 * }
 */
export function calcRank(arrayWords: any[], word: any,  flags: any)
{
  
  function calcRankWords(word: string,  str: number)
  {
    var word_t = String(word).toUpperCase();
    var str_t = String(str).toUpperCase();
    
    if(str_t.indexOf(word_t) > 0)
    {
      return 1;
    }
    
    if(str_t === word_t)
    {
      return 4;
    }
    
    if(str_t.indexOf(word_t) == 0)
    {
      return 3;
    }
    
    if(str_t.indexOf(' ' + word_t) > 0 || 
            str_t.indexOf('.' + word_t) > 0 || 
            str_t.indexOf(',' + word_t) > 0)
    {
      return 2;
    }
    

    
    if(str_t.indexOf(word_t) == -1)
    {
      return 0;
    }
  }
  
  
  function hasFlag(flags: any, flagName: any)
  {
      if(typeof(flags) != 'object')
      {
         return false; 
      }
      
      return flags[flagName] != undefined;
  }
  
  var ranks = []; 

  for(var i = 0; i < arrayWords.length; i++)
  {    
    var rank = calcRankWords(word,  arrayWords[i]);
    
    if(hasFlag(flags, 'deleteElementByRankZero') && rank == 0)
    {
        continue;
    }
    
    
      
    ranks.push({
      rank: calcRankWords(word,  arrayWords[i]),
      elemLink: i,
    });
  }
  var sortByRank = ranks.sort(function(a: any, b: any){
    return b['rank'] - a['rank'];
  });
  
  return sortByRank;
  
};