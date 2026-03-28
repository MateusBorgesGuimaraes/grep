import { fetchArticles } from '#/services/article.service'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useState } from 'react'

export function useArticles() {
  const navigate = useNavigate()
  const searchParams = useSearch({ from: '/' })
  const [showFilter, setShowFilters] = useState(false)

  const page = Number(searchParams.page) || 1
  const limit = Number(searchParams.limit) || 10
  const search = searchParams.search || ''
  const order = searchParams.order || 'DESC'
  const feedId = searchParams.feedId || ''
  const categoryId = searchParams.categoryId || ''
  const unreadOnly = searchParams.unreadOnly === 'true'

  const setFilter = (filters: Record<string, string | undefined>) => {
    navigate({
      to: '/',
      search: (prev) => ({ ...prev, ...filters, page: '1' }),
    })
  }

  const goToPage = (newPage: number) => {
    navigate({
      to: '/',
      search: (prev) => ({ ...prev, page: String(newPage) }),
    })
  }

  const query = useQuery({
    queryKey: [
      'articles',
      page,
      limit,
      search,
      feedId,
      categoryId,
      unreadOnly,
      order,
    ],
    queryFn: () =>
      fetchArticles({
        page,
        limit,
        search,
        feedId,
        categoryId,
        unreadOnly,
        order,
      }),
  })

  return {
    ...query,

    page,
    search,
    limit,
    feedId,
    categoryId,
    unreadOnly,
    order,
    setFilter,
    goToPage,
    setShowFilters,
  }
}
