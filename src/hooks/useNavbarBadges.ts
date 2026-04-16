import { useSavedArticle } from './useArticleMutations'
import { useArticles } from './useArticles'
import { useCategories } from './useCategories'

export function useNavbarBadges() {
  const { data: articles } = useArticles()
  const { data: savedArticles } = useSavedArticle()
  const { data: categories } = useCategories()

  return {
    homeBadge: articles?.data.items.length,
    savedArticlesBadge: savedArticles?.data.length,
    categoriesBadge: categories?.data.length,
  }
}
