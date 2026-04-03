export type ApiResponse<T> = {
  success: boolean
  data: T
}

export type DataResponse<T> = {
  items: T[]
  page: number
  total: number
  totalPages: number
}

export type Item = {
  id: number
  guid: string
  title: string
  description: string
  link: string
  imageUrl: string | null
  author: string
  read: boolean
  publishedAt: string
  createdAt: string
  feed: Feed
}

export interface FetchItemParams {
  feedId?: string
  categoryId?: string
  page: number
  limit: number
  order?: 'ASC' | 'DESC'
  search?: string
  unreadOnly?: boolean
}

export type Feed = {
  id: number
  name: string
  url: string
  iconUrl: string | null
  active: boolean
  lastFetchedAt: string
  lastError: string | null
  createdAt: string
  updatedAt: string
  category: Category
}

export type Category = {
  id: number
  name: string
  icon: string
  color: string
  createdAt: string
  feeds: Feed[]
}

export type SavedArticle = {
  id: number
  savedAt: string
  article: Item
}
