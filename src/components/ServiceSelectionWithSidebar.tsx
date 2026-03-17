import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, MapPin, Star, Phone } from '@phosphor-icons/react'
import { services, barbers, getServicePriceLabel, shop, serviceGroups } from '@/lib/data'
import { formatDuration } from '@/lib/scheduling'
import type { Service } from '@/lib/types'

interface ServiceSelectionWithSidebarProps {
  onSelectService: (service: Service) => void
}

export function ServiceSelectionWithSidebar({ onSelectService }: ServiceSelectionWithSidebarProps) {
  const popularGroup = serviceGroups.find(g => g.id === 'popular-services')
  const jimmyGroup = serviceGroups.find(g => g.id === 'services-with-jimmy')
  const nateGroup = serviceGroups.find(g => g.id === 'services-with-nate')

  const popularServices = popularGroup ? services.filter(s => popularGroup.serviceIds.includes(s.id)) : []
  const jimmyServices = jimmyGroup ? services.filter(s => jimmyGroup.serviceIds.includes(s.id)) : []
  const nateServices = nateGroup ? services.filter(s => nateGroup.serviceIds.includes(s.id)) : []

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
              <div className="flex items-center gap-2 mb-1 flex-wrap">
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
              {getServicePriceLabel(service)}
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-8 max-w-[1400px] mx-auto">
        <div className="pb-24 lg:pb-8">
          <div className="px-4 lg:px-6 pt-6 pb-6 sticky top-0 bg-background/95 backdrop-blur border-b border-border z-10">
            <div className="mb-2">
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight mb-1">
                {shop.name}
              </h1>
              <div className="flex items-center gap-3 text-sm text-muted-foreground lg:hidden">
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} weight="fill" className="text-primary" />
                  <span>{shop.city}, {shop.state}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star size={14} weight="fill" className="text-primary" />
                  <span className="font-medium text-foreground">{shop.rating}</span>
                  <span>({shop.reviewCount})</span>
                </div>
              </div>
            </div>
            <h2 className="text-xl lg:text-2xl font-bold tracking-tight">Choose a Service</h2>
            <p className="text-sm text-muted-foreground mt-1">Select the service you'd like to book</p>
          </div>

          <div className="px-4 lg:px-6 pt-6 space-y-6">
            {popularServices.length > 0 && (
              <div>
                <h3 className="text-lg font-bold mb-3">Popular Services</h3>
                <div className="space-y-3">
                  {popularServices.map(service => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>
            )}

            {jimmyServices.length > 0 && (
              <div>
                <h3 className="text-lg font-bold mb-3">Services with Jimmy</h3>
                <div className="space-y-3">
                  {jimmyServices.map(service => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>
            )}

            {nateServices.length > 0 && (
              <div>
                <h3 className="text-lg font-bold mb-3">Services with Nate</h3>
                <div className="space-y-3">
                  {nateServices.map(service => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <aside className="hidden lg:block border-l border-border">
          <div className="sticky top-6 p-6 space-y-6">
            <div>
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-bold mb-4">Location & Hours</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin size={20} weight="fill" className="text-primary mt-0.5 shrink-0" />
                    <div className="text-sm">
                      <div className="text-muted-foreground leading-relaxed">
                        {shop.address}<br />
                        {shop.city}, {shop.state} {shop.zip}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={20} weight="fill" className="text-primary shrink-0" />
                    <a 
                      href={`tel:${shop.phone}`} 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
                    >
                      {shop.phone}
                    </a>
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <Card className="p-6 bg-secondary/50 border-border">
                <div className="flex items-start gap-4">
                  <Star size={40} weight="fill" className="text-primary shrink-0" />
                  <div>
                    <div className="text-3xl font-bold mb-1">{shop.rating}</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      Based on {shop.reviewCount} reviews from satisfied clients
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <h3 className="text-sm font-bold mb-3 uppercase tracking-wider text-muted-foreground">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {shop.amenities.map((amenity) => (
                  <Badge key={amenity} variant="secondary" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
