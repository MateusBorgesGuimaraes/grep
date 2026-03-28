import { BoxCard } from '#/components/BoxCard'
import { CustomButton } from '#/components/form/CustomButton'
import { TwoButtons } from '#/components/form/TwoButtons'
import { HeaderBox } from '#/components/HeaderBox'
import { ListCard } from '#/components/ListCard'
import { TitleSection } from '#/components/TitleSection'
import { useArticles } from '#/hooks/useArticles'
import { useCategories } from '#/hooks/useCategories'
import { createFileRoute } from '@tanstack/react-router'
import { Check, Menu, Plus, Refresh, Sort, ViewGrid } from 'iconoir-react'
import { useState } from 'react'
import { z } from 'zod'

const articlesSearchSchema = z.object({
  page: z.string().optional(),
  search: z.string().optional(),
  feedId: z.string().optional(),
  categoryId: z.string().optional(),
  limit: z.string().optional(),
  unreadOnly: z.string().optional(),
  order: z.enum(['ASC', 'DESC']).optional().default('DESC'),
})

export const Route = createFileRoute('/')({
  validateSearch: articlesSearchSchema,
  component: App,
})

function App() {
  const [listGrid, setListGrig] = useState(false)
  const { data, setFilter, categoryId, order } = useArticles()
  const { data: categories } = useCategories()

  const { items, page, total, totalPages } = data?.data ?? {
    items: [],
    page: 1,
    total: 0,
    totalPages: 0,
  }

  if (!categories) {
    return <div>Loading...</div>
  }

  return (
    <main>
      <HeaderBox>
        <div className="flex justify-between items-center">
          <TitleSection title="home" subtitle="all feeds" />
          <div className="flex gap-1.5">
            <CustomButton type="ghost" size="md">
              <Plus width={16} height={16} />
              add feed
            </CustomButton>
            <CustomButton type="primary" size="md">
              <Refresh width={16} height={16} />
              refresh
            </CustomButton>
          </div>
        </div>
        <p className="text-xs text-text-muted">
          <span className="text-text-primary">42</span> unread // 4 feeds active
          // next sync in 13min
        </p>
      </HeaderBox>
      <HeaderBox>
        <div className="flex justify-between items-center">
          <div className="flex gap-2.5 items-center">
            <h4 className="text-xs uppercase tracking-widest text-text-muted mr-2.5">
              FILTER
            </h4>
            <div className="flex gap-1.5">
              <CustomButton type="primary" size="md">
                all
              </CustomButton>
              <CustomButton type="secondary" size="md">
                unread
              </CustomButton>
              <CustomButton type="secondary" size="md">
                saved
              </CustomButton>
            </div>
            <p className="text-xs uppercase tracking-widest text-text-muted">
              //
            </p>
            <div className="flex gap-1.5">
              {categories.data.map((c) => (
                <CustomButton
                  onClickAction={() =>
                    setFilter({ categoryId: c.id.toString() })
                  }
                  key={c.id}
                  type={
                    categoryId === c.id.toString() ? 'primary' : 'secondary'
                  }
                  size="md"
                >
                  {c.name}
                </CustomButton>
              ))}
            </div>
          </div>
          <div className="flex gap-2.5">
            <CustomButton
              onClickAction={() =>
                setFilter({ order: order === 'ASC' ? 'DESC' : 'ASC' })
              }
              type="ghost"
              size="md"
            >
              <Sort width={16} height={16} />
              sort
            </CustomButton>
            <CustomButton type="primary" size="md">
              <Check width={16} height={16} />
              mark all read
            </CustomButton>
            <TwoButtons
              typeList={listGrid}
              firstButton={<ViewGrid />}
              secondButton={<Menu />}
              onFirstClick={() => setListGrig(false)}
              onSecondClick={() => setListGrig(true)}
            />
          </div>
        </div>
      </HeaderBox>
      {listGrid ? (
        <div className="flex flex-col p-5 gap-5">
          {items.map((i) => (
            <ListCard
              key={i.guid}
              read={i.read}
              font={i.feed.name}
              category={i.feed.category.name}
              description={i.description}
              createdAt={i.createdAt}
              title={i.title}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(500px,100%),1fr))] gap-5 p-5">
          {items.map((i) => (
            <BoxCard
              key={i.guid}
              read={i.read}
              font={i.feed.name}
              category={i.feed.category.name}
              description={i.description}
              createdAt={i.createdAt}
              title={i.title}
            />
          ))}
        </div>
      )}
    </main>
  )
}
