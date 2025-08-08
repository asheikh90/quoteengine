import React from 'react'
import { Bot, User } from 'lucide-react'

function ChatBubble({ type, content, timestamp }) {
  const isAI = type === 'ai'
  
  return (
    <div className={`flex gap-3 ${isAI ? '' : 'flex-row-reverse'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isAI ? 'bg-blue-500' : 'bg-gray-600'
      }`}>
        {isAI ? (
          <Bot className="w-4 h-4 text-white" />
        ) : (
          <User className="w-4 h-4 text-white" />
        )}
      </div>
      
      <div className={`max-w-xs lg:max-w-md ${isAI ? '' : 'text-right'}`}>
        <div className={`inline-block px-4 py-2 rounded-2xl ${
          isAI 
            ? 'bg-white/10 text-gray-100' 
            : 'bg-blue-600 text-white'
        }`}>
          <p className="text-sm leading-relaxed">{content}</p>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  )
}

export default ChatBubble
