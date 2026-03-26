type TwoButtonsProps = {
  firstButton: React.ReactNode
  secondButton: React.ReactNode
}

export const TwoButtons = ({ firstButton, secondButton }: TwoButtonsProps) => {
  return (
    <div className="flex">
      <button className="py-1.5 px-2.5 bg-text-primary text-bg-base hover:opacity-70 rounded-tl-sm rounded-bl-sm transition-all duration-150 cursor-pointer">
        {firstButton}
      </button>
      <button className="box-content py-1.5 px-2.5 bg-transparent text-text-primary border border-border-soft hover:bg-bg-base rounded-tr-sm rounded-br-sm transition-all duration-150 cursor-pointer">
        {secondButton}
      </button>
    </div>
  )
}
