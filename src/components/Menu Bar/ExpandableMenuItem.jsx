import React, { useState } from 'react'

export const ExpandableMenuItem = ({ children }) => {
    const [opened, setOpened] = useState(opened)

  return (
    <div onMouseEnter={() => setOpened(true)} onMouseLeave={() => setOpened(false)}>
        {opened && children}
    </div>
  )
}
