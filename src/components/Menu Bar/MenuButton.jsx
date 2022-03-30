import React from 'react'

export const MenuButton = ({ children, onClick }) => {
  return (
    <div onClick={onClick} className='menu-button'>
      { children }
    </div>
  )
}
