// Mock AI quote generation

const TONE_CONFIGS = {
  streetwise_pro: {
    greeting: "Hey there! I'm here to help get you a quick estimate.",
    quoteIntro: "Alright, based on what I'm seeing here's what we're looking at:",
    empathy: ["I know dealing with car damage is a pain", "Let's get this sorted for you", "We'll take good care of you"],
    confidence: ["I've seen this type of damage before", "This is pretty straightforward", "We can definitely handle this"]
  }
}

// Base quote calculation
const calculateBaseQuote = ({ vehicle, payerType, damageNotes, imagesCount }) => {
  let basePrice = 800 // Starting point
  
  // Vehicle age factor
  const currentYear = new Date().getFullYear()
  const vehicleAge = currentYear - parseInt(vehicle.year)
  if (vehicleAge > 10) basePrice += 200
  if (vehicleAge > 20) basePrice += 400
  
  // Luxury brand multiplier
  const luxuryBrands = ['bmw', 'mercedes', 'audi', 'lexus', 'acura', 'infiniti']
  if (luxuryBrands.includes(vehicle.make.toLowerCase())) {
    basePrice *= 1.4
  }
  
  // Payer type adjustment
  if (payerType === 'insurance') basePrice *= 1.2
  if (payerType === 'fleet') basePrice *= 0.9
  
  // Image count factor (more images = more damage)
  basePrice += (imagesCount * 150)
  
  // Damage complexity
  basePrice += (damageNotes.length * 100)
  
  return Math.round(basePrice)
}

// Generate prep notes based on damage type
const generatePrepNotes = ({ vehicle, damageNotes }) => {
  const notes = []
  
  // Always include basic prep
  notes.push('sand/scuff existing paint')
  notes.push('sealer for uniformity')
  
  // Age-based notes
  const currentYear = new Date().getFullYear()
  const vehicleAge = currentYear - parseInt(vehicle.year)
  
  if (vehicleAge > 5) {
    notes.push('blend adjacent panels')
  }
  
  if (vehicleAge > 10) {
    notes.push('primer for adhesion')
  }
  
  return notes
}

// Generate upsell suggestions
const generateUpsells = ({ vehicle, payerType }) => {
  const upsells = []
  
  // Common upsells
  upsells.push('trim blackout refresh')
  upsells.push('headlight restore')
  
  // Vehicle-specific
  const currentYear = new Date().getFullYear()
  const vehicleAge = currentYear - parseInt(vehicle.year)
  
  if (vehicleAge > 7) {
    upsells.push('wheel refinishing')
  }
  
  if (payerType === 'cash') {
    upsells.push('paint protection film')
  }
  
  return upsells
}

// Generate human-style message
const generateHumanMessage = (quote, tone = 'streetwise_pro') => {
  const config = TONE_CONFIGS[tone]
  const empathy = config.empathy[Math.floor(Math.random() * config.empathy.length)]
  const confidence = config.confidence[Math.floor(Math.random() * config.confidence.length)]
  
  return `${empathy}. ${confidence}. Looking at your photos and the info you gave me, I'm seeing this running between $${quote.low.toLocaleString()} and $${quote.high.toLocaleString()}. The prep work I listed will make sure the new paint matches perfectly. Want to get this scheduled?`
}

// Main quote generation function
export const draftQuote = ({ vehicle, payerType, damageNotes, imagesCount }) => {
  const basePrice = calculateBaseQuote({ vehicle, payerType, damageNotes, imagesCount })
  
  // Create range (±20%)
  const low = Math.round(basePrice * 0.8)
  const high = Math.round(basePrice * 1.2)
  
  const prepNotes = generatePrepNotes({ vehicle, damageNotes })
  const upsells = generateUpsells({ vehicle, payerType })
  const humanMessage = generateHumanMessage({ low, high })
  
  return {
    low,
    high,
    prepNotes,
    upsells,
    humanMessage,
    confidence: 0.85 // Mock confidence score
  }
}
