import { fetchArticles } from '#/services/article.service'
import { useQuery } from '@tanstack/react-query'
import { type InputHTMLAttributes, useState, useEffect, useRef } from 'react'

interface CustomSearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}

export const CustomSearchInput = ({
  icon,
  className = '',
  ...props
}: CustomSearchInputProps) => {
  const [inputValue, setInputValue] = useState('')
  const [debouncedValue, setDebouncedValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { data } = useQuery({
    queryKey: ['articles-search', debouncedValue],
    queryFn: () => fetchArticles({ search: debouncedValue, page: 1, limit: 8 }),
    enabled: debouncedValue.length > 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    setIsOpen(true)

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setDebouncedValue(value)
    }, 400)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  const articles = data?.data.items ?? []
  const showDropdown = isOpen && inputValue.length > 0 && articles.length > 0

  return (
    <div
      ref={containerRef}
      className="flex items-center gap-2 bg-bg-elevated border-[0.5px] border-border-soft rounded px-2.5 py-1.5 focus-within:border-border-subtle transition-colors relative"
    >
      {icon && (
        <span className="text-text-muted shrink-0 flex items-center [&>svg]:w-4 [&>svg]:h-4">
          {icon}
        </span>
      )}
      <input
        {...props}
        value={inputValue}
        onChange={handleChange}
        className={`
          bg-transparent outline-none border-none w-full
          text-[11px] text-text-primary placeholder:text-text-muted
          tracking-[0.04em] font-mono
          ${className}
        `}
      />
      {showDropdown && (
        <ul className="absolute top-full left-0 mt-1 w-full bg-bg-elevated border-[0.5px] border-border-soft rounded z-50 overflow-hidden">
          {articles.map((article) => (
            <li key={article.id}>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="block px-2.5 py-1.5 text-[11px] font-mono tracking-[0.04em] text-text-secondary cursor-pointer hover:bg-bg-surface hover:text-text-primary transition-colors truncate"
              >
                {article.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
