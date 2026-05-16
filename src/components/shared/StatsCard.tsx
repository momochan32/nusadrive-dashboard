import type { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  label: string
  value: string | number
  sub?: string
  icon: LucideIcon
  trend?: { value: number; label: string }
  accent?: boolean
}

export function StatsCard({ label, value, sub, icon: Icon, trend, accent }: StatsCardProps) {
  const positive = trend && trend.value >= 0

  return (
    <Card className={cn(accent && 'border-accent/30 bg-accent/5')}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              {label}
            </p>
            <p className="text-2xl font-extrabold text-foreground leading-none">{value}</p>
            {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
            {trend && (
              <div className={cn('flex items-center gap-1 mt-2 text-xs font-semibold', positive ? 'text-emerald-600' : 'text-red-600')}>
                <span>{positive ? '↑' : '↓'} {Math.abs(trend.value)}%</span>
                <span className="text-muted-foreground font-normal">{trend.label}</span>
              </div>
            )}
          </div>
          <div className={cn(
            'flex items-center justify-center w-11 h-11 rounded-xl shrink-0',
            accent ? 'bg-accent text-white' : 'bg-primary/10 text-primary'
          )}>
            <Icon className="size-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
