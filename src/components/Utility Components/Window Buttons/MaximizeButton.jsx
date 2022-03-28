import React from 'react'
import $ from 'jquery';
import "./windowbuttons.css"

export const MaximizeButton = ({targetReference}) => {

  function maximize() {
    if (!targetReference) { return; }
    const target = targetReference.current
    $(target).css('width', '100%');
    $(target).css('height', '100%');
    $(target).css('left', '0');
    $(target).css('top', '0');
  }

  return (
    <button onMouseDown={maximize} className='maximize-button'>□</button>
  )
}
