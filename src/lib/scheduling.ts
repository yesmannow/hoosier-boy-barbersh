import { format, addDays, parse, isBefore, startOfDay } from 'date-fns'
import type { TimeSlot, Barber, Service } from './types'

type WorkingHours = { start: number; end: number }

type WeeklySchedule = Record<string, WorkingHours>

const SHOP_WEEKLY_HOURS: WeeklySchedule = {
  monday: { start: 9, end: 18 },
  tuesday: { start: 9, end: 18 },
  wednesday: { start: 9, end: 18 },
  thursday: { start: 9, end: 19 },
  friday: { start: 9, end: 19 },
  saturday: { start: 8, end: 16 },
  sunday: { start: 0, end: 0 },
}

const BARBER_WEEKLY_HOURS: Record<string, WeeklySchedule> = {
  'jimmy-bissonette': {
    monday: { start: 0, end: 0 },
    tuesday: { start: 0, end: 0 },
    wednesday: { start: 8, end: 16 },
    thursday: { start: 8, end: 19 },
    friday: { start: 8, end: 19 },
    saturday: { start: 10, end: 15 },
    sunday: { start: 0, end: 0 },
  },
  'nate-gouty': {
    monday: { start: 0, end: 0 },
    tuesday: { start: 0, end: 0 },
    wednesday: { start: 8, end: 16 },
    thursday: { start: 8, end: 19 },
    friday: { start: 8, end: 19 },
    saturday: { start: 10, end: 15 },
    sunday: { start: 0, end: 0 },
  },
}

const BARBER_BREAKS: Record<string, Array<{ startHour: number; startMinute: number; endHour: number; endMinute: number }>> = {
  'jimmy-bissonette': [{ startHour: 12, startMinute: 0, endHour: 12, endMinute: 30 }],
  'nate-gouty': [{ startHour: 12, startMinute: 30, endHour: 13, endMinute: 0 }],
}

function getWorkingHours(barberId: string, dayOfWeek: string): WorkingHours {
  if (barberId === 'any') {
    return SHOP_WEEKLY_HOURS[dayOfWeek]
  }

  const barberSchedule = BARBER_WEEKLY_HOURS[barberId]
  if (!barberSchedule) {
    return SHOP_WEEKLY_HOURS[dayOfWeek]
  }

  return barberSchedule[dayOfWeek]
}

function overlapsBreak(barberId: string, slotHour: number, slotMinute: number, durationMinutes: number): boolean {
  const breaks = BARBER_BREAKS[barberId] ?? []
  const slotStart = slotHour * 60 + slotMinute
  const slotEnd = slotStart + durationMinutes

  return breaks.some((block) => {
    const blockStart = block.startHour * 60 + block.startMinute
    const blockEnd = block.endHour * 60 + block.endMinute

    return slotStart < blockEnd && slotEnd > blockStart
  })
}

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

  const serviceDurationMinutes = service.duration
  const now = new Date()
  const selectedDate = startOfDay(date)
  const today = startOfDay(now)
  const isToday = selectedDate.getTime() === today.getTime()

  const targetBarberIds = barber.id === 'any' ? service.barberIds : [barber.id]

  const anyWorkingHours = targetBarberIds
    .map((barberId) => getWorkingHours(barberId, dayOfWeek))
    .reduce<WorkingHours>(
      (acc, hours) => {
        if (hours.start === 0) return acc

        if (acc.start === 0 || hours.start < acc.start) {
          acc.start = hours.start
        }
        if (hours.end > acc.end) {
          acc.end = hours.end
        }

        return acc
      },
      { start: 0, end: 0 }
    )

  if (anyWorkingHours.start === 0 || anyWorkingHours.end === 0) {
    return slots
  }

  for (let hour = anyWorkingHours.start; hour < anyWorkingHours.end; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const slotTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      const slotDateTime = parse(slotTime, 'HH:mm', date)

      const availableForAnyBarber = targetBarberIds.some((barberId) => {
        const barberHours = getWorkingHours(barberId, dayOfWeek)
        if (barberHours.start === 0 || barberHours.end === 0) {
          return false
        }

        const slotStart = hour + minute / 60
        const slotEnd = slotStart + serviceDurationMinutes / 60

        const fitsWorkingWindow = slotStart >= barberHours.start && slotEnd <= barberHours.end
        if (!fitsWorkingWindow) {
          return false
        }

        if (overlapsBreak(barberId, hour, minute, serviceDurationMinutes)) {
          return false
        }

        if (isToday && isBefore(slotDateTime, now)) {
          return false
        }

        return true
      })

      slots.push({
        time: format(slotDateTime, 'h:mm a'),
        available: availableForAnyBarber,
        barberId: barber.id,
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
