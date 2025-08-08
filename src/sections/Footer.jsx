import React from 'react'
import { Zap, ArrowRight, Play } from 'lucide-react'

function Footer() {
  const scrollToDemo = () => {
    const element = document.getElementById('demo')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to convert more traffic?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join shops already using QuoteEngine to turn clicks into booked jobs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={scrollToDemo}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg"
            >
              <Play className="w-5 h-5" />
              Try the Demo
            </button>
            
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-colors backdrop-blur-sm border border-white/20">
              View Leads
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Zap className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-bold text-white">QuoteEngine</span>
            </div>
            
            <div className="text-gray-400 text-sm">
              © 2024 QuoteEngine. AI Estimating That Actually Closes.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
