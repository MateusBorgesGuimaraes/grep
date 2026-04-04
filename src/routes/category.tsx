import { CategoryCard } from '#/components/CategoryCard'
import { CustomButton } from '#/components/form/CustomButton'
import { CustomInput } from '#/components/form/CustomInput'
import { HeaderBox } from '#/components/HeaderBox'
import { Modal } from '#/components/Modal'
import { TitleSection } from '#/components/TitleSection'
import { useCategories } from '#/hooks/useCategories'
import {
  createCategorySchema,
  type CreateCategoryFormData,
} from '#/schemas/create-category.schema'
import { createFileRoute } from '@tanstack/react-router'
import { Plus } from 'iconoir-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomColorPicker } from '#/components/form/CustomColorPicker'
import { CustomIconPicker } from '#/components/form/CustomIconPicker'
import { useCreateCategory } from '#/hooks/useCategoriesMutations'

export const Route = createFileRoute('/category')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: categories } = useCategories()
  const { mutate: createCategory } = useCreateCategory()
  const [addModal, setAddModal] = useState(false)

  const form = useForm<CreateCategoryFormData>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: '',
      icon: '',
      color: '',
    },
  })

  const handleSubmit = (data: CreateCategoryFormData) => {
    createCategory(data)

    setAddModal(false)
    form.reset()
  }

  return (
    <div>
      <HeaderBox>
        <div className="flex justify-between items-center">
          <TitleSection
            title="categories"
            subtitle="manage your categories groups"
          />
          <CustomButton
            variant="primary"
            size="md"
            onClick={() => setAddModal(!addModal)}
          >
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
      <Modal
        title="new category"
        subtitle="// organize your categories"
        open={addModal}
        onClose={() => setAddModal(false)}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex flex-col gap-3">
          <CustomInput
            label="name"
            placeholder="category name"
            {...form.register('name')}
            error={form.formState.errors.name}
          />

          <Controller
            name="icon"
            control={form.control}
            render={({ field }) => (
              <CustomIconPicker
                label="icon"
                value={field.value}
                onChange={field.onChange}
                error={form.formState.errors.icon}
              />
            )}
          />

          <Controller
            name="color"
            control={form.control}
            render={({ field }) => (
              <CustomColorPicker
                label="color"
                value={field.value}
                onChange={field.onChange}
                error={form.formState.errors.color}
              />
            )}
          />
        </div>
      </Modal>
    </div>
  )
}
