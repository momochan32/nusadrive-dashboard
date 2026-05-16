import { useState } from 'react'
import { Search, Star, MoreHorizontal } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { VerificationBadge } from '@/components/shared/StatusBadge'
import { customers } from '@/data/mock'
import { formatIDR, formatDate } from '@/lib/utils'
import type { VerificationStatus } from '@/types'
import { cn } from '@/lib/utils'

const filters: { value: VerificationStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Semua' },
  { value: 'verified', label: 'Verified' },
  { value: 'pending', label: 'Pending' },
  { value: 'unverified', label: 'Belum Verifikasi' },
]

export default function Customers() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<VerificationStatus | 'all'>('all')

  const filtered = customers.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.nationality.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || c.verificationStatus === filter
    return matchSearch && matchFilter
  })

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input placeholder="Cari pelanggan..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer',
                filter === f.value
                  ? 'bg-primary text-white'
                  : 'bg-white border border-border text-muted-foreground hover:text-foreground'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <span className="text-sm text-muted-foreground self-center ml-auto">{filtered.length} pelanggan</span>
      </div>

      {/* Table Header */}
      <Card className="overflow-hidden">
        <div className="hidden md:flex items-center gap-4 py-2.5 px-5 bg-muted/50 border-b border-border text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          <div className="flex-1">Pelanggan</div>
          <div className="w-32">Bergabung</div>
          <div className="w-20 text-center">Trips</div>
          <div className="w-28 text-right">Total Spend</div>
          <div className="w-28">Status</div>
          <div className="w-8" />
        </div>
        <CardContent className="p-0">
          {filtered.map((customer, i) => (
            <div
              key={customer.id}
              className={`flex items-center gap-4 py-4 px-5 hover:bg-muted/40 transition-colors cursor-pointer ${i < filtered.length - 1 ? 'border-b border-border' : ''}`}
            >
              {/* Customer Info */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarImage src={customer.avatarUrl} />
                  <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold truncate">{customer.name}</p>
                    {customer.rating > 0 && (
                      <div className="flex items-center gap-0.5">
                        <Star className="size-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-medium">{customer.rating}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{customer.email}</p>
                  <p className="text-xs text-muted-foreground">{customer.phone} · {customer.nationality}</p>
                </div>
              </div>

              {/* Joined */}
              <div className="hidden md:block w-32 text-xs text-muted-foreground">
                {formatDate(customer.memberSince)}
              </div>

              {/* Trips */}
              <div className="hidden md:block w-20 text-center">
                <span className="text-sm font-bold">{customer.totalTrips}</span>
              </div>

              {/* Total Spend */}
              <div className="hidden md:block w-28 text-right">
                <span className="text-sm font-bold">{formatIDR(customer.totalSpent)}</span>
              </div>

              {/* Verification */}
              <div className="hidden md:flex w-28">
                <VerificationBadge status={customer.verificationStatus} />
              </div>

              {/* Mobile verification (compact) */}
              <div className="md:hidden">
                <VerificationBadge status={customer.verificationStatus} />
              </div>

              {/* Actions */}
              <div className="w-8 flex justify-end shrink-0">
                <button className="p-1 rounded hover:bg-muted text-muted-foreground cursor-pointer">
                  <MoreHorizontal className="size-4" />
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="flex flex-col items-center py-16 text-center">
              <p className="text-sm font-semibold">Tidak ada pelanggan</p>
              <p className="text-xs text-muted-foreground mt-1">Coba ubah filter pencarian</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
