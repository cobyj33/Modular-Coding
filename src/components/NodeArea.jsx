import React, { useRef, useState, useEffect, useReducer, useContext, createContext } from 'react'
import { AreaBackground } from './AreaBackground';
import { Window } from './Utility Components/Window/Window';
import $ from "jquery";
import "./nodeArea.css";
import { HoverPrompt } from './Utility Components/Hover Prompt/HoverPrompt';
import { DynamicText } from './Utility Components/Dynamic Text/DynamicText';
import { Node } from './Nodes/Node';
import { NodeGraph } from '../NodeScript';
import { GlobalContext } from '../App';
import { hash } from '../index'
import { AutoCompleteInput } from './Utility Components/Auto Complete Input/AutoCompleteInput';
import { clickInsideElement } from '../index'
import { validVariableTypes } from '../NodeScript';
import { mousePosition } from "../App";
import { ContextMenu } from './Utility Components/Context Menu/ContextMenu';

export const NodeContext = createContext('')

export const NodeArea = ({ scope, file, container }) => {

    const [coordinates, setCoordinates] = useState({x: 0, y: 0});
    const [nodeGraph, nodeGraphDispatch] = useReducer(nodeGraphReducer, file?.data?.nodeGraph ? file?.data?.nodeGraph : new NodeGraph(scope))
    const { selectionState } = useContext(GlobalContext);
    const [nodeSelection] = selectionState;
    const lastMousePosition = useRef({ x: 0, y: 0});
    let panning = true;
    const nodeAreaReference = useRef(null);


    const [connection, setConnection] = useState({
      source: undefined,
      destination: undefined
    });

    const [showingSelectionInput, showSelectionInput] = useState(false);

    function saveToFile() {
      file.data.nodeGraph = nodeGraph;
    }

    useEffect( () => {
      const nodeArea = nodeAreaReference.current;
      saveToFile();

      nodeArea.addEventListener('mouseleave', () => {
        setConnection({ source: undefined, destination: undefined })
      })


      return () => {
        saveToFile();
      }
    }, [nodeGraph])

    const topBar = () => { return (
      <>
          <DynamicText text={file.name}> 
            <HoverPrompt> {file.path} </HoverPrompt> 
          </DynamicText>
          
        <DynamicText text={scope} />
      </>
    ) }

    function getScrollSpeed() {
      return Math.max(1 / (nodeAreaReference.current.clientWidth / container.current.clientWidth), 1 / (nodeAreaReference.current.clientHeight / container.current.clientHeight))
    }

    function placeNode(mouseEvent) {
      nodeGraphDispatch({type: 'add', coordinates: getMouseCoordinates(mouseEvent), nodeType: nodeSelection})
    }


    function getMouseCoordinates(mouseEvent) {
      const nodeArea = nodeAreaReference.current;
      const bounds = nodeArea.getBoundingClientRect();
      const positionInArea = {
        x: mouseEvent.clientX - bounds.left,
        y: mouseEvent.clientY - bounds.top
      }

      return {
        x: positionInArea.x - coordinates.x,
        y: coordinates.y - positionInArea.y
      }
    }

    function getViewArea() {
      const nodeArea = nodeAreaReference.current;
      const bounds = nodeArea.getBoundingClientRect();

      return {
        ...coordinates,
        width: bounds.width,
        height: bounds.height
      }
    }

    function startPan(mouseEvent) {
      lastMousePosition.current = getMouseCoordinates(mouseEvent)
      if (!(mouseEvent.target.classList.contains('node-area') || mouseEvent.target.classList.contains('node-area-background')) ) return;
      panning = true;
      window.addEventListener('mousemove', panView);

      function endPan() {
        panning = false;
        window.removeEventListener('mouseup', endPan)
        window.removeEventListener('mousemove', panView);
      }

      window.addEventListener('mouseup', endPan)
    }

    function panView(event) {
      if (!panning || !lastMousePosition.current) {
        lastMousePosition.current = getMouseCoordinates(event)
        return
      }

      const currentMousePosition = getMouseCoordinates(event)
      const scrollSpeed = getScrollSpeed();
      const xOffset = lastMousePosition.current.x - currentMousePosition.x;
      const yOffset = lastMousePosition.current.y - currentMousePosition.y;
      setCoordinates( (prevState) => {
        return {
          x: prevState.x - xOffset * scrollSpeed,
          y: prevState.y + yOffset * scrollSpeed
        }
      })

      lastMousePosition.current = currentMousePosition;
    }

    function isNodeInView(node) {
      // const viewArea = getViewArea();
      // console.log(viewArea)
      // const {coordinates: coors} = node;
      // console.log('coors', coors)
      // let valid = coors.x > viewArea.x && coors.x < viewArea.x + viewArea.width && coors.y < viewArea.y && coors.y > viewArea.y - viewArea.height 
      // console.log(valid)
      // return valid
      return true;
    }

    function makeSelection(event) {
      if (showingSelectionInput && !clickInsideElement(event, "auto-complete-input") ) {
        showSelectionInput(false)
        return;
      }

      if (event.shiftKey) {
        showSelectionInput(true)
      }
    }

    function selectionInputCallback(response) {
      const selected = validVariableTypes.filter(type => type === response).pop()
      if (selected) {
        nodeGraphDispatch({type: 'add', coordinates: lastMousePosition.current, nodeType: selected})
        showSelectionInput(false)
      } else {
        console.error(response, ' is not a valid variable type')
      }
    }

    const contextState = {
      connectorState: [connection, setConnection],
      graphState: [nodeGraph, nodeGraphDispatch],
      coordinateState: [coordinates, setCoordinates]
    }
    
    
    return (
      <NodeContext.Provider value={contextState}>
        <Window inTopBar={topBar()} containerReference={container} {...(scope === 'window' ? {maximize: true, noButtons: true} : {})}>
          <div className='node-area' onMouseDown={(event) => { startPan(event); makeSelection(event); } } ref={nodeAreaReference} onDoubleClick={placeNode}>
            <AreaBackground coordinates={coordinates}/>
            <div className='coordinate-display'> 
              {/* X: {coordinates.x}, Y: {coordinates.y} */}
              <DynamicText text={`X: ${Math.round(coordinates.x * 100) / 100}, Y: ${Math.round(coordinates.y * 100) / 100}`} />
            </div>

            { nodeGraph.nodes
            .filter(node => isNodeInView(node))
            .map(node => <Node node={node} key={hash(node)}/>) }

            {
              showingSelectionInput &&
              <AutoCompleteInput position={{...mousePosition}} inputCallback={selectionInputCallback} desired={validVariableTypes}/>
            }

            <ContextMenu>
              <button onClick={() => showSelectionInput(true)}> Add Node </button>
            </ContextMenu>

          </div>
        </Window>
      </ NodeContext.Provider>
    )
}


function nodeGraphReducer(state, action) {
  const {type, coordinates, nodeType, node} = action;

  function addNode(nodeType, coordinates) {
    if (!coordinates) {
      console.error('adding a node requires coordinates [nodeGraphReducer]'); return;
    } else if (!nodeType) {
      console.error('adding a node requires a node type [nodeGraphReducer]'); return;
    }

    state.addNode(nodeType, coordinates);
  }

  function moveNode(coordinates, node) {
    if (!coordinates) {
      console.error('moving a node requires coordinates [nodeGraphReducer]'); return;
    } else if (!node) {
      console.error('moving a node requires the node to be moved [nodeGraphReducer]'); return;
    }

    node.coordinates = {...coordinates};
  }

  function deleteNode(node) {
    if (!node) {
      console.error('deleting a node requires the node to be deleted [nodeGraphReducer]'); return;
    }
    
    state.deleteNode(node);
  }

  switch (type) {
    case 'add': addNode(nodeType, coordinates); break;
    case 'move --node': moveNode(coordinates, node); break;
    case 'delete': deleteNode(node); break;
    default: console.error('type ', type, ' is not a defined action [nodeGraphReducer]')
  }

  console.log(state.length)

  return new NodeGraph(state.scope, state.nodes);
}
