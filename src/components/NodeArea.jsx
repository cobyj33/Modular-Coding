import React from 'react'
import { useState } from 'react'
import { AreaBackground } from './AreaBackground';
import { VariableNode } from './Nodes/VariableNode';

export const NodeArea = () => {
    const [nodes, setNodes] = useState([<VariableNode key={0}/>])

    function constructNodes() {

    }

    function addNode(event) {
        console.log('clicked');
        if (event.target.classList.contains('node-area-background') || event.target.classList.contains('nodeArea')) {
            setNodes(nodes.concat(<VariableNode key={nodes.length} position={{
                left: event.clientX,
                top: event.clientY
            }}/>))
            console.log(nodes);
        }
    }

    function drawConnection(selectedConnector) {

    }
    

  return (
    <div className='nodeArea' onMouseDown={(event) => addNode(event)}>
        <AreaBackground />
        { nodes }
    </div>
  )
}
