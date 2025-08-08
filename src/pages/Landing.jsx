import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../sections/Hero'
import ProofBar from '../components/ProofBar'
import FeatureGrid from '../sections/FeatureGrid'
import DemoSection from '../sections/DemoSection'
import FAQ from '../sections/FAQ'
import Footer from '../sections/Footer'

function Landing() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ProofBar />
      <FeatureGrid />
      <DemoSection />
      <FAQ />
      <Footer />
    </div>
  )
}

export default Landing
