import React, { useState, useEffect } from 'react'
import { Upload, X, Camera } from 'lucide-react'

function ImageUploader({ onImagesUploaded }) {
  const [images, setImages] = useState([])
  const [dragOver, setDragOver] = useState(false)

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      images.forEach(image => {
        if (image.url) {
          URL.revokeObjectURL(image.url)
        }
      })
    }
  }, [])

  const handleFileSelect = (files) => {
    const fileArray = Array.from(files).slice(0, 5 - images.length)
    const newImages = fileArray.map(file => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      name: file.name
    }))
    
    setImages(prev => [...prev, ...newImages])
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const files = e.dataTransfer.files
    handleFileSelect(files)
  }

  const handleFileInput = (e) => {
    handleFileSelect(e.target.files)
  }

  const removeImage = (id) => {
    setImages(prev => {
      const updated = prev.filter(img => img.id !== id)
      // Clean up object URL
      const removed = prev.find(img => img.id === id)
      if (removed && removed.url) {
        URL.revokeObjectURL(removed.url)
      }
      return updated
    })
  }

  const handleContinue = () => {
    onImagesUploaded(images)
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <Camera className="w-8 h-8 text-blue-400 mx-auto mb-2" />
        <h4 className="text-white font-medium">Upload Damage Photos</h4>
        <p className="text-gray-400 text-sm">Up to 5 photos for the most accurate estimate</p>
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragOver 
            ? 'border-blue-400 bg-blue-500/10' 
            : 'border-white/30 hover:border-white/50'
        }`}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-300 mb-2">
          Drag & drop photos here, or{' '}
          <label className="text-blue-400 hover:text-blue-300 cursor-pointer underline">
            browse
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
          </label>
        </p>
        <p className="text-gray-500 text-sm">
          {images.length}/5 photos uploaded
        </p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.map(image => (
            <div key={image.id} className="relative group">
              <img
                src={image.url}
                alt={image.name}
                className="w-full h-24 object-cover rounded-lg"
              />
              <button
                onClick={() => removeImage(image.id)}
                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleContinue}
        disabled={images.length === 0}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors"
      >
        {images.length > 0 ? `Continue with ${images.length} photo${images.length > 1 ? 's' : ''}` : 'Add at least 1 photo to continue'}
      </button>
    </div>
  )
}

export default ImageUploader
