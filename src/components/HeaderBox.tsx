type HeaderBoxProps = {
  children: React.ReactNode
}

export const HeaderBox = ({ children }: HeaderBoxProps) => {
  return (
    <div className="bg-bg-surface py-2.5 px-5 border-b-[0.5px] border-border-soft">
      {children}
    </div>
  )
}
