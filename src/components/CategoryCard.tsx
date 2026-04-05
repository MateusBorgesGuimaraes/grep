import type { Category } from '#/services/types'
import { Edit, Trash } from 'iconoir-react'
import { MiniButton } from './form/MiniButton'
import { MacDots } from './MacDots'
import { Tag } from './Tag'
import { timeAgo } from '#/utils/time-ago'

type CategoryCardProps = {
  category?: Category
  onEdit?: (category: Category) => void
  onDelete?: (id: number) => void
}

export const CategoryCard = ({
  category,
  onEdit,
  onDelete,
}: CategoryCardProps) => {
  const feeds = category?.feeds ?? []

  const visibleFeeds = feeds.slice(0, 5)
  const remaining = feeds.length - visibleFeeds.length

  const activeFeeds = feeds.filter((f) => f.active).length
  const inactiveFeeds = feeds.length - activeFeeds
  const errorFeeds = feeds.filter((f) => f.lastError).length

  const lastUpdatedFeed = feeds.reduce(
    (latest, current) => {
      if (!latest) return current

      return new Date(current.lastFetchedAt) > new Date(latest.lastFetchedAt)
        ? current
        : latest
    },
    undefined as (typeof feeds)[number] | undefined,
  )

  return (
    <div className="flex items-center border-[0.5px] border-border-subtle rounded-sm p-2.5 gap-2.5">
      <span
        className="self-stretch w-1.5 rounded-full"
        style={{ backgroundColor: category?.color || '#f59e0b' }}
      />

      <div className="w-20 h-20 bg-bg-surface flex items-center rounded-sm justify-center border-[0.5px] border-border-subtle">
        <span className="text-3xl leading-none">{category?.icon || '📁'}</span>
      </div>

      <div className="p-2.5 w-full flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h3 className="text-base text-text-primary">
            {category?.name || 'Sem categoria'}
          </h3>
          <MacDots />
        </div>

        <p className="text-text-muted text-sm">
          {feeds.length} feeds • {activeFeeds} ativos
          {inactiveFeeds > 0 && ` • ${inactiveFeeds} inativos`}
        </p>

        <p className="text-xs text-text-muted opacity-70">
          Refreshed{' '}
          {lastUpdatedFeed ? timeAgo(lastUpdatedFeed.lastFetchedAt) : '—'}
          {errorFeeds > 0 && ` • ${errorFeeds} com erro`}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex gap-1.5 flex-wrap">
            {visibleFeeds.map((feed) => (
              <Tag key={feed.id} type="ghost">
                {feed.name}
              </Tag>
            ))}

            {remaining > 0 && (
              <p className="opacity-60 text-sm">+{remaining} more</p>
            )}
          </div>

          <div className="flex gap-3">
            <MiniButton onClick={() => category && onDelete?.(category.id)}>
              <Trash width={16} height={16} />
            </MiniButton>
            <MiniButton onClick={() => category && onEdit?.(category)}>
              <Edit width={16} height={16} />
            </MiniButton>
          </div>
        </div>
      </div>
    </div>
  )
}
