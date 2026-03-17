import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { LandingScreen } from '@/components/LandingScreen'
import { ServiceSelection } from '@/components/ServiceSelection'
import { BarberSelection } from '@/components/BarberSelection'
import { DateTimeSelection } from '@/components/DateTimeSelection'
import { CustomerDetails } from '@/components/CustomerDetails'
import { Confirmation } from '@/components/Confirmation'
import type { Service, Barber, CustomerProfile, Appointment } from '@/lib/types'

type BookingStep = 'landing' | 'service' | 'barber' | 'datetime' | 'details' | 'confirmation'

function App() {
  const [currentStep, setCurrentStep] = useState<BookingStep>('landing')
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [customerName, setCustomerName] = useState<string>('')

  const [customerProfile, setCustomerProfile, deleteCustomerProfile] = useKV<CustomerProfile>('customer-profile', {
    name: '',
    phone: '',
    email: ''
  })

  const [appointments, setAppointments] = useKV<Appointment[]>('appointments', [])

  const handleStartBooking = () => {
    setCurrentStep('service')
  }

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
    
    toast.success('Appointment confirmed!', {
      description: `We'll see you on ${selectedDate} at ${selectedTime}`
    })
  }

  const handleBackFromService = () => {
    setCurrentStep('landing')
    setSelectedService(null)
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

  return (
    <>
      <div className="min-h-screen bg-background text-foreground">
        {currentStep === 'landing' && (
          <LandingScreen onStartBooking={handleStartBooking} />
        )}

        {currentStep === 'service' && (
          <ServiceSelection 
            onSelectService={handleSelectService}
            onBack={handleBackFromService}
          />
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
      <Toaster />
    </>
  )
}

export default App
