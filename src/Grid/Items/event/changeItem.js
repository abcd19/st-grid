export function changeItem(row, cell){

    var self = this;
    
    if(ST.isFunction(self._data['handler']['changeItem']))
    {
      self._data['handler']['changeItem'](row, cell);
    }
};

