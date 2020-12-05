#!python3

#Install shell by running:
#$ pip3 install -U shell

#Install xdotool (to simulate keystrokes) by running:
#$ sudo apt-get install xdotool

# NOTE:
# http://localhost:3333/?route=shell&data=urlenc_command

# python3 ../remotes/tv_remote.py --direction-HDMI-2 --ignore-box
# python3 ../remotes/tv_remote.py --direction-HDMI-1 --ignore-box

# python3 ../remotes/tv_remote.py --direction-HDMI-2
# python3 ../remotes/tv_remote.py --direction-HDMI-1

# python3 ../remotes/tv_remote.py --off-tv
# python3 ../remotes/tv_remote.py --pause-box
# python3 ../remotes/tv_remote.py --mute-box
## python3 ../remotes/tv_remote.py --power-box

# steps to add a new command:
# create button, on google sheet, fill in all fields
# create a command line argument statement at the bottom (based on cmd from step before)
# copy one of the seed routines and attribute a different name (based on the routine of the step before...)
# for meo: change the data in base 64, and use the Hex view in the inspector to copy>as base 64

#<!--------------------------------------------------------------------->
#--> RAW Example from Fiddler: PAUSE
#POST http://192.168.1.78:53208/companion?cid=D96D130B-E82C-4AEE-8A9B-C510E2F3752A&hash=000000640000002803B28D6536667BD1 HTTP/1.1
#Host: 192.168.1.78:53208
#Connection: Keep-Alive
#Accept-Encoding: gzip
#User-Agent: okhttp/3.10.0
#Fiddler-Encoding: base64
##Data:
#Y3+RUff84oL3Sqfk2RSPXfzBoxJ+iDCcCDkN2ica3AVl4sXEP+YoxA==
#<!--------------------------------------------------------------------->

import argparse
from shell import shell
import requests
import base64
import time


def meoBoxPlayPause():
    resourceURI = "http://192.168.1.78:53208/companion?cid=D96D130B-E82C-4AEE-8A9B-C510E2F3752A&hash=000000640000002803B28D6536667BD1"
    method = "POST" 
    headers = []
    data = "AVJZ5D9m2zMebckgw8x4PduPzBCv0V+JcMi6bayzL8c68QBpm1LBZg=="
    usingBase64 = True
    response = localRequest(resourceURI,method, headers, data, usingBase64)
    return response.status_code

def meoBoxMuteUnmute():
    resourceURI = "http://192.168.1.78:53208/companion?cid=D96D130B-E82C-4AEE-8A9B-C510E2F3752A&hash=000000640000002803B28D6536667BD1"
    method = "POST" 
    headers = []
    data = "Y3+RUff84oL3Sqfk2RSPXfzBoxJ+iDCcCDkN2ica3AVl4sXEP+YoxA=="
    usingBase64 = True
    response = localRequest(resourceURI,method, headers, data, usingBase64)
    return response.status_code

def meoBoxMinus7():
    resourceURI = "http://192.168.1.78:53208/companion?cid=D96D130B-E82C-4AEE-8A9B-C510E2F3752A&hash=000000640000002803B28D6536667BD1"
    method = "POST" 
    headers = []
    data = "jR4YFSA2W4b3L6w89WOUp+rkWq04IVBp1cb2LaHi3lorWnK/HBSdyg=="
    usingBase64 = True
    response = localRequest(resourceURI,method, headers, data, usingBase64)
    return response.status_code

def meoBoxPlus30():
    resourceURI = "http://192.168.1.78:53208/companion?cid=D96D130B-E82C-4AEE-8A9B-C510E2F3752A&hash=000000640000002803B28D6536667BD1"
    method = "POST"
    headers = []
    data = "+b2eYGibaXsIOcdk6ZjdgBEQHht9o7lmkM/bIuE5YvqdWFRz7/ZxJA=="
    usingBase64 = True
    response = localRequest(resourceURI,method, headers, data, usingBase64)
    return response.status_code

def meoBoxBack():
    resourceURI = "http://192.168.1.78:53208/companion?cid=D96D130B-E82C-4AEE-8A9B-C510E2F3752A&hash=000000640000002803B28D6536667BD1"
    method = "POST"
    headers = []
    data = "KkSzlavxwnIN9AUg3HyTR7VJhskY7IhTAXXPoymTpKjpvgasvG1+vg=="
    usingBase64 = True
    response = localRequest(resourceURI,method, headers, data, usingBase64)
    return response.status_code

def meoBoxInfo():
    resourceURI = "http://192.168.1.78:53208/companion?cid=D96D130B-E82C-4AEE-8A9B-C510E2F3752A&hash=000000640000002803B28D6536667BD1"
    method = "POST"
    headers = []
    data = "l9kpy4omrX8j6D4USbxRqdwS2PN9oWjOQqb42DU3WBF2nnuUC6QZJw=="
    usingBase64 = True
    response = localRequest(resourceURI,method, headers, data, usingBase64)
    return response.status_code

def meoBoxMenu():
    resourceURI = "http://192.168.1.78:53208/companion?cid=D96D130B-E82C-4AEE-8A9B-C510E2F3752A&hash=000000640000002803B28D6536667BD1"
    method = "POST"
    headers = []
    data = "FWYNY82IzB2v4HCadZ9x+HJ5HDNZrrZu7YZXTaddWWJ7RSZpn3ty9A=="
    usingBase64 = True
    response = localRequest(resourceURI,method, headers, data, usingBase64)
    return response.status_code

def meoBoxOk():
    resourceURI = "http://192.168.1.78:53208/companion?cid=D96D130B-E82C-4AEE-8A9B-C510E2F3752A&hash=000000640000002803B28D6536667BD1"
    method = "POST"
    headers = []
    data = "0tHFV8M1czJudyhvQ/i06lr75otn8xXpi8Yrt9j3Xl1h6MHUlYk7zw==" 
    usingBase64 = True
    response = localRequest(resourceURI,method, headers, data, usingBase64)
    return response.status_code

def meoBoxVolume(num):
    resourceURI = "http://192.168.1.78:53208/companion?cid=D96D130B-E82C-4AEE-8A9B-C510E2F3752A&hash=0000006400000058D5446F25F564722D"
    method = "POST"
    headers = []
    if num == '0':
        data = "eizLR4tQ2BHY0Q+YQw2FNRvKmRGFcYw7Z27G4bpZ0QDzhICtpS8b8tohS4g9qCvLA79cXuFN05ghbCE1vmCwX3xXOTcTSs+S5Q6/1pnYknDISRJUgClorQ=="
    elif num == '1':
        data = "aoevsAlnR5tWqjR4yV++d9CAv3YIQodJw2JwbDZkWb+lEN+tYhnvN8ri/KmIeSfOmxHjPmk2xpBPCKzM/s42cJ95XCMBH2vIFMIYIIqpfPzhhV87ICTcdQ=="
    elif num == '2':
        data = "S6vYeDuS6Ntpd34oA7P2/1rHSgs0apYXLmmTc64JQ9nvvWPLHBIhQQQ+nL2mAAig1NGPgyqh/u7RjWj7QyR0qj3UePo8XJi6r5gZm4B35ZAjTXCyxKrJtw=="
    elif num == '3':
        data = "n8TpS+5B0PcdzRM0MBEi5XmIJqR03G49CZ0GL0Eu/vjyt734JRsV1Qdny4rg0yaMNUovg4DwY90QdH938Pmw69Ag/UtQItyubDjFHSOut5a8XTyomk8HDw=="
    elif num == '4':
        data = "blRZUZfuc+XrV6Amo3DcuWgX/HzMh7TFYGJ52BlYcj5WrlBehbavHn9f5T22nMF4h5k1iyCx+dJwD/7LIu+34wMr8zDJLgf+4mGXlS5c3NSVtzrGQK9/aQ=="
    elif num == '5':
        data = "xc3aa9NX0sUubnqdz2yLt3pv5Dnoj4azvqthXw87AEEfFnVEpJLqX/l5syUtOGOOmOAhvuRLcHXDP4lLKc20qZF/FGUNGXWMB3gmN7PlxqWEZQ3IQRZs1Q=="
    elif num == '6':
        data = "ar1qgDUvtOXvrRI80oXQu0h9tl2gjivjc578F8pGyVDytgweMjdj7/iVe8zmsxm4uOMTVDpa58aXhPiJ7WsbysvcYDu4/13yTX45mhAxz9r0yn7feJTg+w=="
    elif num == '7':
        data = "JJCwCV9xul11/akCkkivddb1hzYT3awp3iXOZtRHiRTmyF6Xt6IHa6JhSgDVs8/8UL6vyOqKOyLLY6QKRz6rhB6tB+8Sax3rNi2Or2IUZ/QXu/aERb4eRw=="
    elif num == '8':
        data = "dS3DPtoW66ExAtWFIM51sWrcFCUp5ESrksmslZ/Bc9MgHza8lSPuO16TPZEw5s0yQz8JLgXR9RIpgCswYRVyB3o6iNTyWlqFUUFXjZhLkfizOfyav99Hyg=="
    elif num == '9':
        data = "6mfRQBOZ3AU0dsj60/5lU+r8OilgAR0fjI3ahEEw8yzpfdMwwF620RZcHjN8kiQZqzBh+g2tThzGh2mnxiYuxQpEKlVWciT2fEnz/pkPi2SmdrDRtXah3g=="
    elif num == '10':
        data = "sweceSfXfw107ZZqSxoYBRsVo13Yzom9eiHjN1QVwN5s4K3Qk31zjjaGN4Ttj7Lg08QgQ536VSqwPeczhYQqasqeknflmWO2L8mNtuAel1A6uUGPlSLV7A=="
    elif num == '11':
        data = "tQn8ZUFbhoUntdciogcMJecz3DdCWULNcRbcJfd8tcj6RiUMwAIHr57U1+V/RQ/U/feeysTAXSoQ5XPJOwGeKA9oQR8mS1mdJsnUXKds6ZDuCzokw00yjg=="
    elif num == '12':
        data = "kgg6b90+LeVyFkl5ZVRLK2uZID/gb5llISODD2bTdDTfLF18tYSwVZ5yNXFX5bzQR1QUlDTqvBOpYka4NtWvpWukrdg7Ro/LlvS/RFeth5g18biqPz+Xmw=="
    elif num == '13':
        data = "X/6ihedsm5YuQtHC3wUuddN2aKX40ssh+snI3SGc21ODtOpMyrPzyajGRilDGImkF1ZPDhEVM9vaXpCPjTFMV/m7DYSCdYEc/JuR04Ps+BPQhCLG+MUquw=="
    elif num == '14':
        data = "QVyExwafrs+alp7UoRjPsmaARB0OHofZWvig6yZy9I+qUGe5tyQ1EfJrx0q0tXU4b7zyzXHm5s7xGaJNhGMFbBi8GFXWWonSzCqUFRg3+m7ALoS760rd9g=="
    elif num == '15':
        data = "zEBUiJuizNHvK5+wzd1wJEs2q9UsA7lOy817F5Q/kEP2hMaK5aWvuZyEn2TncS8/o6vZyvQZIgpazR2NrtpbrwG7ou9JGWwedRFoXMk/eWwylA6S2CGKhw=="
    elif num == '16':
        data = "Hlk4qRSkAq7VmKUEtUQOVf7/VF/aKf+Ty65FR04JJqndfVfxXz3elVQyspta8+mkDHlglLtKE8aBOgcpkmWyPAEifjVQZSnUmBIh7b73c5tQla17kxztGQ=="
    elif num == '17':
        data = "era4oReXtunTMJF6HXOABX0V4kagk3Z42iDa7zD6azP0ZzbIBEUb6j12F7VS2QGWNJQeAKRvooxxKcbvzPYNDwHuCrOdFr3TAQaWUyCANCy5Hdt6nf3KoA=="
    elif num == '18':
        data = "CS+t+JHZtnxYG5Jsl9c7QQW8Nc0oLDB5t1WBO6kW46OFbMQYZD4gO5c7oyXsqhah7bCvhSP6w+ytXcho76csV4pBjatAOstevUbmrwyG5nZmXl+0WV1mDg=="
    elif num == '19':
        data = "wHai53QAILl/8Rmk7pemIsPAyBIeGDSsfDxCtxocScGbaGk9zU9v7sSeoqgi2zLdnVHpxMizXRdttxTw61+6Hz19EYIcqCsWi1rqzRg113B7k4puXNFqsQ=="
    elif num == '20':
        data = "04r5FnL0Kt/AwDjSnoofpi9VvH5LIOGXufi/0fY4h+J58nbUU0gf5PMh5uWEpZ7+OmNvbi0W1PsfUktj3NGOYTN95uvPA69g7BxXOPf8Iww6EugoM/aWpA=="
    elif num == '21':
        data = "hOVD1m5MVRqcYRzvlmZalbPT7V23+oHwBd1y4zP8X+6tMrxqhX1vjrmQCKnUfKEhOlVk7ar25VIu0hjtyQvi9cXALUERnYISzJdeRP2BU/0E9rQBcaWIZQ=="
    elif num == '22':
        data = "BGyrD/4mI6VOUd0wrSops8BKmPiycKQxK2Ux92BgyhJeF/P0kuISoMp/4O7Qjp0WtzXqbQpKqNZydzspBPxqO3d8KzqLsEuf5g/xoeIpHeUrbyojQrBKpA=="
    elif num == '23':
        data = "bSJe1aefdU3l8Hz0y0lPr13dVKo/OCot6SPUeTkUp1jCDG5zeZ5G2xr569Sf6HPOz+wlrpWOfFzjLXNZ+lu2EGbss8UyFosLEqOMAa9xTXsxXdSOiwxVFw=="
    elif num == '24':
        data = "gRvEeQHjLo9ftiB0/WoNXT5xas24+4W1yR9NoX3bVcxvmI9c2JKAgUbYAGVJKEDQ/ZaSIh7o5paglUYVaygSr+us4tlWOdreCGaA0UUSnPDxMJSqIjdpPw=="
    elif num == '25':
        data = "96HKAY8l8l2yJZaCRTQUFmbYLlUMTqePpltM8gqYRW/eHyAsfrELl2Xien1F2wtW5L4JamTuyC10acGVHHyuS9TjQFECGDHMhCW4Ed7JW4kVzTV+/zANgw=="
    usingBase64 = True
    response = localRequest(resourceURI,method, headers, data, usingBase64)
    meoBoxMuteUnmute()
    meoBoxMuteUnmute()
    return response.status_code

def meoBoxChannelNum(num):
    for x in list(num):
        meoBoxChannelNum_(x)
        #print(x)
    time.sleep(0.15)
    meoBoxOk()
    time.sleep(0.15) #min = 0.15
    meoBoxBack()    
def meoBoxChannelNum_(num):
    resourceURI = "http://192.168.1.78:53208/companion?cid=D96D130B-E82C-4AEE-8A9B-C510E2F3752A&hash=00000064000000209AD3096CE23333F5"
    method = "POST"
    headers = []
    if num == '0':
        data = "wx65/cCAfDJ9PTiINoTh6ZLpC5sHT181wwcoZAl/kTA="
    elif num == '1':
        data = "49qF51CR0+ZlqNJMGkA6F/A23hbgRTySK9OHp5a/SaM="
    elif num == '2':
        data = "x5SaAxVhtsbRi5SQiUasE5Q+Fjky95Lrso9lfEIcPxU="
    elif num == '3':
        data = "NVIVAnFmHKAEFa/cRo+2/QxkuclJW4rYLZDQixcx0H0="
    elif num == '4':
        data = "7nnbywy92bbCw2LSB/UBxxUE5PSX4sFcDTtJJ03zxJo="
    elif num == '5':
        data = "d1ODuPNtKdaV5gHoxfmy8Xw2XUJqxE1mXrUbBCOapQ0="
    elif num == '6':
        data = "EX8vWkaRTp/NJ9ICXtwHft/cSMm8ZYDoBiW6FBP9Esw="
    elif num == '7':
        data = "8D+woF1/RAWhPC2paWKvPu745olyElCoKdQtsLn6GBQ="
    elif num == '8':
        data = "6/opAkOjt8aCEaEU3JYHjrs4N2m//xjtxbZEswyCmmI="
    elif num == '9':
        data = "Fh3G22mdOz6COmhQW9/robGOHimmIpsM17gBPcs1ta8="
    usingBase64 = True
    response = localRequest(resourceURI,method, headers, data, usingBase64)
    #meoBoxOk()
    #meoBoxBack()
    return response.status_code

