import photos from "@/data/photos.json";
import { useState } from "react";

// Variants are prepared offline; only the required size is downloaded.
export function Photo({
  name,
  alt = "",
  className = "",
  sizes = "(max-width: 700px) 100vw, 50vw",
  priority = false,
  mobile = false,
}) {
  const photo = photos[name];
  const mobilePhoto = mobile ? photos[`${name}-mobil`] : null;
  const [failed, setFailed] = useState(false);

  if (!photo || failed) {
    return (
      <div
        className={`photo photo-fallback ${className}`}
        role="img"
        aria-label={alt || "Bildplatzhalter"}
      />
    );
  }

  const srcSet = (asset) =>
    asset.widths
      .map((width) => `/images/${asset.name}-${width}.webp ${width}w`)
      .join(", ");

  return (
    <picture className={`photo ${className}`}>
      {mobilePhoto && (
        <source
          media="(max-width: 767px)"
          srcSet={srcSet(mobilePhoto)}
          sizes="100vw"
          width={mobilePhoto.width}
          height={mobilePhoto.height}
        />
      )}
      <img
        src={`/images/${photo.name}-${photo.widths[photo.widths.length - 1]}.webp`}
        srcSet={srcSet(photo)}
        sizes={sizes}
        width={photo.width}
        height={photo.height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        onError={() => setFailed(true)}
      />
    </picture>
  );
}
