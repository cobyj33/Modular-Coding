import React, { useState, useRef } from 'react'
import { CloseButton } from '../CloseButton'

export const Sidebar = ({nodeAreas}) => {
  const [open, setOpen] = useState(true);
  const ref = useRef(null)

  return (
    <>
    {open && 
    <div id='sidebar' ref={ref}>
      <CloseButton openCallback={setOpen} targetReference={ref} />
    </div>
    } 
    </>
  )
}
