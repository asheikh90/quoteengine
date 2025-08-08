import React from 'react'
import { MessageSquare, FileSearch, Calendar, TrendingUp } from 'lucide-react'
import FeatureCard from '../components/FeatureCard'

function FeatureGrid() {
  const features = [
    {
      icon: MessageSquare,
      title: 'AI Intake That Converts',
      description: 'Photo capture, plain-English questions, zero friction.'
    },
    {
      icon: FileSearch,
      title: 'CCC Re-Activator',
      description: 'Finds the estimates that went cold. Re-engages with empathy.'
    },
    {
      icon: Calendar,
      title: 'Calendar, Not Chaos',
      description: 'Puts qualified jobs on your schedule with confirmations.'
    },
    {
      icon: TrendingUp,
      title: 'Built To Grow',
      description: 'Insurance, parts, payments, and outreach bots next.'
    }
  ]

  return (
    <section id="features" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            AI Estimating That Actually Closes
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Stop losing leads to friction. Start converting traffic with intelligence.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureGrid
