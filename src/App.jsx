import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Leads from './pages/Leads'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/leads" element={<Leads />} />
      </Routes>
    </div>
  )
}

export default App
