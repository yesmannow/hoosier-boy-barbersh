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
  internalNotes?: string
  status: 'pending' | 'confirmed' | 'arrived' | 'in-service' | 'completed' | 'cancelled' | 'no-show' | 'late'
  createdAt: string
  statusHistory?: StatusHistoryEntry[]
  customPrice?: number
}

export interface StatusHistoryEntry {
  status: Appointment['status']
  timestamp: string
  note?: string
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

export interface Client {
  id: string
  name: string
  phone: string
  email: string
  preferredBarberId?: string
  favoriteServices: string[]
  appointmentHistory: string[]
  noShowCount: number
  cancellationCount: number
  totalSpend: number
  lastVisit?: string
  nextAppointment?: string
  internalNotes?: string
  createdAt: string
}

export interface BarberProfile extends Barber {
  workingHours: BusinessHours
  daysAvailable: string[]
  blockedBreaks: TimeBlock[]
  defaultBufferTime: number
  bookingStatus: 'available' | 'off' | 'fully-booked' | 'specialty-only'
  profileImage?: string
  publicSummary: string
  publicSpecialties: string[]
  priceOverrides?: Record<string, number>
}

export interface TimeBlock {
  id: string
  type: 'break' | 'blocked' | 'off'
  startTime: string
  endTime: string
  recurring?: boolean
  note?: string
}

export interface ShopProfile {
  name: string
  tagline: string
  about: string
  logoImage: string
  heroImage: string
  trustBullets: string[]
  bookingNote: string
}

export interface ContactInfo {
  address: string
  city: string
  state: string
  zip: string
  phone: string
  email: string
  hours: BusinessHours
  mapLink?: string
  websiteLink?: string
}

export interface ReviewHighlight {
  id: string
  rating: number
  reviewCount: number
  quotes: ReviewQuote[]
  themeTags: string[]
}

export interface ReviewQuote {
  id: string
  text: string
  author: string
  rating: number
}

export interface GalleryItem {
  id: string
  imagePath: string
  title: string
  altText: string
  sortOrder: number
  featured: boolean
}

export interface ExternalLink {
  id: string
  label: string
  url: string
  icon?: string
}

export interface QuickAction {
  id: string
  label: string
  action: string
  icon: string
}

export interface DashboardMetrics {
  todayAppointments: number
  appointmentsCompleted: number
  upcomingAppointments: number
  availableGaps: number
  expectedRevenue: number
  noShows: number
  cancellations: number
  weeklyRevenue: number
}

export type UserRole = 'owner' | 'barber' | 'customer'
