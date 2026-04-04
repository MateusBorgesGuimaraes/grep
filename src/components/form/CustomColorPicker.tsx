import { useRef } from 'react'
import type { FieldError } from 'react-hook-form'

const PRESET_COLORS = [
  '#888780',
  '#5DCAA5',
  '#378ADD',
  '#D85A30',
  '#D4537E',
  '#7F77DD',
]

type ColorPickerProps = {
  label?: string
  value?: string
  onChange?: (value: string) => void
  error?: FieldError
}

export const CustomColorPicker = ({
  label,
  value = '',
  onChange,
  error,
}: ColorPickerProps) => {
  const nativePickerRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex flex-col gap-0.5">
      {label && <label className="text-xs text-text-primary">{label}</label>}
      <div className="flex items-center gap-2 flex-wrap">
        {PRESET_COLORS.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onChange?.(color)}
            className="w-4 h-4 rounded-full shrink-0 transition-all"
            style={{
              background: color,
              outline:
                value === color
                  ? '1.5px solid var(--text-primary)'
                  : '1.5px solid transparent',
              outlineOffset: '1.5px',
            }}
          />
        ))}

        <input
          ref={nativePickerRef}
          type="color"
          value={value || '#000000'}
          onChange={(e) => onChange?.(e.target.value)}
          className="sr-only"
        />

        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="custom hex..."
          className={`
            flex-1 min-w-0
            bg-bg-elevated
            border-[0.5px] border-border-soft
            rounded px-2.5 py-1.5
            text-xs text-text-primary placeholder:text-text-muted
            outline-none focus:border-text-primary
            ${error ? 'border-red-500' : ''}
          `}
        />
        <button
          type="button"
          onClick={() => nativePickerRef.current?.click()}
          className="w-4 h-4 rounded shrink-0 border-[0.5px] border-border-soft transition-all flex items-center justify-center text-border-soft"
          style={{
            background: value || 'transparent',
            outline:
              value && !PRESET_COLORS.includes(value)
                ? '1.5px solid var(--text-primary)'
                : '1.5px solid transparent',
            outlineOffset: '1.5px',
          }}
          title="custom color"
        >
          {!value && '+'}
        </button>
      </div>
      {error && (
        <span className="text-[10px] text-red-500">{error.message}</span>
      )}
    </div>
  )
}
