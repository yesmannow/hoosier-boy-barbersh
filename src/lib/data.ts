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
    services: ['jimmy-haircut', 'jimmy-beard-trim', 'jimmy-the-hour', 'jimmy-hair-and-beard']
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
    ]
  }
]

export const services: Service[] = [
  {
    id: 'jimmy-haircut',
    name: 'Haircut',
    duration: 30,
    price: 45,
    description: 'Classic cut with attention to detail and finishing touches',
    category: 'popular',
    barberIds: ['jimmy-bissonette'],
    badge: 'Most Booked'
  },
  {
    id: 'nate-haircut',
    name: 'Haircut',
    duration: 30,
    price: 50,
    description: 'Premium cut with meticulous styling and finishing',
    category: 'popular',
    barberIds: ['nate-gouty'],
    badge: 'Most Booked'
  },
  {
    id: 'jimmy-hair-and-beard',
    name: 'Hair + Beard',
    duration: 60,
    price: 80,
    description: 'Complete haircut and beard service in one session',
    category: 'popular',
    barberIds: ['jimmy-bissonette'],
    badge: 'Popular'
  },
  {
    id: 'jimmy-beard-trim',
    name: 'Beard Trim',
    duration: 30,
    price: 45,
    description: 'Precision beard shaping and grooming',
    category: 'standard',
    barberIds: ['jimmy-bissonette']
  },
  {
    id: 'jimmy-the-hour',
    name: 'The Hour',
    duration: 60,
    price: 80,
    description: 'Full grooming experience with extra time for perfection',
    category: 'premium',
    barberIds: ['jimmy-bissonette']
  },
  {
    id: 'nate-beard-trim',
    name: 'Beard Trim',
    duration: 30,
    price: 50,
    description: 'Precision beard shaping and grooming',
    category: 'standard',
    barberIds: ['nate-gouty']
  },
  {
    id: 'nate-the-hour',
    name: 'The Hour',
    duration: 60,
    price: 85,
    description: 'Full grooming experience with extra time for perfection',
    category: 'premium',
    barberIds: ['nate-gouty']
  },
  {
    id: 'nate-hair-and-beard',
    name: 'Hair + Beard',
    duration: 60,
    price: 85,
    description: 'Complete haircut and beard service in one session',
    category: 'standard',
    barberIds: ['nate-gouty']
  },
  {
    id: 'nate-hair-replacement-consult',
    name: 'Non-Surgical Hair Replacement Consult',
    duration: 30,
    priceLabel: 'Contact for pricing',
    description: 'Professional consultation for non-surgical hair replacement options',
    category: 'hair-system',
    barberIds: ['nate-gouty']
  },
  {
    id: 'nate-hair-replacement-installation',
    name: 'Non-Surgical Hair Replacement Installation',
    duration: 180,
    priceLabel: 'Contact for pricing',
    description: 'Complete installation of non-surgical hair replacement system',
    category: 'hair-system',
    barberIds: ['nate-gouty']
  },
  {
    id: 'nate-hair-replacement-maintenance',
    name: 'Non-Surgical Hair Replacement Maintenance',
    duration: 60,
    priceLabel: 'Contact for pricing',
    description: 'Regular maintenance and adjustment of your hair system',
    category: 'hair-system',
    barberIds: ['nate-gouty']
  },
  {
    id: 'nate-hair-replacement-maintenance-and-cut',
    name: 'Non-Surgical Hair Replacement Maintenance and Cut',
    duration: 120,
    priceLabel: 'Contact for pricing',
    description: 'Full maintenance service with haircut included',
    category: 'hair-system',
    barberIds: ['nate-gouty']
  }
]

export interface ServiceGroup {
  id: string
  name: string
  serviceIds: string[]
}

export const serviceGroups: ServiceGroup[] = [
  {
    id: 'popular-services',
    name: 'Popular Services',
    serviceIds: ['jimmy-haircut', 'nate-haircut', 'jimmy-hair-and-beard']
  },
  {
    id: 'services-with-jimmy',
    name: 'Services with Jimmy',
    serviceIds: ['jimmy-haircut', 'jimmy-beard-trim', 'jimmy-the-hour', 'jimmy-hair-and-beard']
  },
  {
    id: 'services-with-nate',
    name: 'Services with Nate',
    serviceIds: [
      'nate-haircut',
      'nate-beard-trim',
      'nate-the-hour',
      'nate-hair-and-beard',
      'nate-hair-replacement-consult',
      'nate-hair-replacement-installation',
      'nate-hair-replacement-maintenance',
      'nate-hair-replacement-maintenance-and-cut'
    ]
  }
]

export const servicePricing: Record<string, number | undefined> = {
  'jimmy-haircut': 45,
  'jimmy-beard-trim': 45,
  'jimmy-the-hour': 80,
  'jimmy-hair-and-beard': 80,
  'nate-haircut': 50,
  'nate-beard-trim': 50,
  'nate-the-hour': 85,
  'nate-hair-and-beard': 85,
  'nate-hair-replacement-consult': undefined,
  'nate-hair-replacement-installation': undefined,
  'nate-hair-replacement-maintenance': undefined,
  'nate-hair-replacement-maintenance-and-cut': undefined
}

export function getServicePrice(serviceId: string): number | undefined {
  return servicePricing[serviceId]
}

export function getServicePriceLabel(service: Service): string {
  if (service.priceLabel) return service.priceLabel
  if (service.price === undefined) return 'Contact for pricing'
  if (service.price === 0) return 'Complimentary'
  return `$${service.price}`
}
