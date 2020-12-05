#!python3

#Install shell by running:
#$ pip3 install -U shell

#Install xdotool on remote RPI (to simulate keystrokes) by running on the remote:
#$ sudo apt-get install xdotool

# NOTE:
# http://localhost:3333/?route=shell&data=urlenc_command

# python3 ../remotes/tv_remote.py --direction-HDMI-2 --ignore-box

# steps to add a new command:
# create button, on google sheet, fill in all fields
# create a command line argument statement at the bottom (based on cmd from step before)
# copy one of the seed routines and attribute a different name (based on the routine of the step before...)
# for meo: change the data in base 64, and use the Hex view in the inspector to copy>as base 64

import argparse
from shell import shell
import requests
import base64
import time

def meoBoxChannelNum(num):
    for x in list(num):
        meoBoxChannelNum_(x)
        #print(x)
    time.sleep(0.15)
    meoBoxOk()
    time.sleep(0.15) #min = 0.15
    meoBoxBack()    

def meoBoxPowerOn():
    resourceURI = "http://192.168.1.78:53208/companion?cid=D96D130B-E82C-4AEE-8A9B-C510E2F3752A&hash=000000640000002803B28D6536667BD1"
    method = "POST"
    headers = []
    data = "J2OxBsSUS8y5e7NsUi5LVUmVruM/4fSlFgZuNkVCnDQoAXRJH+kO1Q=="
    usingBase64 = True
    response = localRequest(resourceURI,method, headers, data, usingBase64)
    return response.status_code

def localRequest(resourceURI,method, headers, data, usingBase64):
    if usingBase64:
        data = base64.b64decode(data)
    try:
        response = requests.post(resourceURI, data = data)
    except Exception as e:
        response = {'status_code': 0, 'text': e.args}
    return response

def complexActionHandler(args):
    if args.off_tv:
        shell(ctl_string + "KEY_POWEROFF")
        meoBoxPowerOff()
    
    if args.power_on_box:
        meoBoxPowerOn()

    if args.pause_box:
        meoBoxPlayPause()
        meoBoxBack()
    
    if args.volume_num_box:
        meoBoxVolume(args.volume_num_box)     

    if args.direction_HDMI_2 or args.direction_HDMI_1:
        if not args.ignore_box:
            meoBoxMuteUnmute()
            time.sleep(0.01)
            meoBoxPlayPause()
            time.sleep(0.01)
        localSamsungctl(args.direction_HDMI_2,0.01)
        if args.direction_HDMI_2:
            shell("xset -display :0 dpms force on")
    return True

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--direction-HDMI-2', default=False, help='Switch to hdmi 2 display.')
    parser.add_argument('--direction-HDMI-1', default=False, help='Switch to hdmi 2 display.')
    parser.add_argument('--ignore-box', default=True, help='Don\'t auto-pause/unpause/mute/unmute box.')
    parser.add_argument('--off-tv', default=False, help='Turn off TV.')
    parser.add_argument('--power-on-box', default=False, help='Power on box.')
    args = parser.parse_args()
    
    print(complexActionHandler(args))
