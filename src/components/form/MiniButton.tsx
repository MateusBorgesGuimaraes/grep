import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react'

type BaseProps = {
  active?: boolean
  className?: string
  children: React.ReactNode
}

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button'
  }

type LinkProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'link'
    href: string
  }

type MiniButtonProps = ButtonProps | LinkProps

export const MiniButton = ({
  children,
  active,
  className = '',
  as = 'button',
  ...props
}: MiniButtonProps) => {
  const styleActive = active
    ? 'bg-text-primary text-bg-base hover:opacity-70 border-none'
    : 'border-[0.5px] border-border-soft hover:bg-border-subtle'

  const baseClass = `rounded-sm p-1 transition cursor-pointer ${styleActive} ${className}`

  if (as === 'link') {
    const { href, ...rest } = props as LinkProps

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <button className={baseClass} {...(props as ButtonProps)}>
      {children}
    </button>
  )
}
