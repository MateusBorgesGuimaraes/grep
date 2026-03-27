import { BoxCard } from '#/components/BoxCard'
import { CustomButton } from '#/components/form/CustomButton'
import { TwoButtons } from '#/components/form/TwoButtons'
import { HeaderBox } from '#/components/HeaderBox'
import { ListCard } from '#/components/ListCard'
import { TitleSection } from '#/components/TitleSection'
import { createFileRoute } from '@tanstack/react-router'
import { Check, Menu, Plus, Refresh, Sort, ViewGrid } from 'iconoir-react'
import { useState } from 'react'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const [listGrid, setListGrig] = useState(false)
  return (
    <main>
      <HeaderBox>
        <div className="flex justify-between items-center">
          <TitleSection title="home" subtitle="all feeds" />
          <div className="flex gap-1.5">
            <CustomButton type="ghost" size="md">
              <Plus width={16} height={16} />
              add feed
            </CustomButton>
            <CustomButton type="primary" size="md">
              <Refresh width={16} height={16} />
              refresh
            </CustomButton>
          </div>
        </div>
        <p className="text-xs text-text-muted">
          <span className="text-text-primary">42</span> unread // 4 feeds active
          // next sync in 13min
        </p>
      </HeaderBox>
      <HeaderBox>
        <div className="flex justify-between items-center">
          <div className="flex gap-2.5 items-center">
            <h4 className="text-xs uppercase tracking-widest text-text-muted mr-2.5">
              FILTER
            </h4>
            <div className="flex gap-1.5">
              <CustomButton type="primary" size="md">
                all
              </CustomButton>
              <CustomButton type="secondary" size="md">
                unread
              </CustomButton>
              <CustomButton type="secondary" size="md">
                saved
              </CustomButton>
            </div>
            <p className="text-xs uppercase tracking-widest text-text-muted">
              //
            </p>
            <div className="flex gap-1.5">
              <CustomButton type="secondary" size="md">
                tecnologia
              </CustomButton>
              <CustomButton type="secondary" size="md">
                ciencias
              </CustomButton>
              <CustomButton type="secondary" size="md">
                noticias
              </CustomButton>
            </div>
          </div>
          <div className="flex gap-2.5">
            <CustomButton type="ghost" size="md">
              <Sort width={16} height={16} />
              sort
            </CustomButton>
            <CustomButton type="primary" size="md">
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
          <ListCard />
          <ListCard />
          <ListCard />
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(500px,100%),1fr))] gap-5 p-5">
          <BoxCard />
          <BoxCard />
          <BoxCard />
          <BoxCard />
        </div>
      )}
    </main>
  )
}
