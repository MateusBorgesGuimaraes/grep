import { api } from './api'

export async function refreshAllFeeds() {
  const { data } = await api.post(`/feeds/fetch-all`)
  return data
}
