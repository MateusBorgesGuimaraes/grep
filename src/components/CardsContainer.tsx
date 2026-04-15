import {
  useMarkAsReadArticle,
  useRemoveArticle,
  useSaveArticle,
  useSavedArticle,
} from '#/hooks/useArticleMutations'
import type { Item } from '#/services/types'
import { useMemo } from 'react'
import { ListCard } from './ListCard'
import { BoxCard } from './BoxCard'

type CardsContainerProps = {
  items: Item[]
  listGrid: boolean
}

export const CardsContainer = ({ items, listGrid }: CardsContainerProps) => {
  const { mutate: markAsRead } = useMarkAsReadArticle()
  const { mutate: saveArticle } = useSaveArticle()
  const { data: savedArticles } = useSavedArticle()
  const { mutate: removeArticle } = useRemoveArticle()

  const savedIds = useMemo(
    () => new Set(savedArticles?.data?.map((a) => a.article.id) ?? []),
    [savedArticles],
  )
  const articleIsSave = (id: number) => {
    return savedIds.has(id)
  }

  const toggleSave = (id: number) => {
    if (articleIsSave(id)) {
      removeArticle(id)
    } else {
      saveArticle(id)
    }
  }

  return (
    <div>
      {listGrid ? (
        <div className="flex flex-col p-5 gap-5">
          {items.map((i) => (
            <ListCard
              key={i.guid}
              link={i.link}
              id={i.id}
              saveAction={toggleSave}
              read={i.read}
              font={i.feed.name}
              category={i.feed.category.name}
              description={i.description}
              createdAt={i.createdAt}
              title={i.title}
              saved={articleIsSave(i.id)}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(500px,100%),1fr))] gap-5 p-5">
          {items.map((i) => (
            <BoxCard
              id={i.id}
              link={i.link}
              saveAction={toggleSave}
              key={i.guid}
              read={i.read}
              font={i.feed.name}
              category={i.feed.category.name}
              description={i.description}
              createdAt={i.createdAt}
              title={i.title}
              saved={articleIsSave(i.id)}
              readAction={markAsRead}
            />
          ))}
        </div>
      )}
    </div>
  )
}
