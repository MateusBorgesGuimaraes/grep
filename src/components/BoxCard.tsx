import { Bookmark, OpenNewWindow } from 'iconoir-react'
import { MiniButton } from './form/MiniButton'
import { MacDots } from './MacDots'
import { Tag } from './Tag'

export const BoxCard = () => {
  return (
    <div className="border-[0.5px] border-border-subtle rounded-sm">
      <div className="h-45 bg-border-subtle ">cover image</div>
      <div className="p-2.5 flex flex-col gap-2.5">
        <MacDots />
        <div className="flex gap-1.5">
          <Tag type="primary">• unread</Tag>
          <Tag type="ghost">techcrunch</Tag>
          <Tag type="ghost">tecnologia</Tag>
        </div>
        <h3 className="text-base text-text-primary">
          The future of RSS in a world dominated by algorithmic feeds and walled
          gardens
        </h3>
        <p className="text-sm text-text-secondary">
          Open standards are making a quiet comeback. Developers and power users
          are returning to RSS as a way to take back control of their
          information...
        </p>
        <div className="border-t-[0.5px] border-border-subtle pt-2.5 flex justify-between items-center">
          <p className="text-xs text-text-muted">2h ago 4 min read</p>
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
