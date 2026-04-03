import { CategoryCard } from '#/components/CategoryCard'
import { CustomButton } from '#/components/form/CustomButton'
import { HeaderBox } from '#/components/HeaderBox'
import { TitleSection } from '#/components/TitleSection'
import { useCategories } from '#/hooks/useCategories'
import { createFileRoute } from '@tanstack/react-router'
import { Plus } from 'iconoir-react'

export const Route = createFileRoute('/category')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: categories } = useCategories()
  return (
    <div>
      <HeaderBox>
        <div className="flex justify-between items-center">
          <TitleSection
            title="categories"
            subtitle="manage your categories groups"
          />
          <CustomButton type="primary" size="md">
            <Plus width={16} height={16} />
            add category
          </CustomButton>
        </div>
      </HeaderBox>
      <HeaderBox>
        <p className="text-xs text-text-muted">
          <span className="text-text-primary">4</span> categories //{' '}
          <span className="text-text-primary">42</span> total feeds //{' '}
          <span className="text-text-primary">156</span> total articles
        </p>
      </HeaderBox>

      <div className="p-5 flex flex-col gap-5">
        {categories?.data.map((c) => (
          <CategoryCard key={c.id} category={c} />
        ))}
      </div>
    </div>
  )
}
