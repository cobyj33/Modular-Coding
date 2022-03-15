import React, { useEffect } from 'react'
import { useState } from 'react';
import DragSelect from './DragSelect';

export const VariableNode = (props) => {
    const [name, setName] = useState(props.name);
    const [value, setValue] = useState(props.value);
    const [position, setPosition] = useState(props.position);
    let nodeColor = 'blue';

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
        <div className="varNode node" style={{
            backgroundColor: getColor(value),
            left: `${position.left}px`,
            top: `${position.top}px`
            }}> 
            <DragSelect position={position} setPosition={setPosition}/>
            <h3> Variable </h3>
            <input  className="node-name" value={name} onChange={(event) => setName(event.target.value)}/>
            <input className="value-display" value={value} onChange={(event) => setValue(event.target.value)}/>
        </div>
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