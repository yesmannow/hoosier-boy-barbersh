import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { X, Phone, Envelope, Calendar, Clock, CurrencyDollar, User, Scissors, Check, XCircle, WarningCircle } from '@phosphor-icons/react'
import { Appointment } from '@/lib/types'
import { getServiceById, getBarberById } from '@/lib/adminData'
import { format, parseISO } from 'date-fns'
import { useState } from 'react'

interface AppointmentDetailDrawerProps {
  appointment: Appointment | null
  open: boolean
  onClose: () => void
  onUpdateStatus: (appointmentId: string, status: Appointment['status']) => void
}

const statusOptions: Array<{ value: Appointment['status']; label: string; icon: any }> = [
  { value: 'confirmed', label: 'Confirmed', icon: Check },
  { value: 'arrived', label: 'Arrived', icon: Check },
  { value: 'in-service', label: 'In Service', icon: Scissors },
  { value: 'completed', label: 'Completed', icon: Check },
  { value: 'cancelled', label: 'Cancelled', icon: XCircle },
  { value: 'no-show', label: 'No Show', icon: WarningCircle },
  { value: 'late', label: 'Late', icon: WarningCircle }
]

export function AppointmentDetailDrawer({ appointment, open, onClose, onUpdateStatus }: AppointmentDetailDrawerProps) {
  const [internalNotes, setInternalNotes] = useState(appointment?.internalNotes || '')

  if (!appointment) return null

  const service = getServiceById(appointment.serviceId)
  const barber = getBarberById(appointment.barberId)

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Appointment Details</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Customer Information</h3>
            <Card className="p-4 space-y-3 border-border">
              <div className="flex items-center gap-3">
                <User size={20} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-semibold text-foreground">{appointment.customerName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a href={`tel:${appointment.customerPhone}`} className="font-semibold text-primary hover:underline">
                    {appointment.customerPhone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Envelope size={20} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href={`mailto:${appointment.customerEmail}`} className="font-semibold text-primary hover:underline">
                    {appointment.customerEmail}
                  </a>
                </div>
              </div>
            </Card>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Appointment Details</h3>
            <Card className="p-4 space-y-3 border-border">
              <div className="flex items-center gap-3">
                <Scissors size={20} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Service</p>
                  <p className="font-semibold text-foreground">{service?.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User size={20} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Barber</p>
                  <p className="font-semibold text-foreground">{barber?.name || 'Any Available'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-semibold text-foreground">
                    {format(parseISO(appointment.date), 'EEEE, MMMM d, yyyy')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Time & Duration</p>
                  <p className="font-semibold text-foreground">
                    {appointment.time} • {service?.duration} minutes
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CurrencyDollar size={20} className="text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="font-semibold text-foreground">
                    ${appointment.customPrice || service?.price}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Status</h3>
            <div className="flex items-center gap-2 mb-3">
              <Badge className="text-sm px-3 py-1">{appointment.status}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {statusOptions.map(option => {
                const Icon = option.icon
                return (
                  <Button
                    key={option.value}
                    variant={appointment.status === option.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onUpdateStatus(appointment.id, option.value)}
                    className="justify-start"
                  >
                    <Icon size={16} className="mr-2" />
                    {option.label}
                  </Button>
                )
              })}
            </div>
          </div>

          {appointment.notes && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Customer Notes</h3>
                <Card className="p-4 border-border">
                  <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                </Card>
              </div>
            </>
          )}

          <Separator />

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Internal Notes</h3>
            <Textarea
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              placeholder="Add private notes about preferences, special requests, etc."
              className="min-h-[100px]"
            />
            <Button className="mt-2 w-full" size="sm">
              Save Internal Notes
            </Button>
          </div>

          {appointment.statusHistory && appointment.statusHistory.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Status History</h3>
                <div className="space-y-2">
                  {appointment.statusHistory.map((entry, i) => (
                    <Card key={i} className="p-3 border-border">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">{entry.status}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {format(parseISO(entry.timestamp), 'MMM d, h:mm a')}
                        </span>
                      </div>
                      {entry.note && (
                        <p className="text-xs text-muted-foreground mt-2">{entry.note}</p>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}

          <Separator />

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              Reschedule
            </Button>
            <Button variant="outline" className="flex-1">
              View Client
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
