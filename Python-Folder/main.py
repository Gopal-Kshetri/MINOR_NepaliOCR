import cv2
import os
import sys
import matplotlib
import matplotlib.pyplot as plt
import numpy as np
import PIL
from wand.image import Image
from skimage.filters import threshold_sauvola

import pytesseract
from pytesseract import Output
from scipy.ndimage import interpolation as inter


def findScore(img, angle):
    """
    Generates a score for the binary image recieved dependent on the determined angle.n
    Vars:n
    - array <- numpy array of the labeln
    - angle <- predicted angle at which the image is rotated byn
    Returns:n
    - histogram of the image
    - score of potential angle
    """
    data = inter.rotate(img, angle, reshape = False, order = 0)
    hist = np.sum(data, axis = 1)
    score = np.sum((hist[1:] - hist[:-1]) ** 2)
    return hist, score

def apply_skew_correction(img):
    """
    Takes in a nparray and determines the skew angle of the text, then corrects the skew and returns the corrected image.n
    Vars:n
    - img <- numpy array of the labeln
    Returns:n
    - Corrected image as a numpy arrayn
    """
    #Crops down the skewImg to determine the skew angle
    img = cv2.resize(img, (0, 0), fx = 0.75, fy = 0.75)

    delta = 1
    limit = 45
    angles = np.arange(-limit, limit+delta, delta)
    scores = []
    for angle in angles:
        hist, score = findScore(img, angle)
        scores.append(score)
    bestScore = max(scores)
    bestAngle = angles[scores.index(bestScore)]
    # rotated = inter.rotate(img, bestAngle, reshape = False, order = 0)
    # print("[INFO] angle: {:.3f}".format(bestAngle))
    #cv2.imshow("Original", img)
    #cv2.imshow("Rotated", rotated)
    #cv2.waitKey(0)

    #Return img
    return bestAngle

#skew correction
def deskew(image):
  coords = np.column_stack(np.where(image > 0))
  angle = apply_skew_correction(image)
  (h, w) = image.shape[:2]
  center = (w // 2, h // 2)
  M = cv2.getRotationMatrix2D(center, angle, 1.0)
  rotated = cv2.warpAffine(image, M, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)
  # angle = cv2.minAreaRect(coords)[-1]
  # if angle < -45:
  #   angle = -(90 + angle)
  # else:
  #   angle = -angle
  #   (h, w) = image.shape[:2]
  #   center = (w // 2, h // 2)
  #   M = cv2.getRotationMatrix2D(center, angle, 1.0)
  #   rotated = cv2.warpAffine(image, M, (w, h), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)
  return rotated

path = os.getcwd()+'/Python-Folder/images/'+sys.argv[1]

# # image scaling (dpi change gareko)
# im = PIL.Image.open(path)
# im.save("Python-Folder/scaled.jpg", dpi=(300,300))

# image_path = "Python-Folder/scaled.jpg"

# sharpen image using imagemagick
with Image(filename=path) as img:
#with Image(filename="/content/image repair 12 (1).png") as img:
    img.sharpen(radius=8, sigma=4)
    img.save(filename="Python-Folder/sharpened.jpg")

image_path = "Python-Folder/sharpened.jpg"

# gray image ------------  o/p jhan tori aayo
originalImage= cv2.imread(image_path)
grayImage = cv2.cvtColor(originalImage, cv2.COLOR_BGR2GRAY)
cv2.imwrite('Python-Folder/gray.jpg', grayImage)

image_path = "Python-Folder/gray.jpg"

#binarising the image ---------------- esle ni extra black dinxa bg ma
im_gray = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
(thresh, im_bw) = cv2.threshold(im_gray, 128, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
im_bw = cv2.threshold(im_gray, thresh, 255, cv2.THRESH_BINARY)[1]
cv2.imwrite('Python-Folder/binary.jpg', im_bw)

image_path = "Python-Folder/binary.jpg"

# #correcting skewness ----------------- works only for binarized image --------- depth == CV_32F || depth == CV_32S) required in image argument
# # bin_image = cv2.imread(image_path) 
# # img_ds = deskew(bin_image)
# img_ds = deskew(im_bw)
# cv2.imwrite('Python-Folder/skewed.jpg', img_ds)

# image_path = "Python-Folder/skewed.jpg"

# ----------------------------------------- Sauvola binarization -------------------------------

image_path = cv2.imread(image_path, 0)
#alpha = 1.5 # Contrast control (1.0-3.0)
#beta = 0 # Brightness control (0-100)
#image_path = cv2.convertScaleAbs(image_path, alpha=alpha, beta=beta)
window_size = 25
#img = cv2.imread(image_path, 0)
thresh_sauvola = threshold_sauvola(image_path, window_size = window_size)
binary_sauvola = image_path > thresh_sauvola

plt.subplot(2, 2, 1)
plt.imshow(binary_sauvola, cmap=plt.cm.gray)
# plt.title('Sauvola Threshold')
plt.axis('off')
# plt.savefig('./Python-Folder/processed.jpg')
plt.imsave("./Python-Folder/processed.jpg", binary_sauvola,cmap=plt.cm.gray)

# plt.show()

upadtedPath = os.getcwd()+'/Python-Folder/processed.jpg'
image = PIL.Image.open(upadtedPath)

custom_config = r'--oem 3 --psm 6 --tessdata-dir "./Python-Folder/tessdata/"'
# custom_config = r'--oem 3 --psm 6 -c tessedit_char_whitelist=१२३४५६७८९०अआइईउऊएऐओऔंअंअःऋकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसहक्षत्रज्ञाीिोौ े ृ ू ँ ्  ु()'
# custom_config = r'--oem 3 --psm 6 -c tessedit_char_blacklist=1234567890~`@#$%^&*()_+{}[];.\|'
str = pytesseract.image_to_string(image,lang='nepali' ,config=custom_config)

print(str)
sys.stdout.flush()
