import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { barberProfiles } from '@/lib/adminData'
import { adminServices as services } from '@/lib/adminData'
import { useSEO, SEO_DEFAULTS } from '@/lib/seo'
import { 
  Scissors, 
  CalendarPlus,
  X
} from '@phosphor-icons/react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export function BarbersView() {
  useSEO(SEO_DEFAULTS.barbers)
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null)

  const selectedBarberProfile = barberProfiles.find(b => b.id === selectedBarber)

  const getBarberServices = (barberId: string) => {
    return services.filter(s => s.barberIds.includes(barberId))
  }

  const formatHours = (hours: typeof barberProfiles[0]['workingHours']) => {
    const days: Array<{ day: string; hours: string }> = []
    
    const dayOrder: Array<keyof typeof hours> = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    
    dayOrder.forEach(day => {
      const dayHours = hours[day]
      if (!dayHours.closed) {
        days.push({
          day: day.charAt(0).toUpperCase() + day.slice(1),
          hours: `${dayHours.open} - ${dayHours.close}`
        })
      }
    })
    
    return days
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="font-bold text-2xl">Our Barbers</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Expert craftsmen dedicated to your style
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {barberProfiles.map((barber) => {
          const barberServices = getBarberServices(barber.id)
          
          return (
            <Card 
              key={barber.id} 
              className="overflow-hidden cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => setSelectedBarber(barber.id)}
            >
              <div className="p-5">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-primary">
                      {barber.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-xl mb-1">{barber.name}</h2>
                    <p className="text-sm text-primary font-medium mb-2">
                      {barber.specialty}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {barber.publicSpecialties.map((spec, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {barber.publicSummary}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Scissors size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {barberServices.length} Services Available
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarPlus size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {barber.daysAvailable.length} Days/Week
                    </span>
                  </div>
                </div>

                <Button className="w-full mt-4">
                  View Details
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      <Dialog open={!!selectedBarber} onOpenChange={() => setSelectedBarber(null)}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          {selectedBarberProfile && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold text-primary">
                        {selectedBarberProfile.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <DialogTitle className="text-xl mb-1">
                        {selectedBarberProfile.name}
                      </DialogTitle>
                      <p className="text-sm text-primary font-medium">
                        {selectedBarberProfile.specialty}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedBarber(null)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X size={20} />
                  </button>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <div>
                  <h3 className="font-semibold mb-2">About</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedBarberProfile.publicSummary}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedBarberProfile.publicSpecialties.map((spec, idx) => (
                      <Badge key={idx} variant="default" className="text-sm">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Featured Services</h3>
                  <div className="space-y-2">
                    {getBarberServices(selectedBarberProfile.id).slice(0, 6).map((service) => (
                      <div 
                        key={service.id}
                        className="flex items-center justify-between py-2 px-3 bg-muted/30 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-sm">{service.name}</p>
                          <p className="text-xs text-muted-foreground">{service.duration} min</p>
                        </div>
                        <p className="font-semibold text-sm">
                          {service.priceLabel || `$${service.price}`}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Availability</h3>
                  <div className="space-y-2">
                    {formatHours(selectedBarberProfile.workingHours).map((day, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-muted-foreground">{day.day}</span>
                        <span className="font-medium">{day.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  <CalendarPlus size={20} className="mr-2" />
                  Book with {selectedBarberProfile.name.split(' ')[0]}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
