import { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { format } from 'date-fns'
import { getNext14Days, generateTimeSlots } from '@/lib/scheduling'
import { cn } from '@/lib/utils'
import { NavigationHeader } from '@/components/NavigationHeader'
import type { Service, Barber, TimeSlot } from '@/lib/types'

interface DateTimeSelectionProps {
  service: Service
  barber: Barber | null
  onSelectDateTime: (date: string, time: string) => void
  onBack: () => void
}

export function DateTimeSelection({ service, barber, onSelectDateTime, onBack }: DateTimeSelectionProps) {
  const days = getNext14Days()
  const [selectedDate, setSelectedDate] = useState<Date>(days[0])
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (barber) {
      setTimeSlots(generateTimeSlots(selectedDate, barber, service))
    } else {
      const allSlots = generateTimeSlots(selectedDate, { id: 'any', name: 'Any', specialty: '', description: '', services: service.barberIds }, service)
      setTimeSlots(allSlots)
    }
  }, [selectedDate, barber, service])

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedTime(null)
  }

  const handleContinue = () => {
    if (selectedTime) {
      onSelectDateTime(format(selectedDate, 'yyyy-MM-dd'), selectedTime)
    }
  }

  const availableSlots = timeSlots.filter(slot => slot.available)

  return (
    <div className="min-h-screen pb-32">
      <div className="sticky top-0 z-20">
        <NavigationHeader showBackButton onBack={onBack} />
      </div>
      <div className="px-4 pt-6 pb-4 border-b border-border">
        <h1 className="text-3xl font-bold tracking-tight">Pick Date & Time</h1>
        <p className="text-sm text-muted-foreground mt-1">Select your preferred appointment slot</p>
      </div>

      <div className="pt-6">
        <div className="px-4 mb-4">
          <h2 className="text-lg font-bold mb-3">Select Date</h2>
        </div>
        <ScrollArea className="w-full">
          <div ref={scrollContainerRef} className="flex gap-2 px-4 pb-2">
            {days.map((day) => {
              const isSelected = format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
              return (
                <button
                  key={day.toISOString()}
                  onClick={() => handleDateSelect(day)}
                  className={cn(
                    'flex flex-col items-center justify-center min-w-[72px] h-20 rounded-lg border-2 transition-all shrink-0',
                    isSelected
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'bg-card border-border hover:border-primary/50'
                  )}
                >
                  <div className={cn(
                    'text-xs font-medium mb-1',
                    isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'
                  )}>
                    {format(day, 'EEE')}
                  </div>
                  <div className="text-2xl font-bold">
                    {format(day, 'd')}
                  </div>
                  <div className={cn(
                    'text-xs',
                    isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'
                  )}>
                    {format(day, 'MMM')}
                  </div>
                </button>
              )
            })}
          </div>
        </ScrollArea>
      </div>

      <div className="px-4 pt-6">
        <h2 className="text-lg font-bold mb-3">Select Time</h2>
        {availableSlots.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((slot, index) => (
              <button
                key={index}
                disabled={!slot.available}
                onClick={() => setSelectedTime(slot.time)}
                className={cn(
                  'h-12 rounded-lg border-2 text-sm font-medium transition-all',
                  selectedTime === slot.time
                    ? 'bg-primary border-primary text-primary-foreground'
                    : slot.available
                    ? 'bg-card border-border hover:border-primary/50 active:scale-95'
                    : 'bg-muted border-border text-muted-foreground opacity-40 cursor-not-allowed'
                )}
              >
                {slot.time}
              </button>
            ))}
          </div>
        ) : (
          <Card className="p-6 bg-secondary border-border text-center">
            <p className="text-muted-foreground">No available times for this date</p>
            <p className="text-sm text-muted-foreground mt-2">Please select another day</p>
          </Card>
        )}
      </div>

      {selectedTime && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t border-border">
          <Button 
            size="lg" 
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-12"
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  )
}
