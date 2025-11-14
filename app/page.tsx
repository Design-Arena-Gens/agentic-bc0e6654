'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'agent'
  content: string
  timestamp: Date
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'agent',
      content: 'नमस्ते! मैं आपका AI एजेंट हूं। मैं आपकी मदद के लिए यहां हूं। आप मुझसे कुछ भी पूछ सकते हैं!',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = (userMessage: string): string => {
    const lowerMsg = userMessage.toLowerCase()

    // Hindi/Hinglish responses
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('नमस्ते') || lowerMsg.includes('नमस्कार')) {
      return 'नमस्ते! मैं आपकी कैसे मदद कर सकता हूं?'
    }

    if (lowerMsg.includes('kaise ho') || lowerMsg.includes('कैसे हो') || lowerMsg.includes('how are you')) {
      return 'मैं बिल्कुल ठीक हूं, धन्यवाद! आप कैसे हैं?'
    }

    if (lowerMsg.includes('naam') || lowerMsg.includes('नाम') || lowerMsg.includes('name')) {
      return 'मेरा नाम AI एजेंट है। मैं आपकी सहायता के लिए बनाया गया हूं!'
    }

    if (lowerMsg.includes('kya kar sakte') || lowerMsg.includes('क्या कर सकते') || lowerMsg.includes('what can you do')) {
      return 'मैं आपके सवालों का जवाब दे सकता हूं, जानकारी दे सकता हूं, और बातचीत कर सकता हूं। आप मुझसे कुछ भी पूछ सकते हैं!'
    }

    if (lowerMsg.includes('time') || lowerMsg.includes('समय') || lowerMsg.includes('samay')) {
      return `अभी का समय है: ${new Date().toLocaleTimeString('hi-IN')}`
    }

    if (lowerMsg.includes('date') || lowerMsg.includes('तारीख') || lowerMsg.includes('tareekh')) {
      return `आज की तारीख है: ${new Date().toLocaleDateString('hi-IN')}`
    }

    if (lowerMsg.includes('dhanyavad') || lowerMsg.includes('धन्यवाद') || lowerMsg.includes('thank')) {
      return 'आपका स्वागत है! 😊'
    }

    if (lowerMsg.includes('bye') || lowerMsg.includes('alvida') || lowerMsg.includes('अलविदा')) {
      return 'अलविदा! फिर मिलेंगे! 👋'
    }

    if (lowerMsg.includes('help') || lowerMsg.includes('madad') || lowerMsg.includes('मदद')) {
      return 'मैं यहां आपकी मदद के लिए हूं! आप मुझसे कुछ भी पूछ सकते हैं - सवाल, जानकारी, या बस बातचीत करना।'
    }

    // Default responses
    const responses = [
      'यह एक दिलचस्प सवाल है! मुझे लगता है कि ' + userMessage.slice(0, 20) + '... के बारे में और जानकारी होनी चाहिए।',
      'समझ गया! आप ' + userMessage.split(' ')[0] + ' के बारे में जानना चाहते हैं।',
      'अच्छा सवाल! मैं आपकी मदद करने की कोशिश करूंगा।',
      'मुझे यह सुनकर खुशी हुई। क्या आप और कुछ जानना चाहेंगे?',
      'दिलचस्प! मुझे बताइए और क्या जानना है।'
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

    const agentMessage: Message = {
      role: 'agent',
      content: generateResponse(input),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, agentMessage])
    setIsTyping(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(10px)',
      }}>
        <h1 style={{
          margin: 0,
          fontSize: '24px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold'
        }}>
          🤖 AI Agent Chat
        </h1>
        <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#666' }}>
          आपका स्मार्ट बातचीत साथी
        </p>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              animation: 'slideIn 0.3s ease-out'
            }}
          >
            <div style={{
              maxWidth: '70%',
              padding: '12px 16px',
              borderRadius: '18px',
              background: msg.role === 'user'
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : 'rgba(255, 255, 255, 0.95)',
              color: msg.role === 'user' ? 'white' : '#333',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(10px)',
            }}>
              <div style={{ fontSize: '15px', lineHeight: '1.5' }}>
                {msg.content}
              </div>
              <div style={{
                fontSize: '11px',
                marginTop: '5px',
                opacity: 0.7,
                textAlign: 'right'
              }}>
                {msg.timestamp.toLocaleTimeString('hi-IN', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              padding: '12px 16px',
              borderRadius: '18px',
              background: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            }}>
              <div style={{ display: 'flex', gap: '5px' }}>
                <span style={{ animation: 'bounce 1.4s infinite' }}>●</span>
                <span style={{ animation: 'bounce 1.4s infinite 0.2s' }}>●</span>
                <span style={{ animation: 'bounce 1.4s infinite 0.4s' }}>●</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '20px',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{ display: 'flex', gap: '10px', maxWidth: '1200px', margin: '0 auto' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="अपना संदेश लिखें..."
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '25px',
              border: '2px solid #e0e0e0',
              fontSize: '15px',
              outline: 'none',
              transition: 'border-color 0.3s',
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            style={{
              padding: '12px 30px',
              borderRadius: '25px',
              border: 'none',
              background: input.trim()
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : '#ccc',
              color: 'white',
              fontSize: '15px',
              fontWeight: 'bold',
              cursor: input.trim() ? 'pointer' : 'not-allowed',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => {
              if (input.trim()) e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            भेजें 📤
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  )
}
