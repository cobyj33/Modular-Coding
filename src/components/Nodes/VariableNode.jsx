import { useRef, useState } from 'react'
import DragSelect from '../DragSelect';
import { Connector } from '../Connector';
import { CloseButton } from '../CloseButton';

export const VariableNode = (props) => {
    const [name, setName] = useState(props.name);
    const [value, setValue] = useState(props.value);
    const [position, setPosition] = useState(props.position);
    const [open, setOpen] = useState(true);
    const nodeRef = useRef(null);

    function getColor(newVal) {
        switch (typeof newVal) {
            case 'number': return 'blue';
            case 'boolean': return 'red';
            case 'string': return 'green';
            case 'undefined': return 'black';
        }
        return 'gray'
    }

    return (
        <>
        { open && 
        <div className="varNode node" style={{
            backgroundColor: getColor(value),
            left: `${position.left}px`,
            top: `${position.top}px`
            }} ref={nodeRef}> 
            <DragSelect position={position} setPosition={setPosition} top/>
            <Connector left right top bottom />
            <CloseButton openCallback={setOpen} targetReference={nodeRef}/>
            <h3> Variable </h3>
            <input  className="node-name" value={name} onChange={(event) => setName(event.target.value)}/>
            <input className="value-display" value={value} onChange={(event) => setValue(event.target.value)}/>
        </div>
        }   
        </>
    )
}

VariableNode.defaultProps = {
    name: "i",
    value: "1",
    position: {
        top: 0,
        left: 0
    }
}