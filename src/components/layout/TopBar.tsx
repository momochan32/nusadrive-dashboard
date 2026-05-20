import { useLocation } from 'react-router-dom'
import { Bell, User, Menu } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const titles: Record<string, string> = {
  '/': 'Overview',
  '/fleet': 'Fleet Management',
  '/bookings': 'Bookings',
  '/orders': 'History Order',
  '/mitra': 'Manajemen Mitra',
  '/withdrawals': 'History Withdrawal',
  '/customers': 'Customers',
  '/messages': 'Messages',
  '/analytics': 'Analytics',
  '/settings': 'Settings',
}

interface TopBarProps {
  onOpenMenu: () => void
}

export function TopBar({ onOpenMenu }: TopBarProps) {
  const location = useLocation()
  const base = '/' + (location.pathname.split('/')[1] ?? '')
  const title = location.pathname.startsWith('/bookings/')
    ? 'Booking Detail'
    : location.pathname.startsWith('/mitra/') && location.pathname.length > '/mitra/'.length
      ? 'Detail Mitra'
      : titles[base] ?? 'Dashboard'

  return (
    <header className="flex items-center justify-between h-14 px-3 sm:px-5 md:px-6 bg-white border-b border-border shrink-0 gap-2">
      <div className="flex items-center gap-2 min-w-0">
        <button
          onClick={onOpenMenu}
          className="md:hidden p-2 -ml-1 rounded-lg text-foreground hover:bg-muted active:bg-muted/70 cursor-pointer"
          aria-label="Buka menu"
        >
          <Menu className="size-5" />
        </button>
        <h1 className="text-sm sm:text-base font-bold text-foreground tracking-tight truncate">{title}</h1>
      </div>
      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Bell className="size-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent" />
        </Button>
        <div className="flex items-center gap-2.5 ml-1 sm:ml-2 pl-2 border-l border-border">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">AD</AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <div className="text-xs font-semibold text-foreground leading-none">Admin</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">admin@nusadrive.id</div>
          </div>
          <User className="size-4 text-muted-foreground sm:hidden" />
        </div>
      </div>
    </header>
  )
}
