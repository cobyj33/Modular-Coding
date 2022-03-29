import React from 'react'
import { DynamicText } from '../Dynamic Text/DynamicText'

export const InputPrompt = ({ message, type, absolute, onInput }) => {
  type = type ? type : 'text'

  switch (type) {
    case 'text':
    default: break;
  }

  return (
    <div className='input-prompt' style={absolute ? {position: 'absolute'} : {}}>
      <DynamicText text={message} />
      <input onChange={onInput}> </input>
    </div>
  )
}
