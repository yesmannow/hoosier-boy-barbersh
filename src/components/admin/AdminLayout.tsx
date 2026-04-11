import { ReactNode } from 'react'
import { User, SquaresFour, Calendar, Users, Scissors, Clock, Gear, ChartBar, Eye, Robot } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import logo from '@/assets/images/Hoosierboy_Barbershop_logo_1.png'
import { UserRole } from '@/lib/types'

interface AdminLayoutProps {
  children: ReactNode
  currentView: string
  onViewChange: (view: string) => void
  userRole: 'owner' | 'barber'
  barberName?: string
}

const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: SquaresFour, roles: ['owner', 'barber'] },
  { id: 'schedule', label: 'Daily Schedule', icon: Calendar, roles: ['owner', 'barber'] },
  { id: 'week', label: 'Week View', icon: Calendar, roles: ['owner', 'barber'] },
  { id: 'clients', label: 'Clients', icon: Users, roles: ['owner', 'barber'] },
  { id: 'barbers', label: 'Barbers', icon: Scissors, roles: ['owner'] },
  { id: 'services', label: 'Services', icon: Scissors, roles: ['owner'] },
  { id: 'availability', label: 'Availability', icon: Clock, roles: ['owner', 'barber'] },
  { id: 'analytics', label: 'Analytics', icon: ChartBar, roles: ['owner'] },
  { id: 'automation', label: 'Automation & AI', icon: Robot, roles: ['owner'] },
  { id: 'shop-profile', label: 'Shop Profile', icon: Eye, roles: ['owner'] },
  { id: 'settings', label: 'Settings', icon: Gear, roles: ['owner'] }
]

export function AdminLayout({ children, currentView, onViewChange, userRole, barberName }: AdminLayoutProps) {
  const allowedNav = navigation.filter(item => item.roles.includes(userRole))

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <aside className="w-56 bg-card border-r border-border flex flex-col flex-shrink-0">
        <div className="p-5 border-b border-border">
          <img src={logo} alt="Hoosier Boy Barbershop" className="h-10 w-auto mx-auto" />
          {barberName && (
            <div className="mt-3 text-center">
              <p className="text-xs text-muted-foreground">Logged in as</p>
              <p className="text-xs font-semibold text-primary">{barberName}</p>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {allowedNav.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                  currentView === item.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-foreground hover:bg-secondary'
                )}
              >
                <Icon size={18} weight={currentView === item.id ? 'fill' : 'regular'} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <User size={14} />
            <span>{userRole === 'owner' ? 'Admin' : 'Barber'} Account</span>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
