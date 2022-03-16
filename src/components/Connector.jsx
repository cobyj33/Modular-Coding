import React from 'react'

export const Connector = ( { left, right, top, bottom }) => {
  


  return (
    <>
    { left ? <div className="left connector"> </div> : null}
    { right ? <div className="right connector"> </div> : null}
    { top ? <div className="top connector"> </div> : null}
    { bottom ? <div className="bottom connector"> </div> : null}
    </>
  )
}

Connector.defaultProps = {
  side: {
    left: true,
    right: true,
    top: true,
    bottom: true
  }
}
