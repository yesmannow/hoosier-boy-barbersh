import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Calendar, Phone, Plus } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { format, parse } from 'date-fns'
import { formatDuration, getTimeUntil } from '@/lib/scheduling'
import { getServicePrice, shop } from '@/lib/data'
import type { Service, Barber } from '@/lib/types'

interface ConfirmationProps {
  service: Service
  barber: Barber | null
  date: string
  time: string
  customerName: string
  onBookAnother: () => void
}

export function Confirmation({ service, barber, date, time, customerName, onBookAnother }: ConfirmationProps) {
  const [showSuccess, setShowSuccess] = useState(false)
  const appointmentDate = parse(`${date} ${time}`, 'yyyy-MM-dd h:mm a', new Date())
  const price = barber ? getServicePrice(service.id, barber.id) : undefined
  const priceLabel = price !== undefined ? `$${price}` : service.priceLabel || 'Contact for pricing'
  
  useEffect(() => {
    setTimeout(() => setShowSuccess(true), 100)
  }, [])

  const handleAddToCalendar = () => {
    const startDate = appointmentDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    const endDate = new Date(appointmentDate.getTime() + service.duration * 60000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    const title = encodeURIComponent(`${service.name} at ${shop.name}`)
    const location = encodeURIComponent(`${shop.address}, ${shop.city}, ${shop.state} ${shop.zip}`)
    const details = encodeURIComponent(`${service.name} with ${barber?.name || 'Hoosier Boy Barbershop'}`)
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`
    
    window.open(googleCalendarUrl, '_blank')
  }

  return (
    <div className="min-h-screen pb-24">
      <div className="px-4 pt-12 pb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: showSuccess ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary flex items-center justify-center"
        >
          <Check size={48} weight="bold" className="text-primary-foreground" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showSuccess ? 1 : 0, y: showSuccess ? 0 : 20 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold tracking-tight text-center mb-2">
            You're All Set!
          </h1>
          <p className="text-center text-muted-foreground">
            Your appointment has been confirmed
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showSuccess ? 1 : 0, y: showSuccess ? 0 : 20 }}
        transition={{ delay: 0.3 }}
        className="px-4 space-y-6"
      >
        <Card className="p-6 bg-card border-border">
          <div className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Service</div>
              <div className="font-bold text-lg">{service.name}</div>
              <div className="text-sm text-muted-foreground">{formatDuration(service.duration)}</div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground mb-1">Barber</div>
              <div className="font-medium">{barber?.name || 'Any Available Barber'}</div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground mb-1">Date & Time</div>
              <div className="font-medium">{format(appointmentDate, 'EEEE, MMMM d, yyyy')}</div>
              <div className="font-medium text-primary">{time}</div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground mb-1">Price</div>
              <div className="font-bold text-primary text-lg">{priceLabel}</div>
            </div>

            <div className="pt-2 border-t border-border">
              <div className="text-sm text-muted-foreground mb-1">Location</div>
              <div className="font-medium">{shop.name}</div>
              <div className="text-sm text-muted-foreground">
                {shop.address}<br />
                {shop.city}, {shop.state} {shop.zip}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-secondary border-primary/30">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Your appointment is in</div>
            <div className="text-2xl font-bold text-primary">{getTimeUntil(appointmentDate)}</div>
          </div>
        </Card>

        <Card className="p-4 bg-muted/50 border-border">
          <div className="text-sm text-muted-foreground">
            <strong className="text-foreground block mb-2">Before You Arrive:</strong>
            <ul className="space-y-1 list-disc list-inside">
              <li>Please arrive 5 minutes early</li>
              <li>A confirmation has been sent to your email</li>
              <li>Call ahead if you need to reschedule</li>
            </ul>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="h-14 flex flex-col items-center gap-1 bg-card hover:bg-secondary"
            onClick={handleAddToCalendar}
          >
            <Calendar size={24} weight="fill" />
            <span className="text-xs">Add to Calendar</span>
          </Button>

          <Button
            variant="outline"
            className="h-14 flex flex-col items-center gap-1 bg-card hover:bg-secondary"
            onClick={() => window.open(`tel:${shop.phone}`)}
          >
            <Phone size={24} weight="fill" />
            <span className="text-xs">Call Shop</span>
          </Button>
        </div>

        <Button
          size="lg"
          variant="outline"
          className="w-full h-12 font-bold"
          onClick={onBookAnother}
        >
          <Plus size={20} weight="bold" className="mr-2" />
          Book Another Appointment
        </Button>
      </motion.div>
    </div>
  )
}
