import cv2
import os
import sys
import matplotlib
import matplotlib.pyplot as plt
import numpy as np
import PIL
from wand.image import Image
# from skimage.data import page
from skimage.filters import threshold_sauvola

import pytesseract
from pytesseract import Output

path = os.getcwd()+'/Python-Folder/images/'+sys.argv[1]

# sharpen image using imagemagick
with Image(filename=path) as img:
#with Image(filename="/content/image repair 12 (1).png") as img:
    img.sharpen(radius=8, sigma=4)
    img.save(filename="Python-Folder/sharpened.jpg")

# Sauvola binarization

image_path = "Python-Folder/sharpened.jpg"

image_path = cv2.imread(image_path, 0)
#alpha = 1.5 # Contrast control (1.0-3.0)
#beta = 0 # Brightness control (0-100)
#image_path = cv2.convertScaleAbs(image_path, alpha=alpha, beta=beta)
window_size = 25
#img = cv2.imread(image_path, 0)
thresh_sauvola = threshold_sauvola(image_path, window_size = window_size)
binary_sauvola = image_path > thresh_sauvola

plt.subplot(2, 1, 1)
plt.imshow(binary_sauvola, cmap=plt.cm.gray)
# plt.title('Sauvola Threshold')
plt.axis('off')
plt.savefig('./Python-Folder/processed.jpg')
# plt.show()

upadtedPath = os.getcwd()+'/Python-Folder/processed.jpg'
image = PIL.Image.open(upadtedPath)

custom_config = r'--oem 3 --psm 6 '
str = pytesseract.image_to_string(image,lang='nep+eng' ,config=custom_config)

print(str)
sys.stdout.flush()




# plt.imsave("onePic.jpg", binary_sauvola,cmap=plt.cm.gray)


# originalImage= cv2.imread('./images/T1.jpg')
# grayImage = cv2.cvtColor(originalImage, cv2.COLOR_BGR2GRAY)
# grayImage.show()

