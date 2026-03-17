import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Clock, MapPin, User as UserIcon } from '@phosphor-icons/react'
import { format, parse } from 'date-fns'
import { formatDuration } from '@/lib/scheduling'
import { getServicePrice } from '@/lib/data'
import { shop } from '@/lib/data'
import type { Service, Barber } from '@/lib/types'

interface CustomerDetailsProps {
  service: Service
  barber: Barber | null
  date: string
  time: string
  onSubmit: (details: {
    name: string
    phone: string
    email: string
    notes?: string
    remindersEnabled: boolean
    saveDetails: boolean
  }) => void
  onBack: () => void
  savedProfile?: { name: string; phone: string; email: string }
}

export function CustomerDetails({ 
  service, 
  barber, 
  date, 
  time, 
  onSubmit, 
  onBack,
  savedProfile 
}: CustomerDetailsProps) {
  const [name, setName] = useState(savedProfile?.name || '')
  const [phone, setPhone] = useState(savedProfile?.phone || '')
  const [email, setEmail] = useState(savedProfile?.email || '')
  const [notes, setNotes] = useState('')
  const [remindersEnabled, setRemindersEnabled] = useState(true)
  const [saveDetails, setSaveDetails] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    
    if (!name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        notes: notes.trim() || undefined,
        remindersEnabled,
        saveDetails
      })
    }
  }

  const appointmentDate = parse(date, 'yyyy-MM-dd', new Date())
  const price = barber ? getServicePrice(service.id, barber.id) : undefined
  const priceLabel = price !== undefined ? `$${price}` : service.priceLabel || 'Contact for pricing'

  return (
    <div className="min-h-screen pb-32">
      <div className="px-4 pt-6 pb-4 sticky top-0 bg-background/95 backdrop-blur border-b border-border z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mb-3 -ml-2 text-muted-foreground hover:text-foreground"
        >
          ← Back
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Your Details</h1>
        <p className="text-sm text-muted-foreground mt-1">Complete your booking information</p>
      </div>

      <div className="px-4 pt-6 space-y-6">
        <Card className="p-4 bg-secondary border-border">
          <h3 className="font-bold text-sm mb-3 text-muted-foreground uppercase tracking-wide">Booking Summary</h3>
          <div className="space-y-2.5">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-base">{service.name}</div>
                <div className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
                  <Clock size={14} weight="fill" className="text-primary" />
                  {formatDuration(service.duration)}
                </div>
              </div>
              <div className="font-bold text-primary">{priceLabel}</div>
            </div>
            <div className="text-sm">
              <div className="text-muted-foreground">with</div>
              <div className="font-medium">{barber?.name || 'Any Available Barber'}</div>
            </div>
            <div className="text-sm">
              <div className="text-muted-foreground">on</div>
              <div className="font-medium">{format(appointmentDate, 'EEEE, MMMM d, yyyy')}</div>
              <div className="font-medium">{time}</div>
            </div>
            <div className="text-sm pt-1 border-t border-border/50 flex items-start gap-1.5">
              <MapPin size={14} weight="fill" className="text-primary mt-0.5 shrink-0" />
              <div>
                <div className="font-medium">{shop.name}</div>
                <div className="text-muted-foreground text-xs">{shop.city}, {shop.state}</div>
              </div>
            </div>
          </div>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(555) 123-4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={errors.phone ? 'border-destructive' : ''}
            />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Special Requests (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any specific requests or notes for your barber..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="reminders"
                checked={remindersEnabled}
                onCheckedChange={(checked) => setRemindersEnabled(checked === true)}
              />
              <label htmlFor="reminders" className="text-sm leading-snug cursor-pointer">
                Send me appointment reminders via text and email
              </label>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="save-details"
                checked={saveDetails}
                onCheckedChange={(checked) => setSaveDetails(checked === true)}
              />
              <label htmlFor="save-details" className="text-sm leading-snug cursor-pointer">
                Save my details for faster booking next time
              </label>
            </div>
          </div>
        </form>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border">
        <Button 
          size="lg" 
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-12"
          onClick={handleSubmit}
        >
          Confirm Booking
        </Button>
      </div>
    </div>
  )
}
