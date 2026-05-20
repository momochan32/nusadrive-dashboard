import { useState } from 'react'
import { Search, Star, Plus, Filter, Package, CalendarRange } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { VehicleStatusBadge } from '@/components/shared/StatusBadge'
import { vehicles, trips } from '@/data/mock'
import { formatIDR, cn } from '@/lib/utils'
import type { VehicleCategory, VehicleStatus } from '@/types'

const categories: { value: VehicleCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'Semua' },
  { value: 'scooter', label: 'Scooters' },
  { value: 'motorbike', label: 'Motorbikes' },
  { value: 'cruiser', label: 'Cruisers' },
  { value: 'dirt_bike', label: 'Dirt Bikes' },
]

const categoryLabel: Record<VehicleCategory, string> = {
  scooter: 'Scooter',
  motorbike: 'Motorbike',
  cruiser: 'Cruiser',
  dirt_bike: 'Dirt Bike',
}

const statusColor: Record<VehicleStatus, string> = {
  available: 'bg-emerald-500',
  rented: 'bg-accent',
  maintenance: 'bg-amber-400',
}

const statusLabel: Record<VehicleStatus, string> = {
  available: 'Tersedia',
  rented: 'Disewa',
  maintenance: 'Maintenance',
}

// Compute 14-day availability grid
function buildAvailabilityGrid() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() + i)
    return d
  })

  const grid = vehicles.map(v => {
    const dayStatus = days.map(day => {
      if (v.status === 'maintenance') return 'maintenance' as VehicleStatus
      const isBooked = trips.some(t => {
        if (t.vehicle.id !== v.id) return false
        if (t.status === 'cancelled') return false
        const start = new Date(t.start)
        const end = new Date(t.end)
        start.setHours(0, 0, 0, 0)
        end.setHours(0, 0, 0, 0)
        return day >= start && day <= end
      })
      return isBooked ? 'rented' as VehicleStatus : 'available' as VehicleStatus
    })
    return { vehicle: v, dayStatus }
  })

  return { days, grid }
}

