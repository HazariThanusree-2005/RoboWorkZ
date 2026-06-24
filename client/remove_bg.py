from PIL import Image

def blend_white_to_bg(input_path, output_path, bg_color=(5, 3, 18)):
    img = Image.open(input_path).convert('RGBA')
    pixels = img.load()
    
    for y in range(img.height):
        for x in range(img.width):
            r, g, b, a = pixels[x, y]
            # Simple heuristic: if pixel is bright/white, blend it
            # calculate brightness
            brightness = (r + g + b) / 3
            if brightness > 200:
                # Calculate how close to white it is (0 to 1)
                factor = (brightness - 200) / 55.0
                factor = min(1.0, factor)
                # Blend with background
                new_r = int(r * (1 - factor) + bg_color[0] * factor)
                new_g = int(g * (1 - factor) + bg_color[1] * factor)
                new_b = int(b * (1 - factor) + bg_color[2] * factor)
                pixels[x, y] = (new_r, new_g, new_b, 255)
            
    img.save(output_path, 'PNG')

blend_white_to_bg('public/login.jpg', 'public/login_bg.png')
blend_white_to_bg('public/reigister.jpg', 'public/reigister_bg.png')
