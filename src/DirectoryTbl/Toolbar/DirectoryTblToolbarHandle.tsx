
import * as ST from '../../common'
import { typeItem } from '../Grid';
import { cloneData } from '../DirectoryTblFunctions'
import { DirectoryTbl } from './../DirectoryTbl';


export function onRemoveBtnClick(this: DirectoryTbl): void {
  if (typeof(this.state.selItemNum) != 'number') {
    return;
  }

  const {items} = this.props;
  const newItems = cloneData(items as typeItem[]);
  const removedItem = ST.clone(newItems[this.state.selItemNum]);
  newItems.splice(this.state.selItemNum, 1);
  this.setState({ selItemNum: undefined }, () => {

    if (this.props.onChange) {
      this.props.onChange(newItems, { event: 'removeItem', removedItem });
    }

    if (this.props.onSelectItem) {
      this.props.onSelectItem();
    }

  })

}


//click on the add row button
export function onAddBtnClick(this: DirectoryTbl): void {
  
  const {items} = this.props;

  const newItems = cloneData(items as typeItem[]);
  newItems.push({ data: {} });
  if (this.props.onChange) {
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
