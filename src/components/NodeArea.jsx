import React, { useRef } from 'react'
import { useState, useContext } from 'react'
import { AreaBackground } from './AreaBackground';
import { NodeContext } from '../App';
import { Node } from '../App';
import DragSelect from './Utility Components/DragSelect/DragSelect';
import { CloseButton } from './Utility Components/Window Buttons/CloseButton';
import { MaximizeButton } from './Utility Components/Window Buttons/MaximizeButton';
import { MinimizeButton } from './Utility Components/Window Buttons/MinimizeButton';


export const NodeArea = ({ scope, file }) => {
    const { nodeState, selectionState } = useContext(NodeContext);
    const [nodes, setNodes] = nodeState;
    const [nodeSelection] = selectionState;
    const areaRef = useRef(null);

    const [open, setOpen] = useState(true);
    const [position, setPosition] = useState({
      left: 0,
      top: 0,
    })

    function addNode(event) {
        if (event.target.classList.contains('node-area-background') || event.target.classList.contains('nodeArea')) {
            let position = {
              left: event.clientX,
              top: event.clientY
            }

            let newNode;
            switch (nodeSelection) {
              case 'variable': newNode = new Node({ type: 'variable', name: 'i', scope: scope, position: position}); break;
              default: newNode = new Node({ type: 'variable', name: 'i', scope: scope, position: position}); break;
            }
            
            setNodes( nodes.concat(newNode) );
        }
    }
    

  return (
    <>
    { open && 
    <div className='nodeArea' onMouseDown={(event) => addNode(event)} style={{
      left: `${position.left}px`,
      top: `${position.top}px`
      }} ref={areaRef}>
      <DragSelect top position={position} setPosition={setPosition}> 
        <h3> {file.path} </h3>
        <h3> {scope} </h3>

        <div className="window-utility-buttons">
          <CloseButton targetReference={areaRef} openCallback={setOpen}  />
          <MaximizeButton />
          <MinimizeButton />
        </div>
      </DragSelect>

      <h3 className='scope-display'> Scope: {scope} </h3>
        <AreaBackground />
        { nodes.filter(node => node.scope == scope).map(node => node.getInstance()) }
    </div> }
    </>
  )
}
