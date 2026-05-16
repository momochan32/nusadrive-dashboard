import { useState } from 'react'
import { Search, Download, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TripStatusBadge } from '@/components/shared/StatusBadge'
import { trips, mitras } from '@/data/mock'
import { formatIDR, formatDate, formatDateShort, daysBetween } from '@/lib/utils'
import type { TripStatus } from '@/types'

const paymentLabels: Record<string, string> = {
  visa: 'Visa', mastercard: 'MC', gopay: 'GoPay',
  ovo: 'OVO', bank_transfer: 'Transfer',
}

function SummaryChip({ label, value, accent }: { label: string; value: string | number; accent?: boolean }) {
  return (
    <div className="bg-white border border-border rounded-xl px-4 py-3 shadow-sm">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className={`text-lg font-extrabold mt-0.5 ${accent ? 'text-accent' : ''}`}>{value}</p>
    </div>
  )
}

export default function OrderHistory() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<TripStatus | 'all'>('all')
  const [mitraFilter, setMitraFilter] = useState<string>('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const activeMitras = mitras.filter(m => m.status === 'active')

  const filtered = trips.filter(t => {
    const matchStatus = statusFilter === 'all' || t.status === statusFilter
    const matchMitra = mitraFilter === 'all' || t.vehicle.mitraId === mitraFilter
    const matchSearch =
      t.bookingCode.toLowerCase().includes(search.toLowerCase()) ||
      t.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      t.vehicle.name.toLowerCase().includes(search.toLowerCase()) ||
      t.pickupArea.toLowerCase().includes(search.toLowerCase())
    const matchFrom = !dateFrom || new Date(t.start) >= new Date(dateFrom)
    const matchTo = !dateTo || new Date(t.end) <= new Date(dateTo)
    return matchStatus && matchMitra && matchSearch && matchFrom && matchTo
  })

  const totalRevenue = filtered
    .filter(t => t.status === 'completed' || t.status === 'active')
    .reduce((s, t) => s + t.totalPrice, 0)
  const totalCompleted = filtered.filter(t => t.status === 'completed').length
  const totalCancelled = filtered.filter(t => t.status === 'cancelled').length

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="flex flex-wrap gap-3">
        <SummaryChip label="Total Order" value={filtered.length} />
        <SummaryChip label="Selesai" value={totalCompleted} />
        <SummaryChip label="Dibatalkan" value={totalCancelled} />
        <SummaryChip label="Total Revenue" value={formatIDR(totalRevenue)} accent />
        <Button variant="outline" className="gap-2 ml-auto self-center">
          <Download className="size-4" /> Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Cari kode, pelanggan, kendaraan..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={v => setStatusFilter(v as TripStatus | 'all')}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Semua Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select value={mitraFilter} onValueChange={setMitraFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Semua Mitra" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Mitra</SelectItem>
            {activeMitras.map(m => (
              <SelectItem key={m.id} value={m.id}>{m.businessName}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2">
          <Input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="w-36 text-sm" />
          <span className="text-muted-foreground text-sm">–</span>
          <Input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="w-36 text-sm" />
        </div>
        {(search || statusFilter !== 'all' || mitraFilter !== 'all' || dateFrom || dateTo) && (
          <Button variant="ghost" size="sm" className="text-muted-foreground"
            onClick={() => { setSearch(''); setStatusFilter('all'); setMitraFilter('all'); setDateFrom(''); setDateTo('') }}>
            Reset
          </Button>
        )}
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
        {/* Header */}
        <div className="hidden lg:grid grid-cols-[120px_1fr_1fr_120px_100px_80px_40px] gap-4 items-center py-2.5 px-5 bg-muted/50 border-b border-border text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          <div>Kode Booking</div>
          <div>Pelanggan</div>
          <div>Kendaraan</div>
          <div>Tanggal</div>
          <div>Status</div>
          <div className="text-right">Total</div>
          <div />
        </div>

        <CardContent className="p-0">
          {filtered.length > 0 ? (
            filtered.map((trip, i) => {
              const nights = daysBetween(trip.start, trip.end)
              return (
                <Link key={trip.id} to={`/bookings/${trip.id}`}>
                  <div className={`grid grid-cols-1 lg:grid-cols-[120px_1fr_1fr_120px_100px_80px_40px] gap-2 lg:gap-4 items-center py-4 px-5 hover:bg-muted/40 transition-colors cursor-pointer ${i < filtered.length - 1 ? 'border-b border-border' : ''}`}>
                    {/* Code */}
                    <div>
                      <span className="text-xs font-bold text-accent">{trip.bookingCode}</span>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{formatDate(trip.createdAt)}</div>
                    </div>
                    {/* Customer */}
                    <div>
                      <p className="text-sm font-semibold">{trip.customer.name}</p>
                      <p className="text-xs text-muted-foreground">{trip.customer.nationality}</p>
                    </div>
                    {/* Vehicle */}
                    <div className="flex items-center gap-2">
                      <img src={trip.vehicle.imageUrl} alt={trip.vehicle.name} className="w-10 h-8 rounded object-cover border border-border shrink-0 hidden sm:block" />
                      <div>
                        <p className="text-sm font-semibold truncate">{trip.vehicle.name}</p>
                        <p className="text-xs text-muted-foreground">{trip.pickupArea} · {paymentLabels[trip.paymentMethod]}</p>
                      </div>
                    </div>
                    {/* Dates */}
                    <div className="text-xs text-muted-foreground">
                      <p className="font-medium text-foreground">{formatDateShort(trip.start)} – {formatDateShort(trip.end)}</p>
                      <p>{nights} malam</p>
                    </div>
                    {/* Status */}
                    <div><TripStatusBadge status={trip.status} /></div>
                    {/* Price */}
                    <div className="text-right">
                      <p className="text-sm font-bold">{formatIDR(trip.totalPrice)}</p>
                      {trip.hasProtection && (
                        <Badge variant="secondary" className="text-[9px] mt-0.5">+Proteksi</Badge>
                      )}
                    </div>
                    {/* Arrow */}
                    <div className="hidden lg:flex justify-end">
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </div>
                  </div>
                </Link>
              )
            })
          ) : (
            <div className="flex flex-col items-center py-20 text-center">
              <p className="text-sm font-semibold">Tidak ada order ditemukan</p>
              <p className="text-xs text-muted-foreground mt-1">Coba ubah filter atau kata kunci pencarian</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
