import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft, MapPin, Phone, Mail, Star, Car, TrendingUp,
  FileText, CreditCard, ShieldCheck, ShieldX, AlertTriangle,
  CheckCircle2, XCircle, Building2, Hash,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { MitraStatusBadge } from '@/components/shared/StatusBadge'
import { mitras, vehicles, trips } from '@/data/mock'
import { formatIDR, formatDate, cn } from '@/lib/utils'

export default function MitraDetail() {
  const { id } = useParams<{ id: string }>()
  const mitra = mitras.find(m => m.id === id)
  const [status, setStatus] = useState(mitra?.status)

  if (!mitra) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <p className="text-lg font-bold">Mitra tidak ditemukan</p>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/mitra"><ArrowLeft className="size-4 mr-2" /> Kembali</Link>
        </Button>
      </div>
    )
  }

  const mitraVehicles = vehicles.filter(v => v.mitraId === mitra.id)
  const mitraTrips = trips.filter(t => t.vehicle.mitraId === mitra.id)

  const isPending = status === 'pending'
  const isActive = status === 'active'
  const isSuspended = status === 'suspended'

  const docs = [
    { label: 'KTP Pemilik', value: mitra.documents.ktp, available: true },
    { label: 'NIB / SIUP', value: mitra.documents.businessLicense, available: !!mitra.documents.businessLicense },
    { label: 'NPWP', value: mitra.documents.npwp, available: !!mitra.documents.npwp },
  ]

  return (
    <div className="max-w-5xl space-y-5">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Button variant="outline" size="icon" asChild className="shrink-0">
          <Link to="/mitra"><ArrowLeft className="size-4" /></Link>
        </Button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-lg font-extrabold">{mitra.businessName}</h2>
            <MitraStatusBadge status={status ?? mitra.status} />
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Mendaftar {formatDate(mitra.appliedAt)}
            {mitra.approvedAt && ` · Disetujui ${formatDate(mitra.approvedAt)}`}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          {isPending && (
            <>
              <Button
                className="gap-2"
                onClick={() => setStatus('active')}
              >
                <CheckCircle2 className="size-4" /> Setujui
              </Button>
              <Button
                variant="outline"
                className="gap-2 text-destructive border-destructive/30 hover:bg-destructive/5"
                onClick={() => setStatus('rejected')}
              >
                <XCircle className="size-4" /> Tolak
              </Button>
            </>
          )}
          {isActive && (
            <Button
              variant="outline"
              className="gap-2 text-destructive border-destructive/30 hover:bg-destructive/5"
              onClick={() => setStatus('suspended')}
            >
              <ShieldX className="size-4" /> Tangguhkan
            </Button>
          )}
          {isSuspended && (
            <Button className="gap-2" onClick={() => setStatus('active')}>
              <ShieldCheck className="size-4" /> Aktifkan Kembali
            </Button>
          )}
        </div>
      </div>

      {/* Pending Notice */}
      {isPending && (
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <AlertTriangle className="size-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-800">Aplikasi menunggu persetujuan admin</p>
            <p className="text-xs text-amber-600 mt-0.5">
              Periksa kelengkapan dokumen dan data bisnis sebelum menyetujui. Setelah disetujui, mitra dapat menambahkan armada dan menerima booking.
            </p>
          </div>
        </div>
      )}

      {isSuspended && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <ShieldX className="size-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-800">Akun mitra sedang ditangguhkan</p>
            <p className="text-xs text-red-600 mt-0.5">Mitra tidak dapat menerima booking baru selama ditangguhkan.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Profile + Documents */}
        <div className="space-y-5">
          {/* Profile Card */}
          <Card>
            <CardContent className="p-5">
              <div className="flex flex-col items-center text-center mb-4">
                <Avatar className="h-16 w-16 rounded-2xl mb-3">
                  <AvatarImage src={mitra.avatarUrl} />
                  <AvatarFallback className="rounded-2xl text-lg font-bold">
                    {mitra.businessName.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-base font-bold">{mitra.businessName}</h3>
                <p className="text-sm text-muted-foreground">{mitra.ownerName}</p>
                {mitra.rating > 0 && (
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="size-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-bold">{mitra.rating}</span>
                    <span className="text-xs text-muted-foreground">rating</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed text-center mb-4">
                {mitra.description}
              </p>
              <Separator className="mb-4" />
              <div className="space-y-2.5">
                {[
                  { icon: MapPin, label: mitra.address },
                  { icon: Phone, label: mitra.phone },
                  { icon: Mail, label: mitra.email },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <Icon className="size-3.5 shrink-0 mt-0.5" />
                    <span className="break-all">{label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <FileText className="size-4" /> Dokumen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {docs.map(doc => (
                <div key={doc.label} className="flex items-center gap-2.5">
                  <div className={cn(
                    'flex items-center justify-center w-7 h-7 rounded-lg shrink-0',
                    doc.available ? 'bg-emerald-50 text-emerald-600' : 'bg-muted text-muted-foreground'
                  )}>
                    {doc.available ? <CheckCircle2 className="size-4" /> : <XCircle className="size-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold">{doc.label}</p>
                    {doc.available && doc.value && (
                      <p className="text-[10px] text-muted-foreground font-mono truncate">{doc.value}</p>
                    )}
                    {!doc.available && (
                      <p className="text-[10px] text-muted-foreground">Belum diunggah</p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Bank Account */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="size-4" /> Rekening Bank
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { icon: Building2, label: 'Bank', value: mitra.bankName },
                { icon: Hash, label: 'No. Rekening', value: mitra.bankAccount },
                { icon: FileText, label: 'Atas Nama', value: mitra.bankHolder },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-2.5 text-xs">
                  <Icon className="size-3.5 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">{label}:</span>
                  <span className="font-semibold ml-auto">{value}</span>
                </div>
              ))}
              <div className="flex items-center gap-2.5 text-xs pt-2 border-t border-border">
                <TrendingUp className="size-3.5 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">Komisi platform:</span>
                <span className="font-bold text-accent ml-auto">{mitra.commissionRate}%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Stats + Tabs */}
        <div className="lg:col-span-2 space-y-5">
          {/* Stats */}
          {isActive && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Total Armada', value: mitra.totalVehicles, icon: Car, sub: `${mitra.activeVehicles} aktif` },
                { label: 'Total Booking', value: mitra.totalBookings, icon: TrendingUp },
                { label: 'Total Revenue', value: formatIDR(mitra.totalRevenue), icon: CreditCard, small: true },
                { label: 'Rating', value: mitra.rating || '–', icon: Star },
              ].map(s => (
                <div key={s.label} className="bg-white border border-border rounded-xl p-4 shadow-sm">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{s.label}</p>
                  <p className={cn('font-extrabold mt-1', s.small ? 'text-base' : 'text-xl')}>{s.value}</p>
                  {s.sub && <p className="text-[10px] text-muted-foreground mt-0.5">{s.sub}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Tabs: Armada / Booking History */}
          <Card>
            <Tabs defaultValue="vehicles">
              <div className="px-5 pt-5">
                <TabsList>
                  <TabsTrigger value="vehicles">Armada ({mitraVehicles.length || mitra.totalVehicles})</TabsTrigger>
                  <TabsTrigger value="history">Riwayat Booking ({mitraTrips.length})</TabsTrigger>
                  <TabsTrigger value="info">Info Pendaftaran</TabsTrigger>
                </TabsList>
              </div>

              {/* Armada Tab */}
              <TabsContent value="vehicles">
                <CardContent className="pt-4">
                  {mitraVehicles.length > 0 ? (
                    <div className="space-y-3">
                      {mitraVehicles.map(v => (
                        <div key={v.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                          <img src={v.imageUrl} alt={v.name} className="w-14 h-11 object-cover rounded-lg border border-border shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate">{v.name}</p>
                            <p className="text-xs text-muted-foreground">{v.year} · {v.engineCc} · {v.transmission}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm font-bold">{formatIDR(v.pricePerDay)}<span className="text-xs text-muted-foreground font-normal">/hr</span></p>
                            <div className="flex items-center gap-1 justify-end mt-0.5">
                              <Star className="size-3 fill-amber-400 text-amber-400" />
                              <span className="text-xs">{v.rating}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center py-12 text-center">
                      <Car className="size-10 text-muted-foreground/40 mb-3" />
                      <p className="text-sm font-semibold">Belum ada armada</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {isPending
                          ? 'Mitra dapat menambahkan armada setelah disetujui'
                          : 'Mitra belum menambahkan kendaraan'}
                      </p>
                    </div>
                  )}
                </CardContent>
              </TabsContent>

              {/* Booking History Tab */}
              <TabsContent value="history">
                <CardContent className="pt-4">
                  {mitraTrips.length > 0 ? (
                    <div className="space-y-3">
                      {mitraTrips.map(t => (
                        <Link key={t.id} to={`/bookings/${t.id}`}>
                          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="text-xs font-bold text-accent">{t.bookingCode}</p>
                                <p className="text-xs text-muted-foreground truncate">· {t.customer.name}</p>
                              </div>
                              <p className="text-xs text-muted-foreground">{t.vehicle.name}</p>
                            </div>
                            <p className="text-sm font-bold shrink-0">{formatIDR(t.totalPrice)}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center py-12 text-center">
                      <TrendingUp className="size-10 text-muted-foreground/40 mb-3" />
                      <p className="text-sm font-semibold">Belum ada riwayat booking</p>
                    </div>
                  )}
                </CardContent>
              </TabsContent>

              {/* Info Tab */}
              <TabsContent value="info">
                <CardContent className="pt-4 space-y-3">
                  {[
                    { label: 'Nama Bisnis', value: mitra.businessName },
                    { label: 'Pemilik', value: mitra.ownerName },
                    { label: 'Email', value: mitra.email },
                    { label: 'Telepon', value: mitra.phone },
                    { label: 'Lokasi', value: mitra.location },
                    { label: 'Alamat Lengkap', value: mitra.address },
                    { label: 'Tanggal Daftar', value: formatDate(mitra.appliedAt) },
                    { label: 'Tanggal Disetujui', value: mitra.approvedAt ? formatDate(mitra.approvedAt) : '–' },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between gap-4 py-2 border-b border-border last:border-0">
                      <span className="text-xs text-muted-foreground shrink-0">{row.label}</span>
                      <span className="text-xs font-semibold text-right">{row.value}</span>
                    </div>
                  ))}
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  )
}
