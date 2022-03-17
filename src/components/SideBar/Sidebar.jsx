import React, { useState, useRef, useEffect } from 'react'
import { CloseButton } from '../CloseButton'
import "./sidebar.css";

export const Sidebar = ({nodeAreas, files}) => {
  const [open, setOpen] = useState(true);
  const ref = useRef(null)

  

  return (
    <>
    {open && 
    <div id='sidebar' ref={ref}>
      {/* <CloseButton openCallback={setOpen} targetReference={ref} /> */}
    </div>
    } 
    </>
  )
}
