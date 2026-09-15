import photos from "@/data/photos.json";
import { useState } from "react";

// Variants are prepared offline; only the required size is downloaded.
// `src` allows CMS-uploaded single images (Decap media) without the photo catalog.
export function Photo({
  name,
  src = null,
  alt = "",
  className = "",
  sizes = "(max-width: 700px) 100vw, 50vw",
  priority = false,
  mobile = false,
}) {
  const photo = name ? photos[name] : null;
  const mobilePhoto = name && mobile ? photos[`${name}-mobil`] : null;
  const [failed, setFailed] = useState(false);
  const uploaded = (src || "").trim();

  if (failed || (!photo && !uploaded)) {
    return (
      <div
        className={`photo photo-fallback ${className}`}
        role="img"
        aria-label={alt || "Bildplatzhalter"}
      />
    );
  }

  if (uploaded) {
    return (
      <picture className={`photo ${className}`}>
        <img
          src={uploaded}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding={priority ? "sync" : "async"}
          onError={() => setFailed(true)}
        />
      </picture>
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
        decoding={priority ? "sync" : "async"}
        onError={() => setFailed(true)}
      />
    </picture>
  );
}
