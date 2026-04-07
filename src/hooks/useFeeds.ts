import { fetchFeeds } from '#/services/feeds'
import { useQuery } from '@tanstack/react-query'

export function useFeeds() {
  return useQuery({
    queryKey: ['feeds'],
    queryFn: fetchFeeds,
  })
}
