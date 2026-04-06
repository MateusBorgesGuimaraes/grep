import type { CreateFeedInput } from '#/schemas/feed.schema'
import { createFeed } from '#/services/feeds'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'

export function useCreateFeeds() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (feed: CreateFeedInput) => createFeed(feed),
    onSuccess: () => {
      toast.success('Feed saved successfully!')
      queryClient.invalidateQueries({ queryKey: ['feeds'] })
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? 'Error saving Feed')
      }
    },
  })
}
