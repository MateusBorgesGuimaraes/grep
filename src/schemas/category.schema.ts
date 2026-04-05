import { z } from 'zod'

export const createCategorySchema = z.object({
  name: z.string().min(1, 'name is required').max(50, 'max 50 characters'),

  icon: z.string().max(50).optional(),

  color: z
    .string()
    .regex(/^#([0-9A-Fa-f]{3}){1,2}$/, 'invalid hex color')
    .optional(),
})

export type CreateCategoryFormData = z.infer<typeof createCategorySchema>

export const editCategorySchema = z.object({
  name: z
    .string()
    .min(1, 'name is required')
    .max(50, 'max 50 characters')
    .optional(),

  icon: z.string().max(50).optional(),

  color: z
    .string()
    .regex(/^#([0-9A-Fa-f]{3}){1,2}$/, 'invalid hex color')
    .optional(),
})

export type EditCategoryFormData = Partial<CreateCategoryFormData>
