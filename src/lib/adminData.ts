import type {
  BarberProfile,
  Client,
  Appointment,
  ShopProfile,
  ContactInfo,
  ReviewHighlight,
  GalleryItem,
  ExternalLink,
  QuickAction,
  Service
} from './types'
import { services as baseServices } from './data'
import logo from '@/assets/images/Hoosierboy_Barbershop_logo_1.png'
import heroImage from '@/assets/images/20230518_134642-1024x768.jpg'
import stationImage from '@/assets/images/20230518_130811-2-1024x728.jpg'
import moodImage from '@/assets/images/Firefly-American-white-men-in-an-Indiana-barber-shop-add-fish-in-the-background-6395.jpg'

export const barberProfiles: BarberProfile[] = [
  {
    id: 'jimmy-bissonette',
    name: 'Jimmy Bissonette',
    specialty: 'Classic Cuts & Beard Work',
    description: 'Expert in timeless styles and precision beard grooming',
    services: ['jimmy-haircut', 'jimmy-beard-trim', 'jimmy-the-hour', 'jimmy-hair-and-beard'],
    workingHours: {
      monday: { open: '', close: '', closed: true },
      tuesday: { open: '', close: '', closed: true },
      wednesday: { open: '8:00 AM', close: '4:00 PM', closed: false },
      thursday: { open: '8:00 AM', close: '7:00 PM', closed: false },
      friday: { open: '8:00 AM', close: '7:00 PM', closed: false },
      saturday: { open: '10:00 AM', close: '3:00 PM', closed: false },
      sunday: { open: '', close: '', closed: true }
    },
    daysAvailable: ['wednesday', 'thursday', 'friday', 'saturday'],
    blockedBreaks: [
      {
        id: 'jimmy-lunch-1',
        type: 'break',
        startTime: '12:00',
        endTime: '12:30',
        recurring: true,
        note: 'Lunch'
      }
    ],
    defaultBufferTime: 5,
    bookingStatus: 'available',
    publicSummary: 'Jimmy brings years of traditional barbering expertise with a focus on classic cuts and expert beard sculpting. Known for his attention to detail and friendly conversation.',
    publicSpecialties: ['Classic Cuts', 'Beard Sculpting', 'Traditional Barbering']
  },
  {
    id: 'nate-gouty',
    name: 'Nate Gouty',
    specialty: 'Premium Cuts & Hair Systems',
    description: 'Specialist in modern styling and non-surgical hair replacement',
    services: [
      'nate-haircut',
      'nate-beard-trim',
      'nate-the-hour',
      'nate-hair-and-beard',
      'nate-hair-replacement-consult',
      'nate-hair-replacement-installation',
      'nate-hair-replacement-maintenance',
      'nate-hair-replacement-maintenance-and-cut'
    ],
    workingHours: {
      monday: { open: '', close: '', closed: true },
      tuesday: { open: '', close: '', closed: true },
      wednesday: { open: '8:00 AM', close: '4:00 PM', closed: false },
      thursday: { open: '8:00 AM', close: '7:00 PM', closed: false },
      friday: { open: '8:00 AM', close: '7:00 PM', closed: false },
      saturday: { open: '10:00 AM', close: '3:00 PM', closed: false },
      sunday: { open: '', close: '', closed: true }
    },
    daysAvailable: ['wednesday', 'thursday', 'friday', 'saturday'],
    blockedBreaks: [
      {
        id: 'nate-lunch-1',
        type: 'break',
        startTime: '12:30',
        endTime: '13:00',
        recurring: true,
        note: 'Lunch'
      }
    ],
    defaultBufferTime: 5,
    bookingStatus: 'available',
    publicSummary: 'Nate specializes in contemporary cuts and is the go-to expert for non-surgical hair replacement systems. His modern approach and technical expertise make him a favorite for clients seeking precision styling.',
    publicSpecialties: ['Modern Cuts', 'Hair Systems', 'Precision Styling', 'Hair Replacement']
  }
]

