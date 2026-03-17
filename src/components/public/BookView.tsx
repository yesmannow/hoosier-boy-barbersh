import { useState } from 'react'
import { ServiceSelectionWithSidebar } from '../ServiceSelectionWithSidebar'
import { BarberSelection } from '../BarberSelection'
import { DateTimeSelection } from '../DateTimeSelection'
import { CustomerDetails } from '../CustomerDetails'
import { Confirmation } from '../Confirmation'
import { useKV } from '@github/spark/hooks'
import { useSEO, SEO_DEFAULTS } from '@/lib/seo'
import type { Service, Barber, CustomerProfile, Appointment } from '@/lib/types'
import { ArrowLeft } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

type BookingStep = 'service' | 'barber' | 'datetime' | 'details' | 'confirmation'

interface BookViewProps {
  onNavigate: (view: 'home' | 'book' | 'barbers' | 'shop' | 'you') => void
}

export function BookView({ onNavigate }: BookViewProps) {
  useSEO(SEO_DEFAULTS.book)
  const [currentStep, setCurrentStep] = useState<BookingStep>('service')
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [customerName, setCustomerName] = useState<string>('')

  const [customerProfile, setCustomerProfile] = useKV<CustomerProfile>('customer-profile', {
    name: '',
    phone: '',
    email: ''
  })

  const [appointments, setAppointments] = useKV<Appointment[]>('appointments', [])

  const handleSelectService = (service: Service) => {
    setSelectedService(service)
    setCurrentStep('barber')
  }

  const handleSelectBarber = (barber: Barber | null) => {
    setSelectedBarber(barber)
    setCurrentStep('datetime')
  }

  const handleSelectDateTime = (date: string, time: string) => {
    setSelectedDate(date)
    setSelectedTime(time)
    setCurrentStep('details')
  }

  const handleSubmitDetails = (details: {
    name: string
    phone: string
    email: string
    notes?: string
    remindersEnabled: boolean
    saveDetails: boolean
  }) => {
    if (details.saveDetails) {
      setCustomerProfile((prev) => ({
        ...prev,
        name: details.name,
        phone: details.phone,
        email: details.email,
        lastBooking: selectedService && selectedBarber ? {
          serviceId: selectedService.id,
          barberId: selectedBarber.id,
          date: selectedDate
        } : prev?.lastBooking
      }))
    }

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      serviceId: selectedService!.id,
      barberId: selectedBarber?.id || 'any',
      date: selectedDate,
      time: selectedTime,
      customerName: details.name,
      customerPhone: details.phone,
      customerEmail: details.email,
      notes: details.notes,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    }

    setAppointments((prev) => [...(prev || []), newAppointment])
    setCustomerName(details.name)
    setCurrentStep('confirmation')
  }

  const handleBackFromBarber = () => {
    setCurrentStep('service')
    setSelectedBarber(null)
  }

  const handleBackFromDateTime = () => {
    setCurrentStep('barber')
    setSelectedDate('')
    setSelectedTime('')
  }

  const handleBackFromDetails = () => {
    setCurrentStep('datetime')
  }

  const handleBookAnother = () => {
    setCurrentStep('service')
    setSelectedService(null)
    setSelectedBarber(null)
    setSelectedDate('')
    setSelectedTime('')
    setCustomerName('')
  }

  const handleBackToHome = () => {
    onNavigate('home')
  }

  return (
    <div className="min-h-screen bg-background">
      {currentStep === 'service' && (
        <div>
          <div className="bg-card border-b border-border sticky top-0 z-10">
            <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleBackToHome}
              >
                <ArrowLeft size={20} />
              </Button>
              <h1 className="font-semibold text-lg">Book Appointment</h1>
            </div>
          </div>
          <ServiceSelectionWithSidebar 
            onSelectService={handleSelectService}
          />
        </div>
      )}

      {currentStep === 'barber' && selectedService && (
        <BarberSelection
          service={selectedService}
          onSelectBarber={handleSelectBarber}
          onBack={handleBackFromBarber}
        />
      )}

      {currentStep === 'datetime' && selectedService && (
        <DateTimeSelection
          service={selectedService}
          barber={selectedBarber}
          onSelectDateTime={handleSelectDateTime}
          onBack={handleBackFromDateTime}
        />
      )}

      {currentStep === 'details' && selectedService && (
        <CustomerDetails
          service={selectedService}
          barber={selectedBarber}
          date={selectedDate}
          time={selectedTime}
          onSubmit={handleSubmitDetails}
          onBack={handleBackFromDetails}
          savedProfile={customerProfile}
        />
      )}

      {currentStep === 'confirmation' && selectedService && (
        <Confirmation
          service={selectedService}
          barber={selectedBarber}
          date={selectedDate}
          time={selectedTime}
          customerName={customerName}
          onBookAnother={handleBookAnother}
        />
      )}
    </div>
  )
}
