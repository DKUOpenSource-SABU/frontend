import React from 'react'
import { usePath } from '../contexts/PathContext'

function Logo() {
  const { currentPath, setCurrentPath } = usePath()

  let containerClass = 'mt-48 flex justify-center' 
  if (currentPath === '/setup') containerClass = 'mt-12 mb-8 flex justify-center'
  if (currentPath === '/result') containerClass = 'mt-12 mb-8 flex justify-center'

  return (
    <div className={`${containerClass} transition-all duration-700 cursor-pointer`} onClick={() => setCurrentPath('/home')}>
      <img src="logo.svg" alt="Logo" className="w-54"/>
    </div>
  )
}

export default Logo
