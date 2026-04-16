"""
Скачивание изображений товара с определением реального формата файла.
"""

from pathlib import Path
from typing import List

import httpx


def download_product_images(urls: List[str], dest_dir: str, prefix: str = "product") -> List[str]:
    """Скачивает изображения и сохраняет их с корректным расширением."""
    if not urls:
        return []

    output_dir = Path(dest_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    saved_paths = []
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/125.0.0.0 Safari/537.36"
        ),
        "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
    }

    with httpx.Client(follow_redirects=True, timeout=30.0, headers=headers) as client:
        for index, url in enumerate(urls, start=1):
            response = client.get(url)
            response.raise_for_status()

            extension = _detect_extension(
                content_type=response.headers.get("content-type", ""),
                content=response.content,
                source_url=url,
            )
            file_path = output_dir / f"{prefix}-{index}{extension}"
            file_path.write_bytes(response.content)
            saved_paths.append(str(file_path))

    return saved_paths


def _detect_extension(content_type: str, content: bytes, source_url: str) -> str:
    """Определяет расширение по content-type и сигнатуре файла."""
    lower_type = content_type.lower()

    if content.startswith(b"\xff\xd8\xff"):
        return ".jpg"
    if content.startswith(b"\x89PNG\r\n\x1a\n"):
        return ".png"
    if content[:4] == b"RIFF" and content[8:12] == b"WEBP":
        return ".webp"
    if len(content) > 12 and content[4:8] == b"ftyp" and content[8:12] in {b"avif", b"avis"}:
        return ".avif"
    if content.startswith((b"GIF87a", b"GIF89a")):
        return ".gif"

    if "jpeg" in lower_type or "jpg" in lower_type:
        return ".jpg"
    if "png" in lower_type:
        return ".png"
    if "webp" in lower_type:
        return ".webp"
    if "avif" in lower_type:
        return ".avif"

    lower_url = source_url.lower()
    for ext in [".jpg", ".jpeg", ".png", ".webp", ".avif"]:
        if lower_url.endswith(ext):
            return ext

    return ".img"