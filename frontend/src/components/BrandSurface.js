// Premium placeholder surfaces (no photos). Fixed aspect ratios prevent layout shift.
export const BrandSurface = ({
  ratioClass = "aspect-[4/3]",
  variant = "organic",
  icon: Icon,
  label,
  caption,
  className = "",
  children,
}) => {
  const isDark = variant === "forest";
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border grain surface-${variant} ${ratioClass} ${
        isDark ? "border-white/10" : "border-border"
      } ${className}`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
        {Icon && (
          <span
            className={`flex h-14 w-14 items-center justify-center rounded-full ${
              isDark ? "bg-white/10" : "bg-white/75"
            }`}
          >
            <Icon
              className={`h-7 w-7 ${isDark ? "text-[color:var(--brand-accent)]" : "text-[color:var(--brand-forest)]"}`}
              strokeWidth={1.6}
              aria-hidden="true"
            />
          </span>
        )}
        {label && (
          <span className={`eyebrow ${isDark ? "!text-[color:var(--brand-accent)]" : ""}`}>{label}</span>
        )}
        {caption && (
          <p
            className={`max-w-xs text-sm leading-relaxed ${
              isDark ? "text-[color:var(--brand-cream)]/85" : "text-foreground/70"
            }`}
          >
            {caption}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};
