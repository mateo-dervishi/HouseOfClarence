#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os

# Create favicons in public folder
public_dir = "/Users/mateodervishi/Desktop/House of Clarence Website/public"

# Favicon sizes
sizes = [16, 32, 48, 180]  # 180 for Apple Touch Icon

# Try to find a font
font_paths = [
    "/System/Library/Fonts/Supplemental/Arial.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
    "/System/Library/Fonts/SFNSText.ttf",
]

def get_font(size):
    for font_path in font_paths:
        if os.path.exists(font_path):
            try:
                return ImageFont.truetype(font_path, size)
            except:
                continue
    return ImageFont.load_default()

def create_favicon(size, text_color, bg_color, filename):
    # Create image at higher resolution for quality
    scale = 4
    img = Image.new('RGBA', (size * scale, size * scale), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Font size - 38% of icon size to fit all letters
    font_size = int(size * scale * 0.38)
    font = get_font(font_size)
    
    # Tighter letter spacing
    letter_spacing = font_size * 0.08
    
    text = "HOC"
    letters = list(text)
    
    # Calculate total width
    total_width = 0
    letter_widths = []
    for letter in letters:
        bbox = draw.textbbox((0, 0), letter, font=font)
        width = bbox[2] - bbox[0]
        letter_widths.append(width)
        total_width += width
    total_width += letter_spacing * (len(letters) - 1)
    
    # Calculate height for vertical centering
    bbox = draw.textbbox((0, 0), "H", font=font)
    text_height = bbox[3] - bbox[1]
    
    # Starting position (centered)
    x = (size * scale - total_width) / 2
    # Center vertically with slight adjustment for optical balance
    y = (size * scale - text_height) / 2 - (text_height * 0.1)
    
    # Draw each letter
    for i, letter in enumerate(letters):
        draw.text((x, y), letter, font=font, fill=text_color)
        x += letter_widths[i] + letter_spacing
    
    # Resize down to target size with high-quality resampling
    img = img.resize((size, size), Image.Resampling.LANCZOS)
    
    # Save
    filepath = os.path.join(public_dir, filename)
    img.save(filepath, 'PNG')
    print(f"Created: {filename} ({size}x{size})")

print("Generating favicons...")
print("-" * 40)

# Dark mode favicon (white text, transparent bg)
for size in sizes:
    create_favicon(size, (255, 255, 255, 255), (0, 0, 0, 0), f"favicon-white-{size}.png")

# Light mode favicon (black text, transparent bg)
for size in sizes:
    create_favicon(size, (10, 10, 10, 255), (0, 0, 0, 0), f"favicon-black-{size}.png")

# Apple touch icons (need solid background)
create_favicon(180, (255, 255, 255, 255), (10, 10, 10, 255), "apple-touch-icon-dark.png")
create_favicon(180, (10, 10, 10, 255), (248, 247, 245, 255), "apple-touch-icon-light.png")

print("-" * 40)
print("Done! Favicons saved to public folder")
