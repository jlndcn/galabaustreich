import { Camera } from "lucide-react";

// Clearly marked placeholder for a future, real high-resolution photo.
// Purpose: give a strategic overview of every planned photo slot across the site.
// Replace later with an <img> (same aspect ratio) once real photography exists.
//
// Props:
//   label  – short name of the slot            (e.g. "Hero-Foto")
//   hint   – what the photo should show        (e.g. "Team bei der Gartenarbeit")
//   spec   – recommended format / resolution   (e.g. "Querformat · min. 1600×1200 px")
//   ratio  – aspect-ratio utility class        (default "aspect-[4/3]")
export const PhotoPlaceholder = ({
  label,
  hint,
  spec = "Empf. min. 1600 px Breite",
  ratio = "aspect-[4/3]",
  className = "",
  ...rest
}) => (
  <div
    data-testid="photo-placeholder"
    role="img"
    aria-label={`Platzhalter für ein Foto: ${label}${hint ? ` – ${hint}` : ""}`}
    className={`surface-organic relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-[rgba(74,106,44,0.4)] p-6 text-center ${ratio} ${className}`}
    {...rest}
  >
    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/75 text-[color:var(--brand-forest)] shadow-sm">
      <Camera className="h-6 w-6" strokeWidth={1.7} aria-hidden="true" />
    </span>

    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--brand-leaf)]">
      Foto folgt
    </p>

    {label && (
      <p className="mt-1.5 text-base font-semibold leading-snug text-[color:var(--brand-ink)]">
        {label}
      </p>
    )}

    {hint && (
      <p className="mt-1 max-w-[30ch] text-sm leading-relaxed text-muted-foreground">
        {hint}
      </p>
    )}

    {spec && (
      <p className="mt-3 rounded-full bg-white/70 px-3 py-1 text-[11px] font-medium text-[color:var(--brand-ink-soft)]">
        {spec}
      </p>
    )}
  </div>
);
