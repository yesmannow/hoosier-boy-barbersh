import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { ServiceSelectionWithSidebar } from '@/components/ServiceSelectionWithSidebar'
import { BarberSelection } from '@/components/BarberSelection'
import { DateTimeSelection } from '@/components/DateTimeSelection'
import { CustomerDetails } from '@/components/CustomerDetails'
import { Confirmation } from '@/components/Confirmation'
import { AdminApp } from '@/components/admin/AdminApp'
import type { Service, Barber, CustomerProfile, Appointment } from '@/lib/types'
import { UserCircle, Scissors } from '@phosphor-icons/react'

type BookingStep = 'service' | 'barber' | 'datetime' | 'details' | 'confirmation'
type AppMode = 'customer' | 'admin'

function App() {
  const [appMode, setAppMode] = useState<AppMode>('customer')
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
    
    toast.success('Appointment confirmed!', {
      description: `We'll see you on ${selectedDate} at ${selectedTime}`
    })
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

  if (appMode === 'admin') {
    return <AdminApp />
  }

  return (
    <>
      <div className="fixed top-4 left-4 z-50 flex gap-2">
        <Button 
          onClick={() => setAppMode('customer')} 
          variant={appMode === 'customer' ? 'default' : 'outline'}
          size="sm"
          className="bg-card"
        >
          <UserCircle size={16} className="mr-2" />
          Customer
        </Button>
        <Button 
          onClick={() => setAppMode('admin')} 
          variant={appMode === 'admin' ? 'default' : 'outline'}
          size="sm"
          className="bg-card"
        >
          <Scissors size={16} className="mr-2" />
          Admin
        </Button>
      </div>

      <div className="min-h-screen bg-background text-foreground">
        {currentStep === 'service' && (
          <ServiceSelectionWithSidebar 
            onSelectService={handleSelectService}
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
