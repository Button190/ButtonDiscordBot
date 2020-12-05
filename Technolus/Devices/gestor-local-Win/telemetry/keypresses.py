import pyautogui
import ctypes
import time

def get_mouse_position():
    point = pyautogui.position()
    ret = {'x':point.x,'y':point.y}
    return ret

def display_mouse_position():
    pyautogui.displayMousePosition()

def get_mouse_buttons():
    MOUSE_LEFT_KEY = 0x01
    MOUSE_RIGHT_KEY = 0x02

    left_status = not ctypes.windll.user32.GetKeyState(MOUSE_LEFT_KEY) in [0,1]
    right_status = not ctypes.windll.user32.GetKeyState(MOUSE_RIGHT_KEY) in [0,1]

    ret = [left_status, right_status]
    return ret

def get_buttons():
    ret = False
    number=0
    while number < 254:
        if not ctypes.windll.user32.GetKeyState(number) in [0,1]:
            ret = hex(number)
            break
        number = number + 1
    return ret

if __name__ == '__main__':
    print(get_buttons())
