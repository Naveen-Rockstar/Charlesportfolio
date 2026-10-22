import os
import subprocess
from PIL import Image, ImageDraw, ImageFont

def generate_og():
    width = 1200
    height = 630
    
    # Create image with background #11120D
    img = Image.new("RGB", (width, height), color="#11120D")
    draw = ImageDraw.Draw(img)
    
    # Load fonts
    try:
        font_headline = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 64)
        font_subheadline = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 30)
        font_desc = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 24)
        font_meta = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 15)
        font_pill = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 14)
        font_large_bold = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 68)
        font_h2_bold = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 32)
        font_meta_bold = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 14)
    except Exception:
        # Fallback to default
        font_headline = ImageFont.load_default()
        font_subheadline = font_headline
        font_desc = font_headline
        font_meta = font_headline
        font_pill = font_headline
        font_large_bold = font_headline
        font_h2_bold = font_headline
        font_meta_bold = font_headline

    # Draw subtle background grid
    grid_color = "#181A13"
    grid_step = 60
    for x in range(0, width, grid_step):
        draw.line([(x, 0), (x, height)], fill=grid_color, width=1)
    for y in range(0, height, grid_step):
        draw.line([(0, y), (width, y)], fill=grid_color, width=1)
        
    # Draw double border frame
    draw.rectangle([(28, 28), (width - 28, height - 28)], outline="#282A22", width=1)
    draw.rectangle([(34, 34), (width - 34, height - 34)], outline="#1D1F17", width=1)
    
    # Corner accent marks (lime ticks)
    lime = "#D8F33A"
    ivory = "#F5F0E8"
    ivory_muted = "#A8A69E"
    border_col = "#2E3027"
    
    # Corner brackets
    corner_len = 16
    corners = [(28, 28), (width - 28, 28), (28, height - 28), (width - 28, height - 28)]
    for cx, cy in corners:
        dx = corner_len if cx == 28 else -corner_len
        dy = corner_len if cy == 28 else -corner_len
        draw.line([(cx, cy), (cx + dx, cy)], fill=lime, width=2)
        draw.line([(cx, cy), (cx, cy + dy)], fill=lime, width=2)

    # Top Meta Bar
    top_y = 70
    left_x = 75
    
    # Glowing dot
    draw.ellipse([(left_x, top_y + 3), (left_x + 10, top_y + 13)], fill=lime)
    draw.text((left_x + 22, top_y), "CHARLES NAVEEN", fill=lime, font=font_meta_bold)
    draw.text((left_x + 180, top_y), "/", fill="#44463C", font=font_meta)
    draw.text((left_x + 200, top_y), "FREELANCE WEB DEVELOPER", fill="#D4D2C9", font=font_meta_bold)
    
    # Top Right Status Pill
    status_text = "AVAILABLE FOR CLIENT BUILDS & AGENCY SUBCONTRACTING"
    status_w = draw.textlength(status_text, font=font_meta_bold)
    pill_x = width - 75 - status_w - 30
    draw.rounded_rectangle([(pill_x, top_y - 4), (width - 75, top_y + 20)], radius=4, fill="#1D2015", outline="#363A24", width=1)
    draw.ellipse([(pill_x + 12, top_y + 5), (pill_x + 18, top_y + 11)], fill=lime)
    draw.text((pill_x + 26, top_y + 1), status_text, fill="#E2F188", font=font_meta_bold)

    # Hairline divider
    draw.line([(left_x, top_y + 36), (width - 75, top_y + 36)], fill=border_col, width=1)

    # Main Hero Title
    title_y = 150
    draw.text((left_x, title_y), "CHARLES NAVEEN", fill=ivory, font=font_large_bold)
    
    # Subtitle role pill next to title
    draw.text((left_x + 650, title_y + 30), "[ FREELANCE WEB DEVELOPER ]", fill=lime, font=font_subheadline)

    # Primary Headline
    head_y = title_y + 92
    draw.text((left_x, head_y), "Websites built to turn business", fill=ivory, font=font_h2_bold)
    draw.text((left_x, head_y + 44), "attention into enquiries.", fill=lime, font=font_h2_bold)

    # Supporting Message
    desc_y = head_y + 112
    draw.text(
        (left_x, desc_y),
        "Websites for businesses. Development support for agencies.",
        fill="#FFFFFF",
        font=font_subheadline
    )
    draw.text(
        (left_x, desc_y + 44),
        "Custom responsive websites, campaign landing pages, and dependable white-label frontend engineering.",
        fill=ivory_muted,
        font=font_desc
    )

    # Bottom Meta Strip / Badges
    bottom_y = height - 105
    draw.line([(left_x, bottom_y - 20), (width - 75, bottom_y - 20)], fill=border_col, width=1)

    badges = [
        "CUSTOM REACT / MODERN CSS",
        "SUB-SECOND CORE WEB VITALS",
        "WHITE-LABEL AGENCY SUPPORT",
        "VERIFIED CLIENT CASE STUDIES"
    ]
    
    bx = left_x
    for badge in badges:
        bw = draw.textlength(badge, font=font_pill)
        draw.rounded_rectangle([(bx, bottom_y), (bx + bw + 20, bottom_y + 30)], radius=4, fill="#181A12", outline="#2F3320", width=1)
        draw.text((bx + 10, bottom_y + 7), badge, fill="#C5C7BC", font=font_pill)
        bx += bw + 30

    # Domain pill on right
    dom_text = "charlesportfolio-self.vercel.app ↗"
    dom_w = draw.textlength(dom_text, font=font_meta_bold)
    draw.rounded_rectangle([(width - 75 - dom_w - 24, bottom_y), (width - 75, bottom_y + 30)], radius=4, fill=lime, outline=lime, width=1)
    draw.text((width - 75 - dom_w - 12, bottom_y + 7), dom_text, fill="#11120D", font=font_meta_bold)

    out_path = "public/og-portfolio.png"
    img.save(out_path, "PNG", optimize=True)
    print(f"Successfully generated {out_path} ({width}x{height})")

if __name__ == "__main__":
    generate_og()