// Stock summary per category
function StockTab() {
  const catGroups: { cat: VehicleCategory; label: string }[] = [
    { cat: 'scooter', label: 'Scooters' },
    { cat: 'motorbike', label: 'Motorbikes' },
    { cat: 'cruiser', label: 'Cruisers' },
    { cat: 'dirt_bike', label: 'Dirt Bikes' },
  ]

  const totalByStatus = (status: VehicleStatus) => vehicles.filter(v => v.status === status).length

  return (
    <div className="space-y-5">
      {/* Overall summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(['available', 'rented', 'maintenance'] as VehicleStatus[]).map(s => (
          <Card key={s}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className={cn('w-2.5 h-2.5 rounded-full', statusColor[s])} />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{statusLabel[s]}</span>
              </div>
              <p className="text-2xl font-extrabold">{totalByStatus(s)}</p>
              <p className="text-xs text-muted-foreground mt-0.5">dari {vehicles.length} total</p>
            </CardContent>
          </Card>
        ))}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Package className="size-3 text-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Total Armada</span>
            </div>
            <p className="text-2xl font-extrabold">{vehicles.length}</p>
            <p className="text-xs text-muted-foreground mt-0.5">unit kendaraan</p>
          </CardContent>
        </Card>
      </div>

      {/* Per category breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {catGroups.map(({ cat, label }) => {
          const catVehicles = vehicles.filter(v => v.category === cat)
          const available = catVehicles.filter(v => v.status === 'available').length
          const rented = catVehicles.filter(v => v.status === 'rented').length
          const maintenance = catVehicles.filter(v => v.status === 'maintenance').length
          const pct = catVehicles.length > 0 ? Math.round((available / catVehicles.length) * 100) : 0

          return (
            <Card key={cat}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-bold">{label}</CardTitle>
                  <Badge variant="secondary" className="text-[10px]">{catVehicles.length} unit</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Progress bar */}
                <div className="h-2 bg-muted rounded-full overflow-hidden flex gap-0.5">
                  <div className="bg-emerald-500 rounded-l-full transition-all" style={{ width: `${(available / catVehicles.length) * 100}%` }} />
                  <div className="bg-accent transition-all" style={{ width: `${(rented / catVehicles.length) * 100}%` }} />
                  <div className="bg-amber-400 rounded-r-full transition-all" style={{ width: `${(maintenance / catVehicles.length) * 100}%` }} />
                </div>
                <div className="flex gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-muted-foreground">Tersedia</span>
                    <span className="font-bold">{available}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-muted-foreground">Disewa</span>
                    <span className="font-bold">{rented}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-muted-foreground">Maintenance</span>
                    <span className="font-bold">{maintenance}</span>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground">{pct}% unit tersedia saat ini</p>

                {/* Vehicle list */}
                <div className="space-y-2 pt-1 border-t border-border">
                  {catVehicles.map(v => (
                    <div key={v.id} className="flex items-center gap-2.5">
                      <span className={cn('w-2 h-2 rounded-full shrink-0', statusColor[v.status])} />
                      <span className="text-sm font-medium flex-1 truncate">{v.name}</span>
                      <span className="text-xs text-muted-foreground hidden sm:inline">{v.location}</span>
                      <span className="text-xs font-bold whitespace-nowrap">{formatIDR(v.pricePerDay)}<span className="font-normal text-muted-foreground">/hr</span></span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function AvailabilityTab() {
  const { days, grid } = buildAvailabilityGrid()

  const cellColor: Record<VehicleStatus, string> = {
    available: 'bg-emerald-100 text-emerald-700',
    rented: 'bg-accent/20 text-accent',
    maintenance: 'bg-amber-100 text-amber-700',
  }

  const cellChar: Record<VehicleStatus, string> = {
    available: '✓',
    rented: '●',
    maintenance: '~',
  }

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300 inline-block" /> Tersedia</div>
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-accent/20 border border-accent/30 inline-block" /> Disewa</div>
        <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-100 border border-amber-300 inline-block" /> Maintenance</div>
      </div>

      {/* Calendar grid — horizontally scrollable */}
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="text-xs border-collapse min-w-max w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left px-4 py-2.5 font-semibold text-muted-foreground text-[11px] uppercase tracking-wider sticky left-0 bg-muted/50 z-10 min-w-40 border-r border-border">
                Kendaraan
              </th>
              {days.map((day, i) => {
                const isToday = i === 0
                return (
                  <th key={i} className={cn(
                    'px-2 py-2.5 font-semibold text-center min-w-12',
                    isToday ? 'text-accent' : 'text-muted-foreground'
                  )}>
                    <div>{day.toLocaleDateString('id-ID', { weekday: 'short' })}</div>
                    <div className={cn('text-[10px]', isToday && 'font-bold')}>{day.getDate()}</div>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {grid.map(({ vehicle, dayStatus }, ri) => (
              <tr key={vehicle.id} className={ri % 2 === 0 ? 'bg-white' : 'bg-muted/20'}>
                <td className={cn(
                  'px-4 py-2 sticky left-0 z-10 border-r border-border',
                  ri % 2 === 0 ? 'bg-white' : 'bg-muted/20'
                )}>
                  <p className="font-semibold truncate max-w-36">{vehicle.name}</p>
                  <p className="text-muted-foreground text-[10px]">{vehicle.location}</p>
                </td>
                {dayStatus.map((s, ci) => (
                  <td key={ci} className="px-1 py-1.5 text-center">
                    <span className={cn(
                      'inline-flex items-center justify-center w-8 h-7 rounded text-[10px] font-bold',
                      cellColor[s]
                    )}>
                      {cellChar[s]}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function Fleet() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<VehicleCategory | 'all'>('all')

  const filtered = vehicles.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.location.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'all' || v.category === category
    return matchSearch && matchCat
  })

  return (
    <div className="space-y-5">
      <Tabs defaultValue="armada">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
          <TabsList>
            <TabsTrigger value="armada">Armada</TabsTrigger>
            <TabsTrigger value="stok">
              <Package className="size-3.5 mr-1.5" /> Stok
            </TabsTrigger>
            <TabsTrigger value="ketersediaan">
              <CalendarRange className="size-3.5 mr-1.5" /> Ketersediaan
            </TabsTrigger>
          </TabsList>
          <div className="sm:ml-auto flex gap-2">
            <Button className="gap-2 w-full sm:w-auto">
              <Plus className="size-4" /> Tambah Kendaraan
            </Button>
          </div>
        </div>

        {/* Armada tab */}
        <TabsContent value="armada" className="space-y-4 mt-0">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama atau lokasi kendaraan..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" size="default" className="gap-2">
              <Filter className="size-4" /> Filter
            </Button>
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={cn(
                  'px-4 py-1.5 rounded-full text-sm font-semibold transition-colors cursor-pointer',
                  category === cat.value
                    ? 'bg-primary text-white'
                    : 'bg-white border border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
                )}
              >
                {cat.label}
              </button>
            ))}
            <span className="ml-auto text-sm text-muted-foreground self-center">{filtered.length} kendaraan</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {filtered.map(vehicle => (
              <Card key={vehicle.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="relative">
                  <img
                    src={vehicle.imageUrl}
                    alt={vehicle.name}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <VehicleStatusBadge status={vehicle.status} />
                  </div>
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-primary/90 text-white rounded-full px-2 py-0.5">
                    <Star className="size-3 fill-current" />
                    <span className="text-xs font-bold">{vehicle.rating}</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-sm font-bold leading-tight">{vehicle.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{vehicle.year} · {vehicle.engineCc}</p>
                    </div>
                    <Badge variant="secondary" className="text-[10px] shrink-0">{categoryLabel[vehicle.category]}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <span className="font-medium text-foreground">{vehicle.transmission}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      📍 <span>{vehicle.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div>
                      <span className="text-base font-extrabold text-foreground">{formatIDR(vehicle.pricePerDay)}</span>
                      <span className="text-xs text-muted-foreground">/hari</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {vehicle.totalRentals} trips
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="text-4xl mb-3">🏍️</div>
              <p className="text-sm font-semibold">Tidak ada kendaraan ditemukan</p>
              <p className="text-xs text-muted-foreground mt-1">Coba ubah filter atau kata kunci pencarian</p>
            </div>
          )}
        </TabsContent>

        {/* Stok tab */}
        <TabsContent value="stok" className="mt-0">
          <StockTab />
        </TabsContent>

        {/* Ketersediaan tab */}
        <TabsContent value="ketersediaan" className="mt-0">
          <AvailabilityTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
