import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { revenueData, trips, vehicles } from '@/data/mock'
import { formatIDR } from '@/lib/utils'

const COLORS = { active: '#E8733A', upcoming: '#1B2B6B', completed: '#10b981', cancelled: '#9E9DA3' }

const statusData = [
  { name: 'Active', value: trips.filter(t => t.status === 'active').length, color: COLORS.active },
  { name: 'Upcoming', value: trips.filter(t => t.status === 'upcoming').length, color: COLORS.upcoming },
  { name: 'Completed', value: trips.filter(t => t.status === 'completed').length, color: COLORS.completed },
  { name: 'Cancelled', value: trips.filter(t => t.status === 'cancelled').length, color: COLORS.cancelled },
]

const areaData = [
  { area: 'Canggu', bookings: 18, revenue: 15200000 },
  { area: 'Seminyak', bookings: 14, revenue: 13800000 },
  { area: 'Ubud', bookings: 11, revenue: 11500000 },
  { area: 'Kuta', bookings: 9, revenue: 8200000 },
  { area: 'Uluwatu', bookings: 7, revenue: 9800000 },
  { area: 'Nusa Dua', bookings: 5, revenue: 12500000 },
  { area: 'Jimbaran', bookings: 3, revenue: 4200000 },
]

const vehicleRevenueData = [...vehicles]
  .sort((a, b) => b.revenue - a.revenue)
  .slice(0, 6)
  .map(v => ({ name: v.name.split(' ').slice(0, 2).join(' '), revenue: v.revenue, trips: v.totalRentals }))

const chartData = revenueData.map(d => ({
  date: new Date(d.date).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' }),
  revenue: d.revenue,
  bookings: d.bookings,
}))

const totalRevenue = revenueData.reduce((s, d) => s + d.revenue, 0)
const avgPerBooking = totalRevenue / revenueData.reduce((s, d) => s + d.bookings, 0)

export default function Analytics() {
  return (
    <div className="space-y-5">
      {/* Summary Chips */}
      <div className="flex flex-wrap gap-3">
        <div className="bg-white border border-border rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-sm">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Total Revenue (30d)</p>
            <p className="text-lg font-extrabold">{formatIDR(totalRevenue)}</p>
          </div>
        </div>
        <div className="bg-white border border-border rounded-xl px-4 py-2.5 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Avg / Booking</p>
          <p className="text-lg font-extrabold">{formatIDR(Math.round(avgPerBooking))}</p>
        </div>
        <div className="bg-white border border-border rounded-xl px-4 py-2.5 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Total Bookings (30d)</p>
          <p className="text-lg font-extrabold">{revenueData.reduce((s, d) => s + d.bookings, 0)}</p>
        </div>
        <div className="bg-white border border-border rounded-xl px-4 py-2.5 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Avg Duration</p>
          <p className="text-lg font-extrabold">3.2 malam</p>
        </div>
      </div>

      {/* Revenue Chart + Status Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Revenue Trend — 30 Hari</CardTitle>
              <Badge variant="secondary">IDR</Badge>
            </div>
            <CardDescription>Revenue harian dalam 30 hari terakhir</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="revGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E8733A" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#E8733A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEEEEF" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#77767C' }} tickLine={false} axisLine={false} interval={4} />
                <YAxis tick={{ fontSize: 10, fill: '#77767C' }} tickLine={false} axisLine={false} tickFormatter={v => `${(v/1000000).toFixed(1)}M`} width={38} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #DDDDDE', fontSize: 12 }} formatter={(v) => [formatIDR(Number(v)), 'Revenue']} />
                <Area type="monotone" dataKey="revenue" stroke="#E8733A" strokeWidth={2} fill="url(#revGrad2)" dot={false} activeDot={{ r: 4, fill: '#E8733A' }} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribusi Status</CardTitle>
            <CardDescription>Breakdown status booking</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                  {statusData.map((entry, i) => <Cell key={i} fill={entry.color} strokeWidth={0} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #DDDDDE', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {statusData.map(s => (
                <div key={s.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                  <span className="text-xs text-muted-foreground">{s.name}</span>
                  <span className="text-xs font-bold ml-auto">{s.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vehicle Revenue + Area Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Top Vehicles by Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue per Kendaraan</CardTitle>
            <CardDescription>Total revenue 6 kendaraan terbaik</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={vehicleRevenueData} layout="vertical" margin={{ top: 0, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEEEEF" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#77767C' }} tickLine={false} axisLine={false} tickFormatter={v => `${(v/1000000).toFixed(1)}M`} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#4A4A50' }} tickLine={false} axisLine={false} width={90} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #DDDDDE', fontSize: 12 }} formatter={(v) => [formatIDR(Number(v)), 'Revenue']} />
                <Bar dataKey="revenue" fill="#1B2B6B" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Area Table */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue per Area — Bali</CardTitle>
            <CardDescription>Distribusi geografis booking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              <div className="flex items-center gap-3 pb-2 border-b border-border text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                <span className="flex-1">Area</span>
                <span className="w-16 text-center">Booking</span>
                <span className="w-24 text-right">Revenue</span>
              </div>
              {areaData.map((row, i) => {
                const maxRev = Math.max(...areaData.map(r => r.revenue))
                const pct = (row.revenue / maxRev) * 100
                return (
                  <div key={row.area} className={`flex items-center gap-3 py-3 ${i < areaData.length - 1 ? 'border-b border-border' : ''}`}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold">{row.area}</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-accent rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <span className="w-16 text-center text-sm font-bold">{row.bookings}</span>
                    <span className="w-24 text-right text-sm font-bold">{formatIDR(row.revenue)}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
