
import * as ST from '../../common'
import { cloneData } from '../DirectoryTblFunctions'
import { DirectoryTbl } from './../DirectoryTbl';


export function onRemoveBtnClick(this: DirectoryTbl): void {
  if (typeof(this.state.selItemNum) != 'number') {
    return;
  }
  const newItems = cloneData(this.props.items);
  const removedItem = ST.clone(newItems[this.state.selItemNum]);
  newItems.splice(this.state.selItemNum, 1);
  this.setState({ selItemNum: undefined }, () => {

    if (ST.isFunction(this.props.onChange)) {
      this.props.onChange(newItems, { event: 'removeItem', removedItem });
    }

    if (this.props.onSelectItem) {
      this.props.onSelectItem();
    }

  })

}


//click on the add row button
export function onAddBtnClick(this: DirectoryTbl): void {
  const newItems = cloneData(this.props.items);
  newItems.push({ data: {} });
  if (ST.isFunction(this.props.onChange)) {
    this.props.onChange(newItems, { event: 'addItem' });
    this.setState({ scrollToLastItem: true, selItemNum: newItems.length - 1 }, () => {

      if (this.props.onSelectItem) {
        if(typeof(this.state.selItemNum) == 'number' && this.props.items)
          this.props.onSelectItem(this.props.items[this.state.selItemNum], this.state.selItemNum);
      }

      //disable scroll down
      this.setState({ scrollToLastItem: false });
    });
  }
}