export const clients: Client[] = [
  {
    id: 'client-001',
    name: 'Michael Thompson',
    phone: '(317) 555-0101',
    email: 'mthompson@email.com',
    preferredBarberId: 'jimmy-bissonette',
    favoriteServices: ['jimmy-haircut', 'jimmy-beard-trim'],
    appointmentHistory: ['apt-001', 'apt-015', 'apt-032'],
    noShowCount: 0,
    cancellationCount: 1,
    totalSpend: 450,
    lastVisit: '2024-01-08',
    internalNotes: 'Prefers low taper fade, likes conversation about sports',
    createdAt: '2023-06-15T10:00:00Z'
  },
  {
    id: 'client-002',
    name: 'David Rodriguez',
    phone: '(317) 555-0102',
    email: 'drodriguez@email.com',
    preferredBarberId: 'nate-gouty',
    favoriteServices: ['nate-hair-and-beard'],
    appointmentHistory: ['apt-003', 'apt-019'],
    noShowCount: 0,
    cancellationCount: 0,
    totalSpend: 340,
    lastVisit: '2024-01-10',
    nextAppointment: 'apt-today-002',
    internalNotes: 'Hair system maintenance client, usually books 4-week cycles',
    createdAt: '2023-08-22T14:30:00Z'
  },
  {
    id: 'client-003',
    name: 'Robert Chen',
    phone: '(317) 555-0103',
    email: 'rchen@email.com',
    favoriteServices: ['jimmy-the-hour'],
    appointmentHistory: ['apt-007'],
    noShowCount: 0,
    cancellationCount: 0,
    totalSpend: 160,
    lastVisit: '2024-01-05',
    nextAppointment: 'apt-today-005',
    internalNotes: 'New client, prefers quiet appointments',
    createdAt: '2024-01-02T09:15:00Z'
  },
  {
    id: 'client-004',
    name: 'James Wilson',
    phone: '(317) 555-0104',
    email: 'jwilson@email.com',
    preferredBarberId: 'jimmy-bissonette',
    favoriteServices: ['jimmy-haircut'],
    appointmentHistory: ['apt-011', 'apt-021', 'apt-029', 'apt-036'],
    noShowCount: 1,
    cancellationCount: 2,
    totalSpend: 540,
    lastVisit: '2024-01-09',
    internalNotes: 'Regular - every 3 weeks. Can run late.',
    createdAt: '2023-05-10T11:20:00Z'
  },
  {
    id: 'client-005',
    name: 'Christopher Anderson',
    phone: '(317) 555-0105',
    email: 'canderson@email.com',
    preferredBarberId: 'nate-gouty',
    favoriteServices: ['nate-haircut', 'nate-beard-trim'],
    appointmentHistory: ['apt-013', 'apt-024'],
    noShowCount: 0,
    cancellationCount: 0,
    totalSpend: 200,
    lastVisit: '2023-12-28',
    nextAppointment: 'apt-today-007',
    internalNotes: 'Likes beard kept fuller on chin, low maintenance style',
    createdAt: '2023-11-05T16:45:00Z'
  },
  {
    id: 'client-006',
    name: 'Matthew Brown',
    phone: '(317) 555-0106',
    email: 'mbrown@email.com',
    favoriteServices: ['nate-hair-replacement-maintenance'],
    appointmentHistory: ['apt-017', 'apt-027'],
    noShowCount: 0,
    cancellationCount: 0,
    totalSpend: 1200,
    lastVisit: '2023-12-18',
    internalNotes: 'Hair system client since Aug 2023. Maintenance every 5-6 weeks.',
    createdAt: '2023-08-01T10:00:00Z'
  },
  {
    id: 'client-007',
    name: 'Daniel Martinez',
    phone: '(317) 555-0107',
    email: 'dmartinez@email.com',
    favoriteServices: ['jimmy-hair-and-beard'],
    appointmentHistory: ['apt-009'],
    noShowCount: 0,
    cancellationCount: 0,
    totalSpend: 80,
    lastVisit: '2024-01-03',
    nextAppointment: 'apt-today-009',
    internalNotes: 'Walk-in preferred, flexible on timing',
    createdAt: '2024-01-03T13:00:00Z'
  },
  {
    id: 'client-008',
    name: 'Joseph Taylor',
    phone: '(317) 555-0108',
    email: 'jtaylor@email.com',
    preferredBarberId: 'nate-gouty',
    favoriteServices: ['nate-the-hour'],
    appointmentHistory: ['apt-005', 'apt-014', 'apt-023', 'apt-031'],
    noShowCount: 0,
    cancellationCount: 0,
    totalSpend: 680,
    lastVisit: '2024-01-06',
    nextAppointment: 'apt-today-003',
    internalNotes: 'Executive client - values precision and efficiency',
    createdAt: '2023-07-12T15:30:00Z'
  },
  {
    id: 'client-009',
    name: 'Thomas Johnson',
    phone: '(317) 555-0109',
    email: 'tjohnson@email.com',
    preferredBarberId: 'jimmy-bissonette',
    favoriteServices: ['jimmy-haircut'],
    appointmentHistory: ['apt-012', 'apt-025'],
    noShowCount: 0,
    cancellationCount: 1,
    totalSpend: 180,
    lastVisit: '2023-12-22',
    internalNotes: 'Kid client (age 10), parent books appointments',
    createdAt: '2023-09-18T10:00:00Z'
  },
  {
    id: 'client-010',
    name: 'Steven Garcia',
    phone: '(317) 555-0110',
    email: 'sgarcia@email.com',
    favoriteServices: ['nate-haircut'],
    appointmentHistory: ['apt-016'],
    noShowCount: 0,
    cancellationCount: 0,
    totalSpend: 100,
    lastVisit: '2024-01-11',
    nextAppointment: 'apt-today-011',
    internalNotes: 'First-time client, friend referral',
    createdAt: '2024-01-11T12:00:00Z'
  }
]

