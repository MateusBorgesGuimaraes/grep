import { Bookmark, OpenNewWindow } from 'iconoir-react'
import { MiniButton } from './form/MiniButton'
import { MacDots } from './MacDots'
import { Tag } from './Tag'

export const ListCard = () => {
  return (
    <div className="flex border-[0.5px] border-border-subtle rounded-sm">
      <div className="w-40 bg-border-subtle flex items-center justify-center">
        cover image
      </div>
      <div className="p-2.5 w-full flex flex-col gap-2.5">
        <div className="flex justify-between items-center">
          <div className="flex gap-1.5">
            <Tag type="primary">• unread</Tag>
            <Tag type="ghost">techcrunch</Tag>
            <Tag type="ghost">tecnologia</Tag>
          </div>
          <MacDots />
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
        <div className="flex justify-between items-center">
          <span className="text-xs text-text-muted">2h ago // 4 min read</span>
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
