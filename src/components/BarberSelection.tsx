import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { User, Users } from '@phosphor-icons/react'
import { barbers, getServicePrice } from '@/lib/data'
import type { Service, Barber } from '@/lib/types'

interface BarberSelectionProps {
  service: Service
  onSelectBarber: (barber: Barber | null) => void
  onBack: () => void
}

export function BarberSelection({ service, onSelectBarber, onBack }: BarberSelectionProps) {
  const availableBarbers = barbers.filter(b => service.barberIds.includes(b.id))

  const BarberCard = ({ barber }: { barber: Barber }) => {
    const priceLabel = service.price !== undefined ? `$${service.price}` : service.priceLabel || 'Contact for pricing'
    
    return (
      <Card 
        className="p-4 bg-card border-border hover:border-primary/50 transition-all cursor-pointer active:scale-[0.98]"
        onClick={() => onSelectBarber(barber)}
      >
        <div className="flex items-start gap-4">
          <Avatar className="h-14 w-14 border-2 border-primary/30">
            <AvatarFallback className="bg-secondary text-foreground font-bold">
              {barber.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base mb-0.5">{barber.name}</h3>
            <p className="text-sm text-primary font-medium mb-1.5">{barber.specialty}</p>
            <p className="text-sm text-muted-foreground leading-snug">{barber.description}</p>
            <div className="mt-3 font-bold text-primary">{priceLabel}</div>
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
        <h1 className="text-3xl font-bold tracking-tight">Choose Your Barber</h1>
        <p className="text-sm text-muted-foreground mt-1">Select a barber or choose next available</p>
      </div>

      <div className="px-4 pt-6 space-y-3">
        {availableBarbers.length > 1 && (
          <Card 
            className="p-4 bg-secondary border-primary/30 hover:border-primary/60 transition-all cursor-pointer active:scale-[0.98]"
            onClick={() => onSelectBarber(null)}
          >
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary/40">
                <Users size={28} weight="fill" className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base mb-0.5">Any Available Barber</h3>
                <p className="text-sm text-muted-foreground leading-snug">
                  Book the earliest available appointment with any barber
                </p>
              </div>
            </div>
          </Card>
        )}

        <div className="pt-2">
          <h2 className="text-lg font-bold mb-3">Our Barbers</h2>
          <div className="space-y-3">
            {availableBarbers.map(barber => (
              <BarberCard key={barber.id} barber={barber} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
