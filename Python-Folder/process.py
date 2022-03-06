# %%
import cv2
import numpy as np
from scipy.ndimage import interpolation as inter


def apply_morphological_operation(img, method):
    """Apply a morphological operation depending on method

    Opening: erosion followed by dilation and is useful for removing noise
    Closing: dilation followed by erosion and is useful for closing small holes

    Args:
        img: image as numpy array
        method: either 'open' for opening or 'close' for closing

    Returns:
        Image as numpy array

    """
    if method == "open":
        op = cv2.MORPH_OPEN
    elif method == "close":
        op = cv2.MORPH_CLOSE

    return cv2.morphologyEx(
        src=img,
        op=op,
        kernel=np.ones((5, 5), np.uint8),
    )


def apply_gaussian_smoothing(img):
    """Apply Gaussian smoothing with 5x5 kernal size

    Useful for removing high frequency content (e.g. noise)

    Args:
        img: image as numpy array

    Returns:
        Image as numpy array
    """
    return cv2.GaussianBlur(
        src=img,
        ksize=(5, 5),
        sigmaX=0,
        sigmaY=0,
    )


def apply_adaptive_thresholding(img, method):
    """Apply adaptive thresholding with a threshold value depending on method

    Threshold value is:
    Gaussian:  sum of neighborhood values where weights are a Gaussian window
    Mean: mean of neighborhood area

    Useful when the image has different lighting conditions in different areas

    Args:
        img: image as numpy array
        method: either 'gaussian' for 'mean'

    Returns:
        Image as numpy array
    """
    img = cv2.cvtColor(
        src=img,
        code=cv2.COLOR_RGB2GRAY,
    )

    if method == "gaussian":
        adaptive_method = cv2.ADAPTIVE_THRESH_GAUSSIAN_C

    elif method == "mean":
        adaptive_method = cv2.ADAPTIVE_THRESH_MEAN_C

    return cv2.adaptiveThreshold(
        src=img,
        maxValue=255,
        adaptiveMethod=adaptive_method,
        thresholdType=cv2.THRESH_BINARY,
        blockSize=11,
        C=2,
    )


def apply_sobel_filter(img, direction):
    """
    Apply Sobel filter of first order (i.e. 1st derivative) along direction

    Direction could be along x (horizontally) or y (vertically)


    Useful to detect horizontal or vertical edges and are resistant to noise

    Args:
        img: image as numpy array
        direction: either 'h' or 'v'

    Returns:
        Image as numpy array
    """
    img = cv2.cvtColor(
        src=img,
        code=cv2.COLOR_RGB2GRAY,
    )

    if direction == "h":
        dx, dy = 0, 1

    elif direction == "v":
        dx, dy = 1, 0

    return cv2.Sobel(
        src=img,
        ddepth=cv2.CV_64F,
        dx=dx,
        dy=dy,
        ksize=3,
    )


def apply_laplacian_filter(img):
    """
    Apply Laplacian filter of second order (i.e. 2nd derivative) along both x (horizontally) and y (vertically)

    Useful to detect edges

    Args:
        img: image as numpy array

    Returns:
        Image as numpy array
    """
    img = cv2.cvtColor(
        src=img,
        code=cv2.COLOR_RGB2GRAY,
    )

    return np.uint8(
        np.absolute(
            cv2.Laplacian(
                src=img,
                ddepth=cv2.CV_64F,
            )
        )
    )

# #def apply_skew_correction(img):

#    def find_score(arr, angle):
#        data = inter.rotate(arr, angle, reshape=False, order=0)
#        hist = np.sum(data, axis=1)
#        score = np.sum((hist[1:] - hist[:-1]) ** 2)
#        return hist, score

#    delta = 1
#    limit = 5
#    angles = np.arange(-limit, limit+delta, delta)
#    scores = []
#    for angle in angles:
#        hist, score = find_score(bin_img, angle)
#        scores.append(score)

#    best_score = max(scores)
#    best_angle = angles[scores.index(best_score)]
#    print('Best angle: {}'.formate(best_angle))

#    # correct skew
#    data = inter.rotate(bin_img, best_angle, reshape=False, order=0)
#    img = im.fromarray((255 * data).astype("uint8")).convert("RGB")
#    img.save('skew_corrected.png')

# def apply_skew_correction(image, delta=1, limit=5):
#     def determine_score(arr, angle):
#         data = inter.rotate(arr, angle, reshape=False, order=0)
#         histogram = np.sum(data, axis=1)
#         score = np.sum((histogram[1:] - histogram[:-1]) ** 2, dtype=float)
#         return histogram, score

#     gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
#     thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]

#     scores = []
#     angles = np.arange(-limit, limit + delta, delta)
#     for angle in angles:
#         histogram, score = determine_score(thresh, angle)
#         scores.append(score)

#     best_angle = angles[scores.index(max(scores))]

#     (h, w) = image.shape[:2]
#     center = (w // 2, h // 2)
#     M = cv2.getRotationMatrix2D(center, best_angle, 1.0)
#     rotated = cv2.warpAffine(image, M, (w, h), flags=cv2.INTER_CUBIC, \
#               borderMode=cv2.BORDER_REPLICATE)

#     return best_angle, rotated


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
    rotated = inter.rotate(img, bestAngle, reshape = False, order = 0)
    print("[INFO] angle: {:.3f}".format(bestAngle))
    #cv2.imshow("Original", img)
    #cv2.imshow("Rotated", rotated)
    #cv2.waitKey(0)

    #Return img
    return rotated
