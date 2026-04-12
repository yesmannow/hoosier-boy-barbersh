import { z } from 'zod'

export const customerProfileSchema = z.object({
  name: z.string().trim().min(1),
  phone: z.string().trim().min(7),
  email: z.string().trim().email(),
  lastBooking: z
    .object({
      serviceId: z.string().min(1),
      barberId: z.string().min(1),
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    })
    .optional(),
})

export const createAppointmentInputSchema = z.object({
  serviceId: z.string().min(1),
  barberId: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().min(1),
  customerName: z.string().trim().min(1),
  customerPhone: z.string().trim().min(7),
  customerEmail: z.string().trim().email(),
  notes: z.string().optional(),
})

export type CreateAppointmentInput = z.infer<typeof createAppointmentInputSchema>
