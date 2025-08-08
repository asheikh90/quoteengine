import React from 'react'
import { ArrowRight, Play } from 'lucide-react'

function Hero() {
  const scrollToDemo = () => {
    const element = document.getElementById('demo')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Turn clicks into <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            booked jobs
          </span>
        </h1>
        
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Your interactive AI quote widget talks like an operator, drafts a real range, 
          and keeps following up until the car shows. CCC reactivation built in. 
          Insurance & parts integrations next.
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
    </section>
  )
}

export default Hero
