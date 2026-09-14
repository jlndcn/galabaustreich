"""Optimize the generated floral border, retaining its transparent alpha channel."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[2]
destination = root / "frontend/src/assets/decorations/bluetenrahmen.webp"
destination.parent.mkdir(parents=True, exist_ok=True)
with Image.open(root / "assets-src/decorations/bluetenrahmen.png") as original:
    image = original.convert("RGBA")
    image.thumbnail((1200, 800), Image.Resampling.LANCZOS)
    image.save(destination, "WEBP", quality=85, method=6)
print(f"Prepared {destination.name}: {destination.stat().st_size} bytes")
