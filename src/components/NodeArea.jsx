import React, { useRef, useState } from 'react'
import { AreaBackground } from './AreaBackground';
import { Window } from './Utility Components/Window/Window';
import $ from "jquery";
import "./nodeArea.css";
import { HoverPrompt } from './Utility Components/Hover Prompt/HoverPrompt';
import { DynamicText } from './Utility Components/Dynamic Text/DynamicText';


export const NodeArea = ({ scope, file, container }) => {

    const [coordinates, setCoordinates] = useState({x: 0, y: 0});
    let lastMousePosition = undefined;
    let panning = true;

    const topBar = () => { return (
      <>
          <DynamicText text={file.name}> 
            <HoverPrompt> {file.path} </HoverPrompt> 
          </DynamicText>
          
        <DynamicText text={scope} />
      </>
    ) }

    function startPan() {
      console.log('started panning')
      panning = true;
      window.addEventListener('mousemove', panView);

      function endPan() {
        panning = false;
        lastMousePosition = undefined;
        window.removeEventListener('mouseup', endPan)
        window.removeEventListener('mousemove', panView);
      }

      window.addEventListener('mouseup', endPan)
    }

    function panView(event) {
      if (!panning || !lastMousePosition) {
        lastMousePosition = { left: event.clientX, top: event.clientY }
        return
      }

      const currentMousePosition = { left: event.clientX, top: event.clientY }
      const xOffset = currentMousePosition.left - lastMousePosition.left;
      const yOffset = currentMousePosition.top - lastMousePosition.top;
      setCoordinates( (prevState) => {
        return {
          x: prevState.x + xOffset,
          y: prevState.y + yOffset
        }
      })

      lastMousePosition = currentMousePosition;
    }
    
    return (
      <>
        <Window inTopBar={topBar()} containerReference={container} {...(scope === 'window' ? {maximize: true} : {})}>
          <div className='node-area' onMouseDown={startPan}>
            <AreaBackground coordinates={coordinates}/>
            <div className='coordinate-display'> 
              {/* X: {coordinates.x}, Y: {coordinates.y} */}
              <DynamicText text={`X: ${coordinates.x}, Y: ${coordinates.y}`} />
            </div>
          </div>
        </Window>
      </>
    )

  // return (
  //   <>
  //   { open && 
  //   <div className='nodeArea' style={{
  //     left: `${position.left}px`,
  //     top: `${position.top}px`
  //     }} ref={areaRef}>
  //     <DragSelect top position={position} setPosition={setPosition} parentRef={areaRef} style={{position: "static"}}> 
  //       <h3> {file.path} </h3>
  //       <h3> {scope} </h3>

  //       <div className="window-utility-buttons">
  //         <CloseButton targetReference={areaRef} openCallback={setOpen}  />
  //         <MaximizeButton targetReference={areaRef}/>
  //         <MinimizeButton />
  //       </div>
  //     </DragSelect>

  //     <h3 className='scope-display'> Scope: {scope} </h3>
  //       <AreaBackground />

  //   </div> }
  //   </>
  // )
}
