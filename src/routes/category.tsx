import { CategoryCard } from '#/components/CategoryCard'
import { CustomButton } from '#/components/form/CustomButton'
import { CustomInput } from '#/components/form/CustomInput'
import { HeaderBox } from '#/components/HeaderBox'
import { Modal } from '#/components/Modal'
import { TitleSection } from '#/components/TitleSection'
import { useCategories } from '#/hooks/useCategories'
import {
  createCategorySchema,
  editCategorySchema,
  type CreateCategoryFormData,
  type EditCategoryFormData,
} from '#/schemas/category.schema'
import { createFileRoute } from '@tanstack/react-router'
import { Plus } from 'iconoir-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomColorPicker } from '#/components/form/CustomColorPicker'
import { CustomIconPicker } from '#/components/form/CustomIconPicker'
import {
  useCreateCategory,
  useDeleteCategory,
  useEditCategory,
} from '#/hooks/useCategoriesMutations'
import type { Category } from '#/services/types'

export const Route = createFileRoute('/category')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: categories } = useCategories()
  const { mutate: createCategory } = useCreateCategory()
  const { mutate: editCategory } = useEditCategory()
  const { mutate: deleteCategory } = useDeleteCategory()
  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const createForm = useForm<CreateCategoryFormData>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: { name: '', icon: '', color: '' },
  })

  const editForm = useForm<EditCategoryFormData>({
    resolver: zodResolver(editCategorySchema),
  })

  const handleCreate = (data: CreateCategoryFormData) => {
    createCategory(data)
    setAddModal(false)
    createForm.reset()
  }

  const handleOpenEdit = (category: Category) => {
    setEditingCategory(category)
    editForm.reset({
      name: category.name,
      icon: category.icon,
      color: category.color,
    })
    setEditModal(true)
  }

  const handleEdit = (data: EditCategoryFormData) => {
    if (!editingCategory) return
    editCategory({ id: editingCategory.id, data })
    setEditModal(false)
    setEditingCategory(null)
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
          <CategoryCard
            key={c.id}
            category={c}
            onEdit={handleOpenEdit}
            onDelete={deleteCategory}
          />
        ))}
      </div>
      <Modal
        title="new category"
        subtitle="// organize your categories"
        open={addModal}
        onClose={() => setAddModal(false)}
        onSubmit={createForm.handleSubmit(handleCreate)}
      >
        <div className="flex flex-col gap-3">
          <CustomInput
            label="name"
            placeholder="category name"
            {...createForm.register('name')}
            error={createForm.formState.errors.name}
          />

          <Controller
            name="icon"
            control={createForm.control}
            render={({ field }) => (
              <CustomIconPicker
                label="icon"
                value={field.value}
                onChange={field.onChange}
                error={createForm.formState.errors.icon}
              />
            )}
          />

          <Controller
            name="color"
            control={createForm.control}
            render={({ field }) => (
              <CustomColorPicker
                label="color"
                value={field.value}
                onChange={field.onChange}
                error={createForm.formState.errors.color}
              />
            )}
          />
        </div>
      </Modal>

      <Modal
        title="edit category"
        subtitle={`// editing "${editingCategory?.name}"`}
        open={editModal}
        onClose={() => {
          setEditModal(false)
          setEditingCategory(null)
        }}
        onSubmit={editForm.handleSubmit(handleEdit)}
      >
        <div className="flex flex-col gap-3">
          <CustomInput
            label="name"
            placeholder="category name"
            {...editForm.register('name')}
            error={editForm.formState.errors.name}
          />
          <Controller
            name="icon"
            control={editForm.control}
            render={({ field }) => (
              <CustomIconPicker
                label="icon"
                value={field.value}
                onChange={field.onChange}
                error={editForm.formState.errors.icon}
              />
            )}
          />
          <Controller
            name="color"
            control={editForm.control}
            render={({ field }) => (
              <CustomColorPicker
                label="color"
                value={field.value}
                onChange={field.onChange}
                error={editForm.formState.errors.color}
              />
            )}
          />
        </div>
      </Modal>
    </div>
  )
}
