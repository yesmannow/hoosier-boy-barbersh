import type { Appointment } from '@/lib/types'
import {
  createAppointmentInputSchema,
  customerProfileSchema,
  type CreateAppointmentInput,
} from './contracts'

export function validateCustomerProfile(profile: unknown) {
  return customerProfileSchema.parse(profile)
}

export function createAppointmentRecord(input: CreateAppointmentInput): Appointment {
  const payload = createAppointmentInputSchema.parse(input)

  return {
    id: `apt-${Date.now()}`,
    serviceId: payload.serviceId,
    barberId: payload.barberId,
    date: payload.date,
    time: payload.time,
    customerName: payload.customerName,
    customerPhone: payload.customerPhone,
    customerEmail: payload.customerEmail,
    notes: payload.notes,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  }
}

export function hasAppointmentConflict(appointments: Appointment[], candidate: CreateAppointmentInput): boolean {
  return appointments.some(
    (appointment) =>
      appointment.barberId === candidate.barberId &&
      appointment.date === candidate.date &&
      appointment.time === candidate.time &&
      appointment.status !== 'cancelled' &&
      appointment.status !== 'no-show'
  )
}
