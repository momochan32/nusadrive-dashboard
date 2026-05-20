import { useState } from 'react'
import { Search, Star, ChevronRight, Plus, MapPin, Car, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MitraStatusBadge } from '@/components/shared/StatusBadge'
import { mitras } from '@/data/mock'
import { formatIDR, formatDate } from '@/lib/utils'
import type { MitraStatus } from '@/types'

const allStatuses: MitraStatus[] = ['active', 'pending', 'suspended', 'rejected']

function MitraCard({ mitra }: { mitra: typeof mitras[0] }) {
  return (
    <Link to={`/mitra/${mitra.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12 shrink-0 rounded-xl">
              <AvatarImage src={mitra.avatarUrl} />
              <AvatarFallback className="rounded-xl text-sm font-bold">
                {mitra.businessName.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="text-sm font-bold truncate group-hover:text-accent transition-colors">
                    {mitra.businessName}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{mitra.ownerName}</p>
                </div>
                <MitraStatusBadge status={mitra.status} />
              </div>
              <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
                <MapPin className="size-3 shrink-0" />
                <span>{mitra.location} · {mitra.address.split(',')[0]}</span>
              </div>
            </div>
          </div>

          {mitra.status === 'active' && (
            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                  <Car className="size-3" />
                </div>
                <p className="text-sm font-bold">{mitra.totalVehicles}</p>
                <p className="text-[10px] text-muted-foreground">Armada</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                  <TrendingUp className="size-3" />
                </div>
                <p className="text-sm font-bold">{mitra.totalBookings}</p>
                <p className="text-[10px] text-muted-foreground">Booking</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
                  <Star className="size-3 fill-current" />
                </div>
                <p className="text-sm font-bold">{mitra.rating}</p>
                <p className="text-[10px] text-muted-foreground">Rating</p>
              </div>
            </div>
          )}

          {mitra.status === 'pending' && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">
                Mendaftar {formatDate(mitra.appliedAt)} · Dokumen perlu direview
              </p>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 h-8 text-xs">Setujui</Button>
                <Button size="sm" variant="outline" className="flex-1 h-8 text-xs text-destructive border-destructive/30 hover:bg-destructive/5">
                  Tolak
                </Button>
              </div>
            </div>
          )}

          {mitra.status === 'suspended' && (
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Ditangguhkan · {mitra.totalRevenue > 0 ? formatIDR(mitra.totalRevenue) + ' total revenue' : '-'}</p>
              <Button size="sm" variant="outline" className="h-8 text-xs">Aktifkan</Button>
            </div>
          )}

          <div className="flex items-center justify-between mt-3">
            <p className="text-xs text-muted-foreground">
              {mitra.status === 'active' ? formatIDR(mitra.totalRevenue) + ' total revenue' : mitra.email}
            </p>
            <ChevronRight className="size-4 text-muted-foreground group-hover:text-accent transition-colors" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default function Mitra() {
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState<'all' | MitraStatus>('all')

  const filtered = mitras.filter(m => {
    const matchTab = tab === 'all' || m.status === tab
    const matchSearch =
      m.businessName.toLowerCase().includes(search.toLowerCase()) ||
      m.ownerName.toLowerCase().includes(search.toLowerCase()) ||
      m.location.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  const count = (s: MitraStatus | 'all') =>
    s === 'all' ? mitras.length : mitras.filter(m => m.status === s).length

  const pendingCount = count('pending')

  return (
    <div className="space-y-5">
      {/* Pending Alert Banner */}
      {pendingCount > 0 && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-100 shrink-0">
            <span className="text-amber-600 font-bold text-sm">{pendingCount}</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-amber-800">
              {pendingCount} pendaftaran mitra menunggu review
            </p>
            <p className="text-xs text-amber-600 mt-0.5">Review dan setujui aplikasi mitra baru</p>
          </div>
          <button
            onClick={() => setTab('pending')}
            className="text-xs font-semibold text-amber-700 hover:text-amber-900 cursor-pointer"
          >
            Lihat →
          </button>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Cari nama bisnis atau pemilik..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button className="gap-2 sm:ml-auto w-full sm:w-auto">
          <Plus className="size-4" /> Undang Mitra
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={v => setTab(v as typeof tab)}>
        <TabsList>
          <TabsTrigger value="all">Semua ({count('all')})</TabsTrigger>
          <TabsTrigger value="active">Aktif ({count('active')})</TabsTrigger>
          <TabsTrigger value="pending" className="relative">
            Pending ({count('pending')})
            {count('pending') > 0 && (
              <span className="ml-1.5 flex items-center justify-center h-4 w-4 rounded-full bg-accent text-white text-[9px] font-bold">
                {count('pending')}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="suspended">Ditangguhkan ({count('suspended')})</TabsTrigger>
          <TabsTrigger value="rejected">Ditolak ({count('rejected')})</TabsTrigger>
        </TabsList>

        {(['all', ...allStatuses] as const).map(s => (
          <TabsContent key={s} value={s}>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map(m => <MitraCard key={m.id} mitra={m} />)}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-4xl mb-3">🏍️</div>
                <p className="text-sm font-semibold">Tidak ada mitra ditemukan</p>
                <p className="text-xs text-muted-foreground mt-1">Coba ubah filter atau kata kunci pencarian</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
