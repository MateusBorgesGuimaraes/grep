type MiniButtonProps = {
  children: React.ReactNode
}

export const MiniButton = ({ children }: MiniButtonProps) => {
  return (
    <button className="border-[0.5px] border-border-soft rounded-sm p-1 hover:bg-border-subtle transition cursor-pointer">
      {children}
    </button>
  )
}
