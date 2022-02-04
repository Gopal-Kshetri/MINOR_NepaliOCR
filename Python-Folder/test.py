import sys
import cv2 
import os
import pytesseract
from pytesseract import Output
path = os.getcwd()+'/Nepali-OCR/'+sys.argv[1]
print(path)
img = cv2.imread(path)
#img = cv2.imread('Nepali-OCR/IMG_0731.jpg')
custom_config = r'--oem 3 --psm 6 '
str = pytesseract.image_to_string(img,lang='nep' ,config=custom_config)

print(str)
sys.stdout.flush()