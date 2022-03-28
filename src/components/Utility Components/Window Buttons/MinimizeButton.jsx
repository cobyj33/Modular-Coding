import React from 'react'
import './windowbuttons.css'

export const MinimizeButton = () => {

  function minimize() {
    console.log('minimize');
  }

  return (
    <button onMouseDown={minimize} className='minimize-button'>-</button>
  )
}
