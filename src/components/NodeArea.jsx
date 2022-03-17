import React from 'react'
import { useState } from 'react'
import { AreaBackground } from './AreaBackground';
import { VariableNode } from './Nodes/VariableNode';
import { Node } from '../Node';
import { nodes } from '../Node';

export const NodeArea = ({ scope }) => {
    const [visibleNodes, setVisibleNodes] = useState(nodes.filter(node => node.scope == scope));

    function addNode(event) {
        if (event.target.classList.contains('node-area-background') || event.target.classList.contains('nodeArea')) {
            let position = {
              left: event.clientX,
              top: event.clientY
            }


            const newNode = new Node({ type: 'var', name: 'i', scope: scope, position: position});
            nodes.push(newNode);
            setVisibleNodes(nodes.filter(node => node.scope == scope));
        }
    }
    

  return (
    <div className='nodeArea' onMouseDown={(event) => addNode(event)}>
      <h3 className='scope-display'> Scope: {scope} </h3>
        <AreaBackground />
        { visibleNodes.map(node => node.getInstance()) }
    </div>
  )
}
