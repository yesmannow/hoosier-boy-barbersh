import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CaretLeft, CalendarBlank, Plus } from '@phosphor-icons/react'
import { format, parseISO } from 'date-fns'
import { appointments, getServiceById, getBarberById, barberProfiles } from '@/lib/adminData'
import { Appointment } from '@/lib/types'
import { cn } from '@/lib/utils'

interface DailyScheduleViewProps {
  userRole: 'owner' | 'barber'
  barberId?: string
  onBack: () => void
  onAppointmentClick: (appointment: Appointment) => void
}

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'
]

const statusColors = {
  confirmed: 'bg-blue-500/20 border-blue-500/40 text-blue-400',
  arrived: 'bg-purple-500/20 border-purple-500/40 text-purple-400',
  'in-service': 'bg-primary/20 border-primary/40 text-primary',
  completed: 'bg-green-500/20 border-green-500/40 text-green-400',
  cancelled: 'bg-gray-500/20 border-gray-500/40 text-gray-400',
  'no-show': 'bg-red-500/20 border-red-500/40 text-red-400',
  late: 'bg-orange-500/20 border-orange-500/40 text-orange-400',
  pending: 'bg-muted/20 border-muted-foreground/40 text-muted-foreground'
}

export function DailyScheduleView({ userRole, barberId, onBack, onAppointmentClick }: DailyScheduleViewProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [currentTime] = useState(new Date())

  const displayBarbers = userRole === 'owner' 
    ? barberProfiles 
    : barberProfiles.filter(b => b.id === barberId)

  const todayAppts = appointments.filter(a => a.date === selectedDate)

  const getAppointmentForSlot = (barberIdCheck: string, time: string) => {
    return todayAppts.find(a => a.barberId === barberIdCheck && a.time === time)
  }

  const getAppointmentHeight = (appointment: Appointment) => {
    const service = getServiceById(appointment.serviceId)
    if (!service) return 1
    return service.duration / 30
  }

  const isCurrentTimeSlot = (time: string) => {
    if (selectedDate !== new Date().toISOString().split('T')[0]) return false
    const [hours, minutes] = time.split(':').map(Number)
    const slotTime = new Date()
    slotTime.setHours(hours, minutes, 0, 0)
    return Math.abs(currentTime.getTime() - slotTime.getTime()) < 30 * 60 * 1000
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <CaretLeft size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Daily Schedule</h1>
            <p className="text-sm text-muted-foreground">
              {format(parseISO(selectedDate), 'EEEE, MMMM d, yyyy')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <CalendarBlank size={16} className="mr-2" />
            Change Date
          </Button>
          <Button size="sm">
            <Plus size={16} className="mr-2" />
            Add Appointment
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6">
          <div className="grid gap-4" style={{ gridTemplateColumns: `120px repeat(${displayBarbers.length}, 1fr)` }}>
            <div className="sticky top-0 bg-background z-10">
              <div className="h-16" />
            </div>
            {displayBarbers.map(barber => (
              <Card key={barber.id} className="p-4 border-border sticky top-0 bg-card z-10">
                <h3 className="font-semibold text-foreground">{barber.name}</h3>
                <p className="text-xs text-muted-foreground">{barber.specialty}</p>
              </Card>
            ))}

            {timeSlots.map(time => {
              const isCurrent = isCurrentTimeSlot(time)
              return (
                <>
                  <div
                    key={`time-${time}`}
                    className={cn(
                      'text-sm text-muted-foreground py-2 border-t border-border',
                      isCurrent && 'text-primary font-semibold'
                    )}
                  >
                    {time}
                  </div>
                  {displayBarbers.map(barber => {
                    const appointment = getAppointmentForSlot(barber.id, time)
                    if (!appointment) {
                      return (
                        <div
                          key={`${barber.id}-${time}`}
                          className="border-t border-border/50 min-h-[3rem] hover:bg-secondary/30 cursor-pointer transition-colors"
                        />
                      )
                    }

                    const service = getServiceById(appointment.serviceId)
                    const height = getAppointmentHeight(appointment)
                    const shouldRender = appointment.time === time

                    if (!shouldRender) {
                      return <div key={`${barber.id}-${time}`} />
                    }

                    return (
                      <div
                        key={`${barber.id}-${time}-apt`}
                        className="relative"
                        style={{ gridRow: `span ${height}` }}
                      >
                        <Card
                          className={cn(
                            'p-3 border-l-4 cursor-pointer hover:shadow-lg transition-all h-full',
                            statusColors[appointment.status]
                          )}
                          onClick={() => onAppointmentClick(appointment)}
                        >
                          <div className="flex items-start justify-between mb-1">
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                              {appointment.status}
                            </Badge>
                            <span className="text-xs font-semibold">
                              ${service?.price || appointment.customPrice || '—'}
                            </span>
                          </div>
                          <h4 className="font-semibold text-sm text-foreground mb-1">
                            {appointment.customerName}
                          </h4>
                          <p className="text-xs text-muted-foreground mb-1">{service?.name}</p>
                          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                            <span>{appointment.time}</span>
                            <span>•</span>
                            <span>{service?.duration}min</span>
                          </div>
                        </Card>
                      </div>
                    )
                  })}
                </>
              )
            })}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
