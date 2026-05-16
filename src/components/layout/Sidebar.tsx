import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Car, CalendarDays, Users, MessageSquare,
  BarChart2, Settings, Bike, ChevronLeft, ChevronRight, Store,
  ClipboardList, Banknote,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { messageThreads, mitras, withdrawals } from '@/data/mock'

const totalUnread = messageThreads.reduce((s, t) => s + t.unreadCount, 0)
const pendingMitra = mitras.filter(m => m.status === 'pending').length
const pendingWithdrawals = withdrawals.filter(w => w.status === 'pending').length

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Overview' },
  { to: '/fleet', icon: Car, label: 'Fleet' },
  { to: '/bookings', icon: CalendarDays, label: 'Bookings' },
  { to: '/orders', icon: ClipboardList, label: 'History Order' },
  { to: '/mitra', icon: Store, label: 'Mitra', badge: pendingMitra },
  { to: '/withdrawals', icon: Banknote, label: 'Withdrawal', badge: pendingWithdrawals },
  { to: '/customers', icon: Users, label: 'Customers' },
  { to: '/messages', icon: MessageSquare, label: 'Messages', badge: totalUnread },
  { to: '/analytics', icon: BarChart2, label: 'Analytics' },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation()

  return (
    <aside
      className={cn(
        'flex flex-col h-full bg-sidebar text-sidebar-foreground transition-all duration-300 shrink-0 relative',
        collapsed ? 'w-16' : 'w-60'
      )}
    >
      {/* Logo */}
      <div className={cn(
        'flex items-center gap-3 px-4 py-5 border-b border-sidebar-border',
        collapsed && 'justify-center px-0'
      )}>
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent shrink-0">
          <Bike className="size-5 text-white" />
        </div>
        {!collapsed && (
          <div>
            <div className="text-sm font-extrabold tracking-tight leading-none">NusaDrive</div>
            <div className="text-[10px] text-sidebar-foreground/60 font-medium mt-0.5">Admin Dashboard</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label, badge }) => {
          const isActive = to === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(to)
          return (
            <NavLink key={to} to={to}>
              <div className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer relative',
                isActive
                  ? 'bg-sidebar-accent text-white'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-white',
                collapsed && 'justify-center px-0'
              )}>
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-accent rounded-r-full" />
                )}
                <Icon className="size-5 shrink-0" />
                {!collapsed && <span className="flex-1">{label}</span>}
                {!collapsed && badge && badge > 0 && (
                  <span className="flex items-center justify-center h-5 min-w-5 rounded-full bg-accent text-white text-[10px] font-bold px-1">
                    {badge}
                  </span>
                )}
                {collapsed && badge && badge > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent" />
                )}
              </div>
            </NavLink>
          )
        })}
      </nav>

      {/* Settings & collapse */}
      <div className="px-2 py-4 border-t border-sidebar-border space-y-0.5">
        <NavLink to="/settings">
          <div className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer',
            location.pathname.startsWith('/settings')
              ? 'bg-sidebar-accent text-white'
              : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-white',
            collapsed && 'justify-center px-0'
          )}>
            <Settings className="size-5 shrink-0" />
            {!collapsed && <span>Settings</span>}
          </div>
        </NavLink>
        <button
          onClick={onToggle}
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors w-full text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent/30 cursor-pointer',
            collapsed && 'justify-center px-0'
          )}
        >
          {collapsed ? <ChevronRight className="size-5" /> : (
            <>
              <ChevronLeft className="size-5" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}
