from pathlib import Path
from PIL import Image, ImageEnhance, ImageFilter, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
def make_layer(source_name, name, lamps, glow_color):
    source = Image.open(ROOT / f"assets/back-to-school/{source_name}").convert("RGBA")
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
    "school-bus-rear.png",
    "bus-red-lights.png",
    [(632, 169, 19), (1144, 169, 19), (618, 505, 21), (1150, 505, 21),
     (824, 67, 9), (875, 66, 9), (929, 67, 9)],
    (255, 18, 35, 255),
)
make_layer(
    "school-bus-rear.png",
    "bus-amber-lights.png",
    [(700, 169, 19), (1086, 169, 19), (640, 620, 11), (1128, 620, 11)],
    (255, 169, 24, 255),
)
make_layer(
    "school-bus.png",
    "bus-front-red-lights.png",
    [(368, 164, 16), (746, 153, 16)],
    (255, 18, 35, 255),
)
make_layer(
    "school-bus.png",
    "bus-front-amber-lights.png",
    [(422, 164, 16), (693, 153, 16), (468, 611, 22)],
    (255, 180, 30, 255),
)
