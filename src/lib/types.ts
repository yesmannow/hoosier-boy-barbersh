export interface Shop {
  id: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
  rating: number
  reviewCount: number
  amenities: string[]
  hours: BusinessHours
  images: string[]
}

export interface BusinessHours {
  monday: DayHours
  tuesday: DayHours
  wednesday: DayHours
  thursday: DayHours
  friday: DayHours
  saturday: DayHours
  sunday: DayHours
}

export interface DayHours {
  open: string
  close: string
  closed: boolean
}

export interface Barber {
  id: string
  name: string
  specialty: string
  description: string
  avatar?: string
  services: string[]
}

export interface Service {
  id: string
  name: string
  duration: number
  price?: number
  priceLabel?: string
  description: string
  category: 'popular' | 'standard' | 'premium' | 'hair-system'
  barberIds: string[]
  badge?: string
}

export interface TimeSlot {
  time: string
  available: boolean
  barberId?: string
}

export interface Appointment {
  id: string
  serviceId: string
  barberId: string
  date: string
  time: string
  customerName: string
  customerPhone: string
  customerEmail: string
  notes?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: string
}

export interface BookingState {
  service?: Service
  barber?: Barber
  date?: string
  time?: string
  customerName?: string
  customerPhone?: string
  customerEmail?: string
  notes?: string
  remindersEnabled?: boolean
  saveDetails?: boolean
}

export interface CustomerProfile {
  name: string
  phone: string
  email: string
  lastBooking?: {
    serviceId: string
    barberId: string
    date: string
  }
}
