import math
import sys
import cv2
import os


from PIL import Image, ImageFilter
import matplotlib.pyplot as plt

import pytesseract
from pytesseract import Output

# # Ensure correct usage
# if len(sys.argv) != 2:
#     sys.exit("Usage: python filter.py filename")


path = os.getcwd()+'/Python-Folder/'+sys.argv[1]

print(path)

# Open image
image = Image.open(path).convert("RGB")

# Filter image according to edge detection kernel
kernelFiltered = image.filter(ImageFilter.Kernel(
    size=(3, 3),
    kernel=[-1, -1, -1, -1, 8, -1, -1, -1, -1],
    scale=1
))

whiteFiltered = kernelFiltered.filter(ImageFilter.CONTOUR)

# show filtered image
whiteFiltered.show()

# Run tesseract model
custom_config = r'--oem 3 --psm 6 '
str = pytesseract.image_to_string(whiteFiltered,lang='nepali' ,config=custom_config)

print(str)
sys.stdout.flush()