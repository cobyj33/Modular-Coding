import React, { useContext, useRef } from 'react'
import "./node.css"
import { ContextMenu } from "../Utility Components/Context Menu/ContextMenu"
import { NodeContext } from '../NodeArea';

export const Node = ({children, node}) => {
  let panning = false;
  const lastMousePosition = useRef({left: 0, top: 0})
  const areaData = useContext(NodeContext);
  const { graphState, coordinateState, connectorState } = areaData;
  const [nodeGraph, nodeGraphDispatch] = graphState;
  const [viewCoordinates, setCoordinates] = coordinateState;
  const [connection, setConnection] = connectorState;

  function startMove(mouseEvent) {
    lastMousePosition.current = { left: mouseEvent.clientX, top: mouseEvent.clientY }
    if (!(mouseEvent.target.classList.contains('node'))) return;
    panning = true;
    window.addEventListener('mousemove', move);

    function endMove() {
      panning = false;
      window.removeEventListener('mouseup', endMove)
      window.removeEventListener('mousemove', move);
    }

    window.addEventListener('mouseup', endMove)
  }

  function move(event) {
    if (!panning || !lastMousePosition.current) {
      lastMousePosition.current = { left: event.clientX, top: event.clientY }
      return
    }

    const currentMousePosition = { left: event.clientX, top: event.clientY }
    const xOffset = lastMousePosition.current.left - currentMousePosition.left;
    const yOffset = currentMousePosition.top - lastMousePosition.current.top;
    const newCoordinates = {
      x: node.coordinates.x - xOffset,
      y: node.coordinates.y - yOffset
    }


    nodeGraphDispatch({type: 'move --node', node: node, coordinates: newCoordinates})
    lastMousePosition.current = currentMousePosition;
  }



  

  return (
    <div className="node" style={{left: viewCoordinates.x + node.coordinates.x, top: viewCoordinates.y - node.coordinates.y}} onMouseDown={startMove}>
      {JSON.stringify(node)}
      {children}

      <ContextMenu>
        <button onClick={() => nodeGraphDispatch({type: 'delete', node: node})}> Delete Node </button>
      </ContextMenu>
    </div>
  )
}
