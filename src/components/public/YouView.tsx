import { useKV } from '@github/spark/hooks'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import type { Appointment, CustomerProfile } from '@/lib/types'
import { adminServices as services, barberProfiles, contactInfo } from '@/lib/adminData'
import { 
  CalendarPlus, 
  Phone, 
  MapPin, 
  Clock,
  Heart,
  ClockCounterClockwise,
  User
} from '@phosphor-icons/react'

interface YouViewProps {
  onNavigate: (view: 'home' | 'book' | 'barbers' | 'shop' | 'you') => void
}

export function YouView({ onNavigate }: YouViewProps) {
  const [appointments] = useKV<Appointment[]>('appointments', [])
  const [customerProfile] = useKV<CustomerProfile>('customer-profile', {
    name: '',
    phone: '',
    email: ''
  })
  const [favoriteBarber, setFavoriteBarber] = useKV<string | null>('favorite-barber', null)

  const upcomingAppointments = appointments
    ?.filter(apt => {
      const aptDate = new Date(apt.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return aptDate >= today && apt.status === 'confirmed'
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) || []

  const pastAppointments = appointments
    ?.filter(apt => apt.status === 'completed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) || []

  const lastBooking = customerProfile?.lastBooking
  const favoriteBarberProfile = barberProfiles.find(b => b.id === favoriteBarber)

  const quickActions = [
    {
      icon: <CalendarPlus size={24} />,
      label: 'Book Again',
      description: lastBooking ? 'Repeat your last service' : 'Book a new appointment',
      action: () => onNavigate('book'),
      variant: 'default' as const
    },
    {
      icon: <Phone size={24} />,
      label: 'Call Shop',
      description: 'Speak with our team',
      action: () => window.location.href = `tel:${contactInfo.phone}`,
      variant: 'outline' as const
    },
    {
      icon: <MapPin size={24} />,
      label: 'Get Directions',
      description: 'Navigate to the shop',
      action: () => window.open(contactInfo.mapLink, '_blank'),
      variant: 'outline' as const
    },
    {
      icon: <Clock size={24} />,
      label: 'View Hours',
      description: 'Check our schedule',
      action: () => onNavigate('shop'),
      variant: 'outline' as const
    }
  ]

  const getServiceName = (serviceId: string) => {
    return services.find(s => s.id === serviceId)?.name || 'Service'
  }

  const getBarberName = (barberId: string) => {
    return barberProfiles.find(b => b.id === barberId)?.name || 'Any Barber'
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="font-bold text-2xl">Your Profile</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Quick access to your bookings and preferences
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {customerProfile?.name && (
          <Card className="p-5">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <User size={28} className="text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-lg mb-1">{customerProfile.name}</h2>
                {customerProfile.phone && (
                  <p className="text-sm text-muted-foreground">{customerProfile.phone}</p>
                )}
                {customerProfile.email && (
                  <p className="text-sm text-muted-foreground">{customerProfile.email}</p>
                )}
              </div>
            </div>
          </Card>
        )}

        <div>
          <h2 className="font-semibold mb-3 px-1">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, idx) => (
              <Card
                key={idx}
                className="p-4 cursor-pointer hover:border-primary/50 transition-colors"
                onClick={action.action}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    {action.icon}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{action.label}</p>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {favoriteBarber && favoriteBarberProfile && (
          <Card className="p-5 border-primary/30">
            <div className="flex items-center gap-2 mb-3">
              <Heart size={18} weight="fill" className="text-primary" />
              <h3 className="font-semibold">Favorite Barber</h3>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-bold text-primary">
                    {favoriteBarberProfile.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{favoriteBarberProfile.name}</p>
                  <p className="text-sm text-muted-foreground">{favoriteBarberProfile.specialty}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFavoriteBarber(null)}
              >
                Remove
              </Button>
            </div>
          </Card>
        )}

        {!favoriteBarber && barberProfiles.length > 0 && (
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Heart size={18} className="text-muted-foreground" />
              <h3 className="font-semibold">Set Favorite Barber</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Choose your preferred barber for faster booking
            </p>
            <div className="space-y-2">
              {barberProfiles.map((barber) => (
                <Button
                  key={barber.id}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setFavoriteBarber(barber.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">
                        {barber.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span>{barber.name}</span>
                  </div>
                </Button>
              ))}
            </div>
          </Card>
        )}

        {upcomingAppointments.length > 0 && (
          <div>
            <h2 className="font-semibold mb-3 px-1">Upcoming Appointments</h2>
            <div className="space-y-3">
              {upcomingAppointments.map((apt) => (
                <Card key={apt.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold">{getServiceName(apt.serviceId)}</p>
                      <p className="text-sm text-muted-foreground">{getBarberName(apt.barberId)}</p>
                    </div>
                    <Badge variant="default">Confirmed</Badge>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-muted-foreground" />
                      <span>{apt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarPlus size={16} className="text-muted-foreground" />
                      <span>{formatDate(apt.date)}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {pastAppointments.length > 0 && (
          <div>
            <h2 className="font-semibold mb-3 px-1 flex items-center gap-2">
              <ClockCounterClockwise size={20} />
              Recent History
            </h2>
            <div className="space-y-2">
              {pastAppointments.slice(0, 5).map((apt) => (
                <Card key={apt.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm">{getServiceName(apt.serviceId)}</p>
                      <p className="text-xs text-muted-foreground">{getBarberName(apt.barberId)}</p>
                      <p className="text-xs text-muted-foreground mt-1">{formatDate(apt.date)}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onNavigate('book')}
                    >
                      Book Again
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {!customerProfile?.name && upcomingAppointments.length === 0 && (
          <Card className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <CalendarPlus size={32} className="text-primary" />
            </div>
            <h3 className="font-semibold mb-2">No Bookings Yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Ready to book your first appointment?
            </p>
            <Button onClick={() => onNavigate('book')}>
              Book Now
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}