const todayDate = new Date().toISOString().split('T')[0]

export const appointments: Appointment[] = [
  {
    id: 'apt-today-001',
    serviceId: 'jimmy-haircut',
    barberId: 'jimmy-bissonette',
    date: todayDate,
    time: '08:00',
    customerName: 'Michael Thompson',
    customerPhone: '(317) 555-0101',
    customerEmail: 'mthompson@email.com',
    status: 'completed',
    createdAt: '2024-01-10T14:22:00Z',
    statusHistory: [
      { status: 'confirmed', timestamp: '2024-01-10T14:22:00Z' },
      { status: 'arrived', timestamp: `${todayDate}T08:00:00Z` },
      { status: 'in-service', timestamp: `${todayDate}T08:02:00Z` },
      { status: 'completed', timestamp: `${todayDate}T08:28:00Z` }
    ]
  },
  {
    id: 'apt-today-002',
    serviceId: 'nate-hair-and-beard',
    barberId: 'nate-gouty',
    date: todayDate,
    time: '08:00',
    customerName: 'David Rodriguez',
    customerPhone: '(317) 555-0102',
    customerEmail: 'drodriguez@email.com',
    status: 'completed',
    internalNotes: 'Regular client, hair system touch-up needed',
    createdAt: '2024-01-09T09:15:00Z',
    statusHistory: [
      { status: 'confirmed', timestamp: '2024-01-09T09:15:00Z' },
      { status: 'arrived', timestamp: `${todayDate}T07:58:00Z` },
      { status: 'in-service', timestamp: `${todayDate}T08:01:00Z` },
      { status: 'completed', timestamp: `${todayDate}T08:55:00Z` }
    ]
  },
  {
    id: 'apt-today-003',
    serviceId: 'nate-the-hour',
    barberId: 'nate-gouty',
    date: todayDate,
    time: '09:00',
    customerName: 'Joseph Taylor',
    customerPhone: '(317) 555-0108',
    customerEmail: 'jtaylor@email.com',
    status: 'in-service',
    createdAt: '2024-01-08T16:40:00Z',
    statusHistory: [
      { status: 'confirmed', timestamp: '2024-01-08T16:40:00Z' },
      { status: 'arrived', timestamp: `${todayDate}T09:00:00Z` },
      { status: 'in-service', timestamp: `${todayDate}T09:03:00Z` }
    ]
  },
  {
    id: 'apt-today-004',
    serviceId: 'jimmy-beard-trim',
    barberId: 'jimmy-bissonette',
    date: todayDate,
    time: '09:00',
    customerName: 'Brian Foster',
    customerPhone: '(317) 555-0201',
    customerEmail: 'bfoster@email.com',
    status: 'arrived',
    notes: 'First time visit',
    createdAt: '2024-01-11T08:30:00Z',
    statusHistory: [
      { status: 'confirmed', timestamp: '2024-01-11T08:30:00Z' },
      { status: 'arrived', timestamp: `${todayDate}T08:58:00Z` }
    ]
  },
  {
    id: 'apt-today-005',
    serviceId: 'jimmy-the-hour',
    barberId: 'jimmy-bissonette',
    date: todayDate,
    time: '10:00',
    customerName: 'Robert Chen',
    customerPhone: '(317) 555-0103',
    customerEmail: 'rchen@email.com',
    status: 'confirmed',
    createdAt: '2024-01-09T11:20:00Z'
  },
  {
    id: 'apt-today-006',
    serviceId: 'nate-haircut',
    barberId: 'nate-gouty',
    date: todayDate,
    time: '10:30',
    customerName: 'Marcus Wright',
    customerPhone: '(317) 555-0202',
    customerEmail: 'mwright@email.com',
    status: 'confirmed',
    createdAt: '2024-01-10T19:45:00Z'
  },
  {
    id: 'apt-today-007',
    serviceId: 'nate-haircut',
    barberId: 'nate-gouty',
    date: todayDate,
    time: '11:00',
    customerName: 'Christopher Anderson',
    customerPhone: '(317) 555-0105',
    customerEmail: 'canderson@email.com',
    status: 'late',
    internalNotes: 'Called running 15 min late',
    createdAt: '2024-01-07T15:30:00Z',
    statusHistory: [
      { status: 'confirmed', timestamp: '2024-01-07T15:30:00Z' },
      { status: 'late', timestamp: `${todayDate}T11:05:00Z`, note: 'Client called - running 15 min late' }
    ]
  },
  {
    id: 'apt-today-008',
    serviceId: 'jimmy-haircut',
    barberId: 'jimmy-bissonette',
    date: todayDate,
    time: '11:30',
    customerName: 'Andrew Collins',
    customerPhone: '(317) 555-0203',
    customerEmail: 'acollins@email.com',
    status: 'confirmed',
    createdAt: '2024-01-11T07:15:00Z'
  },
  {
    id: 'apt-today-009',
    serviceId: 'jimmy-hair-and-beard',
    barberId: 'jimmy-bissonette',
    date: todayDate,
    time: '13:00',
    customerName: 'Daniel Martinez',
    customerPhone: '(317) 555-0107',
    customerEmail: 'dmartinez@email.com',
    status: 'confirmed',
    createdAt: '2024-01-10T21:30:00Z'
  },
  {
    id: 'apt-today-010',
    serviceId: 'nate-hair-replacement-maintenance',
    barberId: 'nate-gouty',
    date: todayDate,
    time: '13:30',
    customerName: 'Matthew Brown',
    customerPhone: '(317) 555-0106',
    customerEmail: 'mbrown@email.com',
    status: 'confirmed',
    internalNotes: '6-week maintenance cycle',
    customPrice: 250,
    createdAt: '2024-01-06T10:00:00Z'
  },
  {
    id: 'apt-today-011',
    serviceId: 'nate-haircut',
    barberId: 'nate-gouty',
    date: todayDate,
    time: '15:00',
    customerName: 'Steven Garcia',
    customerPhone: '(317) 555-0110',
    customerEmail: 'sgarcia@email.com',
    status: 'confirmed',
    notes: 'Friend recommended Hoosier Boy',
    createdAt: '2024-01-11T13:00:00Z'
  },
  {
    id: 'apt-today-012',
    serviceId: 'jimmy-beard-trim',
    barberId: 'jimmy-bissonette',
    date: todayDate,
    time: '14:30',
    customerName: 'Kevin Palmer',
    customerPhone: '(317) 555-0204',
    customerEmail: 'kpalmer@email.com',
    status: 'no-show',
    createdAt: '2024-01-09T18:20:00Z',
    statusHistory: [
      { status: 'confirmed', timestamp: '2024-01-09T18:20:00Z' },
      { status: 'no-show', timestamp: `${todayDate}T14:45:00Z`, note: 'Did not show or call' }
    ]
  },
  {
    id: 'apt-today-013',
    serviceId: 'jimmy-the-hour',
    barberId: 'jimmy-bissonette',
    date: todayDate,
    time: '15:30',
    customerName: 'Gregory Hayes',
    customerPhone: '(317) 555-0205',
    customerEmail: 'ghayes@email.com',
    status: 'cancelled',
    createdAt: '2024-01-08T12:10:00Z',
    statusHistory: [
      { status: 'confirmed', timestamp: '2024-01-08T12:10:00Z' },
      { status: 'cancelled', timestamp: `${todayDate}T08:30:00Z`, note: 'Family emergency - rescheduled for next week' }
    ]
  },
  {
    id: 'apt-today-014',
    serviceId: 'nate-beard-trim',
    barberId: 'nate-gouty',
    date: todayDate,
    time: '16:00',
    customerName: 'Patrick Reed',
    customerPhone: '(317) 555-0206',
    customerEmail: 'preed@email.com',
    status: 'confirmed',
    createdAt: '2024-01-11T09:45:00Z'
  },
  {
    id: 'apt-today-015',
    serviceId: 'jimmy-haircut',
    barberId: 'jimmy-bissonette',
    date: todayDate,
    time: '17:00',
    customerName: 'Samuel Cooper',
    customerPhone: '(317) 555-0207',
    customerEmail: 'scooper@email.com',
    status: 'confirmed',
    createdAt: '2024-01-10T14:00:00Z'
  }
]

