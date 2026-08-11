from pathlib import Path
from PIL import Image, ImageEnhance, ImageFilter, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
source = Image.open(ROOT / "assets/back-to-school/school-bus-rear.png").convert("RGBA")


def make_layer(name, lamps, glow_color):
    mask = Image.new("L", source.size, 0)
    draw = ImageDraw.Draw(mask)
    for x, y, radius in lamps:
        draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=255)

    glow_mask = mask.filter(ImageFilter.GaussianBlur(17))
    glow = Image.new("RGBA", source.size, glow_color)
    glow.putalpha(glow_mask.point(lambda value: int(value * 0.72)))

    bright = ImageEnhance.Brightness(source).enhance(2.15)
    bright = ImageEnhance.Color(bright).enhance(1.55)
    bright.putalpha(mask)

    layer = Image.new("RGBA", source.size, (0, 0, 0, 0))
    layer.alpha_composite(glow)
    layer.alpha_composite(bright)
    layer.save(ROOT / f"assets/back-to-school/{name}")


make_layer(
    "bus-red-lights.png",
    [(632, 169, 26), (1144, 169, 26), (618, 505, 25), (1150, 505, 25),
     (824, 67, 15), (875, 66, 15), (929, 67, 15)],
    (255, 18, 35, 255),
)
make_layer(
    "bus-amber-lights.png",
    [(700, 169, 26), (1086, 169, 26), (640, 620, 15), (1128, 620, 15)],
    (255, 169, 24, 255),
)
