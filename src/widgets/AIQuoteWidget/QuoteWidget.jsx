import React, { useState, useEffect, useRef } from 'react'
import { MessageSquare, Car, DollarSign, Calendar } from 'lucide-react'
import IntakeForm from './IntakeForm'
import ImageUploader from './ImageUploader'
import ChatBubble from './ChatBubble'
import Scheduler from './Scheduler'
import StatusBadge from './StatusBadge'
import { createLeadFromForm, updateLead, pushEvent, mockCCCMatch } from '../../lib/leadState'
import { draftQuote } from '../../lib/mockAI'
import { parseUTM } from '../../lib/utm'

function QuoteWidget() {
  const [currentLead, setCurrentLead] = useState(null)
  const [step, setStep] = useState('intake') // intake, images, quote, schedule, complete
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: "Hey there! I'm here to help get you a quick estimate. Let's start with some basic info about you and your vehicle.",
      timestamp: Date.now()
    }
  ])
  const [images, setImages] = useState([])
  const [quote, setQuote] = useState(null)
  const [cccMatch, setCccMatch] = useState(null)
  
  // Use refs for timeouts to ensure proper cleanup
  const quoteTimeoutRef = useRef(null)
  const cccTimeoutRef = useRef(null)

  useEffect(() => {
    // Parse UTM parameters on widget load
    const utm = parseUTM()
    console.log('UTM detected:', utm)
    
    // Cleanup timeouts on unmount
    return () => {
      if (quoteTimeoutRef.current) {
        clearTimeout(quoteTimeoutRef.current)
      }
      if (cccTimeoutRef.current) {
        clearTimeout(cccTimeoutRef.current)
      }
    }
  }, [])

  const addMessage = (type, content) => {
    setMessages(prev => [...prev, {
      type,
      content,
      timestamp: Date.now()
    }])
  }

  const handleIntakeSubmit = (formData) => {
    const utm = parseUTM()
    const lead = createLeadFromForm(formData, utm)
    setCurrentLead(lead)
    
    addMessage('user', `${formData.name} - ${formData.vehicle.year} ${formData.vehicle.make} ${formData.vehicle.model}`)
    
    if (formData.payerType === 'insurance') {
      addMessage('ai', "Got it! Since you're going through insurance, do you already have a claim number, or is this a fresh incident?")
    } else if (formData.payerType === 'fleet') {
      addMessage('ai', "Perfect! What's the company name for this fleet vehicle?")
    } else {
      addMessage('ai', "Great! Now let's get some photos of the damage. This helps me give you the most accurate estimate.")
    }
    
    setStep('images')
  }

  const handleImagesUploaded = (uploadedImages) => {
    setImages(uploadedImages)
    addMessage('user', `Uploaded ${uploadedImages.length} photos`)
    addMessage('ai', "Thanks for the photos! Let me analyze the damage and draft your estimate...")
    
    // Clear any existing timeout
    if (quoteTimeoutRef.current) {
      clearTimeout(quoteTimeoutRef.current)
    }
    
    quoteTimeoutRef.current = setTimeout(() => {
      generateQuote()
    }, 2000)
  }

  const generateQuote = () => {
    if (!currentLead) return

    const quoteData = draftQuote({
      vehicle: currentLead.vehicle,
      payerType: currentLead.payerType,
      damageNotes: ['Front bumper damage', 'Paint scratches'],
      imagesCount: images.length
    })

    setQuote(quoteData)
    updateLead(currentLead.id, { 
      quote: {
        low: quoteData.low,
        high: quoteData.high,
        currency: 'USD',
        prepNotes: quoteData.prepNotes,
        upsells: quoteData.upsells
      },
      status: 'ESTIMATED'
    })
    pushEvent(currentLead.id, 'Quote generated')

    addMessage('ai', quoteData.humanMessage)
    setStep('quote')

    // Clear any existing CCC timeout
    if (cccTimeoutRef.current) {
      clearTimeout(cccTimeoutRef.current)
    }

    // Check for CCC match
    cccTimeoutRef.current = setTimeout(() => {
      const match = mockCCCMatch(currentLead.phone, currentLead.email)
      if (match) {
        setCccMatch(match)
        updateLead(currentLead.id, { ccc: match })
        pushEvent(currentLead.id, `CCC estimate found: ${match.estimateId}`)
        addMessage('ai', `Great news! I found your prior estimate #${match.estimateId} for $${match.amount.toLocaleString()}. I've attached it to your file.`)
      }
    }, 3000)
  }

  const handleScheduleSlot = (slot) => {
    if (!currentLead) return

    updateLead(currentLead.id, { status: 'SCHEDULED' })
    pushEvent(currentLead.id, `Scheduled for ${slot.date} at ${slot.time}`)
    
    addMessage('user', `Booked for ${slot.date} at ${slot.time}`)
    addMessage('ai', "Perfect! We'll text you a confirmation and a reminder the day before. Looking forward to getting your car back to perfect!")
    
    setStep('complete')
  }

  const getSourceChip = () => {
    const utm = parseUTM()
    if (utm?.source === 'google' || utm?.medium === 'cpc') return 'Paid'
    if (utm?.source === 'organic') return 'SEO'
    if (utm?.ref && utm.ref !== 'direct') return 'Referral'
    return 'Direct'
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-white" />
            <div>
              <h3 className="text-lg font-semibold text-white">AI Quote Assistant</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-blue-100">Source: {getSourceChip()}</span>
                {currentLead && <StatusBadge status={currentLead.status} />}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-0 min-h-[600px]">
        {/* Chat Area */}
        <div className="md:col-span-2 p-6 border-r border-white/10">
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            {messages.map((message, index) => (
              <ChatBubble key={index} {...message} />
            ))}
          </div>

          {step === 'intake' && (
            <IntakeForm onSubmit={handleIntakeSubmit} />
          )}

          {step === 'images' && (
            <ImageUploader onImagesUploaded={handleImagesUploaded} />
          )}

          {step === 'quote' && quote && (
            <div className="space-y-4">
              <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
                <h4 className="text-green-300 font-semibold mb-2">Estimated Range</h4>
                <div className="text-2xl font-bold text-white">
                  ${quote.low.toLocaleString()}–${quote.high.toLocaleString()}
                </div>
              </div>

              <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4">
                <h4 className="text-blue-300 font-semibold mb-2">Prep Notes</h4>
                <ul className="text-gray-300 space-y-1">
                  {quote.prepNotes.map((note, index) => (
                    <li key={index}>• {note}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-purple-500/20 border border-purple-500/30 rounded-xl p-4">
                <h4 className="text-purple-300 font-semibold mb-2">Recommended Upsells</h4>
                <ul className="text-gray-300 space-y-1">
                  {quote.upsells.map((upsell, index) => (
                    <li key={index}>• {upsell}</li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setStep('schedule')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Book Appointment
              </button>
            </div>
          )}

          {step === 'schedule' && (
            <Scheduler onSchedule={handleScheduleSlot} />
          )}

          {step === 'complete' && (
            <div className="text-center py-8">
              <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-6">
                <h4 className="text-green-300 font-semibold text-xl mb-2">All Set!</h4>
                <p className="text-gray-300">
                  Your appointment is confirmed. We'll be in touch soon!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Summary Panel */}
        <div className="p-6 bg-black/20">
          <h4 className="text-white font-semibold mb-4">Summary</h4>
          
          {currentLead && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-300">
                <Car className="w-4 h-4" />
                <span className="text-sm">
                  {currentLead.vehicle.year} {currentLead.vehicle.make} {currentLead.vehicle.model}
                </span>
              </div>

              {quote && (
                <div className="flex items-center gap-2 text-gray-300">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm">
                    ${quote.low.toLocaleString()}–${quote.high.toLocaleString()}
                  </span>
                </div>
              )}

              {cccMatch && (
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
                  <div className="text-yellow-300 text-sm font-medium">CCC Match Found</div>
                  <div className="text-gray-300 text-xs">
                    #{cccMatch.estimateId} - ${cccMatch.amount.toLocaleString()}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-white/10">
                <div className="text-xs text-gray-400 space-y-1">
                  <div>Payer: {currentLead.payerType}</div>
                  <div>Status: {currentLead.status}</div>
                  <div>Images: {images.length}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuoteWidget
