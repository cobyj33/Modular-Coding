import { useContext, useRef, useState } from 'react'
import DragSelect from '../Utility Components/DragSelect/DragSelect';
import { Connector } from '../Connector';
import { CloseButton } from '../Utility Components/Window Buttons/CloseButton';
import { NodeContext } from '../../App';

export const VariableNode = ({ nodeObj, position: initialPosition}) => {
    const [name, setName] = useState(nodeObj.name);
    const [position, setPosition] = useState(initialPosition);
    const [open, setOpen] = useState(true);
    const nodeRef = useRef(null);

    const { nodeState } = useContext(NodeContext);
    const [nodes, setNodes] = nodeState;

    function setPos(pos) {
        nodeObj.position = pos;
        setPosition(pos);
    }
    

    function getColor(newVal) {
        switch (typeof newVal) {
            case 'number': return 'blue';
            case 'boolean': return 'red';
            case 'string': return 'green';
            case 'undefined': return 'black';
        }
        return 'gray'
    }

    function changeName(name) {
        nodeObj.name = name;
        setName(name);
    }

    function addConnection(node) {
        nodeObj.connect(node);
    }

    function onDelete() {
        nodeObj.separate();
        setNodes(nodes.filter(node => node !== nodeObj));
    }


    return (
        <>
        { open && 
        <div className="varNode node" style={{
            left: `${position.left}px`,
            top: `${position.top}px`
            }} ref={nodeRef}> 
            <DragSelect position={position} setPosition={setPos}/>
            <Connector left right top bottom />
            <CloseButton style={{
                position: 'absolute',
                right: 0,
                top: 0
            }} openCallback={setOpen} targetReference={nodeRef} onDelete={onDelete}/>
            <h3> Variable </h3>
            <input className="node-name" value={name} onChange={(event) => setName(event.target.value)}/>
        </div>
        }   
        </>
    )
}

VariableNode.defaultProps = {
    name: "i",
    position: {
        top: 0,
        left: 0
    }
}