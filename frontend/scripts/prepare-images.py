"""Rebuild committed responsive WebP assets: python frontend/scripts/prepare-images.py.

Requires Pillow. Originals stay outside public; EXIF data is not copied.
"""
from pathlib import Path
import json
import hashlib
import re
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[2]
DEST = ROOT / "frontend/public/images"
DEST.mkdir(parents=True, exist_ok=True)
manifest = {}
manifest_path = ROOT / "frontend/src/data/photos.json"
previous = json.loads(manifest_path.read_text(encoding="utf-8")) if manifest_path.exists() else {}


def export(source, name, widths, crop=None):
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original)
        image = image.convert("RGB")
        if crop:
            image = ImageOps.fit(image, crop, centering=(0.86, 0.43))
        widths = sorted(set([width for width in widths if width <= image.width] + [min(image.width, max(widths))]))
        fingerprint = source.read_bytes() + (f"{crop}:0.86:0.43".encode() if crop else b"")
        file_name = f"{name}-{hashlib.sha256(fingerprint).hexdigest()[:8]}"
        for width in widths:
            height = round(image.height * width / image.width)
            image.resize((width, height), Image.Resampling.LANCZOS).save(
                DEST / f"{file_name}-{width}.webp", "WEBP", quality=80, method=6
            )
        manifest[name] = dict(name=file_name, width=image.width, height=image.height, widths=widths, source=str(source.relative_to(ROOT)))


customers = {
    "ChatGPT Image 14. Sept. 2026, 10_50_42.png": "gartenpflege-team-streich",
    "ChatGPT Image 14. Sept. 2026, 11_13_21.png": "streich-im-rosengarten",
    "ChatGPT Image 14. Sept. 2026, 10_47_00.png": "team-streich",
    "ChatGPT Image 14. Sept. 2026, 10_42_40.png": "garten-streich-arbeitskleidung",
    "ChatGPT Image 14. Sept. 2026, 10_53_11.png": "gartenarbeit-streich",
    "ChatGPT Image 14. Sept. 2026, 11_19_53.png": "rose-in-haenden-streich",
    "ChatGPT Image 14. Sept. 2026, 11_18_09.png": "rosenpflege-detail-streich",
    "ChatGPT Image 14. Sept. 2026, 10_35_47.png": "gartenbrunnen-streich",
}
for source_name, name in customers.items():
    source = ROOT / "Bilder" / source_name
    widths = [480, 800, 1200, 1536]
    export(source, name, widths)
    if name == "gartenpflege-team-streich":
        export(source, f"{name}-mobil", [480, 640], crop=(640, 1024))

for source in sorted((ROOT / "assets-src/services").glob("*.png")):
    export(source, source.stem, [480, 800, 1200, 1536])

# Remove only known obsolete generated variants, after every replacement succeeded.
current_files = {f"{asset['name']}-{width}.webp" for asset in manifest.values() for width in asset["widths"]}
for asset in previous.values():
    for width in asset["widths"]:
        old_file = (DEST / f"{asset['name']}-{width}.webp").resolve()
        if old_file.parent != DEST.resolve():
            raise ValueError("Image cleanup target is outside the output directory")
        if old_file.name not in current_files:
            old_file.unlink(missing_ok=True)
manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")

# Preserve the existing JavaScript notice without showing the team on other pages.
html_path = ROOT / "frontend/public/index.html"
html = html_path.read_text(encoding="utf-8")
fallback = '<noscript>Bitte aktivieren Sie JavaScript, um diese Website vollständig zu nutzen.</noscript>'
html_path.write_text(re.sub(r"<noscript>.*?</noscript>", fallback, html, flags=re.DOTALL), encoding="utf-8")
print(f"Prepared {len(manifest)} image sets in {DEST}")
