import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Star, Phone } from '@phosphor-icons/react'
import { shop } from '@/lib/data'

interface LandingScreenProps {
  onStartBooking: () => void
}

export function LandingScreen({ onStartBooking }: LandingScreenProps) {
  return (
    <div className="min-h-screen pb-24">
      <div className="px-4 pt-8 pb-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2 leading-tight">
              {shop.name}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <MapPin size={16} weight="fill" className="text-primary" />
                <span>{shop.city}, {shop.state}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star size={16} weight="fill" className="text-primary" />
                <span className="font-medium text-foreground">{shop.rating}</span>
                <span>({shop.reviewCount})</span>
              </div>
            </div>
          </div>

          <p className="text-base text-muted-foreground leading-relaxed">
            Premium barbering with a trusted local touch. Classic cuts, expert beard work, 
            and specialized hair replacement services in Noblesville.
          </p>
        </div>
      </div>

      <div className="px-4 pb-6">
        <Card className="p-6 bg-card border-border">
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold mb-3">Location</h2>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin size={18} weight="fill" className="text-primary mt-0.5 shrink-0" />
                  <div className="text-muted-foreground">
                    {shop.address}<br />
                    {shop.city}, {shop.state} {shop.zip}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={18} weight="fill" className="text-primary shrink-0" />
                  <a href={`tel:${shop.phone}`} className="text-muted-foreground hover:text-primary transition-colors">
                    {shop.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="px-4 pb-6">
        <h2 className="text-lg font-bold mb-3">Amenities</h2>
        <div className="flex flex-wrap gap-2">
          {shop.amenities.map((amenity) => (
            <Badge key={amenity} variant="secondary" className="text-xs">
              {amenity}
            </Badge>
          ))}
        </div>
      </div>

      <div className="px-4 pb-6">
        <Card className="p-6 bg-secondary border-border">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Star size={32} weight="fill" className="text-primary shrink-0" />
              <div>
                <div className="text-2xl font-bold mb-1">{shop.rating} Rating</div>
                <div className="text-sm text-muted-foreground">
                  Based on {shop.reviewCount} reviews from satisfied clients
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border">
        <Button 
          size="lg" 
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-12"
          onClick={onStartBooking}
        >
          Book Your Appointment
        </Button>
      </div>
    </div>
  )
}
