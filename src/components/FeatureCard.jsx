import React from 'react'

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:bg-white/15 transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </div>
  )
}

export default FeatureCard
