import { Bookmark, OpenNewWindow } from 'iconoir-react'
import { MiniButton } from './form/MiniButton'
import { MacDots } from './MacDots'
import { Tag } from './Tag'
import { sliceText } from '#/utils/split-text'
import { timeAgo } from '#/utils/time-ago'

type ListCardProps = {
  read: boolean
  font: string
  category: string
  title: string
  createdAt: string
  description: string
}

export const ListCard = ({
  read,
  font,
  category,
  title,
  createdAt,
  description,
}: ListCardProps) => {
  return (
    <div className="flex border-[0.5px] border-border-subtle rounded-sm">
      <div className="w-40 bg-border-subtle flex items-center justify-center">
        cover image
      </div>

      <div className="p-2.5 w-full flex flex-col gap-2.5">
        <div className="flex justify-between items-center">
          <div className="flex gap-1.5">
            <Tag type="primary">• {read ? 'read' : 'unread'}</Tag>
            <Tag type="ghost">{font}</Tag>
            <Tag type="ghost">{category}</Tag>
          </div>
          <MacDots />
        </div>

        <h3 className="text-base text-text-primary">{title}</h3>

        <p className="text-sm text-text-secondary">
          {sliceText(145, description)}
        </p>

        <div className="mt-auto flex justify-between items-center">
          <span className="text-xs text-text-muted">{timeAgo(createdAt)}</span>

          <div className="flex gap-3">
            <MiniButton>
              <Bookmark width={16} height={16} />
            </MiniButton>
            <MiniButton>
              <OpenNewWindow width={16} height={16} />
            </MiniButton>
          </div>
        </div>
      </div>
    </div>
  )
}
