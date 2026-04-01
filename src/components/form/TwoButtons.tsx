type TwoButtonsProps = {
  firstButton: React.ReactNode
  secondButton: React.ReactNode
  typeList: boolean

  onFirstClick?: () => void
  onSecondClick?: () => void
}

export const TwoButtons = ({
  firstButton,
  secondButton,
  typeList = false,
  onFirstClick,
  onSecondClick,
}: TwoButtonsProps) => {
  const active =
    'bg-text-primary text-bg-base hover:opacity-70 transition-all duration-150'
  const disabled =
    'box-content bg-transparent text-text-primary border border-border-soft hover:bg-bg-base transition-all duration-150'

  return (
    <div className="flex">
      <button
        onClick={onFirstClick}
        className={`py-1.5 px-2.5 rounded-tl-sm rounded-bl-sm cursor-pointer ${
          typeList ? disabled : active
        }`}
      >
        {firstButton}
      </button>

      <button
        onClick={onSecondClick}
        className={`py-1.5 px-2.5 rounded-tr-sm rounded-br-sm cursor-pointer ${
          typeList ? active : disabled
        }`}
      >
        {secondButton}
      </button>
    </div>
  )
}
