import React from 'react'
import "./menu.css"

export const Menu = ({children}) => {
  
  return (
    <menu className='menu'>
        {children}
    </menu>
  )
}
