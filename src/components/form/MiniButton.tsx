import { type ButtonHTMLAttributes } from 'react'

type MiniButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean
  as?: 'button' | 'link'
  href?: string
}

export const MiniButton = ({
  children,
  active,
  className = '',
  as = 'button',
  href,
  ...props
}: MiniButtonProps) => {
  const styleActive = active
    ? 'bg-text-primary text-bg-base hover:opacity-70 border-none'
    : 'border-[0.5px] border-border-soft hover:bg-border-subtle'

  const baseClass = `rounded-sm p-1 transition cursor-pointer ${styleActive} ${className}`

  if (as === 'link') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
      >
        {children}
      </a>
    )
  }

  return (
    <button className={baseClass} {...props}>
      {children}
    </button>
  )
}
