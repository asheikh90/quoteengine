import React from 'react'
import QuoteWidget from '../widgets/AIQuoteWidget/QuoteWidget'

function DemoSection() {
  return (
    <section id="demo" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            See It In Action
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Try the interactive demo below. This is exactly what your customers will experience.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <QuoteWidget />
        </div>
      </div>
    </section>
  )
}

export default DemoSection
