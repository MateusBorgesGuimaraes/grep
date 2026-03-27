type CustomTagProps = {
  type: 'primary' | 'secondary' | 'ghost'
  children: React.ReactNode
}

export const Tag = ({ type, children }: CustomTagProps) => {
  const tagStyles = {
    primary: 'bg-text-primary text-bg-base',
    secondary: 'bg-bg-base text-text-primary border border-border-soft',
    ghost: 'bg-transparent text-text-primary border border-border-soft',
  }

  return (
    <span
      className={`rounded-xs flex items-center justify-center text-xs transition-all duration-150 py-0.5 px-1 gap-1 ${tagStyles[type]}`}
    >
      {children}
    </span>
  )
}
