import { CustomSearchInput } from './form/CustomSearchInput'
import { MacDots } from './MacDots'
import {
  HomeSimpleDoor,
  BookmarkBook,
  Search,
  List,
  NavArrowRight,
  Settings,
  Folder,
} from 'iconoir-react'
import ThemeToggle from './ThemeToggle'
import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { useCategories } from '#/hooks/useCategories'

const NAV_MAIN = [
  {
    icon: <HomeSimpleDoor />,
    label: 'home',
    to: '/',
    badge: 42,
    badgeMuted: false,
  },
  {
    icon: <BookmarkBook />,
    label: 'saved',
    to: '/saved',
    badge: 7,
    badgeMuted: true,
  },
  {
    icon: <Folder />,
    label: 'category',
    to: '/category',
    badge: 4,
    badgeMuted: true,
  },
  {
    icon: <Search />,
    label: 'search',
    to: '/search',
    badge: null,
    badgeMuted: false,
  },
]

const NAV_SETTINGS = [
  { icon: <Settings />, label: 'manage feeds', to: '/manage-feeds' },
  { icon: <Settings />, label: 'settings', to: '/settings' },
]

export const Navbar = () => {
  const [categoriesOpen, setCategoriesOpen] = useState(true)
  const { data: categories } = useCategories()

  return (
    <div className="w-3xs shrink-0 flex flex-col bg-bg-surface border-r-[0.5px] border-border-soft h-screen">
      {/* header */}
      <div className="pt-4 px-4 pb-3.5 border-b-[0.5px] border-border-soft">
        <MacDots />
        <div className="text-sm font-medium text-text-primary tracking-[0.04em] mt-4">
          grep
        </div>
        <div className="text-[11px] text-text-muted tracking-[0.06em] mt-1">
          v0.1.0 // rss aggregator
        </div>
      </div>

      {/* search */}
      <div className="py-3 px-3 border-b-[0.5px] border-border-soft">
        <CustomSearchInput icon={<Search />} placeholder="search..." />
      </div>

      {/* nav */}
      <nav className="flex-1 overflow-y-auto py-2 min-h-0">
        {/* main */}
        <span className="block px-4 pt-3 pb-1 text-xs uppercase tracking-widest text-text-muted">
          main
        </span>

        {NAV_MAIN.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            activeOptions={{ exact: item.to === '/' }}
            className="w-full flex items-center gap-3 px-4 py-2 text-left cursor-pointer transition-colors border-l-2 border-l-transparent hover:bg-bg-elevated"
            activeProps={{ className: 'bg-bg-elevated !border-l-text-primary' }}
          >
            {({ isActive }) => (
              <>
                <span
                  className={`shrink-0 flex items-center [&>svg]:w-5 [&>svg]:h-5 ${isActive ? 'text-text-primary' : 'text-text-secondary'}`}
                >
                  {item.icon}
                </span>
                <span
                  className={`flex-1 text-[13px] tracking-[0.03em] ${isActive ? 'text-text-primary font-medium' : 'text-text-secondary'}`}
                >
                  {item.label}
                </span>
                {item.badge !== null && (
                  <span
                    className={`text-xs px-1.5 py-px rounded-sm tracking-[0.04em] ${
                      item.badgeMuted
                        ? 'border-[0.5px] border-border-soft text-text-muted'
                        : 'bg-text-primary text-bg-base'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </Link>
        ))}

        {/* categories */}
        <span className="block px-4 pt-3 pb-1 text-xs uppercase tracking-widest text-text-muted">
          categories
        </span>

        <button
          onClick={() => setCategoriesOpen((v) => !v)}
          className="w-full flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-bg-elevated transition-colors border-l-2 border-transparent"
        >
          <span className="shrink-0 flex items-center text-text-secondary [&>svg]:w-5 [&>svg]:h-5">
            <List />
          </span>
          <span className="flex-1 text-[13px] text-text-secondary tracking-[0.03em]">
            all categories
          </span>
          <span
            className={`flex items-center text-text-muted [&>svg]:w-5 [&>svg]:h-5 transition-transform duration-200 ${categoriesOpen ? 'rotate-90' : ''}`}
          >
            <NavArrowRight />
          </span>
        </button>

        <div
          className={`overflow-hidden transition-all duration-250 ${categoriesOpen ? 'max-h-48' : 'max-h-0'}`}
        >
          {categories &&
            categories.data.map((cat) => (
              <Link
                to="/categories/$categoryId"
                params={{ categoryId: String(cat.id) }}
                key={cat.id}
                className="w-full flex items-center gap-3 pl-10 pr-4 py-1.5 cursor-pointer hover:bg-bg-elevated transition-colors border-l-2 border-transparent"
              >
                <span
                  style={{ background: cat.color }}
                  className="w-1.5 h-1.5 rounded-full shrink-0 "
                />
                <span className="flex-1 text-[12px] text-text-secondary tracking-[0.03em]">
                  {cat.name}
                </span>
                <span className="text-xs text-text-muted tracking-[0.04em]">
                  {cat.feeds.length}
                </span>
              </Link>
            ))}
        </div>

        {/* settings */}
        <span className="block px-4 pt-3 pb-1 text-xs uppercase tracking-widest text-text-muted">
          settings
        </span>

        {NAV_SETTINGS.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className="w-full flex items-center gap-3 px-4 py-2 text-left cursor-pointer transition-colors border-l-2 border-l-transparent hover:bg-bg-elevated"
            activeProps={{ className: 'bg-bg-elevated !border-l-text-primary' }}
          >
            {({ isActive }) => (
              <>
                <span
                  className={`shrink-0 flex items-center [&>svg]:w-5 [&>svg]:h-5 ${isActive ? 'text-text-primary' : 'text-text-secondary'}`}
                >
                  {item.icon}
                </span>
                <span
                  className={`text-[13px] tracking-[0.03em] ${isActive ? 'text-text-primary font-medium' : 'text-text-secondary'}`}
                >
                  {item.label}
                </span>
              </>
            )}
          </Link>
        ))}
      </nav>

      {/* footer */}
      <div className="px-3 py-3 border-t-[0.5px] border-border-soft flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5 text-[11px] text-text-muted tracking-[0.04em]">
          <span className="w-1.5 h-1.5 rounded-full bg-mac-green shrink-0" />
          synced 2m ago
        </div>
        <ThemeToggle />
      </div>
    </div>
  )
}
