import {
  fetchSavedArticles,
  removeArticle,
  saveArticle,
} from '#/services/article.service'
import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useSaveArticle() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (articleId: number) => saveArticle(articleId),
    onSuccess: () => {
      toast.success('Article saved successfully!')
      queryClient.invalidateQueries({ queryKey: ['articles'] })
      queryClient.invalidateQueries({ queryKey: ['saved-articles'] })
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? 'Error saving article')
      }
    },
  })
}

export function useRemoveArticle() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (articleId: number) => removeArticle(articleId),
    onSuccess: () => {
      toast.success('Article removed successfully!')
      queryClient.invalidateQueries({ queryKey: ['articles'] })
      queryClient.invalidateQueries({ queryKey: ['saved-articles'] })
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? 'Error removing article')
      }
    },
  })
}

export function useSavedArticle() {
  return useQuery({
    queryKey: ['saved-articles'],
    queryFn: fetchSavedArticles,
  })
}
