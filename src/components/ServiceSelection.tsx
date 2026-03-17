import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Check } from '@phosphor-icons/react'
import { services, barbers, getServicePriceLabel } from '@/lib/data'
import { formatDuration } from '@/lib/scheduling'
import type { Service } from '@/lib/types'

interface ServiceSelectionProps {
  onSelectService: (service: Service) => void
  onBack: () => void
}

export function ServiceSelection({ onSelectService, onBack }: ServiceSelectionProps) {
  const popularServices = services.filter(s => s.category === 'popular')
  const standardServices = services.filter(s => s.category === 'standard' || s.category === 'premium')
  const hairSystemServices = services.filter(s => s.category === 'hair-system')

  const ServiceCard = ({ service }: { service: Service }) => {
    const barberNames = service.barberIds.map(id => 
      barbers.find(b => b.id === id)?.name.split(' ')[0]
    ).join(' & ')

    return (
      <Card 
        className="p-4 bg-card border-border hover:border-primary/50 transition-all cursor-pointer active:scale-[0.98]"
        onClick={() => onSelectService(service)}
      >
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-base leading-tight">{service.name}</h3>
                {service.badge && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-primary/20 text-primary border-primary/30">
                    {service.badge}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-snug">{service.description}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Clock size={14} weight="fill" className="text-primary" />
                <span>{formatDuration(service.duration)}</span>
              </div>
              <span className="text-xs">with {barberNames}</span>
            </div>
            <div className="font-bold text-primary text-base">
              {getServicePriceLabel(service, service.barberIds[0])}
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="min-h-screen pb-24">
      <div className="px-4 pt-6 pb-4 sticky top-0 bg-background/95 backdrop-blur border-b border-border z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mb-3 -ml-2 text-muted-foreground hover:text-foreground"
        >
          ← Back
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Choose a Service</h1>
        <p className="text-sm text-muted-foreground mt-1">Select the service you'd like to book</p>
      </div>

      <div className="px-4 pt-6 space-y-6">
        {popularServices.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3">Popular Services</h2>
            <div className="space-y-3">
              {popularServices.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        )}

        {standardServices.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3">All Services</h2>
            <div className="space-y-3">
              {standardServices.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        )}

        {hairSystemServices.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3">Hair Replacement Services</h2>
            <div className="space-y-3">
              {hairSystemServices.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
