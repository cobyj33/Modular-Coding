import { useRef, useState } from 'react'
import { DragSelect } from "../Drag Select/DragSelect"
import "./window.css"
import { MinimizeButton } from '../Window Buttons/MinimizeButton'
import { MaximizeButton } from '../Window Buttons/MaximizeButton'
import { CloseButton } from '../Window Buttons/CloseButton'

export const Window = ({style, children, inTopBar, onDelete, containerReference}) => {
  const [open, setOpen] = useState(true);
  const [position, setPosition] = useState({
    left: 0,
    top: 0,
  });

  const windowReference = useRef(null);

  const css = {
    left: `${position.left}px`,
    top: `${position.top}px`,
    ...style
    };

  return (
    <>
    {open && <div className="window" style={css} ref={windowReference}> 
      <DragSelect top position={position} setPosition={setPosition} parentRef={windowReference} style={{position: "static"}} boundingRef={containerReference} >
      {inTopBar}
      <div className="window-utility-buttons">
        <MinimizeButton />
        <MaximizeButton targetReference={windowReference}/>
        <CloseButton targetReference={windowReference} openCallback={setOpen} onDelete={onDelete}  />
      </div>
      </DragSelect> 

      {children}
    </div>}
    </>
  )
}
