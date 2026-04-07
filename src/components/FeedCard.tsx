import { Refresh, Trash } from 'iconoir-react'
import { MiniButton } from './form/MiniButton'
import { Tag } from './Tag'
import { Toggle } from './Toggle'
import { timeAgo } from '#/utils/time-ago'

type FeedCardProps = {
  icon: string
  color: string
  name: string
  url: string
  category: string
  active: boolean
  lastFetchedAt: string
  onChange: (checked: boolean) => void
  refreshFeed: () => void
  deleteFeed: () => void
}

export const FeedCard = ({
  icon,
  color,
  name,
  url,
  active,
  category,
  lastFetchedAt,
  onChange,
  refreshFeed,
  deleteFeed,
}: FeedCardProps) => {
  return (
    <div className="flex items-center justify-between py-3 px-5 border-[0.5px] border-border-soft rounded-sm">
      <div className="flex gap-2.5 items-center justify-center">
        <div className="bg-border-subtle w-20 h-20 flex items-center justify-center text-text-muted text-sm rounded-sm">
          image
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color }}
            />
            <h3>
              {name} <span>{icon}</span>
            </h3>
          </div>
          <p className="text-sm text-text-muted">{url}</p>
          <div className="flex items-center gap-1.5">
            <Tag type="secondary">{category}</Tag>
            <Tag type={active ? 'primary' : 'secondary'}>
              {active ? 'active' : 'inactive'}
            </Tag>
            <span className="text-sm text-text-muted">
              {timeAgo(lastFetchedAt)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-1.5">
        <MiniButton as="button" onClick={refreshFeed}>
          <Refresh height={20} width={20} />
        </MiniButton>

        <MiniButton as="button" onClick={deleteFeed}>
          <Trash height={20} width={20} />
        </MiniButton>

        <Toggle onChange={onChange} checked={active} />
      </div>
    </div>
  )
}
