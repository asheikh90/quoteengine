import React from 'react'
import { Shield, Clock, CheckCircle, Star } from 'lucide-react'

function ProofBar() {
  const proofItems = [
    { icon: Shield, text: 'Licensed & Insured' },
    { icon: Clock, text: '24hr Response' },
    { icon: CheckCircle, text: '500+ Jobs Completed' },
    { icon: Star, text: '4.9★ Average Rating' }
  ]

  return (
    <div className="bg-white/5 backdrop-blur-sm border-y border-white/10 py-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-300">
          {proofItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <item.icon className="w-4 h-4 text-blue-400" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProofBar
