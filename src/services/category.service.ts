import type { CreateCategoryFormData } from '#/schemas/create-category.schema'
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
