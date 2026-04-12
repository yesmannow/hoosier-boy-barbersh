import { useKV } from '@github/spark/hooks'
import type { Appointment, CustomerProfile } from '@/lib/types'
import type { CreateAppointmentInput } from '@/lib/api/contracts'
import {
  createAppointmentRecord,
  hasAppointmentConflict,
  validateCustomerProfile,
} from '@/lib/api/bookingService'

const emptyProfile: CustomerProfile = {
  name: '',
  phone: '',
  email: '',
}


export interface BookingApi {
  customerProfile: CustomerProfile
  appointments: Appointment[]
  saveCustomerProfile: (profile: CustomerProfile) => void
  createAppointment: (input: CreateAppointmentInput) => { ok: true; appointment: Appointment } | { ok: false; error: string }
}

export function useBookingApi(): BookingApi {
  const [customerProfile, setCustomerProfile] = useKV<CustomerProfile>('customer-profile', emptyProfile)

  const [appointments, setAppointments] = useKV<Appointment[]>('appointments', [])

  const saveCustomerProfile = (profile: CustomerProfile) => {
    const validated = validateCustomerProfile(profile)
    setCustomerProfile(validated)
  }

  const createAppointment = (input: CreateAppointmentInput) => {
    const currentAppointments = appointments || []

    if (input.barberId !== 'any' && hasAppointmentConflict(currentAppointments, input)) {
      return { ok: false as const, error: 'That time was just booked. Please choose another slot.' }
    }

    const appointment = createAppointmentRecord(input)
    setAppointments((prev) => [...(prev || []), appointment])
    return { ok: true as const, appointment }
  }

  return {
    customerProfile: customerProfile || emptyProfile,
    appointments: appointments || [],
    saveCustomerProfile,
    createAppointment,
  }
}
