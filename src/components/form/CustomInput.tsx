import { type InputHTMLAttributes } from 'react'

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}

export const CustomInput = ({
  icon,
  className = '',
  ...props
}: CustomInputProps) => {
  return (
    <div className="flex items-center gap-2 bg-bg-elevated border-[0.5px] border-border-soft rounded px-2.5 py-1.5 focus-within:border-border-subtle transition-colors">
      {icon && (
        <span className="text-text-muted shrink-0 flex items-center [&>svg]:w-4 [&>svg]:h-4">
          {icon}
        </span>
      )}
      <input
        {...props}
        className={`
          bg-transparent outline-none border-none w-full
          text-[11px] text-text-primary placeholder:text-text-muted
          tracking-[0.04em] font-mono
          ${className}
        `}
      />
    </div>
  )
}
