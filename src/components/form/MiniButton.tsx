import { type ButtonHTMLAttributes } from 'react'

type MiniButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean
}

export const MiniButton = ({
  children,
  active,
  className = '',
  ...props
}: MiniButtonProps) => {
  const styleActive = active
    ? 'bg-text-primary text-bg-base hover:opacity-70 border-none'
    : 'border-[0.5px] border-border-soft hover:bg-border-subtle'

  return (
    <button
      className={`rounded-sm p-1 transition cursor-pointer ${styleActive} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
