import sys
import cv2 
import os
import pytesseract
from pytesseract import Output
path = os.getcwd()+'/Python-Folder/'+sys.argv[1]
img = cv2.imread(path)
#img = cv2.imread('Python-Folder/IMG_0731.jpg')
custom_config = r'--oem 3 --psm 6 '
str = pytesseract.image_to_string(img,lang='nep' ,config=custom_config)

print(str)
sys.stdout.flush()