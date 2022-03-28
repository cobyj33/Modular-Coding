import React, { useState, useRef, useEffect } from 'react'
import "./sidebar.css";

export const Sidebar = ({children}) => {
  const [extended, setExtended] = useState(false);
  const sidebarRef = useRef(null);

  useEffect( () => {
    const sidebar = sidebarRef.current;
    const extend = () => setExtended(true);
    const shrink = () => setExtended(false);

    sidebar.addEventListener('mouseenter', extend);
    sidebar.addEventListener('mouseleave', shrink);

    return () => {
      sidebar.removeEventListener('mouseenter', extend);
      sidebar.removeEventListener('mouseleave', shrink);
    }
  }, []);

  

  return (
    <>
    <div id='sidebar' ref={sidebarRef}>
      { extended && children }
    </div>
    </>
  )
}
