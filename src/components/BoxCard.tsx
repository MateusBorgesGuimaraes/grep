import { Bookmark, OpenNewWindow } from 'iconoir-react'
import { MiniButton } from './form/MiniButton'
import { MacDots } from './MacDots'
import { Tag } from './Tag'
import { sliceText } from '#/utils/split-text'
import { timeAgo } from '#/utils/time-ago'

type BoxCardProps = {
  id: number
  link: string
  read: boolean
  font: string
  category: string
  title: string
  createdAt: string
  description: string
  saved: boolean
  saveAction: (id: number) => void
}

export const BoxCard = ({
  id,
  link,
  read,
  font,
  category,
  title,
  createdAt,
  description,
  saved,
  saveAction,
}: BoxCardProps) => {
  return (
    <div className="border-[0.5px] border-border-subtle rounded-sm flex flex-col h-full">
      <div className="h-45 bg-border-subtle flex items-center justify-center">
        cover image
      </div>

      <div className="p-2.5 flex flex-col gap-2.5 flex-1">
        <MacDots />

        <div className="flex gap-1.5">
          <Tag type="primary">• {read ? 'read' : 'unread'}</Tag>
          <Tag type="ghost">{font}</Tag>
          <Tag type="ghost">{category}</Tag>
        </div>

        <h3 className="text-base text-text-primary">{title}</h3>

        <p className="text-sm text-text-secondary">
          {sliceText(145, description)}
        </p>

        <div className="mt-auto border-t-[0.5px] border-border-subtle pt-2.5 flex justify-between items-center">
          <p className="text-xs text-text-muted">{timeAgo(createdAt)}</p>
          <div className="flex gap-3">
            <MiniButton active={saved} onClick={() => saveAction(id)}>
              <Bookmark width={16} height={16} />
            </MiniButton>
            <MiniButton as="link" href={link}>
              <OpenNewWindow width={16} height={16} />
            </MiniButton>
          </div>
        </div>
      </div>
    </div>
  )
}
