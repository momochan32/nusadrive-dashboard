import { useState } from 'react'
import { Search, CheckCircle2, XCircle, Clock, ArrowUpRight, Building2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { withdrawals as allWithdrawals } from '@/data/mock'
import { formatIDR, formatDate, cn } from '@/lib/utils'
import type { WithdrawalStatus } from '@/types'

function WithdrawalStatusBadge({ status }: { status: WithdrawalStatus }) {
  const config: Record<WithdrawalStatus, { label: string; className: string }> = {
    pending:    { label: 'Menunggu',   className: 'bg-amber-100 text-amber-700' },
    approved:   { label: 'Disetujui', className: 'bg-blue-100 text-blue-700' },
    processing: { label: 'Diproses',  className: 'bg-indigo-100 text-indigo-700' },
    transferred:{ label: 'Ditransfer',className: 'bg-emerald-100 text-emerald-700' },
    rejected:   { label: 'Ditolak',   className: 'bg-red-100 text-red-700' },
  }
  const { label, className } = config[status]
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold', className)}>
      {label}
    </span>
  )
}

function SummaryChip({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className="bg-white border border-border rounded-xl px-4 py-3 shadow-sm">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className={cn('text-lg font-extrabold mt-0.5', accent && 'text-accent')}>{value}</p>
      {sub && <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  )
}

type TabKey = 'all' | WithdrawalStatus
const allStatuses: WithdrawalStatus[] = ['pending', 'approved', 'processing', 'transferred', 'rejected']

export default function Withdrawals() {
  const [withdrawals, setWithdrawals] = useState(allWithdrawals)
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState<TabKey>('all')

  const filtered = withdrawals.filter(w => {
    const matchTab = tab === 'all' || w.status === tab
    const matchSearch =
      w.businessName.toLowerCase().includes(search.toLowerCase()) ||
      w.mitraName.toLowerCase().includes(search.toLowerCase()) ||
      w.period.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  const count = (s: TabKey) => s === 'all' ? withdrawals.length : withdrawals.filter(w => w.status === s).length
  const pendingCount = count('pending')
  const totalTransferred = withdrawals.filter(w => w.status === 'transferred').reduce((s, w) => s + w.netAmount, 0)
  const totalPending = withdrawals.filter(w => w.status === 'pending').reduce((s, w) => s + w.netAmount, 0)
  const totalCommission = withdrawals.filter(w => w.status === 'transferred').reduce((s, w) => s + w.commission, 0)

  function approveWithdrawal(id: string) {
    setWithdrawals(prev => prev.map(w => w.id === id
      ? { ...w, status: 'approved' as WithdrawalStatus, processedAt: new Date().toISOString() }
      : w
    ))
  }

  function rejectWithdrawal(id: string) {
    setWithdrawals(prev => prev.map(w => w.id === id
      ? { ...w, status: 'rejected' as WithdrawalStatus, processedAt: new Date().toISOString() }
      : w
    ))
  }

  function markTransferred(id: string) {
    setWithdrawals(prev => prev.map(w => w.id === id
      ? { ...w, status: 'transferred' as WithdrawalStatus, transferredAt: new Date().toISOString() }
      : w
    ))
  }

  return (
    <div className="space-y-5">
      {/* Pending Alert */}
      {pendingCount > 0 && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <Clock className="size-5 text-amber-500 shrink-0" />
          <p className="text-sm font-semibold text-amber-800 flex-1">
            {pendingCount} permintaan penarikan menunggu persetujuan — Total {formatIDR(totalPending)}
          </p>
          <button onClick={() => setTab('pending')} className="text-xs font-bold text-amber-700 cursor-pointer">
            Review →
          </button>
        </div>
      )}

      {/* Summary */}
      <div className="flex flex-wrap gap-3">
        <SummaryChip label="Total Ditransfer" value={formatIDR(totalTransferred)} sub="sepanjang waktu" accent />
        <SummaryChip label="Pending Penarikan" value={formatIDR(totalPending)} sub={`${pendingCount} permintaan`} />
        <SummaryChip label="Komisi Platform" value={formatIDR(totalCommission)} sub="dari yang ditransfer" />
        <SummaryChip label="Total Transaksi" value={String(withdrawals.length)} />
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Cari mitra atau periode..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={v => setTab(v as TabKey)}>
        <TabsList>
          <TabsTrigger value="all">Semua ({count('all')})</TabsTrigger>
          <TabsTrigger value="pending">
            Pending
            {count('pending') > 0 && (
              <span className="ml-1.5 flex items-center justify-center h-4 w-4 rounded-full bg-accent text-white text-[9px] font-bold">
                {count('pending')}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved">Disetujui ({count('approved')})</TabsTrigger>
          <TabsTrigger value="processing">Diproses ({count('processing')})</TabsTrigger>
          <TabsTrigger value="transferred">Ditransfer ({count('transferred')})</TabsTrigger>
          <TabsTrigger value="rejected">Ditolak ({count('rejected')})</TabsTrigger>
        </TabsList>

        {(['all', ...allStatuses] as TabKey[]).map(s => (
          <TabsContent key={s} value={s}>
            <Card className="overflow-hidden">
              {/* Table header */}
              <div className="hidden md:grid grid-cols-[1fr_140px_120px_120px_120px_40px] gap-4 py-2.5 px-5 bg-muted/50 border-b border-border text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                <div>Mitra</div>
                <div>Periode</div>
                <div className="text-right">Jumlah</div>
                <div className="text-right">Komisi (15%)</div>
                <div>Status</div>
                <div />
              </div>
              <CardContent className="p-0">
                {filtered.length > 0 ? filtered.map((w, i) => (
                  <div key={w.id} className={`flex flex-col md:grid md:grid-cols-[1fr_140px_120px_120px_120px_40px] gap-3 md:gap-4 items-start md:items-center py-4 px-5 ${i < filtered.length - 1 ? 'border-b border-border' : ''}`}>
                    {/* Mitra */}
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar className="h-9 w-9 shrink-0 rounded-xl">
                        <AvatarFallback className="rounded-xl text-xs font-bold">
                          {w.businessName.split(' ').map(x => x[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <Link to={`/mitra/${w.mitraId}`}>
                          <p className="text-sm font-semibold hover:text-accent transition-colors truncate">{w.businessName}</p>
                        </Link>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Building2 className="size-3 shrink-0" />
                          <span>{w.bankName} •• {w.bankAccount.slice(-4)}</span>
                          <span>·</span>
                          <span>{w.totalOrders} order</span>
                        </div>
                        {w.note && (
                          <p className="text-[10px] text-red-500 mt-0.5 truncate">{w.note}</p>
                        )}
                      </div>
                    </div>

                    {/* Period */}
                    <div>
                      <p className="text-sm font-medium">{w.period}</p>
                      <p className="text-[10px] text-muted-foreground">Req: {formatDate(w.requestedAt)}</p>
                    </div>

                    {/* Amount */}
                    <div className="text-right">
                      <p className="text-sm font-bold">{formatIDR(w.netAmount)}</p>
                      <p className="text-[10px] text-muted-foreground">Bruto: {formatIDR(w.amount)}</p>
                    </div>

                    {/* Commission */}
                    <div className="text-right">
                      <p className="text-sm font-semibold text-primary">{formatIDR(w.commission)}</p>
                    </div>

                    {/* Status + Actions */}
                    <div className="flex flex-col gap-2">
                      <WithdrawalStatusBadge status={w.status} />
                      {w.status === 'pending' && (
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => approveWithdrawal(w.id)}
                            className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer"
                          >
                            <CheckCircle2 className="size-3" /> Setuju
                          </button>
                          <span className="text-muted-foreground">·</span>
                          <button
                            onClick={() => rejectWithdrawal(w.id)}
                            className="flex items-center gap-1 text-[10px] font-bold text-red-500 hover:text-red-600 cursor-pointer"
                          >
                            <XCircle className="size-3" /> Tolak
                          </button>
                        </div>
                      )}
                      {w.status === 'approved' && (
                        <button
                          onClick={() => markTransferred(w.id)}
                          className="flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                        >
                          <ArrowUpRight className="size-3" /> Tandai Transfer
                        </button>
                      )}
                      {w.transferredAt && (
                        <p className="text-[10px] text-muted-foreground">Transfer: {formatDate(w.transferredAt)}</p>
                      )}
                    </div>

                    {/* Detail arrow */}
                    <div className="hidden md:flex justify-end">
                      <Link to={`/mitra/${w.mitraId}`}>
                        <ArrowUpRight className="size-4 text-muted-foreground hover:text-accent transition-colors" />
                      </Link>
                    </div>
                  </div>
                )) : (
                  <div className="flex flex-col items-center py-16 text-center">
                    <p className="text-sm font-semibold">Tidak ada data penarikan</p>
                    <p className="text-xs text-muted-foreground mt-1">Belum ada permintaan penarikan dengan status ini</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
