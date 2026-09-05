// Calm placeholder surface for a future photo area (used sparingly). Fixed aspect ratio prevents layout shift.
export const BrandSurface = ({
  ratioClass = "aspect-[4/3]",
  icon: Icon,
  label,
  caption,
  className = "",
  children,
}) => (
  <div className={`surface-organic relative overflow-hidden rounded-2xl ${ratioClass} ${className}`}>
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
      {Icon && (
        <Icon className="h-8 w-8 text-[color:var(--brand-forest)]" strokeWidth={1.6} aria-hidden="true" />
      )}
      {label && (
        <span className="text-base font-semibold text-[color:var(--brand-forest)]">{label}</span>
      )}
      {caption && <p className="max-w-xs text-base leading-relaxed text-muted-foreground">{caption}</p>}
      {children}
    </div>
  </div>
);
