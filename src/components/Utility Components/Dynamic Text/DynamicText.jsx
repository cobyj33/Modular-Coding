import React, { useEffect, useRef } from 'react'
import "./dynamictext.css"

export const DynamicText = ({lines: desiredLines, children}) => {
    const textBoxReference = useRef(null)
    const lines = desiredLines && desiredLines != 0 ? desiredLines : 1;
    let width = 0;
    let height = 0;

    useEffect(() => {
        console.log(textBoxReference.current)
        width = textBoxReference.current ? textBoxReference.current.clientWidth : 0;
        height = textBoxReference.current ? textBoxReference.current.clientHeight : 0;
        console.log('width, ', width, 'height ', height )
    })

  return (
    <svg className='dynamic-textbox' ref={textBoxReference} width={width / lines} height={height}>
        <text>
            {children}
        </text>
    </svg>
  )
}
