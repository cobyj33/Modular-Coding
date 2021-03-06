import { useContext, } from 'react';
import { GlobalContext } from '../../App';
import "./bottombar.css"
import { validVariableTypes } from '../../NodeScript';

//types of nodes: value, variable, function, array, object, loop, class
export const BottomBar = () => {
  const { selectionState } = useContext(GlobalContext);
  const [nodeSelection, setNodeSelection] = selectionState;
  
  function changeSelection(selection) {
    console.log('changing to ', selection);
    if (selection == nodeSelection) { return; }
    if (validVariableTypes.some(type => type === selection)) {
      setNodeSelection(selection)
    } else {
      console.error('type ', selection, ' is not a valid variable type');
    }
  }

  return (
    <div id="bottombar">
        <h3> Using: {nodeSelection.charAt(0).toUpperCase() + nodeSelection.slice(1)} </h3>
        <button onClick={() => changeSelection('value')}> Value </button>
        <button onClick={() => changeSelection('variable')}> Variable </button>
        <button onClick={() => changeSelection('function')}> Function </button>
        <button onClick={() => changeSelection('array')}> Array </button>
        <button onClick={() => changeSelection('object')}> Object </button>
        <button onClick={() => changeSelection('loop')}> Loop </button>
        <button onClick={() => changeSelection('class')}> Class </button>
    </div>
  )
}
