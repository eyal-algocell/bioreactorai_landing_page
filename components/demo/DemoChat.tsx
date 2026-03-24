'use client'

import { useState, useRef, useEffect } from 'react'
import { findResponse, suggestedQuestions, type DemoResponse } from './demoData'
import DemoChart from './DemoChart'

interface Message {
  role: 'user' | 'ai'
  text: string
  response?: DemoResponse
}

export default function DemoChat({ onInteraction }: { onInteraction?: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      text: "Hello! I'm connected to Reactor 3 (Batch #470, Day 4). I can see all your process parameters in real-time. What would you like to know?",
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [usedQuestions, setUsedQuestions] = useState<Set<string>>(new Set())
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const chatContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }

  useEffect(() => { scrollToBottom() }, [messages, isTyping])

  const sendMessage = (text: string) => {
    if (!text.trim() || isTyping) return
    onInteraction?.()

    const userMsg: Message = { role: 'user', text: text.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setUsedQuestions(prev => { const next = new Set(prev); next.add(text.trim()); return next })
    setIsTyping(true)

    // Simulate AI thinking time
    const delay = 1200 + Math.random() * 800
    setTimeout(() => {
      const response = findResponse(text)
      const aiMsg: Message = { role: 'ai', text: response.answer, response }
      setMessages(prev => [...prev, aiMsg])
      setIsTyping(false)
    }, delay)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Messages area */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'user' ? (
              <div className="bg-slate-700/50 rounded-2xl rounded-br-md px-4 py-2.5 max-w-[80%]">
                <p className="text-white text-sm">{msg.text}</p>
              </div>
            ) : (
              <div className="bg-teal-500/5 border border-teal-500/10 rounded-2xl rounded-bl-md px-4 py-3 max-w-[88%]">
                <p className="text-teal-400 text-[10px] font-medium mb-1.5 uppercase tracking-wider">AI Agent</p>
                <p className="text-slate-300 text-sm leading-relaxed">{msg.text}</p>
                {/* Metrics cards */}
                {msg.response?.metrics && (
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {msg.response.metrics.map((m, j) => (
                      <div key={j} className="bg-navy-900/50 rounded-lg px-3 py-2">
                        <p className="text-slate-500 text-[10px]">{m.label}</p>
                        <p className="text-white text-sm font-mono">{m.value}</p>
                        {m.delta && <p className="text-teal-400 text-[10px]">{m.delta}</p>}
                      </div>
                    ))}
                  </div>
                )}
                {/* Chart */}
                {msg.response?.chart && <DemoChart config={msg.response.chart} />}
                {/* Source */}
                {msg.response?.source && (
                  <p className="text-slate-600 text-[10px] mt-2">Source: {msg.response.source}</p>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-teal-500/5 border border-teal-500/10 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex items-center gap-1">
                <span className="typing-dot w-1.5 h-1.5 bg-teal-400/60 rounded-full" />
                <span className="typing-dot w-1.5 h-1.5 bg-teal-400/60 rounded-full" />
                <span className="typing-dot w-1.5 h-1.5 bg-teal-400/60 rounded-full" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested questions */}
      <div className="px-4 pb-2">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {suggestedQuestions.filter(q => !usedQuestions.has(q)).map((q, i) => (
            <button
              key={i}
              onClick={() => sendMessage(q)}
              disabled={isTyping}
              className="flex-shrink-0 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs hover:bg-teal-500/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="p-4 pt-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about your bioprocess..."
            disabled={isTyping}
            className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isTyping || !input.trim()}
            className="px-4 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}