def meoBoxChannelMinus():
    resourceURI = "http://192.168.1.78:53208/companion?cid=D96D130B-E82C-4AEE-8A9B-C510E2F3752A&hash=000000640000002803B28D6536667BD1"
    method = "POST"
    headers = []
    data = "ahomUF/PytvgcC64eYoaxDCFfC0fx8KwmBXhNNh0FKSgGqyU7WJzGA=="
    usingBase64 = True
    response = localRequest(resourceURI,method, headers, data, usingBase64)
    return response.status_code

def meoBoxChannelPlus(): 
    resourceURI = "http://192.168.1.78:53208/companion?cid=D96D130B-E82C-4AEE-8A9B-C510E2F3752A&hash=000000640000002803B28D6536667BD1"
    method = "POST"
    headers = []
    data = "KXMJpFTWPE2z8/o5WU4CpykxHc9H1bo5l0H7vGmUj2cO3poKeSBrXA=="
    usingBase64 = True
    response = localRequest(resourceURI,method, headers, data, usingBase64)
    return response.status_code

def meoBoxBackward():
    resourceURI = "http://192.168.1.78:53208/companion?cid=D96D130B-E82C-4AEE-8A9B-C510E2F3752A&hash=00000064000000209AD3096CE23333F5"
    method = "POST"
    headers = []
    data = "TermRI4y4QLXPs6k7XXY96zTz9p1oeHo27+9zNkRuAU="
    usingBase64 = True
    response = localRequest(resourceURI,method, headers, data, usingBase64)
    return response.status_code

def meoBoxForward(): 
    resourceURI = "http://192.168.1.78:53208/companion?cid=D96D130B-E82C-4AEE-8A9B-C510E2F3752A&hash=000000640000002803B28D6536667BD1"
    method = "POST"
    headers = []
    data = "KUeNM1mX9bXAbk148JgudcI8B6kKDfQ7n8wo4RrP/EEZWtQL5KPIfw=="
    usingBase64 = True
    response = localRequest(resourceURI,method, headers, data, usingBase64)
    return response.status_code

def meoBoxUp(): 
    resourceURI = "http://192.168.1.78:53208/companion?cid=D96D130B-E82C-4AEE-8A9B-C510E2F3752A&hash=00000064000000209AD3096CE23333F5"
    method = "POST"
    headers = []
    data = "7ofyAxHyJjTXf7RmYjLF1c7wKJOm0KJ8po05GivRN6E="
    usingBase64 = True
    response = localRequest(resourceURI,method, headers, data, usingBase64)
    return response.status_code

def meoBoxDown(): 
    resourceURI = "http://192.168.1.78:53208/companion?cid=D96D130B-E82C-4AEE-8A9B-C510E2F3752A&hash=000000640000002803B28D6536667BD1"
    method = "POST"
    headers = []
    data = "ZEr1vT+ZTzJbJY9E9F5dZaL29oOCWCyL6IR+vPxE+MeIEJLgL2Zl1g=="
    usingBase64 = True
    response = localRequest(resourceURI,method, headers, data, usingBase64)
    return response.status_code

def meoBoxLeft(): 
    resourceURI = "http://192.168.1.78:53208/companion?cid=D96D130B-E82C-4AEE-8A9B-C510E2F3752A&hash=000000640000002803B28D6536667BD1"
    method = "POST"
    headers = []
    data = "gK5eo8Ba5ZhA5FCu3G7G63Q3M8ltUCZac6pNhzX+l/jwswCzFIxjLg=="
    usingBase64 = True
    response = localRequest(resourceURI,method, headers, data, usingBase64)
    return response.status_code

def meoBoxRight(): 
    resourceURI = "http://192.168.1.78:53208/companion?cid=D96D130B-E82C-4AEE-8A9B-C510E2F3752A&hash=000000640000002803B28D6536667BD1"
    method = "POST"
    headers = []
    data = "34Byqt1UEQrLTrL+DHbTUSNT2X0MRIMDN3hcsFxn8NDxpAkNpgSRWg=="
    usingBase64 = True
    response = localRequest(resourceURI,method, headers, data, usingBase64)
    return response.status_code


