import type { SelectHTMLAttributes } from 'react'
import type { FieldError } from 'react-hook-form'

type SelectOption = {
  value: string | number
  label: string
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  error?: FieldError
  options: SelectOption[]
  placeholder?: string
}

export const CustomSelect = ({
  label,
  error,
  options,
  placeholder,
  className = '',
  ...props
}: SelectProps) => {
  return (
    <div className="flex flex-col gap-0.5">
      {label && <label className="text-xs text-text-primary">{label}</label>}
      <div className="relative">
        <select
          className={`
            w-full appearance-none
            bg-bg-elevated
            border-[0.5px] border-border-soft
            rounded px-2.5 py-1.5
            text-xs text-text-primary
            outline-none cursor-pointer
            focus:border-text-primary
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted">
          <svg
            width="10"
            height="10"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </span>
      </div>
      {error && (
        <span className="text-[10px] text-red-500">{error.message}</span>
      )}
    </div>
  )
}
