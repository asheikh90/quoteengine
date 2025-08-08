import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search } from 'lucide-react'
import { listLeadsByStatus, updateLead, pushEvent } from '../lib/leadState'
import StatusBadge from '../widgets/AIQuoteWidget/StatusBadge'

const STATUSES = [
  'INTAKE',
  'ESTIMATED', 
  'SCHEDULED',
  'CONFIRMED',
  'NO-SHOW',
  'CLOSED_WON',
  'CLOSED_LOST'
]

function Leads() {
  const [leads, setLeads] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [draggedLead, setDraggedLead] = useState(null)

  useEffect(() => {
    loadLeads()
  }, [])

  const loadLeads = () => {
    const leadsByStatus = {}
    STATUSES.forEach(status => {
      leadsByStatus[status] = listLeadsByStatus(status)
    })
    setLeads(leadsByStatus)
  }

  const handleDragStart = (e, lead) => {
    setDraggedLead(lead)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, newStatus) => {
    e.preventDefault()
    if (draggedLead && draggedLead.status !== newStatus) {
      updateLead(draggedLead.id, { status: newStatus })
      pushEvent(draggedLead.id, `Status changed to ${newStatus}`)
      loadLeads()
    }
    setDraggedLead(null)
  }

  const filteredLeads = (statusLeads) => {
    if (!searchTerm) return statusLeads
    return statusLeads.filter(lead => 
      lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone?.includes(searchTerm) ||
      lead.vehicle?.plate?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const getSourceChip = (utm) => {
    if (utm?.source === 'google' || utm?.medium === 'cpc') return 'Paid'
    if (utm?.source === 'organic') return 'SEO'
    if (utm?.ref && utm.ref !== 'direct') return 'Referral'
    return 'Direct'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-white hover:text-blue-300 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Back to Landing
            </Link>
            <h1 className="text-3xl font-bold text-white">Lead Pipeline</h1>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {STATUSES.map(status => (
            <div
              key={status}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 min-h-[600px]"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, status)}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white text-sm">{status.replace('_', ' ')}</h3>
                <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs">
                  {leads[status]?.length || 0}
                </span>
              </div>
              
              <div className="space-y-3">
                {filteredLeads(leads[status] || []).map(lead => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, lead)}
                    className="bg-white/20 backdrop-blur-sm rounded-xl p-3 cursor-move hover:bg-white/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-white text-sm">{lead.name || 'Anonymous'}</h4>
                      <StatusBadge status={lead.status} />
                    </div>
                    
                    <div className="text-xs text-gray-300 space-y-1">
                      <div>{lead.vehicle?.year} {lead.vehicle?.make} {lead.vehicle?.model}</div>
                      <div className="flex items-center gap-2">
                        <span className="bg-green-500/20 text-green-300 px-2 py-0.5 rounded">
                          {lead.payerType || 'cash'}
                        </span>
                        <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded">
                          {getSourceChip(lead.utm)}
                        </span>
                      </div>
                      {lead.quote?.low && (
                        <div className="text-green-300 font-medium">
                          ${lead.quote.low.toLocaleString()}–${lead.quote.high.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Leads
