import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './Layout'
import { PathProvider } from './contexts/PathContext'
import { ClusterProvider } from './contexts/ClusterContext'

function App() {
  return (
    <PathProvider>
      <ClusterProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/frontend" element={<Layout />}>
              <Route index element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ClusterProvider>
    </PathProvider>
  )
}

export default App
