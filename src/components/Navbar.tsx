import ThemeToggle from './ThemeToggle'

export const Navbar = () => {
  return (
    <div className="w-3xs shrink-0 border-r-[0.5px] border-stone-400 flex flex-col bg-stone-100">
      <ThemeToggle />
      <div className="pt-3.5 pr-4 pb-3 border-b-[0.5px] border-stone-400"></div>
    </div>
  )
}
