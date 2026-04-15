import { CardsContainer } from '#/components/CardsContainer'
import { CustomButton } from '#/components/form/CustomButton'
import { TwoButtons } from '#/components/form/TwoButtons'
import { HeaderBox } from '#/components/HeaderBox'
import { TitleSection } from '#/components/TitleSection'
import { useSavedArticle } from '#/hooks/useArticleMutations'
import { useCategories } from '#/hooks/useCategories'
import type { Item } from '#/services/types'
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

  const items: Item[] = savedArticles.data.map((sa) => sa.article)

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
      <CardsContainer items={items} listGrid={listGrid} />
    </div>
  )
}
