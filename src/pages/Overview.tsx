import { Bike, TrendingUp, CalendarCheck, Store } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { StatsCard } from '@/components/shared/StatsCard'
import { TripStatusBadge } from '@/components/shared/StatusBadge'
import { vehicles, trips, stats, revenueData, customers } from '@/data/mock'
import { formatIDR, formatDateShort } from '@/lib/utils'

const chartData = revenueData.slice(-14).map(d => ({
  date: new Date(d.date).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' }),
  revenue: d.revenue,
  bookings: d.bookings,
}))

export default function Overview() {
  const recentTrips = [...trips].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5)
  const topVehicles = [...vehicles].sort((a, b) => b.totalRentals - a.totalRentals).slice(0, 4)

  return (
    <div className="space-y-6">
      {/* Pending Mitra Alert */}
      {stats.pendingMitra > 0 && (
        <Link to="/mitra?tab=pending">
          <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 cursor-pointer hover:bg-amber-100 transition-colors">
            <Store className="size-5 text-amber-500 shrink-0" />
            <p className="text-sm font-semibold text-amber-800 flex-1">
              {stats.pendingMitra} pendaftaran mitra baru menunggu persetujuan admin
            </p>
            <span className="text-xs font-bold text-amber-600">Review →</span>
          </div>
        </Link>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatsCard
          label="Total Armada"
          value={stats.totalVehicles}
          sub={`${stats.availableVehicles} tersedia`}
          icon={Bike}
          trend={{ value: 10, label: 'bulan ini' }}
        />
        <StatsCard
          label="Active Rentals"
          value={stats.activeRentals}
          sub="sedang berjalan"
          icon={CalendarCheck}
          accent
          trend={{ value: 33, label: 'vs minggu lalu' }}
        />
        <StatsCard
          label="Revenue Bulan Ini"
          value={formatIDR(stats.monthlyRevenue)}
          sub="30 hari terakhir"
          icon={TrendingUp}
          trend={{ value: 12.4, label: 'vs bulan lalu' }}
        />
        <StatsCard
          label="Mitra Aktif"
          value={stats.activeMitra}
          sub={`${stats.pendingMitra} pending review`}
          icon={Store}
          trend={{ value: 0, label: '' }}
        />
      </div>

      {/* Chart + Top Vehicles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Revenue — 14 Hari Terakhir</CardTitle>
              <Badge variant="secondary" className="text-xs">IDR</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E8733A" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#E8733A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEEEEF" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#77767C' }} tickLine={false} axisLine={false} />
                <YAxis
                  tick={{ fontSize: 11, fill: '#77767C' }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={v => `${(v / 1000000).toFixed(1)}M`}
                  width={40}
                />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: '1px solid #DDDDDE', fontSize: 12, boxShadow: '0 4px 16px rgba(27,43,107,0.1)' }}
                  formatter={(v) => [formatIDR(Number(v)), 'Revenue']}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#E8733A"
                  strokeWidth={2}
                  fill="url(#revenueGrad)"
                  dot={false}
                  activeDot={{ r: 5, fill: '#E8733A', strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Vehicles */}
        <Card>
          <CardHeader>
            <CardTitle>Top Kendaraan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topVehicles.map((v, i) => (
              <div key={v.id} className="flex items-center gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0">
                  {i + 1}
                </div>
                <img
                  src={v.imageUrl}
                  alt={v.name}
                  className="w-10 h-10 rounded-lg object-cover shrink-0 border border-border"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{v.name}</p>
                  <p className="text-xs text-muted-foreground">{v.totalRentals} trips</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-foreground">{formatIDR(v.revenue)}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" asChild className="w-full mt-2">
              <Link to="/fleet">Lihat Semua</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings + Recent Customers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Bookings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Booking Terbaru</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/bookings" className="text-accent text-xs">Lihat semua →</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {recentTrips.map((trip, i) => (
                <Link key={trip.id} to={`/bookings/${trip.id}`}>
                  <div className={`flex items-center gap-4 py-3 hover:bg-muted/50 -mx-5 px-5 transition-colors cursor-pointer ${i < recentTrips.length - 1 ? 'border-b border-border' : ''}`}>
                    <img
                      src={trip.vehicle.imageUrl}
                      alt={trip.vehicle.name}
                      className="w-12 h-10 rounded-lg object-cover border border-border shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold truncate">{trip.customer.name}</p>
                        <span className="text-muted-foreground text-xs hidden sm:inline">·</span>
                        <p className="text-xs text-muted-foreground hidden sm:inline truncate">{trip.vehicle.name}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {formatDateShort(trip.start)} – {formatDateShort(trip.end)} · {trip.pickupArea}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <TripStatusBadge status={trip.status} />
                      <p className="text-xs font-bold">{formatIDR(trip.totalPrice)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Customers */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pelanggan</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/customers" className="text-accent text-xs">Semua →</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {customers.slice(0, 4).map(c => (
              <div key={c.id} className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={c.avatarUrl} />
                  <AvatarFallback>{c.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.totalTrips} trips</p>
                </div>
                <div className={`w-2 h-2 rounded-full shrink-0 ${c.verificationStatus === 'verified' ? 'bg-emerald-500' : c.verificationStatus === 'pending' ? 'bg-amber-500' : 'bg-border'}`} title={c.verificationStatus} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button asChild><Link to="/fleet">+ Tambah Kendaraan</Link></Button>
            <Button variant="outline" asChild><Link to="/bookings">Kelola Booking</Link></Button>
            <Button variant="outline" asChild><Link to="/mitra">Review Mitra</Link></Button>
            <Button variant="outline" asChild><Link to="/customers">Verifikasi ID</Link></Button>
            <Button variant="secondary" asChild><Link to="/analytics">Lihat Laporan</Link></Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
