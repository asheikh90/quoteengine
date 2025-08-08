import React, { useState } from 'react'
import { Calendar, Clock } from 'lucide-react'

function Scheduler({ onSchedule }) {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  // Generate next 7 days
  const getNextDays = () => {
    const days = []
    for (let i = 1; i <= 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      days.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        })
      })
    }
    return days
  }

  // Generate time slots from 9 AM to 4:30 PM
  const getTimeSlots = () => {
    const slots = []
    for (let hour = 9; hour <= 16; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 16 && minute > 30) break // Stop at 4:30 PM
        
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        const display = new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })
        
        slots.push({ value: time, label: display })
      }
    }
    return slots
  }

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      const date = new Date(selectedDate).toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
      })
      const time = new Date(`2000-01-01T${selectedTime}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
      
      onSchedule({ date, time, dateValue: selectedDate, timeValue: selectedTime })
    }
  }

  const days = getNextDays()
  const timeSlots = getTimeSlots()

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-2" />
        <h4 className="text-white font-medium">Pick Your Appointment</h4>
        <p className="text-gray-400 text-sm">Choose a convenient time for your estimate</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          <Calendar className="w-4 h-4 inline mr-1" />
          Select Date
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {days.map(day => (
            <button
              key={day.value}
              onClick={() => setSelectedDate(day.value)}
              className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                selectedDate === day.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {day.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          <Clock className="w-4 h-4 inline mr-1" />
          Select Time
        </label>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
          {timeSlots.map(slot => (
            <button
              key={slot.value}
              onClick={() => setSelectedTime(slot.value)}
              className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTime === slot.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {slot.label}
            </button>
          ))}
        </div>
      </div>

      {selectedDate && selectedTime && (
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4">
          <h4 className="text-blue-300 font-semibold mb-1">Appointment Summary</h4>
          <p className="text-gray-300 text-sm">
            {new Date(selectedDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })} at {new Date(`2000-01-01T${selectedTime}`).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            })}
          </p>
        </div>
      )}

      <button
        onClick={handleConfirm}
        disabled={!selectedDate || !selectedTime}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors"
      >
        Confirm Appointment
      </button>
    </div>
  )
}

export default Scheduler
