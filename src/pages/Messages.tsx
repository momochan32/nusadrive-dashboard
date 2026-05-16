import { useState, useRef, useEffect } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { messageThreads } from '@/data/mock'
import { cn } from '@/lib/utils'
import type { ChatMessage, MessageThread } from '@/types'

function formatTime(iso: string): string {
  const date = new Date(iso)
  const now = new Date()
  const diffH = (now.getTime() - date.getTime()) / 3600000
  if (diffH < 24) return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
  if (diffH < 48) return 'Kemarin'
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
}

function ThreadItem({ thread, isActive, onClick }: { thread: MessageThread; isActive: boolean; onClick: () => void }) {
  const last = thread.messages[thread.messages.length - 1]
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-start gap-3 px-4 py-3.5 transition-colors text-left border-b border-border cursor-pointer',
        isActive ? 'bg-secondary' : 'hover:bg-muted/50'
      )}
    >
      <div className="relative shrink-0">
        <Avatar className="h-10 w-10">
          <AvatarImage src={thread.hostAvatarUrl} />
          <AvatarFallback>{thread.hostName.split(' ').map(n => n[0]).join('').slice(0, 2)}</AvatarFallback>
        </Avatar>
        {thread.isVerified && (
          <CheckCircle2 className="absolute -bottom-0.5 -right-0.5 size-4 text-emerald-500 bg-white rounded-full" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1">
          <p className={cn('text-sm truncate', thread.unreadCount > 0 ? 'font-bold' : 'font-semibold')}>{thread.hostName}</p>
          <span className="text-[10px] text-muted-foreground shrink-0">{formatTime(thread.lastActivity)}</span>
        </div>
        {thread.bikeName && <p className="text-[10px] text-accent font-medium truncate">{thread.bikeName}</p>}
        <p className={cn('text-xs truncate mt-0.5', thread.unreadCount > 0 ? 'text-foreground font-medium' : 'text-muted-foreground')}>
          {last?.sender === 'me' ? '→ ' : ''}{last?.text ?? ''}
        </p>
      </div>
      {thread.unreadCount > 0 && (
        <span className="flex items-center justify-center h-5 min-w-5 rounded-full bg-accent text-white text-[10px] font-bold px-1 shrink-0">
          {thread.unreadCount}
        </span>
      )}
    </button>
  )
}

function ChatBubble({ msg }: { msg: ChatMessage }) {
  const isMe = msg.sender === 'me'
  return (
    <div className={cn('flex gap-2 mb-3', isMe && 'justify-end')}>
      <div className={cn(
        'max-w-[75%] rounded-2xl px-4 py-2.5 text-sm',
        isMe
          ? 'bg-primary text-white rounded-br-sm'
          : 'bg-white border border-border text-foreground rounded-bl-sm shadow-sm'
      )}>
        <p className="leading-relaxed">{msg.text}</p>
        <p className={cn('text-[10px] mt-1', isMe ? 'text-white/60' : 'text-muted-foreground')}>
          {formatTime(msg.time)}
        </p>
      </div>
    </div>
  )
}

export default function Messages() {
  const [threads, setThreads] = useState<MessageThread[]>(messageThreads)
  const [activeId, setActiveId] = useState<string>(messageThreads[0].id)
  const [compose, setCompose] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  const active = threads.find(t => t.id === activeId)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeId, threads])

  function handleSend() {
    if (!compose.trim()) return
    const now = new Date().toISOString()
    const newMsg: ChatMessage = { id: `m-${Date.now()}`, sender: 'me', text: compose.trim(), time: now }
    setThreads(prev => prev.map(t => t.id === activeId
      ? { ...t, messages: [...t.messages, newMsg], lastActivity: now }
      : t
    ))
    setCompose('')
  }

  return (
    <div className="flex h-[calc(100vh-7.5rem)] gap-0 overflow-hidden rounded-xl border border-border bg-white shadow-[0_3px_12px_rgba(27,43,107,0.08)]">
      {/* Thread List */}
      <div className="w-72 xl:w-80 shrink-0 flex flex-col border-r border-border">
        <div className="px-4 py-3.5 border-b border-border">
          <h2 className="text-sm font-bold">Pesan</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{threads.reduce((s, t) => s + t.unreadCount, 0)} pesan belum dibaca</p>
        </div>
        <ScrollArea className="flex-1">
          {threads.map(t => (
            <ThreadItem
              key={t.id}
              thread={t}
              isActive={t.id === activeId}
              onClick={() => {
                setActiveId(t.id)
                setThreads(prev => prev.map(th => th.id === t.id ? { ...th, unreadCount: 0 } : th))
              }}
            />
          ))}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      {active ? (
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat Header */}
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border shrink-0">
            <Avatar className="h-9 w-9">
              <AvatarImage src={active.hostAvatarUrl} />
              <AvatarFallback>{active.hostName.split(' ').map(n => n[0]).join('').slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold truncate">{active.hostName}</p>
                {active.isVerified && <Badge variant="success" className="text-[10px]">Verified</Badge>}
              </div>
              {active.bikeName && <p className="text-[10px] text-muted-foreground">{active.bikeName}</p>}
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-5">
            {active.messages.map(msg => <ChatBubble key={msg.id} msg={msg} />)}
            <div ref={bottomRef} />
          </ScrollArea>

          {/* Composer */}
          <div className="flex items-center gap-2 px-4 py-3 border-t border-border shrink-0">
            <Input
              placeholder="Ketik pesan..."
              value={compose}
              onChange={e => setCompose(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              className="flex-1"
            />
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!compose.trim()}
              className="shrink-0"
            >
              <Send className="size-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
          Pilih percakapan untuk mulai membalas
        </div>
      )}
    </div>
  )
}
