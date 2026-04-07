import type { CreateFeedInput } from '#/schemas/feed.schema'
import {
  createFeed,
  deleteFeed,
  refreshOneFeed,
  toggleFeed,
} from '#/services/feeds'
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

export function useToggleFeed() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => toggleFeed(id),
    onSuccess: () => {
      toast.success('Changes successfully!')
      queryClient.invalidateQueries({ queryKey: ['feeds'] })
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? 'Error changing Feed')
      }
    },
  })
}

export function useRefreshFeed() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => refreshOneFeed(id),
    onSuccess: () => {
      toast.success('Feed refresh successfully!')
      queryClient.invalidateQueries({ queryKey: ['feeds'] })
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? 'Error refreshing Feed')
      }
    },
  })
}

export function useRemoveFeed() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteFeed(id),
    onSuccess: () => {
      toast.success('Feed removed successfully!')
      queryClient.invalidateQueries({ queryKey: ['feeds'] })
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? 'Error removing Feed')
      }
    },
  })
}
