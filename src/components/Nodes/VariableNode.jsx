import { useContext, useRef, useState } from 'react'
import DragSelect from '../Utility Components/Drag Select/DragSelect';
import { Connector } from '../Connector';
import { CloseButton } from '../Utility Components/Window Buttons/CloseButton';
import { NodeContext } from '../../App';

export const VariableNode = ({ nodeObj, position: initialPosition}) => {
    const [name, setName] = useState(nodeObj.name);
    const [position, setPosition] = useState(initialPosition);
    const [open, setOpen] = useState(true);
    const nodeRef = useRef(null);

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


    return (
        <>
        { open && 
        <div className="varNode node" style={{
            left: `${position.left}px`,
            top: `${position.top}px`
            }} ref={nodeRef}> 
            <DragSelect position={position} setPosition={setPos} parentRef={nodeRef}/>
            <Connector left right top bottom />
            <CloseButton style={{
                position: 'absolute',
                right: 0,
                top: 0
            }} openCallback={setOpen} targetReference={nodeRef}/>
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