import React from 'react'
import { useState } from 'react'
import { VariableNode } from './VariableNode';

export const NodeArea = () => {
    const [nodes, setNodes] = useState([<VariableNode key={0}/>])

    function addNode(event) {
        if (event.target.classList.contains('nodeArea')) {
            setNodes(nodes.concat(<VariableNode key={nodes.length} position={{
                left: event.clientX,
                top: event.clientY
            }}/>))
            console.log(nodes);
        }
    }
    

  return (
    <div className='nodeArea' onMouseDown={(event) => addNode(event)}>
        { nodes }
    </div>
  )
}
