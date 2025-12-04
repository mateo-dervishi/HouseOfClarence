#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os

# Create logos directory
logos_dir = "/Users/mateodervishi/Desktop/House of Clarence Website/public/logos"
os.makedirs(logos_dir, exist_ok=True)

# Sizes configuration (size, canvas_width, canvas_height)
sizes = [
    (200, 600, 280),
    (120, 400, 180),
    (72, 260, 120),
    (36, 140, 70),
    (24, 100, 50),
]

# Try to find Inter font, fall back to system fonts
font_paths = [
    "/System/Library/Fonts/Supplemental/Arial.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
    "/System/Library/Fonts/SFNSText.ttf",
    "/Library/Fonts/SF-Pro-Text-Light.otf",
]

def get_font(size):
    # Try each font path
    for font_path in font_paths:
        if os.path.exists(font_path):
            try:
                return ImageFont.truetype(font_path, size)
            except:
                continue
    # Fallback to default
    return ImageFont.load_default()

def create_logo(text, font_size, canvas_width, canvas_height, text_color, filename):
    # Create transparent image (RGBA) at 2x resolution for quality
    scale = 2
    img = Image.new('RGBA', (canvas_width * scale, canvas_height * scale), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Get font
    font = get_font(font_size * scale)
    
    # Add letter spacing by drawing each letter
    letter_spacing = font_size * scale * 0.15
    
    # Calculate total width with spacing
    letters = list(text)
    total_width = 0
    letter_widths = []
    for letter in letters:
        bbox = draw.textbbox((0, 0), letter, font=font)
        width = bbox[2] - bbox[0]
        letter_widths.append(width)
        total_width += width
    total_width += letter_spacing * (len(letters) - 1)
    
    # Starting x position (centered)
    x = (canvas_width * scale - total_width) / 2
    y = (canvas_height * scale) / 2
    
    # Draw each letter
    for i, letter in enumerate(letters):
        bbox = draw.textbbox((0, 0), letter, font=font)
        letter_height = bbox[3] - bbox[1]
        draw.text((x, y - letter_height/2), letter, font=font, fill=text_color)
        x += letter_widths[i] + letter_spacing
    
    # Save
    filepath = os.path.join(logos_dir, filename)
    img.save(filepath, 'PNG')
    print(f"Created: {filename}")

# Generate all logos
print("Generating HOC logos...")
print("-" * 40)

for font_size, width, height in sizes:
    # Black text
    create_logo("HOC", font_size, width, height, (10, 10, 10, 255), f"HOC-black-{font_size}px.png")
    # White text
    create_logo("HOC", font_size, width, height, (255, 255, 255, 255), f"HOC-white-{font_size}px.png")

print("-" * 40)
print(f"Done! 10 PNG files saved to: {logos_dir}")

