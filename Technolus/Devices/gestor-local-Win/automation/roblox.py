## Command to run:
# cls && python C:\GIT\gestor\local-gestor\gestor-local-Win\automation\roblox.py & cls

##############################################

## get initial time for logging purposes
from datetime import datetime
starttime = datetime.now();
iteration = 0

##############################################

## Timedelta prety printer
def strfdelta(tdelta, fmt):
    d = {"days": tdelta.days}
    d["hours"], rem = divmod(tdelta.seconds, 3600)
    d["minutes"], d["seconds"] = divmod(rem, 60)
    return fmt.format(**d)

##############################################

## clear console (helper function for aesthetic purposes)
import os
def cls():
    os.system('cls' if os.name=='nt' else 'clear')

##############################################

##hardware keypresses
import ctypes
import time

SendInput = ctypes.windll.user32.SendInput

# C struct redefinitions 
PUL = ctypes.POINTER(ctypes.c_ulong)
class KeyBdInput(ctypes.Structure):
    _fields_ = [("wVk", ctypes.c_ushort),
                ("wScan", ctypes.c_ushort),
                ("dwFlags", ctypes.c_ulong),
                ("time", ctypes.c_ulong),
                ("dwExtraInfo", PUL)]

class HardwareInput(ctypes.Structure):
    _fields_ = [("uMsg", ctypes.c_ulong),
                ("wParamL", ctypes.c_short),
                ("wParamH", ctypes.c_ushort)]

class MouseInput(ctypes.Structure):
    _fields_ = [("dx", ctypes.c_long),
                ("dy", ctypes.c_long),
                ("mouseData", ctypes.c_ulong),
                ("dwFlags", ctypes.c_ulong),
                ("time",ctypes.c_ulong),
                ("dwExtraInfo", PUL)]

class Input_I(ctypes.Union):
    _fields_ = [("ki", KeyBdInput),
                 ("mi", MouseInput),
                 ("hi", HardwareInput)]

class Input(ctypes.Structure):
    _fields_ = [("type", ctypes.c_ulong),
                ("ii", Input_I)]

# Actuals Functions

def PressKey(hexKeyCode):
    extra = ctypes.c_ulong(0)
    ii_ = Input_I()
    ii_.ki = KeyBdInput( 0, hexKeyCode, 0x0008, 0, ctypes.pointer(extra) )
    x = Input( ctypes.c_ulong(1), ii_ )
    ctypes.windll.user32.SendInput(1, ctypes.pointer(x), ctypes.sizeof(x))

def ReleaseKey(hexKeyCode):
    extra = ctypes.c_ulong(0)
    ii_ = Input_I()
    ii_.ki = KeyBdInput( 0, hexKeyCode, 0x0008 | 0x0002, 0, ctypes.pointer(extra) )
    x = Input( ctypes.c_ulong(1), ii_ )
    ctypes.windll.user32.SendInput(1, ctypes.pointer(x), ctypes.sizeof(x))

## directx scan codes http://www.gamespp.com/directx/directInputKeyboardScanCodes.html
#while (True):
#    PressKey(0x11)
#    time.sleep(1)
#    ReleaseKey(0x11)
#    time.sleep(1)

##############################################

##############################################

## Return continuously mouse position: get mouse position for reconfiguration. Testing/debugging only.
def getmouse():
    import pyautogui
    pyautogui.displayMousePosition()
    ret = pyautogui.position()
    return ret
#getmouse()

##############################################

## Timedelta prety printer
def strfdelta(tdelta, fmt):
    d = {"days": tdelta.days}
    d["hours"], rem = divmod(tdelta.seconds, 3600)
    d["minutes"], d["seconds"] = divmod(rem, 60)
    return fmt.format(**d)


## MAIN: Actions to be performed
def play():
    cls()

    global iteration
    import pyautogui, time
    from datetime import datetime, timedelta

    nowtime = datetime.now();

    print( "Time ini: " +  str(starttime.strftime("%H:%M:%S"))  )
    print( "Time now: " +  str(nowtime.strftime("%H:%M:%S"))  )
    print("+"*18)

    iteration+=1
    print( "Repetition: " + str(iteration) + " "*12 + "█"*(iteration%10+1) )
    print( "Since start: " + str( nowtime.utcnow() - starttime )[:-3] )

    # Actions
    enable = True # False #
    if enable:   
        ##print("Click")
        pyautogui.click(x=3598, y=1145)
        pyautogui.click(x=3598, y=1146) 
        ##print("Holding up for 3 seconds.")
        PressKey(0x11)
        time.sleep(4)
        ReleaseKey(0x11)
        ##print("Released.")

## Loop forever

while True:
    play()


#Map 1 (level 10):
#Start - end 0:08:40
# 7,317,459
# 7,745,248
# result: 822.67115 bux per second

#Map 2 (level 10):
#Start - end 1:31:40w
#   403,168
# 6,331,041
# result: 1077.79509


