import { refreshAllFeeds } from '#/services/feeds'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'

export function useRefreshFeeds() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => refreshAllFeeds(),
    onSuccess: () => {
      toast.success('Feeds refresh!')
      queryClient.invalidateQueries({ queryKey: ['articles'] })
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? 'Error refreshing feeds')
      }
    },
  })
}