export const shopProfile: ShopProfile = {
  name: 'Hoosier Boy Barbershop',
  tagline: 'Classic Cuts, Modern Service',
  about: 'A premier barbershop in Noblesville, Indiana, offering traditional barbering with modern expertise. Specializing in classic cuts, beard work, and non-surgical hair replacement systems.',
  logoImage: logo,
  heroImage: heroImage,
  trustBullets: [
    '5.0 rating with 244+ reviews',
    'Expert barbers with years of experience',
    'Specializing in hair replacement systems',
    'Located in Town Center of Noblesville'
  ],
  bookingNote: 'Book online for fastest service and preferred time slots'
}

export const contactInfo: ContactInfo = {
  address: '13901 Town Center Blvd., Suite 500',
  city: 'Noblesville',
  state: 'IN',
  zip: '46060',
  phone: '(317) 900-1290',
  email: 'HoosierBoyBarbershop@gmail.com',
  hours: {
    monday: { open: '', close: '', closed: true },
    tuesday: { open: '', close: '', closed: true },
    wednesday: { open: '8:00 AM', close: '4:00 PM', closed: false },
    thursday: { open: '8:00 AM', close: '7:00 PM', closed: false },
    friday: { open: '8:00 AM', close: '7:00 PM', closed: false },
    saturday: { open: '10:00 AM', close: '3:00 PM', closed: false },
    sunday: { open: '', close: '', closed: true }
  },
  mapLink: 'https://maps.google.com/?q=13901+Town+Center+Blvd+Suite+500+Noblesville+IN+46060',
  websiteLink: 'https://hoosierboybarbershop.com'
}

