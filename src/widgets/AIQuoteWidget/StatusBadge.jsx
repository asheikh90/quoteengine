import React from 'react'

function StatusBadge({ status }) {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'VISITED':
        return { color: 'bg-gray-500/20 text-gray-300', label: 'Visited' }
      case 'INTAKE':
        return { color: 'bg-blue-500/20 text-blue-300', label: 'Intake' }
      case 'ESTIMATED':
        return { color: 'bg-yellow-500/20 text-yellow-300', label: 'Estimated' }
      case 'SCHEDULED':
        return { color: 'bg-purple-500/20 text-purple-300', label: 'Scheduled' }
      case 'CONFIRMED':
        return { color: 'bg-green-500/20 text-green-300', label: 'Confirmed' }
      case 'NO-SHOW':
        return { color: 'bg-red-500/20 text-red-300', label: 'No-Show' }
      case 'CLOSED_WON':
        return { color: 'bg-emerald-500/20 text-emerald-300', label: 'Won' }
      case 'CLOSED_LOST':
        return { color: 'bg-red-500/20 text-red-300', label: 'Lost' }
      default:
        return { color: 'bg-gray-500/20 text-gray-300', label: status }
    }
  }

  const config = getStatusConfig(status)

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  )
}

export default StatusBadge
