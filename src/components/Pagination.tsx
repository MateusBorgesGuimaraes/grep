import { NavArrowLeft, NavArrowRight } from 'iconoir-react'

type PaginationProps = {
  page: number
  total: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination = ({
  page,
  total,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const getWindowPages = () => {
    let start = Math.max(1, page - 1)
    let end = Math.min(totalPages, start + 2)

    start = Math.max(1, end - 2)
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  const windowPages = getWindowPages()
  const showStartEllipsis = windowPages[0] > 2
  const showEndEllipsis = windowPages[windowPages.length - 1] < totalPages - 1

  const btnBase =
    'w-8 h-8 flex items-center justify-center text-sm font-mono transition cursor-pointer border-[0.5px] border-border-soft'
  const btnInactive = `${btnBase} bg-bg-surface hover:bg-bg-elevated`
  const btnActive = `${btnBase} bg-text-primary text-bg-base hover:opacity-70 border-none`
  const btnDisabled = `${btnBase} bg-bg-surface opacity-40 cursor-not-allowed`

  return (
    <div className="flex items-center">
      <button
        className={`${page === 1 ? btnDisabled : btnInactive} rounded-tl-sm rounded-bl-sm`}
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        <NavArrowLeft height={20} width={20} />
      </button>
      {totalPages <= 6 ? (
        Array.from({ length: totalPages }, (_, i) => i + 1).map((i) => (
          <button
            key={i}
            className={i === page ? btnActive : btnInactive}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        ))
      ) : (
        <>
          <button
            className={page === 1 ? btnActive : btnInactive}
            onClick={() => onPageChange(1)}
          >
            1
          </button>

          {showStartEllipsis && (
            <span className={`${btnInactive} pointer-events-none`}>...</span>
          )}

          {windowPages
            .filter((p) => p !== 1 && p !== totalPages)
            .map((i) => (
              <button
                key={i}
                className={i === page ? btnActive : btnInactive}
                onClick={() => onPageChange(i)}
              >
                {i}
              </button>
            ))}

          {showEndEllipsis && (
            <span className={`${btnInactive} pointer-events-none`}>...</span>
          )}

          <button
            className={page === totalPages ? btnActive : btnInactive}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}
      <button
        className={`${page === totalPages ? btnDisabled : btnInactive} rounded-tr-sm rounded-br-sm`}
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <NavArrowRight height={20} width={20} />
      </button>
    </div>
  )
}
