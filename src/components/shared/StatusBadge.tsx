import { Badge } from '@/components/ui/badge'
import type { TripStatus, VehicleStatus, VerificationStatus, MitraStatus } from '@/types'

export function TripStatusBadge({ status }: { status: TripStatus }) {
  const config: Record<TripStatus, { label: string; variant: 'accent' | 'default' | 'success' | 'muted' }> = {
    active: { label: 'Active Now', variant: 'accent' },
    upcoming: { label: 'Upcoming', variant: 'default' },
    completed: { label: 'Completed', variant: 'success' },
    cancelled: { label: 'Cancelled', variant: 'muted' },
  }
  const { label, variant } = config[status]
  return <Badge variant={variant}>{label}</Badge>
}

export function VehicleStatusBadge({ status }: { status: VehicleStatus }) {
  const config: Record<VehicleStatus, { label: string; variant: 'success' | 'accent' | 'warning' }> = {
    available: { label: 'Available', variant: 'success' },
    rented: { label: 'Rented', variant: 'accent' },
    maintenance: { label: 'Maintenance', variant: 'warning' },
  }
  const { label, variant } = config[status]
  return <Badge variant={variant}>{label}</Badge>
}

export function VerificationBadge({ status }: { status: VerificationStatus }) {
  const config: Record<VerificationStatus, { label: string; variant: 'success' | 'warning' | 'muted' }> = {
    verified: { label: 'Verified', variant: 'success' },
    pending: { label: 'Pending', variant: 'warning' },
    unverified: { label: 'Unverified', variant: 'muted' },
  }
  const { label, variant } = config[status]
  return <Badge variant={variant}>{label}</Badge>
}

export function MitraStatusBadge({ status }: { status: MitraStatus }) {
  const config: Record<MitraStatus, { label: string; variant: 'success' | 'warning' | 'muted' | 'destructive' }> = {
    active: { label: 'Aktif', variant: 'success' },
    pending: { label: 'Menunggu Review', variant: 'warning' },
    suspended: { label: 'Ditangguhkan', variant: 'destructive' },
    rejected: { label: 'Ditolak', variant: 'muted' },
  }
  const { label, variant } = config[status]
  return <Badge variant={variant}>{label}</Badge>
}
