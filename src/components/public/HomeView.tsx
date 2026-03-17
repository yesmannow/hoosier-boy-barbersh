import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { shopProfile, barberProfiles, reviewHighlights, galleryItems, contactInfo } from '@/lib/adminData'
import { 
  Phone, 
  MapPin, 
  Clock, 
  CalendarPlus, 
  Star,
  ArrowRight 
} from '@phosphor-icons/react'

interface HomeViewProps {
  onNavigate: (view: 'home' | 'book' | 'barbers' | 'shop' | 'you') => void
}

export function HomeView({ onNavigate }: HomeViewProps) {
  const heroImage = galleryItems.find(g => g.featured && g.sortOrder === 1)
  const todayDay = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][new Date().getDay()] as keyof typeof contactInfo.hours
  const todayHours = contactInfo.hours[todayDay]

  const quickActions = [
    { 
      icon: <CalendarPlus size={20} />, 
      label: 'Book Now', 
      action: () => onNavigate('book'),
      variant: 'default' as const
    },
    { 
      icon: <Phone size={20} />, 
      label: 'Call', 
      action: () => window.location.href = `tel:${contactInfo.phone}`,
      variant: 'outline' as const
    },
    { 
      icon: <MapPin size={20} />, 
      label: 'Directions', 
      action: () => window.open(contactInfo.mapLink, '_blank'),
      variant: 'outline' as const
    },
    { 
      icon: <Clock size={20} />, 
      label: 'Hours', 
      action: () => onNavigate('shop'),
      variant: 'outline' as const
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background z-10" />
        <img
          src={heroImage?.imagePath}
          alt={heroImage?.altText}
          className="w-full h-[400px] object-cover"
        />
        
        <div className="absolute inset-x-0 top-0 z-20 pt-8 pb-12 px-4">
          <div className="max-w-lg mx-auto space-y-6">
            <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
              <img
                src={shopProfile.logoImage}
                alt={shopProfile.name}
                className="h-16 w-auto mx-auto mb-4"
              />
              <h1 className="text-2xl font-bold text-center text-foreground mb-2">
                {shopProfile.name}
              </h1>
              <p className="text-center text-muted-foreground mb-4">
                {shopProfile.tagline}
              </p>
              
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <Star size={16} weight="fill" className="text-primary" />
                  <span className="font-semibold">{reviewHighlights.rating.toFixed(1)}</span>
                </div>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground text-sm">
                  {reviewHighlights.reviewCount}+ reviews
                </span>
              </div>

              <Button 
                size="lg" 
                className="w-full font-semibold"
                onClick={() => onNavigate('book')}
              >
                <CalendarPlus size={20} className="mr-2" />
                Book Appointment
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {quickActions.map((action, idx) => (
                <Button
                  key={idx}
                  variant={action.variant}
                  size="sm"
                  className="flex flex-col items-center gap-1 h-auto py-3 px-2"
                  onClick={action.action}
                >
                  {action.icon}
                  <span className="text-xs">{action.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <Card className="p-5 border-primary/20">
          <h2 className="font-semibold text-lg mb-3">About Us</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            {shopProfile.about}
          </p>
          <div className="space-y-2">
            {shopProfile.trustBullets.map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                <span className="text-muted-foreground">{bullet}</span>
              </div>
            ))}
          </div>
        </Card>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Meet Your Barbers</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigate('barbers')}
            >
              View All <ArrowRight size={16} className="ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {barberProfiles.map((barber) => (
              <Card 
                key={barber.id} 
                className="p-4 cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => onNavigate('barbers')}
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-primary">
                      {barber.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold">{barber.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {barber.specialty}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {barber.publicSpecialties.slice(0, 3).map((spec, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-muted-foreground flex-shrink-0" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">What Clients Say</h2>
            <div className="flex items-center gap-1">
              <Star size={16} weight="fill" className="text-primary" />
              <span className="font-semibold">{reviewHighlights.rating.toFixed(1)}</span>
              <span className="text-muted-foreground text-sm">
                ({reviewHighlights.reviewCount})
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {reviewHighlights.quotes.slice(0, 3).map((quote) => (
              <Card key={quote.id} className="p-4">
                <div className="flex gap-1 mb-2">
                  {Array.from({ length: quote.rating }).map((_, idx) => (
                    <Star key={idx} size={14} weight="fill" className="text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-2">"{quote.text}"</p>
                <p className="text-xs font-medium">— {quote.author}</p>
              </Card>
            ))}
          </div>
        </div>

        <Card className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="font-semibold text-lg mb-1">Hours Today</h2>
              <p className="text-sm text-muted-foreground capitalize">{todayDay}</p>
            </div>
            <div className="text-right">
              {todayHours.closed ? (
                <Badge variant="secondary">Closed</Badge>
              ) : (
                <div className="space-y-1">
                  <Badge variant="default">Open</Badge>
                  <p className="text-sm font-medium">
                    {todayHours.open} - {todayHours.close}
                  </p>
                </div>
              )}
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => onNavigate('shop')}
          >
            View Full Schedule
          </Button>
        </Card>

        <Card className="p-5 bg-primary/10 border-primary/20">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <CalendarPlus size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">{shopProfile.bookingNote}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Choose your barber, pick your time, and we'll take care of the rest.
              </p>
              <Button onClick={() => onNavigate('book')}>
                Get Started
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
