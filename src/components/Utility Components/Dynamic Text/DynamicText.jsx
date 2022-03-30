import React, { useEffect, useRef } from 'react'
import "./dynamictext.css"

export const DynamicText = ({lines: desiredLines, children, text}) => {
    const textBoxReference = useRef(null)
    const lines = desiredLines && desiredLines != 0 ? desiredLines : 1;
    let width = 0;
    let height = 0;

    useEffect(() => {
        // console.log(textBoxReference.current)
        width = textBoxReference.current ? textBoxReference.current.clientWidth : 0;
        height = textBoxReference.current ? textBoxReference.current.clientHeight : 0;
        // console.log('width, ', width, 'height ', height )
    })

    //default 0 0 56 18 viewbox

  return (
    <div className="dynamic-textbox">
      { children }
      <svg className='dynamic-textbox-svg' ref={textBoxReference} viewBox={`0 0 84 27`}> 
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" width='56' height='18' color='white'> { text } </text>
      </svg>
    </div>
  )
}
