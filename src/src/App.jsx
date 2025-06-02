import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './Layout'
import { PathProvider } from './contexts/PathContext'
import { ClusterProvider } from './contexts/ClusterContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <PathProvider>
      <ClusterProvider>
        <ToastContainer />
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
