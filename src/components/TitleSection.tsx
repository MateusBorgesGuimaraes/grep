type TitleSectionProps = {
  title: string
  subtitle?: string
}

export const TitleSection = ({ title, subtitle }: TitleSectionProps) => {
  return (
    <div className="text-lg">
      {title}
      <span className="text-text-muted text-base">
        {subtitle ? ` // ${subtitle}` : ''}
      </span>
    </div>
  )
}
