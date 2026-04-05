import type {
  CreateCategoryFormData,
  EditCategoryFormData,
} from '#/schemas/category.schema'
import { api } from './api'
import type { ApiResponse, Category } from './types'

export async function fetchCategories(): Promise<ApiResponse<Category[]>> {
  const { data } = await api.get(`/categories`)
  return data
}

export async function createCategory(payload: CreateCategoryFormData) {
  const { data } = await api.post(`categories`, payload)
  return data
}

export async function editCategory(id: number, payload: EditCategoryFormData) {
  const { data } = await api.put(`categories/${id}`, payload)
  return data
}

export async function deleteCategory(id: number) {
  const { data } = await api.delete(`categories/${id}`)
  return data
}
