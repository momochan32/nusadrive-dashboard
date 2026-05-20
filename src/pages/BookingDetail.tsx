import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft, MapPin, Clock, Calendar, Shield, Star,
  CreditCard, User, Phone, Mail,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { TripStatusBadge, VerificationBadge } from '@/components/shared/StatusBadge'
import { trips } from '@/data/mock'
import { formatIDR, formatDate, daysBetween } from '@/lib/utils'

const paymentLabels: Record<string, string> = {
  visa: 'Visa •••• 4242', mastercard: 'Mastercard •••• 1234',
  gopay: 'GoPay', ovo: 'OVO', bank_transfer: 'Bank Transfer',
}

export default function BookingDetail() {
  const { id } = useParams<{ id: string }>()
  const trip = trips.find(t => t.id === id)

  if (!trip) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <p className="text-lg font-bold">Booking tidak ditemukan</p>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/bookings"><ArrowLeft className="size-4 mr-2" /> Kembali</Link>
        </Button>
      </div>
    )
  }

  const nights = daysBetween(trip.start, trip.end)

  return (
    <div className="max-w-4xl space-y-5">
      {/* Header */}
      <div className="flex items-start gap-3 flex-wrap">
        <Button variant="outline" size="icon" asChild className="shrink-0">
          <Link to="/bookings"><ArrowLeft className="size-4" /></Link>
        </Button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-base sm:text-lg font-extrabold">{trip.bookingCode}</h2>
            <TripStatusBadge status={trip.status} />
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">Dibuat {formatDate(trip.createdAt)}</p>
        </div>
        {trip.status === 'upcoming' && (
          <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/5 w-full sm:w-auto">
            Batalkan Booking
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Vehicle Card */}
          <Card className="overflow-hidden">
            <div className="relative">
              <img src={trip.vehicle.imageUrl} alt={trip.vehicle.name} className="w-full h-48 object-cover" />
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div className="bg-white/95 rounded-xl px-3 py-2 shadow">
                  <p className="text-sm font-extrabold">{trip.vehicle.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="size-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-semibold">{trip.vehicle.rating}</span>
                    <span className="text-xs text-muted-foreground">({trip.vehicle.reviewCount} ulasan)</span>
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-4 sm:p-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-center">
                {[
                  { label: 'Transmisi', value: trip.vehicle.transmission },
                  { label: 'Engine', value: trip.vehicle.engineCc },
                  { label: 'Tahun', value: trip.vehicle.year },
                  { label: 'Keyless', value: trip.vehicle.isKeyless ? 'Yes' : 'No' },
                ].map(s => (
                  <div key={s.label} className="bg-muted rounded-lg py-2.5 px-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</p>
                    <p className="text-sm font-bold mt-0.5">{s.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rental Details */}
          <Card>
            <CardHeader><CardTitle>Detail Rental</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <Calendar className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Durasi</p>
                    <p className="text-sm font-bold mt-0.5">{formatDate(trip.start)} – {formatDate(trip.end)}</p>
                    <p className="text-xs text-muted-foreground">{nights} malam</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <MapPin className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Lokasi Pickup</p>
                    <p className="text-sm font-bold mt-0.5">{trip.pickupAddress}</p>
                    <p className="text-xs text-muted-foreground">{trip.pickupArea}</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <Clock className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Waktu</p>
                    <p className="text-sm font-bold mt-0.5">Delivery {trip.deliveryTime}</p>
                    <p className="text-xs text-muted-foreground">Pickup {trip.pickupTime}</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <Shield className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Proteksi</p>
                    <p className="text-sm font-bold mt-0.5">{trip.hasProtection ? 'Ride Protection' : 'Tanpa proteksi'}</p>
                    {trip.addons.length > 0 && <p className="text-xs text-muted-foreground">{trip.addons.join(', ')}</p>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Customer Card */}
          <Card>
            <CardHeader><CardTitle>Pelanggan</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11">
                  <AvatarImage src={trip.customer.avatarUrl} />
                  <AvatarFallback>{trip.customer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">{trip.customer.name}</p>
                  <VerificationBadge status={trip.customer.verificationStatus} />
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                {[
                  { icon: User, label: trip.customer.nationality },
                  { icon: Mail, label: trip.customer.email },
                  { icon: Phone, label: trip.customer.phone },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2.5 text-xs text-muted-foreground">
                    <Icon className="size-3.5 shrink-0" />
                    <span className="truncate">{label}</span>
                  </div>
                ))}
              </div>
              <div className="bg-muted rounded-lg p-3 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Total trips</span>
                <span className="text-sm font-bold">{trip.customer.totalTrips}</span>
              </div>
            </CardContent>
          </Card>

          {/* Price Breakdown */}
          <Card>
            <CardHeader><CardTitle>Rincian Harga</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{trip.vehicle.name} × {nights} malam</span>
                  <span className="font-medium">{formatIDR(trip.subtotal)}</span>
                </div>
                {trip.protectionPrice > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ride Protection</span>
                    <span className="font-medium">{formatIDR(trip.protectionPrice)}</span>
                  </div>
                )}
                {trip.addonsPrice > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Add-ons</span>
                    <span className="font-medium">{formatIDR(trip.addonsPrice)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Platform fee</span>
                  <span className="font-medium">{formatIDR(trip.platformFee)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-extrabold text-base">
                  <span>Total</span>
                  <span className="text-accent">{formatIDR(trip.totalPrice)}</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-border flex items-center gap-2 text-xs text-muted-foreground">
                <CreditCard className="size-4" />
                <span>{paymentLabels[trip.paymentMethod] ?? trip.paymentMethod}</span>
                <Badge variant="success" className="ml-auto">Dibayar</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
