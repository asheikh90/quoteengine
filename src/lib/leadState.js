// Lead state management with localStorage persistence

const STORAGE_KEY = 'quoteengine_leads'

// Lead schema
const createLead = (data) => ({
  id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  createdAt: Date.now(),
  name: data.name || '',
  phone: data.phone || '',
  email: data.email || '',
  vehicle: {
    year: data.vehicle?.year || '',
    make: data.vehicle?.make || '',
    model: data.vehicle?.model || '',
    color: data.vehicle?.color || '',
    vin: data.vehicle?.vin || '',
    plate: data.vehicle?.plate || ''
  },
  payerType: data.payerType || 'cash',
  utm: data.utm || {},
  ccc: {
    hasExisting: false,
    estimateId: null,
    amount: null
  },
  status: 'VISITED',
  quote: {
    low: 0,
    high: 0,
    currency: 'USD',
    prepNotes: [],
    upsells: []
  },
  timeline: [
    {
      ts: Date.now(),
      event: 'Lead created',
      note: 'Initial visit to quote widget'
    }
  ]
})

// Storage helpers with error handling
const getLeads = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    
    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error('Error reading leads from storage:', error)
    return []
  }
}

const saveLeads = (leads) => {
  try {
    if (!Array.isArray(leads)) {
      console.error('Invalid leads data - not an array')
      return false
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads))
    return true
  } catch (error) {
    console.error('Error saving leads to storage:', error)
    return false
  }
}

// Main functions
export const createLeadFromForm = (formData, utm = {}) => {
  try {
    const lead = createLead({ ...formData, utm })
    const leads = getLeads()
    leads.push(lead)
    
    if (saveLeads(leads)) {
      return lead
    }
    return null
  } catch (error) {
    console.error('Error creating lead:', error)
    return null
  }
}

export const updateLead = (leadId, updates) => {
  try {
    const leads = getLeads()
    const index = leads.findIndex(lead => lead.id === leadId)
    
    if (index !== -1) {
      leads[index] = { ...leads[index], ...updates }
      if (saveLeads(leads)) {
        return leads[index]
      }
    }
    
    return null
  } catch (error) {
    console.error('Error updating lead:', error)
    return null
  }
}

export const pushEvent = (leadId, event, note = '') => {
  try {
    const leads = getLeads()
    const index = leads.findIndex(lead => lead.id === leadId)
    
    if (index !== -1) {
      leads[index].timeline.push({
        ts: Date.now(),
        event,
        note
      })
      saveLeads(leads)
    }
  } catch (error) {
    console.error('Error pushing event:', error)
  }
}

export const listLeadsByStatus = (status) => {
  try {
    const leads = getLeads()
    return leads.filter(lead => lead.status === status)
  } catch (error) {
    console.error('Error listing leads by status:', error)
    return []
  }
}

export const getAllLeads = () => {
  return getLeads()
}

// Mock CCC integration
export const mockCCCMatch = (phone, email) => {
  try {
    // Simulate 30% chance of finding a CCC estimate
    if (Math.random() < 0.3) {
      return {
        hasExisting: true,
        estimateId: 'MOCK' + Math.floor(Math.random() * 10000),
        amount: Math.floor(Math.random() * 3000) + 1000
      }
    }
    return null
  } catch (error) {
    console.error('Error in mock CCC match:', error)
    return null
  }
}

// Mock scheduling
export const mockSchedule = (leadId, slot) => {
  try {
    pushEvent(leadId, 'Appointment scheduled', `${slot.date} at ${slot.time}`)
    return updateLead(leadId, { status: 'SCHEDULED' })
  } catch (error) {
    console.error('Error in mock schedule:', error)
    return null
  }
}
