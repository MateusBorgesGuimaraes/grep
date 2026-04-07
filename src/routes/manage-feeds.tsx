import { FeedCard } from '#/components/FeedCard'
import { HeaderBox } from '#/components/HeaderBox'
import { TitleSection } from '#/components/TitleSection'
import { useFeeds } from '#/hooks/useFeeds'
import {
  useRefreshFeed,
  useRemoveFeed,
  useToggleFeed,
} from '#/hooks/useFeedsMutations'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/manage-feeds')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data } = useFeeds()
  const { mutate: toggleFeed } = useToggleFeed()
  const { mutate: refreshFeed } = useRefreshFeed()
  const { mutate: deleteFeed } = useRemoveFeed()
  if (!data || !data.success) {
    return <div className="p-5">error</div>
  }
  return (
    <div>
      <HeaderBox>
        <TitleSection title="manage feeds" subtitle="4 feeds" />
      </HeaderBox>
      <HeaderBox>
        <p className="text-xs text-text-muted">
          <span className="text-text-primary">4</span> active //{' '}
          <span className="text-text-primary">1</span> inactive //{' '}
          <span className="text-text-primary">1</span> error
        </p>
      </HeaderBox>
      <div className="flex flex-col p-5 gap-5">
        {data.data.map((f) => (
          <FeedCard
            color={f.category.color}
            icon={f.category.icon}
            key={f.id}
            active={f.active}
            category={f.category.name}
            lastFetchedAt={f.lastFetchedAt}
            name={f.name}
            url={f.url}
            onChange={() => toggleFeed(f.id)}
            refreshFeed={() => refreshFeed(f.id)}
            deleteFeed={() => deleteFeed(f.id)}
          />
        ))}
      </div>
    </div>
  )
}
