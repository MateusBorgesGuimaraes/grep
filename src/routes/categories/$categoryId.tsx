import { CardsContainer } from '#/components/CardsContainer'
import { TwoButtons } from '#/components/form/TwoButtons'
import { HeaderBox } from '#/components/HeaderBox'
import { Pagination } from '#/components/Pagination'
import { TitleSection } from '#/components/TitleSection'
import { useArticles } from '#/hooks/useArticles'
import { createFileRoute } from '@tanstack/react-router'
import { Menu, ViewGrid } from 'iconoir-react'
import { useState } from 'react'

export const Route = createFileRoute('/categories/$categoryId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { categoryId } = Route.useParams()
  const [listGrid, setListGrig] = useState(false)
  const { data, goToPage } = useArticles(categoryId)
  const { items, page, total, totalPages } = data?.data ?? {
    items: [],
    page: 1,
    total: 0,
    totalPages: 0,
  }

  return (
    <section>
      <HeaderBox>
        <div className="flex items-center justify-between">
          <TitleSection
            title={`${data?.data.items[0].feed.category.name}`}
            subtitle={`${total} articles`}
          />
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
      <div className="ml-5 pb-5">
        <Pagination
          onPageChange={goToPage}
          page={page}
          total={total}
          totalPages={totalPages}
        />
      </div>
    </section>
  )
}
