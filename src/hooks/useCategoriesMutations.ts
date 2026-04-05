import type {
  CreateCategoryFormData,
  EditCategoryFormData,
} from '#/schemas/category.schema'
import {
  createCategory,
  deleteCategory,
  editCategory,
} from '#/services/category.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'

type EditCategoryPayload = {
  id: number
  data: EditCategoryFormData
}

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

export function useEditCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: EditCategoryPayload) => editCategory(id, data),
    onSuccess: () => {
      toast.success('Edit successfully!')
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? 'Error on edit Category')
      }
    },
  })
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: () => {
      toast.success('Category removed successfully!')
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? 'Error removing Category')
      }
    },
  })
}
