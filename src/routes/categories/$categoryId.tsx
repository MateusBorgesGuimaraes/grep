import { BoxCard } from '#/components/BoxCard'
import { TwoButtons } from '#/components/form/TwoButtons'
import { HeaderBox } from '#/components/HeaderBox'
import { ListCard } from '#/components/ListCard'
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

      {listGrid ? (
        <div className="flex flex-col p-5 gap-5">
          {items.map((i) => (
            <ListCard
              key={i.guid}
              link={i.link}
              id={i.id}
              read={i.read}
              font={i.feed.name}
              category={i.feed.category.name}
              description={i.description}
              createdAt={i.createdAt}
              title={i.title}
              saved={false}
              saveAction={() => {}}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(500px,100%),1fr))] gap-5 p-5">
          {items.map((i) => (
            <BoxCard
              key={i.guid}
              id={i.id}
              link={i.link}
              read={i.read}
              font={i.feed.name}
              category={i.feed.category.name}
              description={i.description}
              createdAt={i.createdAt}
              title={i.title}
              saved={false}
              saveAction={() => {}}
              readAction={() => {}}
            />
          ))}
        </div>
      )}

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
