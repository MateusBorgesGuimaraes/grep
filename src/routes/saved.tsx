import { BoxCard } from '#/components/BoxCard'
import { CustomButton } from '#/components/form/CustomButton'
import { TwoButtons } from '#/components/form/TwoButtons'
import { HeaderBox } from '#/components/HeaderBox'
import { ListCard } from '#/components/ListCard'
import { TitleSection } from '#/components/TitleSection'
import { useRemoveArticle, useSavedArticle } from '#/hooks/useArticleMutations'
import { useCategories } from '#/hooks/useCategories'

import { createFileRoute } from '@tanstack/react-router'
import { Menu, ViewGrid } from 'iconoir-react'
import { useState } from 'react'

export const Route = createFileRoute('/saved')({
  component: RouteComponent,
})

function RouteComponent() {
  const [listGrid, setListGrig] = useState(false)
  const [category, setCategory] = useState('')
  const { data: categories } = useCategories()
  const { data: savedArticles } = useSavedArticle()
  const { mutate: removeArticle } = useRemoveArticle()

  if (!categories) {
    return <div>Loading...</div>
  }

  if (!savedArticles) {
    return (
      <div className="flex items-center justify-center h-screen">
        // No articles saved...
      </div>
    )
  }

  const remove = (id: number) => {
    removeArticle(id)
  }

  const filterByType = (category: string) => {
    if (!savedArticles?.data) return []

    if (category === '') {
      return savedArticles.data
    }

    return savedArticles.data.filter(
      (a) => a.article.feed.category.name === category,
    )
  }

  const activeItems = filterByType(category)

  return (
    <div>
      <HeaderBox>
        <TitleSection title="saved" subtitle="7 articles" />
      </HeaderBox>
      <HeaderBox>
        <div className="flex justify-between items-center">
          <div className="flex gap-2.5 items-center">
            <h4 className="text-xs uppercase tracking-widest text-text-muted mr-2.5">
              FILTER
            </h4>
            <p className="text-xs uppercase tracking-widest text-text-muted">
              //
            </p>
            <div className="flex gap-1.5">
              <CustomButton
                onClick={() => setCategory('')}
                variant={category === '' ? 'primary' : 'secondary'}
                size="md"
              >
                all
              </CustomButton>
              {categories.data.map((c) => (
                <CustomButton
                  onClick={() => setCategory(c.name)}
                  key={c.id}
                  variant={category === c.name ? 'primary' : 'secondary'}
                  size="md"
                >
                  {c.name}
                </CustomButton>
              ))}
            </div>
          </div>
          <TwoButtons
            typeList={listGrid}
            firstButton={<ViewGrid />}
            secondButton={<Menu />}
            onFirstClick={() => setListGrig(false)}
            onSecondClick={() => setListGrig(true)}
          />
        </div>
      </HeaderBox>
      {listGrid ? (
        <div className="flex flex-col p-5 gap-5">
          {activeItems.map((sa) => (
            <ListCard
              key={sa.article.guid}
              link={sa.article.link}
              id={sa.article.id}
              saveAction={remove}
              read={sa.article.read}
              font={sa.article.feed.name}
              category={sa.article.feed.category.name}
              description={sa.article.description}
              createdAt={sa.article.createdAt}
              title={sa.article.title}
              saved={true}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(500px,100%),1fr))] gap-5 p-5">
          {activeItems.map((sa) => (
            <BoxCard
              id={sa.article.id}
              link={sa.article.link}
              saveAction={remove}
              key={sa.article.guid}
              read={sa.article.read}
              font={sa.article.feed.name}
              category={sa.article.feed.category.name}
              description={sa.article.description}
              createdAt={sa.article.createdAt}
              title={sa.article.title}
              saved={true}
            />
          ))}
        </div>
      )}
    </div>
  )
}
