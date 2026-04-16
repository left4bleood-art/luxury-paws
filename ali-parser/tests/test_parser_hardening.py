import unittest

from parser.downloader import _detect_extension
from parser.overrides import apply_overrides
from parser.validator import validate_product_card


class ParserHardeningTests(unittest.TestCase):
    def test_detect_extension_uses_real_file_signature(self):
        content = b"RIFF1234WEBPpayload"
        ext = _detect_extension("image/jpeg", content, "https://example.com/photo.jpg")
        self.assertEqual(ext, ".webp")

    def test_apply_overrides_supports_human_image_numbers(self):
        card = {
            "generated_title": "Old Title",
            "images": ["https://example.com/a.jpg"],
            "colors": [],
            "sizes": [],
            "features": [],
            "variants": [],
            "description_short": "",
            "material": "",
            "price_final_eur_number": 25.0,
            "price_final_eur": "€25.00",
        }
        raw_data = {
            "images": [
                "https://example.com/1.jpg",
                "https://example.com/2.jpg",
                "https://example.com/3.jpg",
            ]
        }
        overrides = {
            "title": "Manual Title",
            "image_numbers": [2, 3],
            "colors": ["pink", "black", "brown"],
        }

        updated = apply_overrides(card, raw_data, overrides)

        self.assertEqual(updated["generated_title"], "Manual Title")
        self.assertEqual(
            updated["images"],
            ["https://example.com/2.jpg", "https://example.com/3.jpg"],
        )
        self.assertEqual(updated["colors"], ["pink", "black", "brown"])

    def test_validator_moves_size_like_colors_into_sizes(self):
        raw_card = {
            "generated_title": "Round Plush Dog Sofa",
            "product_title": "Round Plush Dog Sofa",
            "images": ["https://example.com/a.webp", "https://example.com/a.webp"],
            "colors": ["Diameter -50cm", "pink"],
            "sizes": ["60 CM"],
            "features": ["Very soft plush", "Very soft plush"],
            "description_short": " Soft round pet bed ",
            "material": "Plush",
            "price_final_eur_number": 25,
            "price_final_eur": "€25.00",
            "variants": [],
        }

        cleaned, warnings = validate_product_card(raw_card)

        self.assertEqual(cleaned["colors"], ["pink"])
        self.assertEqual(cleaned["sizes"], ["60 CM", "Diameter -50cm"])
        self.assertEqual(cleaned["images"], ["https://example.com/a.webp"])
        self.assertTrue(warnings)


if __name__ == "__main__":
    unittest.main()