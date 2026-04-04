import type { InputHTMLAttributes } from 'react'
import type { FieldError } from 'react-hook-form'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: FieldError
}

export const CustomInput = ({
  label,
  error,
  className = '',
  ...props
}: InputProps) => {
  return (
    <div className="flex flex-col gap-.5">
      {label && <label className="text-xs text-text-primary">{label}</label>}
      <input
        className={`
          bg-bg-elevated
          border-[0.5px]
          border-border-soft
          rounded
          px-2.5
          py-1.5
          text-xs
          outline-none
          focus:border-text-primary
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      />

      {error && (
        <span className="text-[10px] text-red-500">{error.message}</span>
      )}
    </div>
  )
}
