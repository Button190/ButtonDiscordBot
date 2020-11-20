# NOTE : for noise reduction: https://nanonets.com/blog/ocr-with-tesseract/


#sudo apt-get update
#sudo apt-get install tesseract-ocr
#sudo apt-get install libtesseract-dev
#pip install opencv-python
#NOTE: FOR WINDOWS - https://digi.bib.uni-mannheim.de/tesseract/tesseract-ocr-w64-setup-v5.0.0-alpha.20191030.exe
#NOTE: documentation - https://pypi.org/project/pytesseract/

import cv2 
import pytesseract
import pyautogui
import numpy

try:
    pytesseract.pytesseract.tesseract_cmd = r'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'
except:
    """
    linux doesn't need that line, but an error on windows means we need to do something.
    """

"""
this function will take a screenshot and process it for text without saving the image to disk.
"""
def text_from_screen():
    screeshot = pyautogui.screenshot()
    numpy_img = numpy.array(screeshot)
    cv2_img = cv2.cvtColor(numpy_img, cv2.COLOR_RGB2BGR)
    custom_config = r'-l eng --oem 3 --psm 6'
    text = pytesseract.image_to_string(cv2_img, config=custom_config)
    return text

"""
this function will take a screenshot and save the image to disk.
input: save path string
"""
def text_from_image(image_path):
    img = cv2.imread(image_path)
    custom_config = r'-l eng --oem 3 --psm 6'
    text = pytesseract.image_to_string(img, config=custom_config)
    return text

"""
this function will take a screenshot and save the image to disk.
input: save path string 
"""
def screenshot(save_path):
    myScreenshot = pyautogui.screenshot()
    myScreenshot.save(save_path)
