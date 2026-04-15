import { CardsContainer } from '#/components/CardsContainer'
import { CustomButton } from '#/components/form/CustomButton'
import { CustomInput } from '#/components/form/CustomInput'
import { TwoButtons } from '#/components/form/TwoButtons'
import { HeaderBox } from '#/components/HeaderBox'
import { Pagination } from '#/components/Pagination'
import { useArticles } from '#/hooks/useArticles'
import { useFeeds } from '#/hooks/useFeeds'
import { createFileRoute } from '@tanstack/react-router'
import { Menu, ViewGrid } from 'iconoir-react'
import { useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/search')({
  component: RouteComponent,
})

function RouteComponent() {
  const [listGrid, setListGrig] = useState(false)
  const { data, setFilter, goToPage, search, feedId } = useArticles()
  const { data: feeds } = useFeeds()
  const { page, total, totalPages } = data?.data ?? {
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
              <CustomButton
                onClick={() => setFilter({ feedId: '' })}
                variant={feedId === '' ? 'primary' : 'secondary'}
                size="md"
              >
                all
              </CustomButton>
              {feeds?.data.map((feed) => (
                <CustomButton
                  key={feed.id}
                  onClick={() => setFilter({ feedId: feed.id.toString() })}
                  variant={
                    feedId === feed.id.toString() ? 'primary' : 'secondary'
                  }
                  size="md"
                >
                  {feed.name}
                </CustomButton>
              ))}
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
            {data?.data.items && (
              <CardsContainer items={data?.data.items} listGrid={listGrid} />
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
