import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CalendarPlus, Users, Clock, CurrencyDollar, TrendUp, XCircle, CheckCircle, Eye, CalendarBlank, Robot, Lightning } from '@phosphor-icons/react'
import { getTodayMetrics, barberProfiles, appointments, shopProfile } from '@/lib/adminData'
import { format } from 'date-fns'
import heroImage from '@/assets/images/20230518_134642-1024x768.jpg'

interface DashboardProps {
  userRole: 'owner' | 'barber'
  barberId?: string
  onViewChange: (view: string) => void
}

export function Dashboard({ userRole, barberId, onViewChange }: DashboardProps) {
  const metrics = getTodayMetrics()
  const today = format(new Date(), 'EEEE, MMMM d, yyyy')
  
  const barber = barberId ? barberProfiles.find(b => b.id === barberId) : null
  const todayAppts = barberId 
    ? appointments.filter(a => a.barberId === barberId && a.date === new Date().toISOString().split('T')[0])
    : appointments.filter(a => a.date === new Date().toISOString().split('T')[0])

  const quickActions = [
    { label: 'Add Appointment', icon: CalendarPlus, action: () => onViewChange('schedule') },
    { label: 'View Schedule', icon: Clock, action: () => onViewChange('schedule') },
    { label: 'Client Records', icon: Users, action: () => onViewChange('clients') },
    { label: 'Shop Profile', icon: Eye, action: () => onViewChange('shop-profile'), owner: true },
    { label: 'Automation & AI', icon: Robot, action: () => onViewChange('automation'), owner: true }
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-card border border-border">
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative p-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {barber ? `Welcome, ${barber.name}` : 'Command Center'}
              </h1>
              <p className="text-muted-foreground">{today}</p>
            </div>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              {userRole === 'owner' ? 'Admin' : 'Barber'}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Today's Appointments</span>
            <CalendarBlank size={20} className="text-primary" />
          </div>
          <div className="text-3xl font-bold text-foreground">{metrics.todayAppointments}</div>
          <p className="text-xs text-muted-foreground mt-1">{metrics.upcomingAppointments} upcoming</p>
        </Card>

        <Card className="p-6 border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Completed</span>
            <CheckCircle size={20} className="text-green-500" />
          </div>
          <div className="text-3xl font-bold text-foreground">{metrics.appointmentsCompleted}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {Math.round((metrics.appointmentsCompleted / metrics.todayAppointments) * 100)}% complete
          </p>
        </Card>

        <Card className="p-6 border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Expected Revenue</span>
            <CurrencyDollar size={20} className="text-primary" />
          </div>
          <div className="text-3xl font-bold text-foreground">${metrics.expectedRevenue}</div>
          <p className="text-xs text-muted-foreground mt-1">Today's total</p>
        </Card>

        <Card className="p-6 border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Issues</span>
            <XCircle size={20} className="text-destructive" />
          </div>
          <div className="text-3xl font-bold text-foreground">{metrics.noShows + metrics.cancellations}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {metrics.noShows} no-shows, {metrics.cancellations} cancelled
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {quickActions
              .filter(action => !action.owner || userRole === 'owner')
              .map((action, i) => {
                const Icon = action.icon
                return (
                  <Button
                    key={i}
                    variant="outline"
                    className="h-auto py-4 flex flex-col gap-2"
                    onClick={action.action}
                  >
                    <Icon size={24} />
                    <span className="text-sm">{action.label}</span>
                  </Button>
                )
              })}
          </div>
        </Card>

        <Card className="p-6 border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Today's Status</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Slots</span>
              <span className="font-semibold text-foreground">{metrics.todayAppointments}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Available Gaps</span>
              <span className="font-semibold text-primary">{metrics.availableGaps}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Confirmed</span>
              <span className="font-semibold text-foreground">
                {todayAppts.filter(a => a.status === 'confirmed').length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">In Service</span>
              <span className="font-semibold text-primary">
                {todayAppts.filter(a => a.status === 'in-service').length}
              </span>
            </div>
          </div>
          <Button className="w-full mt-4" onClick={() => onViewChange('schedule')}>
            View Full Schedule
          </Button>
        </Card>
      </div>

      {userRole === 'owner' && (
        <Card className="p-6 border-border">
          <div className="flex items-center gap-2 mb-4">
            <TrendUp size={24} className="text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Weekly Overview</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Projected Weekly Revenue</p>
              <p className="text-2xl font-bold text-foreground">${metrics.weeklyRevenue}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Average Per Day</p>
              <p className="text-2xl font-bold text-foreground">${Math.round(metrics.weeklyRevenue / 4)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Appointments/Week</p>
              <p className="text-2xl font-bold text-foreground">{metrics.todayAppointments * 4}</p>
            </div>
          </div>
        </Card>
      )}

      {userRole === 'owner' && (
        <Card className="p-5 border-border bg-primary/5 border-primary/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Robot size={22} className="text-primary" />
              <div>
                <h3 className="font-semibold text-foreground text-sm">AI Insights Available</h3>
                <p className="text-xs text-muted-foreground">3 clients at risk · Upsell opportunity detected · Wednesday morning gaps</p>
              </div>
            </div>
            <Button size="sm" className="gap-1.5" onClick={() => onViewChange('automation')}>
              <Lightning size={14} />
              View Automation Hub
            </Button>
          </div>
        </Card>
      )}

      <Card className="p-6 border-border">
        <h2 className="text-xl font-semibold text-foreground mb-4">Shop Quick Info</h2>
        <div className="flex gap-6 items-start">
          <img 
            src={shopProfile.heroImage} 
            alt={shopProfile.name}
            className="w-32 h-32 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground mb-1">{shopProfile.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">{shopProfile.tagline}</p>
            <div className="flex flex-wrap gap-2">
              {shopProfile.trustBullets.map((bullet, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {bullet}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
