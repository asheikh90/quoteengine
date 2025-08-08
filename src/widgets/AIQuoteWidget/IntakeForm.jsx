import React, { useState } from 'react'
import { User, Phone, Mail, Car } from 'lucide-react'

function IntakeForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicle: {
      year: '',
      make: '',
      model: '',
      color: '',
      vin: '',
      plate: ''
    },
    payerType: 'cash'
  })

  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.vehicle.year) newErrors.year = 'Year is required'
    if (!formData.vehicle.make.trim()) newErrors.make = 'Make is required'
    if (!formData.vehicle.model.trim()) newErrors.model = 'Model is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit(formData)
  }

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  const updateVehicleField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      vehicle: { ...prev.vehicle, [field]: value }
    }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            <User className="w-4 h-4 inline mr-1" />
            Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
            className={`w-full px-3 py-2 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? 'border-red-500' : 'border-white/20'
            }`}
            placeholder="Your name"
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            <Phone className="w-4 h-4 inline mr-1" />
            Phone *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className={`w-full px-3 py-2 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.phone ? 'border-red-500' : 'border-white/20'
            }`}
            placeholder="(555) 123-4567"
          />
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          <Mail className="w-4 h-4 inline mr-1" />
          Email *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          className={`w-full px-3 py-2 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.email ? 'border-red-500' : 'border-white/20'
          }`}
          placeholder="your@email.com"
        />
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
      </div>

      <div className="border-t border-white/10 pt-4">
        <h4 className="text-white font-medium mb-3 flex items-center gap-2">
          <Car className="w-4 h-4" />
          Vehicle Information
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Year *</label>
            <input
              type="number"
              min="1990"
              max="2025"
              value={formData.vehicle.year}
              onChange={(e) => updateVehicleField('year', e.target.value)}
              className={`w-full px-3 py-2 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.year ? 'border-red-500' : 'border-white/20'
              }`}
              placeholder="2020"
            />
            {errors.year && <p className="text-red-400 text-xs mt-1">{errors.year}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Make *</label>
            <input
              type="text"
              value={formData.vehicle.make}
              onChange={(e) => updateVehicleField('make', e.target.value)}
              className={`w-full px-3 py-2 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.make ? 'border-red-500' : 'border-white/20'
              }`}
              placeholder="Honda"
            />
            {errors.make && <p className="text-red-400 text-xs mt-1">{errors.make}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Model *</label>
            <input
              type="text"
              value={formData.vehicle.model}
              onChange={(e) => updateVehicleField('model', e.target.value)}
              className={`w-full px-3 py-2 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.model ? 'border-red-500' : 'border-white/20'
              }`}
              placeholder="Civic"
            />
            {errors.model && <p className="text-red-400 text-xs mt-1">{errors.model}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Color</label>
            <input
              type="text"
              value={formData.vehicle.color}
              onChange={(e) => updateVehicleField('color', e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Silver"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">VIN (optional)</label>
            <input
              type="text"
              value={formData.vehicle.vin}
              onChange={(e) => updateVehicleField('vin', e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1HGBH41JXMN109186"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">License Plate (optional)</label>
            <input
              type="text"
              value={formData.vehicle.plate}
              onChange={(e) => updateVehicleField('plate', e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ABC123"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Who's paying?</label>
          <div className="flex gap-3">
            {['cash', 'insurance', 'fleet'].map(type => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payerType"
                  value={type}
                  checked={formData.payerType === type}
                  onChange={(e) => updateField('payerType', e.target.value)}
                  className="text-blue-500 focus:ring-blue-500"
                />
                <span className="text-gray-300 capitalize">{type}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
      >
        Continue to Photos
      </button>
    </form>
  )
}

export default IntakeForm
