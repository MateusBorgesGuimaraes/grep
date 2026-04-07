type ToggleProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

export const Toggle = ({
  checked,
  onChange,
  disabled = false,
}: ToggleProps) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`
        relative w-9 h-5 rounded-full transition-colors duration-200
        ${checked ? 'bg-black' : 'bg-gray-300'}
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <span
        className={`
          absolute top-1/2 -translate-y-1/2 left-0.5
          w-4 h-4 rounded-full bg-white shadow
          transition-transform duration-200
          ${checked ? 'translate-x-4' : 'translate-x-0'}
        `}
      />
    </button>
  )
}
