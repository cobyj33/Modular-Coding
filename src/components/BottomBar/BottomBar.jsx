import { useContext, } from 'react';
import { NodeContext } from '../../App';
import "./bottombar.css"

//types of nodes: value, variable, function, array, object, loop, class
export const BottomBar = () => {
  const { selectionState } = useContext(NodeContext);
  const [nodeSelection, setNodeSelection] = selectionState;
  
  function changeSelection(selection) {
    console.log('changing to ', selection);
    if (selection == nodeSelection) { return; }
    switch (selection) {
      case "variable": setNodeSelection("variable");
      default: setNodeSelection("variable");
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
