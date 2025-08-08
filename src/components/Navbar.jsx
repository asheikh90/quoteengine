import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Zap, Users } from 'lucide-react'

function Navbar() {
  const location = useLocation()

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Zap className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold text-white">QuoteEngine</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {location.pathname === '/' ? (
              <>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('demo')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Demo
                </button>
                <button 
                  onClick={() => scrollToSection('faq')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  FAQ
                </button>
              </>
            ) : null}
            
            <Link 
              to="/leads"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Users className="w-4 h-4" />
              View Leads
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
