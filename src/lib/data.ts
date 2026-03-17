import type { Shop, Barber, Service } from './types'

export const shop: Shop = {
  id: 'hoosier-boy-barbershop',
  name: 'Hoosier Boy Barbershop',
  address: '13901 Town Center Blvd, Suite 500, 18',
  city: 'Noblesville',
  state: 'IN',
  zip: '46060',
  phone: '(317) 555-0100',
  rating: 5.0,
  reviewCount: 244,
  amenities: [
    'Parking Available',
    'Wi-Fi',
    'Credit Cards Accepted',
    'Wheelchair Accessible',
    'Kid-Friendly'
  ],
  hours: {
    monday: { open: '9:00 AM', close: '6:00 PM', closed: false },
    tuesday: { open: '9:00 AM', close: '6:00 PM', closed: false },
    wednesday: { open: '9:00 AM', close: '6:00 PM', closed: false },
    thursday: { open: '9:00 AM', close: '7:00 PM', closed: false },
    friday: { open: '9:00 AM', close: '7:00 PM', closed: false },
    saturday: { open: '8:00 AM', close: '4:00 PM', closed: false },
    sunday: { open: '', close: '', closed: true }
  },
  images: []
}

export const barbers: Barber[] = [
  {
    id: 'jimmy-bissonette',
    name: 'Jimmy Bissonette',
    specialty: 'Classic Cuts & Beard Work',
    description: 'Expert in timeless styles and precision beard grooming',
    services: ['haircut', 'beard-trim', 'the-hour', 'hair-beard']
  },
  {
    id: 'nate-gouty',
    name: 'Nate Gouty',
    specialty: 'Premium Cuts & Hair Systems',
    description: 'Specialist in modern styling and non-surgical hair replacement',
    services: ['haircut', 'beard-trim', 'the-hour', 'hair-beard', 'hair-system-consult', 'hair-system-install', 'hair-system-maintenance', 'hair-system-maintenance-cut']
  }
]

export const services: Service[] = [
  {
    id: 'haircut',
    name: 'Haircut',
    duration: 30,
    description: 'Classic cut with attention to detail and finishing touches',
    category: 'popular',
    barberIds: ['jimmy-bissonette', 'nate-gouty'],
    badge: 'Most Booked'
  },
  {
    id: 'beard-trim',
    name: 'Beard Trim',
    duration: 30,
    description: 'Precision beard shaping and grooming',
    category: 'standard',
    barberIds: ['jimmy-bissonette', 'nate-gouty']
  },
  {
    id: 'the-hour',
    name: 'The Hour',
    duration: 60,
    description: 'Full grooming experience with extra time for perfection',
    category: 'premium',
    barberIds: ['jimmy-bissonette', 'nate-gouty']
  },
  {
    id: 'hair-beard',
    name: 'Hair + Beard',
    duration: 60,
    description: 'Complete haircut and beard service in one session',
    category: 'popular',
    barberIds: ['jimmy-bissonette', 'nate-gouty'],
    badge: 'Popular'
  },
  {
    id: 'hair-system-consult',
    name: 'Hair Replacement Consultation',
    duration: 30,
    priceLabel: 'Complimentary',
    description: 'Professional consultation for non-surgical hair replacement options',
    category: 'hair-system',
    barberIds: ['nate-gouty']
  },
  {
    id: 'hair-system-install',
    name: 'Hair System Installation',
    duration: 180,
    priceLabel: 'Contact for pricing',
    description: 'Complete installation of non-surgical hair replacement system',
    category: 'hair-system',
    barberIds: ['nate-gouty']
  },
  {
    id: 'hair-system-maintenance',
    name: 'Hair System Maintenance',
    duration: 60,
    priceLabel: 'Contact for pricing',
    description: 'Regular maintenance and adjustment of your hair system',
    category: 'hair-system',
    barberIds: ['nate-gouty']
  },
  {
    id: 'hair-system-maintenance-cut',
    name: 'Hair System Maintenance + Cut',
    duration: 120,
    priceLabel: 'Contact for pricing',
    description: 'Full maintenance service with haircut included',
    category: 'hair-system',
    barberIds: ['nate-gouty']
  }
]

export const servicePricing: Record<string, Record<string, number | undefined>> = {
  'haircut': {
    'jimmy-bissonette': 45,
    'nate-gouty': 50
  },
  'beard-trim': {
    'jimmy-bissonette': 45,
    'nate-gouty': 50
  },
  'the-hour': {
    'jimmy-bissonette': 80,
    'nate-gouty': 85
  },
  'hair-beard': {
    'jimmy-bissonette': 80,
    'nate-gouty': 85
  },
  'hair-system-consult': {
    'nate-gouty': 0
  },
  'hair-system-install': {
    'nate-gouty': undefined
  },
  'hair-system-maintenance': {
    'nate-gouty': undefined
  },
  'hair-system-maintenance-cut': {
    'nate-gouty': undefined
  }
}

export function getServicePrice(serviceId: string, barberId: string): number | undefined {
  return servicePricing[serviceId]?.[barberId]
}

export function getServicePriceLabel(service: Service, barberId: string): string {
  if (service.priceLabel) return service.priceLabel
  const price = getServicePrice(service.id, barberId)
  if (price === undefined) return 'Contact for pricing'
  if (price === 0) return 'Complimentary'
  return `$${price}`
}
