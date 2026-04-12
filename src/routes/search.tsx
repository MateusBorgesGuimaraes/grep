import { BoxCard } from '#/components/BoxCard'
import { CustomButton } from '#/components/form/CustomButton'
import { CustomInput } from '#/components/form/CustomInput'
import { TwoButtons } from '#/components/form/TwoButtons'
import { HeaderBox } from '#/components/HeaderBox'
import { ListCard } from '#/components/ListCard'
import { Pagination } from '#/components/Pagination'
import {
  useMarkAsReadArticle,
  useRemoveArticle,
  useSaveArticle,
  useSavedArticle,
} from '#/hooks/useArticleMutations'
import { useArticles } from '#/hooks/useArticles'
import { createFileRoute } from '@tanstack/react-router'
import { Menu, ViewGrid } from 'iconoir-react'
import { useEffect, useMemo, useRef, useState } from 'react'

export const Route = createFileRoute('/search')({
  component: RouteComponent,
})

function RouteComponent() {
  const [listGrid, setListGrig] = useState(false)
  const { data, setFilter, order, goToPage, search, feedId } = useArticles()
  const { mutate: markAsRead } = useMarkAsReadArticle()
  const { data: savedArticles } = useSavedArticle()
  const { mutate: saveArticle } = useSaveArticle()
  const { mutate: removeArticle } = useRemoveArticle()
  const { items, page, total, totalPages } = data?.data ?? {
    items: [],
    page: 1,
    total: 0,
    totalPages: 0,
  }

  const [inputValue, setInputValue] = useState(search)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setInputValue(search)
  }, [search])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setFilter({ search: value || undefined })
    }, 400)
  }

  const handleClear = () => {
    setInputValue('')
    setFilter({ search: undefined })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') handleClear()
  }

  // const feeds = data?.feeds ?? []
  //
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
    <section>
      <HeaderBox>
        <div className="relative">
          <CustomInput
            placeholder="search"
            value={inputValue}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button className="text-sm border-[0.5px] border-border-soft px-24 absolute top-1 right-1">
            ESC
          </button>
        </div>
      </HeaderBox>
      <HeaderBox>
        <div className="flex justify-between items-center">
          <div className="flex gap-2.5 items-center">
            <h4 className="text-xs uppercase tracking-widest text-text-muted ">
              ACTIVE FEEDS
            </h4>
            <p className="text-xs uppercase tracking-widest text-text-muted">
              //
            </p>
            <div className="flex gap-1.5">
              <CustomButton variant="primary" size="md">
                all
              </CustomButton>
              <CustomButton variant="secondary" size="md">
                FEED1
              </CustomButton>
              <CustomButton variant="secondary" size="md">
                FEED2
              </CustomButton>
              <CustomButton variant="secondary" size="md">
                FEED3
              </CustomButton>
            </div>
          </div>
          <div>
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
      <HeaderBox>
        {search ? (
          <p className="text-xs text-text-secondary">
            RESULTS FOR <span className="text-text-primary">"{search}"</span>
            {data?.data?.total !== undefined && (
              <span className="text-text-muted">
                {' '}
                — {data.data.total} found
              </span>
            )}
          </p>
        ) : (
          <p className="text-xs text-text-secondary">START YOUR SEARCH</p>
        )}
        {/*<p className="text-xs text-text-secondary">START YOUR SEARCH</p>*/}
      </HeaderBox>
      <div className="p-5">
        {!search ? (
          <p className="text-xs text-text-muted">
            Nenhuma busca iniciada ainda
          </p>
        ) : data?.data?.items.length === 0 ? (
          <p className="text-xs text-text-muted">No results for "{search}"</p>
        ) : (
          <>
            {listGrid ? (
              <div className="flex flex-col p-5 gap-5">
                {data?.data.items.map((i) => (
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
                {data?.data.items.map((i) => (
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
            <div className="ml-5 pb-5">
              <Pagination
                onPageChange={goToPage}
                page={page}
                total={total}
                totalPages={totalPages}
              />
            </div>
          </>
        )}
      </div>
    </section>
  )
}
