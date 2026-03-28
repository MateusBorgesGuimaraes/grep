import { Link, useLocation } from '@tanstack/react-router'

export const NotFound = () => {
  const { pathname } = useLocation()

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 fade-in">
      <div className="flex flex-col items-center gap-1">
        <span className="text-[11px] text-text-muted tracking-widest uppercase">
          404
        </span>
        <h1 className="text-[15px] font-medium text-text-primary tracking-[0.04em]">
          page not found
        </h1>
        <p className="text-[12px] text-text-secondary tracking-[0.03em] mt-1">
          // the route you requested does not exist
        </p>
      </div>

      <div className="flex flex-col items-start gap-1 bg-bg-surface border-[0.5px] border-border-soft rounded px-4 py-3 text-[11px] text-text-muted tracking-[0.04em] w-fit">
        <span>
          <span className="text-text-secondary">status</span>
          {'   '}404 not_found
        </span>
        <span>
          <span className="text-text-secondary">route</span>
          {'    '}
          {pathname}
        </span>
        <span>
          <span className="text-text-secondary">suggest</span>
          {'  '}
          <Link to="/">~/home</Link>
        </span>
      </div>

      <Link
        to="/"
        className="text-[11px] text-text-secondary border-b border-border-soft tracking-[0.04em] hover:opacity-70 transition-opacity"
      >
        ← back to home
      </Link>
    </div>
  )
}
