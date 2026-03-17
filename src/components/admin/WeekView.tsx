import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CaretLeft, Calendar, User } from '@phosphor-icons/react'
import { format, addDays, startOfWeek, parseISO } from 'date-fns'
import { barberProfiles, appointments, getServiceById } from '@/lib/adminData'
import { Appointment } from '@/lib/types'

interface WeekViewProps {
  userRole: 'owner' | 'barber'
  barberId?: string
  onBack: () => void
}

export function WeekView({ userRole, barberId, onBack }: WeekViewProps) {
  const today = new Date()
  const weekStart = startOfWeek(today, { weekStartsOn: 0 })
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  const displayBarbers = userRole === 'owner'
    ? barberProfiles
    : barberProfiles.filter(b => b.id === barberId)

  const getAppointmentsForDay = (date: Date, barberIdCheck?: string) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    return appointments.filter(a => 
      a.date === dateStr && 
      (!barberIdCheck || a.barberId === barberIdCheck) &&
      a.status !== 'cancelled'
    )
  }

  const calculateDayRevenue = (date: Date, barberIdCheck?: string) => {
    const appts = getAppointmentsForDay(date, barberIdCheck)
    return appts.reduce((sum, apt) => {
      if (apt.customPrice) return sum + apt.customPrice
      const service = getServiceById(apt.serviceId)
      return sum + (service?.price || 0)
    }, 0)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <CaretLeft size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Week View</h1>
            <p className="text-sm text-muted-foreground">
              {format(weekStart, 'MMM d')} - {format(addDays(weekStart, 6), 'MMM d, yyyy')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar size={16} className="mr-2" />
            Previous Week
          </Button>
          <Button variant="outline" size="sm">
            Next Week
          </Button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div className="space-y-6">
          {displayBarbers.map(barber => (
            <Card key={barber.id} className="p-6 border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <User size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{barber.name}</h3>
                  <p className="text-sm text-muted-foreground">{barber.specialty}</p>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-3">
                {daysOfWeek.map(day => {
                  const dayAppts = getAppointmentsForDay(day, barber.id)
                  const revenue = calculateDayRevenue(day, barber.id)
                  const isToday = format(day, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')
                  const isClosed = barber.workingHours[format(day, 'EEEE').toLowerCase() as keyof typeof barber.workingHours]?.closed

                  return (
                    <Card
                      key={format(day, 'yyyy-MM-dd')}
                      className={`p-4 border transition-all hover:shadow-md ${
                        isToday ? 'border-primary bg-primary/5' : 'border-border'
                      } ${isClosed ? 'opacity-50' : ''}`}
                    >
                      <div className="text-center mb-3">
                        <p className="text-xs text-muted-foreground mb-1">
                          {format(day, 'EEE')}
                        </p>
                        <p className={`text-lg font-bold ${isToday ? 'text-primary' : 'text-foreground'}`}>
                          {format(day, 'd')}
                        </p>
                      </div>

                      {isClosed ? (
                        <div className="text-center">
                          <Badge variant="secondary" className="text-xs">Closed</Badge>
                        </div>
                      ) : (
                        <>
                          <div className="space-y-1 mb-3">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">Appointments</span>
                              <Badge variant="secondary" className="text-xs px-1.5 py-0">
                                {dayAppts.length}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">Revenue</span>
                              <span className="font-semibold text-primary">${revenue}</span>
                            </div>
                          </div>

                          {dayAppts.length > 0 && (
                            <div className="space-y-1">
                              {dayAppts.slice(0, 2).map(apt => (
                                <div
                                  key={apt.id}
                                  className="text-[10px] p-1.5 bg-secondary rounded truncate"
                                >
                                  <p className="font-semibold truncate">{apt.time}</p>
                                  <p className="text-muted-foreground truncate">{apt.customerName}</p>
                                </div>
                              ))}
                              {dayAppts.length > 2 && (
                                <p className="text-[10px] text-muted-foreground text-center">
                                  +{dayAppts.length - 2} more
                                </p>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </Card>
                  )
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <div className="flex gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Week Total</p>
                    <p className="text-lg font-bold text-foreground">
                      {daysOfWeek.reduce((sum, day) => sum + getAppointmentsForDay(day, barber.id).length, 0)} appointments
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Projected Revenue</p>
                    <p className="text-lg font-bold text-primary">
                      ${daysOfWeek.reduce((sum, day) => sum + calculateDayRevenue(day, barber.id), 0)}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </Card>
          ))}

          {userRole === 'owner' && (
            <Card className="p-6 border-border bg-primary/5">
              <h3 className="text-lg font-semibold text-foreground mb-4">Shop Week Summary</h3>
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Appointments</p>
                  <p className="text-2xl font-bold text-foreground">
                    {daysOfWeek.reduce((sum, day) => sum + getAppointmentsForDay(day).length, 0)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                  <p className="text-2xl font-bold text-primary">
                    ${daysOfWeek.reduce((sum, day) => sum + calculateDayRevenue(day), 0)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avg Per Day</p>
                  <p className="text-2xl font-bold text-foreground">
                    {Math.round(daysOfWeek.reduce((sum, day) => sum + getAppointmentsForDay(day).length, 0) / 7)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Capacity</p>
                  <p className="text-2xl font-bold text-foreground">78%</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