export const reviewHighlights: ReviewHighlight = {
  id: 'reviews-main',
  rating: 5.0,
  reviewCount: 244,
  quotes: [
    {
      id: 'review-001',
      text: 'Best barbershop in Noblesville. Jimmy and Nate are true professionals.',
      author: 'Mark S.',
      rating: 5
    },
    {
      id: 'review-002',
      text: 'Nate did an amazing job with my hair system. Life changing experience.',
      author: 'David R.',
      rating: 5
    },
    {
      id: 'review-003',
      text: 'Always get a great cut. Clean shop, friendly service, fair prices.',
      author: 'Mike T.',
      rating: 5
    },
    {
      id: 'review-004',
      text: 'Jimmy is the best! Been going to him for years.',
      author: 'Chris P.',
      rating: 5
    },
    {
      id: 'review-005',
      text: 'Professional atmosphere, skilled barbers, highly recommend.',
      author: 'Tom W.',
      rating: 5
    },
    {
      id: 'review-006',
      text: 'Great cuts every time. Easy online booking makes it convenient.',
      author: 'Jason L.',
      rating: 5
    }
  ],
  themeTags: ['Professional', 'Skilled', 'Friendly', 'Clean', 'Expert Hair Systems']
}

export const galleryItems: GalleryItem[] = [
  {
    id: 'gallery-001',
    imagePath: heroImage,
    title: 'Meet The Team',
    altText: 'Jimmy and Nate at Hoosier Boy Barbershop',
    sortOrder: 1,
    featured: true
  },
  {
    id: 'gallery-002',
    imagePath: stationImage,
    title: 'Tools of the Trade',
    altText: 'Professional barbering tools and station',
    sortOrder: 2,
    featured: true
  },
  {
    id: 'gallery-003',
    imagePath: moodImage,
    title: 'Classic Barbershop Experience',
    altText: 'Traditional barbershop atmosphere',
    sortOrder: 3,
    featured: false
  }
]

