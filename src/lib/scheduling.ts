import { format, addDays, parse, isAfter, isBefore, startOfDay } from 'date-fns'
import type { TimeSlot, Barber, Service } from './types'

export function getNext14Days(): Date[] {
  const days: Date[] = []
  for (let i = 0; i < 14; i++) {
    days.push(addDays(new Date(), i))
  }
  return days
}

export function generateTimeSlots(date: Date, barber: Barber, service: Service): TimeSlot[] {
  const slots: TimeSlot[] = []
  const dayOfWeek = format(date, 'EEEE').toLowerCase()
  
  const businessHours: Record<string, { start: number, end: number }> = {
    monday: { start: 9, end: 18 },
    tuesday: { start: 9, end: 18 },
    wednesday: { start: 9, end: 18 },
    thursday: { start: 9, end: 19 },
    friday: { start: 9, end: 19 },
    saturday: { start: 8, end: 16 },
    sunday: { start: 0, end: 0 }
  }

  const hours = businessHours[dayOfWeek]
  if (!hours || hours.start === 0) {
    return slots
  }

  const serviceDurationHours = service.duration / 60
  const now = new Date()
  const selectedDate = startOfDay(date)
  const today = startOfDay(now)
  const isToday = selectedDate.getTime() === today.getTime()

  for (let hour = hours.start; hour < hours.end; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const slotTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      const slotEndHour = hour + serviceDurationHours
      
      if (slotEndHour > hours.end) {
        continue
      }

      const slotDateTime = parse(slotTime, 'HH:mm', date)
      
      let available = true
      if (isToday && isBefore(slotDateTime, now)) {
        available = false
      }

      const randomUnavailable = Math.random() > 0.7
      if (randomUnavailable && !isToday) {
        available = false
      }

      slots.push({
        time: format(slotDateTime, 'h:mm a'),
        available,
        barberId: barber.id
      })
    }
  }

  return slots
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  if (remainingMinutes === 0) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`
  }
  return `${hours}h ${remainingMinutes}m`
}

export function getTimeUntil(targetDate: Date): string {
  const now = new Date()
  const diff = targetDate.getTime() - now.getTime()
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  
  if (days > 0) {
    return `${days} day${days === 1 ? '' : 's'}`
  }
  if (hours > 0) {
    return `${hours} hour${hours === 1 ? '' : 's'}`
  }
  return 'less than an hour'
}
