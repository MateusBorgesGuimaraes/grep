import { BoxCard } from '#/components/BoxCard'
import { CustomButton } from '#/components/form/CustomButton'
import { CustomInput } from '#/components/form/CustomInput'
import { CustomSelect } from '#/components/form/CustomSelect'
import { TwoButtons } from '#/components/form/TwoButtons'
import { HeaderBox } from '#/components/HeaderBox'
import { ListCard } from '#/components/ListCard'
import { Modal } from '#/components/Modal'
import { Pagination } from '#/components/Pagination'
import { TitleSection } from '#/components/TitleSection'
import {
  useRemoveArticle,
  useSaveArticle,
  useSavedArticle,
} from '#/hooks/useArticleMutations'
import { useArticles } from '#/hooks/useArticles'
import { useCategories } from '#/hooks/useCategories'
import { useCreateFeeds } from '#/hooks/useFeedsMutations'
import { useRefreshFeeds } from '#/hooks/useRefreshFeeds'
import { createFeedSchema, type CreateFeedInput } from '#/schemas/feed.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute } from '@tanstack/react-router'
import { Check, Menu, Plus, Refresh, Sort, ViewGrid } from 'iconoir-react'
import { useMemo, useState } from 'react'
import { useForm, type FieldError } from 'react-hook-form'
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
  const [openModal, setOpenModal] = useState(false)
  const { data, setFilter, categoryId, order, goToPage } = useArticles()
  const { data: categories } = useCategories()
  const { mutate: refreshFeeds } = useRefreshFeeds()
  const { mutate: createFeed } = useCreateFeeds()
  const { data: savedArticles } = useSavedArticle()
  const { mutate: saveArticle } = useSaveArticle()
  const { mutate: removeArticle } = useRemoveArticle()
  const { items, page, total, totalPages } = data?.data ?? {
    items: [],
    page: 1,
    total: 0,
    totalPages: 0,
  }

  const createForm = useForm<CreateFeedInput>({
    resolver: zodResolver(createFeedSchema),
    defaultValues: { name: '', url: '', categoryId: undefined },
  })

  const handleCreate = (data: CreateFeedInput) => {
    const parsed = createFeedSchema.parse(data)
    createFeed(parsed)
    setOpenModal(false)
    createForm.reset()
  }

  const savedIds = useMemo(
    () => new Set(savedArticles?.data?.map((a) => a.article.id) ?? []),
    [savedArticles],
  )

  if (!categories) {
    return <div>Loading...</div>
  }

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
    <main>
      <HeaderBox>
        <div className="flex justify-between items-center">
          <TitleSection title="home" subtitle="all feeds" />
          <div className="flex gap-1.5">
            <CustomButton
              onClick={() => setOpenModal(!openModal)}
              variant="ghost"
              size="md"
            >
              <Plus width={16} height={16} />
              add feed
            </CustomButton>
            <CustomButton
              variant="primary"
              size="md"
              onClick={() => refreshFeeds()}
            >
              <Refresh width={16} height={16} />
              refresh
            </CustomButton>
          </div>
        </div>
        <p className="text-xs text-text-muted">
          <span className="text-text-primary">{total}</span> unread // 4 feeds
          active // next sync in 13min
        </p>
      </HeaderBox>
      <HeaderBox>
        <div className="flex justify-between items-center">
          <div className="flex gap-2.5 items-center">
            <h4 className="text-xs uppercase tracking-widest text-text-muted mr-2.5">
              FILTER
            </h4>
            <div className="flex gap-1.5">
              <CustomButton variant="primary" size="md">
                all
              </CustomButton>
              <CustomButton variant="secondary" size="md">
                unread
              </CustomButton>
              <CustomButton variant="secondary" size="md">
                saved
              </CustomButton>
            </div>
            <p className="text-xs uppercase tracking-widest text-text-muted">
              //
            </p>
            <div className="flex gap-1.5">
              <CustomButton
                onClick={() => setFilter({ categoryId: '' })}
                variant={categoryId === '' ? 'primary' : 'secondary'}
                size="md"
              >
                all
              </CustomButton>
              {categories.data.map((c) => (
                <CustomButton
                  onClick={() => setFilter({ categoryId: c.id.toString() })}
                  key={c.id}
                  variant={
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
              onClick={() =>
                setFilter({ order: order === 'ASC' ? 'DESC' : 'ASC' })
              }
              variant="ghost"
              size="md"
            >
              <Sort width={16} height={16} />
              sort
            </CustomButton>
            <CustomButton variant="primary" size="md">
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

      <Modal
        title="new feed"
        subtitle="// add new feed for you home"
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={createForm.handleSubmit(handleCreate)}
      >
        <div className="flex flex-col gap-3">
          <CustomInput
            label="name"
            placeholder="feed name"
            {...createForm.register('name')}
            error={createForm.formState.errors.name}
          />

          <CustomInput
            label="url"
            placeholder="url"
            {...createForm.register('url')}
            error={createForm.formState.errors.url}
          />

          <CustomSelect
            label="categories"
            placeholder="select a category"
            options={categories.data.map((c) => ({
              value: c.id.toString(),
              label: `${c.icon} ${c.name}`,
            }))}
            {...createForm.register('categoryId')}
            error={
              createForm.formState.errors.categoryId as FieldError | undefined
            }
          />
        </div>
      </Modal>
    </main>
  )
}
