import type { CreateFeedInput } from '#/schemas/feed.schema'
import { api } from './api'
import type { ApiResponse, Feed } from './types'

export async function refreshAllFeeds() {
  const { data } = await api.post(`/feeds/fetch-all`)
  return data
}

export async function createFeed(payload: CreateFeedInput) {
  const { data } = await api.post(`/feeds`, payload)
  return data
}

export async function toggleFeed(id: number) {
  const { data } = await api.patch(`/feeds/${id}/toggle`)
  return data
}

export async function fetchFeeds(): Promise<ApiResponse<Feed[]>> {
  const { data } = await api.get(`/feeds`)
  return data
}

export async function refreshOneFeed(id: number) {
  const { data } = await api.post(`/feeds/${id}/fetch`)
  return data
}

export async function deleteFeed(id: number) {
  const { data } = await api.delete(`/feeds/${id}`)
  return data
}
