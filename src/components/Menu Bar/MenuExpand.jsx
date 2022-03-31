import React, { useState } from 'react'

export const MenuExpand = ({ children }) => {
    const [opened, setOpened] = useState(opened)

  return (
    <div onMouseEnter={() => setOpened(true)} onMouseLeave={() => setOpened(false)}>
        {opened && children}
    </div>
  )
}