def meoBoxPowerOff():
    resourceURI = "http://192.168.1.78:53208/companion?cid=D96D130B-E82C-4AEE-8A9B-C510E2F3752A&hash=000000640000002803B28D6536667BD1"
    method = "POST"
    headers = []
    data = "CA6CUPpkdZzML34EMhRf1NyOfn0SGTiZI5nqoJS8XQ6pd5xYW/5N7w=="
    usingBase64 = True
    response = localRequest(resourceURI,method, headers, data, usingBase64)
    return response.status_code

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

#https://github.com/Ape/samsungctl/
#pip3 install samsungctl
#ctl_string = "wsl ~/.local/bin/samsungctl --host 192.168.1.91 --name " # under windows WSL2
ctl_string = "/home/pi/.local/bin/samsungctl --host 192.168.1.91 --name remote "
def localSamsungctl(toRPI, sleep):
    meoBoxPlayPause()
    shell(ctl_string + "KEY_DTV")
    time.sleep(sleep)
    if toRPI:
        shell(ctl_string + "KEY_HDMI")
        time.sleep(sleep)
    shell(ctl_string + "KEY_HDMI")

def complexActionHandler(args):
    if args.off_tv:
        shell(ctl_string + "KEY_POWEROFF")
        meoBoxPowerOff()
    
    if args.power_on_box:
        meoBoxPowerOn()

    if args.power_off_box:
        meoBoxPowerOff()
    
    if args.pause_box:
        meoBoxPlayPause()
        meoBoxBack()
    
    if args.mute_box:
        meoBoxMuteUnmute()
    
    if args.volume_num_box:
        meoBoxVolume(args.volume_num_box)
     
    if args.minus_7_box:
        meoBoxMinus7()
    
    if args.plus_30_box:
        meoBoxPlus30()
    
    if args.back_box:
        meoBoxBack()
    
    if args.info_box:
        meoBoxInfo()

    if args.menu_box:
        meoBoxMenu()

    if args.ok_box:
        meoBoxOk()
    
    if args.channel_num_box:
        meoBoxChannelNum(args.channel_num_box)

    if args.channel_minus_box:
        meoBoxChannelMinus()
    
    if args.channel_plus_box:
        meoBoxChannelPlus()

    if args.backward_box:
        meoBoxBackward()

    if args.forward_box:
        meoBoxForward()

    if args.up_box:
        meoBoxUp()

    if args.down_box:
        meoBoxDown()

    if args.left_box:
        meoBoxLeft()

    if args.right_box:
        meoBoxRight()


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
    parser.add_argument('--power-off-box', default=False, help='Power off box.')
    parser.add_argument('--pause-box', default=False, help='Pause/play box.')
    parser.add_argument('--mute-box', default=False, help='Mute/unmute box.')
    parser.add_argument('--volume-num-box', default=False, help='Set volume as num 0-25 box.')
    parser.add_argument('--minus-7-box', default=False, help='Rewind 7 seconds (Box).')
    parser.add_argument('--plus-30-box', default=False, help='Forward 30 seconds (Box).')
    parser.add_argument('--channel-num-box', default=False, help='Go to channel number (Box).')
    parser.add_argument('--channel-minus-box', default=False, help='Previous channel (Box).')
    parser.add_argument('--channel-plus-box', default=False, help='Next channel (Box).')
    parser.add_argument('--back-box', default=False, help='Back (Box).')
    parser.add_argument('--info-box', default=False, help='Show info (Box).')
    parser.add_argument('--menu-box', default=False, help='Show menu (Box).')
    parser.add_argument('--ok-box', default=False, help='Prees Ok button (Box).')

    parser.add_argument('--backward-box', default=False, help='Key backward (Box).')
    parser.add_argument('--forward-box', default=False, help='Key forward (Box).')
    parser.add_argument('--up-box', default=False, help='Key Up (Box).')
    parser.add_argument('--down-box', default=False, help='Key down (Box).')
    parser.add_argument('--left-box', default=False, help='Key left (Box).')
    parser.add_argument('--right-box', default=False, help='Key right (Box).')

    #parser.add_argument('-v', dest='verbose', action='store_true')
    args = parser.parse_args()
    
    print(complexActionHandler(args))
