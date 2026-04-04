import { createPortal } from 'react-dom'
import { CustomButton } from './form/CustomButton'

type ModalProps = {
  open: boolean
  title: string
  subtitle?: string
  children: React.ReactNode
  onClose: () => void
  onSubmit?: () => void
  loading?: boolean
}

export const Modal = ({
  open,
  title,
  subtitle,
  children,
  onClose,
  onSubmit,
  loading = false,
}: ModalProps) => {
  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-gray-950/40 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-bg-surface rounded-lg w-115 border-[0.5px] border-border-soft"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-1 border-b-[0.5px] border-border-subtle p-4">
            <h4 className="text-text-primary text-sm">{title}</h4>
            {subtitle && <p className="text-text-muted text-xs">{subtitle}</p>}
          </div>

          <div className="p-4">{children}</div>

          <div className="flex justify-end gap-2 border-t-[0.5px] border-border-subtle p-4">
            <CustomButton
              type="button"
              variant="ghost"
              size="md"
              onClick={onClose}
            >
              cancel
            </CustomButton>

            {onSubmit && (
              <CustomButton
                type="submit"
                variant="primary"
                size="md"
                disabled={loading}
              >
                {loading ? 'saving...' : 'save'}
              </CustomButton>
            )}
          </div>
        </form>
      </div>
    </div>,
    document.body,
  )
}
