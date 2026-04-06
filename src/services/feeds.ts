import type { CreateFeedInput } from '#/schemas/feed.schema'
import { api } from './api'

export async function refreshAllFeeds() {
  const { data } = await api.post(`/feeds/fetch-all`)
  return data
}

export async function createFeed(payload: CreateFeedInput) {
  const { data } = await api.post(`/feeds`, payload)
  return data
}