export const externalLinks: ExternalLink[] = [
  {
    id: 'link-website',
    label: 'Full Website',
    url: 'https://hoosierboybarbershop.com'
  },
  {
    id: 'link-gallery',
    label: 'Photo Gallery',
    url: 'https://hoosierboybarbershop.com/gallery'
  },
  {
    id: 'link-reviews',
    label: 'Read All Reviews',
    url: 'https://hoosierboybarbershop.com/reviews'
  },
  {
    id: 'link-location',
    label: 'Directions',
    url: 'https://maps.google.com/?q=13901+Town+Center+Blvd+Suite+500+Noblesville+IN+46060'
  }
]

export const quickActions: QuickAction[] = [
  {
    id: 'action-book-again',
    label: 'Book Again',
    action: 'book-again',
    icon: 'calendar-plus'
  },
  {
    id: 'action-view-hours',
    label: 'View Hours',
    action: 'view-hours',
    icon: 'clock'
  },
  {
    id: 'action-call-shop',
    label: 'Call Shop',
    action: 'call-shop',
    icon: 'phone'
  },
  {
    id: 'action-directions',
    label: 'Get Directions',
    action: 'directions',
    icon: 'map-pin'
  }
]

export const adminServices: Service[] = baseServices.map(service => ({
  ...service,
  category: service.category as 'popular' | 'standard' | 'premium' | 'hair-system'
}))

export function getServiceById(serviceId: string): Service | undefined {
  return adminServices.find(s => s.id === serviceId)
}

export function getBarberById(barberId: string): BarberProfile | undefined {
  return barberProfiles.find(b => b.id === barberId)
}

export function getClientById(clientId: string): Client | undefined {
  return clients.find(c => c.id === clientId)
}

export function getAppointmentsByDate(date: string): Appointment[] {
  return appointments.filter(apt => apt.date === date)
}

export function getAppointmentsByBarber(barberId: string, date?: string): Appointment[] {
  if (date) {
    return appointments.filter(apt => apt.barberId === barberId && apt.date === date)
  }
  return appointments.filter(apt => apt.barberId === barberId)
}

export function getTodayMetrics() {
  const today = new Date().toISOString().split('T')[0]
  const todayAppts = getAppointmentsByDate(today)
  
  const completed = todayAppts.filter(a => a.status === 'completed').length
  const upcoming = todayAppts.filter(a => ['confirmed', 'arrived', 'in-service'].includes(a.status)).length
  const noShows = todayAppts.filter(a => a.status === 'no-show').length
  const cancellations = todayAppts.filter(a => a.status === 'cancelled').length
  
  const revenue = todayAppts
    .filter(a => a.status === 'completed' || a.status === 'in-service')
    .reduce((sum, apt) => {
      if (apt.customPrice) return sum + apt.customPrice
      const service = getServiceById(apt.serviceId)
      return sum + (service?.price || 0)
    }, 0)
  
  return {
    todayAppointments: todayAppts.length,
    appointmentsCompleted: completed,
    upcomingAppointments: upcoming,
    availableGaps: 8,
    expectedRevenue: revenue,
    noShows,
    cancellations,
    weeklyRevenue: revenue * 4
  }
}
