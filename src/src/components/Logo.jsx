import React from 'react'
import { usePath } from '../contexts/PathContext'

function Logo() {
  const { currentPath } = usePath()
  let position = 'top-2/7 left-1/2 transform -translate-x-1/2 -translate-y-1/2'

  if (currentPath === '/setup') position = 'top-1/14 left-1/2 transform -translate-x-1/2'
  if (currentPath === '/result') position = 'top-1/14 left-1/2 transform -translate-x-1/2'

  return (
    <div className={`absolute transition-all duration-700 ${position}`}>
      <img src="logo.svg" alt="Logo" className="w-54" />
    </div>
  )
}

export default Logo
