import { z } from 'zod'

export const createFeedSchema = z.object({
  name: z.string().min(1, 'name is required').max(50, 'max 50 characters'),
  url: z.url(),
  categoryId: z.coerce.number().optional(),
})

export type CreateFeedInput = z.input<typeof createFeedSchema>
export type CreateFeedOutput = z.output<typeof createFeedSchema>
