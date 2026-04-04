import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { FieldError } from 'react-hook-form'

type IconPickerProps = {
  label?: string
  value?: string
  onChange?: (value: string) => void
  error?: FieldError
}

export const CustomIconPicker = ({
  label,
  value = '',
  onChange,
  error,
}: IconPickerProps) => {
  const [open, setOpen] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open || !pickerRef.current) return

    const initPicker = async () => {
      const { Picker } = await import('emoji-mart')
      pickerRef.current?.appendChild(
        new Picker({
          onEmojiSelect: (emoji: { native: string }) => {
            onChange?.(emoji.native)
            setOpen(false)
          },
          onClickOutside: () => setOpen(false),
          locale: 'pt',
          previewPosition: 'none',
          skinTonePosition: 'none',
          perLine: 8,
        }) as unknown as Node,
      )
    }

    initPicker()
    return () => {
      if (pickerRef.current) pickerRef.current.innerHTML = ''
    }
  }, [open])

  return (
    <div className="flex flex-col gap-0.5">
      {label && <label className="text-xs text-text-primary">{label}</label>}

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="w-8 h-8 flex items-center justify-center rounded border-[0.5px] border-border-soft bg-bg-elevated hover:border-text-primary transition-colors text-base shrink-0"
        >
          {value || '?'}
        </button>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="or type an emoji..."
          className={`
            flex-1 bg-bg-elevated border-[0.5px] border-border-soft
            rounded px-2.5 py-1.5 text-xs text-text-primary
            placeholder:text-text-muted outline-none focus:border-text-primary
            ${error ? 'border-red-500' : ''}
          `}
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange?.('')}
            className="text-text-muted hover:text-text-primary transition-colors shrink-0"
          >
            x
          </button>
        )}
      </div>

      {error && (
        <span className="text-[10px] text-red-500">{error.message}</span>
      )}

      {open &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-9998"
              onClick={() => setOpen(false)}
            />
            <div className="fixed inset-0 z-9999 flex items-center justify-center pointer-events-none">
              <div ref={pickerRef} className="pointer-events-auto" />
            </div>
          </>,
          document.body,
        )}
    </div>
  )
}
