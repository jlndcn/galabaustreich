import mediaData from "@/content/media-slots.json";

const byId = Object.fromEntries(
  (mediaData.slots || []).map((slot) => [slot.id, slot]),
);

/**
 * Resolve a CMS media slot.
 * If `image` is set (Decap upload → /images/...), use that file.
 * Otherwise fall back to the responsive photo catalog key.
 */
export function getMediaSlot(id) {
  const slot = byId[id];
  if (!slot) {
    return { alt: "", photoKey: null, src: null, useMobileVariant: false };
  }
  const uploaded = (slot.image || "").trim();
  return {
    alt: slot.alt || "",
    photoKey: uploaded ? null : slot.photoKey || null,
    src: uploaded || null,
    useMobileVariant: Boolean(slot.useMobileVariant) && !uploaded,
    label: slot.label || id,
  };
}

export const mediaSlots = mediaData.slots || [];
