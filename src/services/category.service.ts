import { api } from './api'
import type { ApiResponse, Category } from './types'

export async function fetchCategories(): Promise<ApiResponse<Category[]>> {
  const { data } = await api.get(`/categories`)
  return data
}
