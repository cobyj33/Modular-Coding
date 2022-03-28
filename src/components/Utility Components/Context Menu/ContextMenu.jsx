import React, { useLayoutEffect, useEffect, useState, useRef } from 'react'
import { mousePosition } from '../../../App'
import './contextmenu.css'

export const ContextMenu = ({position: initialPosition, children, bindReference}) => {
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState({left: 0, top: 0});
    const contextMenuReference = useRef(null);

    useLayoutEffect(() => {
      const bindedElement = bindReference ? bindReference.current : contextMenuReference.current.parentElement;
      const contextMenu = contextMenuReference.current;

      const clickHandler = (event) => {
        console.log(bindedElement.classList);
        if ( Array.from(bindedElement.classList).some(className => clickInsideElement(event, className)) ) {
          hide()
        } else if (event.target != bindedElement) {
          hide()
        }
      }

      function show(event) {  
        console.log('show event')
        event.preventDefault();
        if (event.button == 2 && !open) {
          console.log('showing context menu');
          window.addEventListener('click', clickHandler)
          setPosition({left: event.clientX, top: event.clientY})
          setOpen(true)
        }
      };

      function hide() { 
        window.removeEventListener('click', clickHandler)
        setOpen(false)
      }

      bindedElement.addEventListener('contextmenu', (event) => show(event));

      return () => {
        bindedElement.removeEventListener('click', show)
        window.removeEventListener('click', clickHandler)
      }
    }, [])

    useEffect(() => setOpen(false), [])
    
    
    return (
        <div className='context-menu' ref={contextMenuReference} style={{...position, display: open ? '' : 'none'}}>
          { children }
        </div>
    )
  }
  
  function clickInsideElement(event, className) {
    var el = event.srcElement || event.target;
    
    if ( el.classList.contains(className) ) {
        return el;
    } else {
        while ( el = el.parentNode ) {
            if ( el.classList && el.classList.contains(className) ) {
                return el;
            }
        }
    }
    
    return false;
  }