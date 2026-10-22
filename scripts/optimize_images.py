import os
from PIL import Image

def optimize_pngs():
    img_dir = "public/images/projects"
    for fname in os.listdir(img_dir):
        if fname.endswith(".png"):
            fpath = os.path.join(img_dir, fname)
            original_size = os.path.getsize(fpath)
            
            with Image.open(fpath) as img:
                img_rgb = img.convert("RGB")
                # Save optimized PNG
                img_rgb.save(fpath, "PNG", optimize=True)
                new_size = os.path.getsize(fpath)
                print(f"Optimized {fname}: {original_size // 1024}KB -> {new_size // 1024}KB")

if __name__ == "__main__":
    optimize_pngs()
