import { api } from './api'
import type {
  ApiResponse,
  DataResponse,
  FetchItemParams,
  Item,
  SavedArticle,
} from './types'

export async function fetchArticles(
  params: FetchItemParams,
): Promise<ApiResponse<DataResponse<Item>>> {
  const queryParams = new URLSearchParams()
  queryParams.append('page', params.page.toString())
  queryParams.append('limit', params.limit.toString())
  if (params.search) queryParams.append('search', params.search)
  if (params.order) queryParams.append('order', params.order)
  if (params.categoryId)
    queryParams.append('categoryId', params.categoryId.toString())
  if (params.feedId) queryParams.append('feedId', params.feedId.toString())
  if (params.unreadOnly)
    queryParams.append('unreadOnly', params.unreadOnly.toString())

  const { data } = await api.get(`articles?${queryParams.toString()}`)
  return data
}

export async function saveArticle(articleId: number) {
  const { data } = await api.post(`saved-articles/${articleId}`)
  return data
}

export async function removeArticle(articleId: number) {
  const { data } = await api.delete(`saved-articles/${articleId}`)
  return data
}

export async function fetchSavedArticles(): Promise<
  ApiResponse<SavedArticle[]>
> {
  const { data } = await api.get(`saved-articles`)
  return data
}
