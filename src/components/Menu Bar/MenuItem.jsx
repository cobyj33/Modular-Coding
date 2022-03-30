import {useEffect, useRef, useState} from 'react'

export const MenuItem = ({text, children}) => {
    const [opened, setOpened] = useState(false);
    const menuItemRef = useRef(null);

    function checkClick(event) {
        if (!clickInsideElement(event, 'menu-item')) {
            close();
        }
    }

    function open() {
        setOpened(!opened);
        window.addEventListener('click', checkClick);
    }

    function close() {
        window.removeEventListener('click', checkClick);
        setOpened(false);
    }

    useEffect(() => {  
        return () => {
            window.removeEventListener('click', checkClick)
        }
    }, [])

  return (
    <div className='menu-item' ref={menuItemRef}>
        <button onClick={() => opened ? close() : open()} className='menu-item-button'> {text} </button>
        { opened && <div className='menu-item-content'>
            { children }
        </div> }
    </div>
  )
}

function clickInsideElement(event, className) {
    let el = event.srcElement || event.target;
    
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