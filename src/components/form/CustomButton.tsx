type CustomButtonProps = {
  type: 'primary' | 'secondary' | 'ghost'
  size: 'sm' | 'md'
  children: React.ReactNode
}

export const CustomButton = ({ type, size, children }: CustomButtonProps) => {
  const buttonStyles = {
    primary: 'bg-text-primary text-bg-base hover:opacity-70',
    secondary:
      'bg-bg-base text-text-primary border border-border-soft hover:bg-bg-surface',
    ghost:
      'bg-transparent text-text-primary border border-border-soft hover:bg-bg-base',
  }

  const buttonSizes = {
    sm: 'py-0.5 px-1 gap-1',
    md: 'py-2 px-2.5 gap-2',
  }

  return (
    <button
      className={`rounded-sm flex items-center justify-center text-xs transition-all duration-150 cursor-pointer ${buttonStyles[type]} ${buttonSizes[size]}`}
    >
      {children}
    </button>
  )
}
