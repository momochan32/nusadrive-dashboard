import { useState } from 'react'
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { TripStatusBadge } from '@/components/shared/StatusBadge'
import { trips } from '@/data/mock'
import { formatIDR, formatDateShort, daysBetween } from '@/lib/utils'
import type { TripStatus } from '@/types'

const allStatuses: TripStatus[] = ['active', 'upcoming', 'completed', 'cancelled']

function TripRow({ trip }: { trip: typeof trips[0] }) {
  const nights = daysBetween(trip.start, trip.end)
  return (
    <Link to={`/bookings/${trip.id}`}>
      <div className="flex items-center gap-4 py-3.5 px-5 hover:bg-muted/50 transition-colors border-b border-border last:border-0 cursor-pointer">
        {/* Code */}
        <div className="hidden sm:block w-24 shrink-0">
          <p className="text-xs font-bold text-accent">{trip.bookingCode}</p>
        </div>
        {/* Customer */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">{trip.customer.name}</p>
          <p className="text-xs text-muted-foreground truncate">{trip.vehicle.name}</p>
        </div>
        {/* Dates */}
        <div className="hidden md:block w-36 shrink-0 text-xs text-muted-foreground">
          <p className="font-medium text-foreground">{formatDateShort(trip.start)} – {formatDateShort(trip.end)}</p>
          <p>{nights} malam · {trip.pickupArea}</p>
        </div>
        {/* Status */}
        <div className="shrink-0">
          <TripStatusBadge status={trip.status} />
        </div>
        {/* Price */}
        <div className="shrink-0 text-right hidden sm:block">
          <p className="text-sm font-bold">{formatIDR(trip.totalPrice)}</p>
        </div>
      </div>
    </Link>
  )
}

export default function Bookings() {
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState<'all' | TripStatus>('all')

  const filtered = trips.filter(t => {
    const matchTab = tab === 'all' || t.status === tab
    const matchSearch = t.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      t.vehicle.name.toLowerCase().includes(search.toLowerCase()) ||
      t.bookingCode.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  const count = (s: TripStatus | 'all') => s === 'all' ? trips.length : trips.filter(t => t.status === s).length

  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input placeholder="Cari booking, pelanggan, kendaraan..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
      </div>

      <Tabs value={tab} onValueChange={v => setTab(v as typeof tab)}>
        <TabsList>
          <TabsTrigger value="all">Semua ({count('all')})</TabsTrigger>
          <TabsTrigger value="active">Active ({count('active')})</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({count('upcoming')})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({count('completed')})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({count('cancelled')})</TabsTrigger>
        </TabsList>

        {(['all', ...allStatuses] as const).map(s => (
          <TabsContent key={s} value={s}>
            <Card className="overflow-hidden">
              {/* Table Header */}
              <div className="hidden sm:flex items-center gap-4 py-2.5 px-5 bg-muted/50 border-b border-border text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                <div className="w-24">Kode</div>
                <div className="flex-1">Pelanggan / Kendaraan</div>
                <div className="w-36 hidden md:block">Tanggal</div>
                <div className="w-24">Status</div>
                <div className="hidden sm:block w-20 text-right">Total</div>
              </div>
              <CardContent className="p-0">
                {filtered.length > 0
                  ? filtered.map(trip => <TripRow key={trip.id} trip={trip} />)
                  : (
                    <div className="flex flex-col items-center py-16 text-center">
                      <p className="text-sm font-semibold">Tidak ada booking</p>
                      <p className="text-xs text-muted-foreground mt-1">Belum ada booking dengan status ini</p>
                    </div>
                  )
                }
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
