import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import "./hoverprompt.css";

export const HoverPrompt = ({parentReference, children}) => {
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState({left: 0, top: 0});
    const mouseViewOffset = 10;
    const promptReference = useRef(null);

    useLayoutEffect(() => {
        const parent = parentReference ? parentReference.current : promptReference?.current.parentElement;
        const hide = () => setOpen(false);
        const show = () => setOpen(true);
        const updatePosition = (event) => setPosition({ left: event.clientX + mouseViewOffset, top: event.clientY + mouseViewOffset})


        parent.addEventListener('mouseenter', show);
        parent.addEventListener('mouseleave', hide);
        parent.addEventListener('mousemove', updatePosition)
        
        return () => {
            parent.removeEventListener('mouseenter', show);
            parent.removeEventListener('mouseleave', hide);
            parent.removeEventListener('mousemove', updatePosition)
        }
    }, []);

  return (
        <div className="hover-prompt" style={{...position, display: open ? '' : 'none'}} ref={promptReference}>
            { children }
        </div>
  )
}