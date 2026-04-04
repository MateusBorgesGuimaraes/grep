import type { CreateCategoryFormData } from '#/schemas/create-category.schema'
import { createCategory } from '#/services/category.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'

export function useCreateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (category: CreateCategoryFormData) => createCategory(category),
    onSuccess: () => {
      toast.success('Category saved successfully!')
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? 'Error saving Category')
      }
    },
  })
}
