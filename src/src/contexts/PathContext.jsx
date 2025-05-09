import { createContext, useContext, useState } from 'react'

const PathContext = createContext()

export const usePath = () => useContext(PathContext)

export function PathProvider({ children }) {
  const [currentPath, setCurrentPath] = useState('/home')

  return (
    <PathContext.Provider value={{ currentPath, setCurrentPath }}>
      {children}
    </PathContext.Provider>
  )
}