import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import { sendMessage, getHistory } from '../services/chatService'
import toast from 'react-hot-toast'
import ReactMarkdown from 'react-markdown'

const PROMPT_CHIPS = [
  'Can I afford a bike on my salary?',
  'How much should I save monthly?',
  'Do I need health insurance right now?',
  'Should I invest in SIP or FD?',
]
// ... keep PROMPT_CHIPS the same ...

export default function ChatPage() {
  const [messages, setMessages] = useState([])
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [fetching, setFetching] = useState(true)
  const bottomRef               = useRef(null)
  const [searchParams]          = useSearchParams()

  useEffect(() => {
    getHistory()
      .then(res => {
        setMessages(res.data.messages)
        // If a topic was passed from Learn page — auto send it
        const topic = searchParams.get('topic')
        if (topic && res.data.messages.length === 0) {
          setTimeout(() => handleSend(`Explain this to me in simple terms: ${topic}`), 500)
        }
      })
      .catch(() => {})
      .finally(() => setFetching(false))
  }, [])

  // ... rest stays the same
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (text) => {
    const messageText = text || input.trim()
    if (!messageText || loading) return

    setInput('')

    const userMsg = { role: 'user', content: messageText }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    try {
      const res = await sendMessage(messageText)
      const aiMsg = { role: 'assistant', content: res.data.reply }
      setMessages(prev => [...prev, aiMsg])
    } catch (err) {
      toast.error('Failed to get response')
      setMessages(prev => prev.slice(0, -1))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Navbar />

      {/* Chat header */}
      <div className="border-b border-forest/10 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-forest rounded-full flex items-center justify-center text-xl">
            🌱
          </div>
          <div>
            <div className="text-sm font-medium text-forest">Life Coach AI</div>
            <div className="text-xs text-sage">Online · Knows your profile</div>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-6 flex flex-col gap-4">

          {/* Welcome message */}
          {!fetching && messages.length === 0 && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-forest rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-1">
                🌱
              </div>
              <div className="bg-white border border-forest/10 rounded-2xl rounded-tl-sm px-4 py-3 max-w-lg">
                <p className="text-sm text-ink/80 leading-relaxed">
                  Hey! I'm your Life Coach AI. I know your profile — your salary, savings, and goals.
                  <br /><br />
                  Ask me anything about money, taxes, housing, insurance, or any adulting question. I'll give you real answers based on <strong>your</strong> situation. ✨
                </p>
              </div>
            </div>
          )}

          {/* Message history */}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-1 ${
                msg.role === 'user'
                  ? 'bg-lavender text-forest'
                  : 'bg-forest text-cream'
              }`}>
                {msg.role === 'user' ? '✦' : '🌱'}
              </div>

              {/* Bubble */}
              <div className={`px-4 py-3 rounded-2xl max-w-lg text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-forest text-cream rounded-tr-sm'
                  : 'bg-white border border-forest/10 text-ink/80 rounded-tl-sm'
              }`}>
                {msg.role === 'assistant' ? (
                  <ReactMarkdown>
                    {msg.content}
                  </ReactMarkdown>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-forest rounded-full flex items-center justify-center text-sm flex-shrink-0">
                🌱
              </div>
              <div className="bg-white border border-forest/10 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1 items-center h-4">
                  {[0,1,2].map(i => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 bg-sage rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Prompt chips */}
      {messages.length === 0 && !fetching && (
        <div className="max-w-3xl mx-auto px-6 pb-4 w-full">
          <p className="text-xs text-ink/40 mb-3">Try asking</p>
          <div className="flex flex-wrap gap-2">
            {PROMPT_CHIPS.map(chip => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                className="bg-white border border-forest/15 text-forest text-xs px-3 py-2 rounded-full hover:bg-forest/5 transition"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="border-t border-forest/10 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-4 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask your life coach anything..."
            disabled={loading}
            className="flex-1 border border-forest/15 rounded-full px-5 py-3 text-sm bg-cream focus:outline-none focus:border-forest/40 transition disabled:opacity-50"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="w-11 h-11 bg-forest rounded-full flex items-center justify-center text-cream hover:bg-forest/90 transition disabled:opacity-40"
          >
            ↑
          </button>
        </div>
      </div>

    </div>
  )
}