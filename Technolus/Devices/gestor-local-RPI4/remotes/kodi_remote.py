#!python3

# TODO: Play music folder
# TODO: Play single video youtube
# TODO: Play playlist youtube
# TODO: Get subtitles from python-opensubtitles ( https://github.com/agonzalezro/python-opensubtitles )
# TODO: Add all keys for play plause up down for kodi... (via external google sheet)
 
#pip3 install python-opensubtitles

#Install shell by running:
#$ pip3 install -U shell

#Install xdotool (to simulate keystrokes) by running:
#$ sudo apt-get install xdotool

# NOTE:
# http://localhost:3333/?route=shell&data=urlenc_command

# python3 ../remotes/tv_remote.py --off-tv
# python3 ../remotes/tv_remote.py --pause-box
# python3 ../remotes/tv_remote.py --mute-box
## python3 ../remotes/tv_remote.py --power-box #NOT IMPLEMENTED YET

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
import json
import re
import os

my_ip='192.168.1.69'
my_port='3333'

# def playMusicFolder(ip,port, path):
#     #path = '/home/pi/Desktop/Nicas/++Series/Superman.Red.Son.2020.720p.WEBRip.XviD.AC3-FGT/' # mock path
#     #python3 remotes/kodi_remote.py --ip 192.168.1.81 --port 8080 --json-rpc '{"jsonrpc":"2.0","method":"Player.Open","params":{"item":{"file": "smb://192.168.1.69/DISCO/Nicas/++Series/The.Magicians.US.S05E01.Do.Something.Crazy.720p.AMZN.WEBRip.DDP5.1.x264-NTG[eztv].mkv"}},"id":1}'
#     path = os.path.split(path)[0]
#     #path = json.loads('"'+path.replace('"','\\"')+'"')
#     path_smb = re.sub(r".*?/Desktop/","smb://"+my_ip+"/DISCO/",path)
#     cmd ="ls -w 1 '"+path.replace("'","\'")+"'"
#     #print(cmd)
#     #print(shell(cmd).output())
#     playing = shell('python3 remotes/kodi_remote.py --ip '+ip+' --port '+port+' --get-playing').output()
#     playing = json.loads('\n'.join(playing))
#     playing= playing['name']
#     allFiles = shell(cmd).output()
#     filelist = []
#     for file in allFiles:
#         # file://192.168.1.69/DISCO/
#         if re.match(r'.*\.('+types+')', file):
#             cmd = 'python3 remotes/kodi_remote.py --ip '+ip+' --port '+port+' --json-rpc \'{"jsonrpc":"2.0","method":"Player.Open","params":{"item":{"file": '+json.dumps(path_smb+os.path.sep+file)+'}},"id":1}\''
#             anchor = 'http://'+my_ip+':'+myport+'/?pretty=true&route=Shell&data='
#             anchor = anchor + requests.utils.quote(cmd)
#             filelist.append('<div style="font-family:sans;padding-bottom:5px;"> &#8667; <a href="'+anchor+'" style="background-color:#F0F0F0;text-decoration: none;color:blue;x-font-weight:bold;" target="_blank" onclick="var pop=window.open(this.href);setTimeout(function(){pop.close();}, 50);false;">'+file+'</a></div>')
#     if len(filelist) == 0:
#         html = '---'
#     else:
#         html = '\n'.join(filelist)
#     html = '<div> <a href="javascript:location.reload();" style="text-decoration:none;"> &#x21bb; </a> Playing: <span style="color:red;">' + playing + '</span></div><br>' + html
#     return '</pre>'+html+'<pre>'

def getFiles(ip,port, path, types):
    #file://192.168.1.69/DISCO/
    #path = '/home/pi/Desktop/Nicas/++Series/Superman.Red.Son.2020.720p.WEBRip.XviD.AC3-FGT/' # mock path
    #python3 remotes/kodi_remote.py --ip 192.168.1.81 --port 8080 --json-rpc '{"jsonrpc":"2.0","method":"Player.Open","params":{"item":{"file": "smb://192.168.1.69/DISCO/Nicas/++Series/The.Magicians.US.S05E01.Do.Something.Crazy.720p.AMZN.WEBRip.DDP5.1.x264-NTG[eztv].mkv"}},"id":1}'
    #path = os.path.split(path)[0]
    path_smb = re.sub(r".*?/Desktop/","smb://"+my_ip+"/DISCO/",path)
    cmd ="ls -w 1 '"+path.replace("'","\'")+"'"
    playing = shell('python3 remotes/kodi_remote.py --ip '+ip+' --port '+port+' --get-playing').output()
    playing = json.loads('\n'.join(playing))
    playing= playing['name']
    allFiles = shell(cmd).output()
    filelist = []
    for file in allFiles:
        #print(path+file)
        if (re.match(r'.*\..{3,4}$', file) == None ):# match diractories
            cmd = 'python3 remotes/kodi_remote.py --ip '+ip+' --port '+port+' --get-files '+ path + file + os.path.sep +' --get-files-types '+ types
            anchor = 'http://'+my_ip+':'+my_port+'/?pretty=true&route=Shell&data='
            anchor = anchor + requests.utils.quote(cmd) 
            filelist.append('<div style="font-family:sans;padding-bottom:5px;"> &#x1F4C2; <a href="'+anchor+'" style="background-color:#F0F0F0;text-decoration: none;color:blue;x-font-weight:bold;" target="_self" x-onclick="var pop=window.open(this.href);setTimeout(function(){pop.close();}, 50);false;">'+file+'</a></div>')
    for file in allFiles:
        if re.match(r'.*\.('+types+')$', file):
            cmd = 'python3 remotes/kodi_remote.py --ip '+ip+' --port '+port+' --json-rpc \'{"jsonrpc":"2.0","method":"Player.Open","params":{"item":{"file": '+json.dumps(path_smb+os.path.sep+file)+'}},"id":1}\''
            anchor = 'http://'+my_ip+':'+my_port+'/?pretty=true&route=Shell&data='
            anchor = anchor + requests.utils.quote(cmd)
            if re.match(r'.*\.(mp3|aac|wav|m4a)$', types):
                icon = '&#127901;' # https://html-css-js.com/html/character-codes/icons/
            else:
                icon = '&#x1F4FA;' # https://html-css-js.com/html/character-codes/icons/
            filelist.append('<div style="font-family:sans;padding-bottom:5px;"> '+icon+' <a href="'+anchor+'" style="background-color:#F0F0F0;text-decoration: none;color:blue;x-font-weight:bold;" target="_blank" onclick="var pop=window.open(this.href);setTimeout(function(){pop.close();}, 50);false;">'+file+'</a></div>')
        elif (re.match(r'.*(\.en|\.pt|)\.srt$', file)):# match portuguese srt
            cmd = 'python3 remotes/ kodi_remote.py --ip '+ip+' --port '+port+' --get-files '+ path + file + os.path.sep +' --get-files-types '+ types
            anchor = 'http://'+my_ip+':'+my_port+'/?pretty=true&route=Shell&data='
            anchor = anchor + requests.utils.quote(cmd)
            filelist.append('<div style="font-family:sans;padding-bottom:5px;"> &#x1F4C4; <a href="#" style="background-color:#F0F0F0;text-decoration: none;color:blue;x-font-weight:bold;" target="_blank" onclick="var pop=window.open(this.href);setTimeout(function(){pop.close();}, 50);false;">'+file+'</a></div>')
        
    if len(filelist) == 0:
        html = '---'
    else:
        html = '\n'.join(filelist)
    html = '<div> <a href="javascript:location.reload();" style="text-decoration:none;"> &#x21bb; </a> Playing: <span style="color:red;">' + ((playing,' --- ')[playing=='']) + '</span></div><br>' + html
    return '</pre>'+html+'<pre>'
    
def getPlaying(ip,port):
    resourceURI = "http://"+ip+":"+port+"/jsonrpc"
    method = "POST"
    data = '{"jsonrpc": "2.0", "method": "Player.GetItem", "params": { "properties": ["file"], "playerid": 1 }, "id": "VideoGetItem"}'
    usingBase64 = False
    headers={}
    response = localRequest(resourceURI,method, headers, data, usingBase64)
    if response.status_code == 200:
        itemInfo = json.loads(response.text)
        name = itemInfo['result']['item']['label']
        path = os.path.split(itemInfo['result']['item']['file'])[0] + os.path.sep
        retVal = json.dumps({
            'name':name,
            'path':path
            })
        return retVal
    return {'status':response.status_code, 'response':response.text}

def sendText(ip,port, text):
    resourceURI = "http://"+ip+":"+port+"/jsonrpc"
    method = "POST"
    data = '{"jsonrpc":"2.0","method":"Input.SendText","params":{"text":'+json.dumps(text)+',"done":true},"id":1}'
    usingBase64 = False
    headers={}
    response = localRequest(resourceURI,method, headers, data, usingBase64)
    return {'status':response.status_code, 'response':response.text}

def jsonRPC(ip,port,data):
    resourceURI = "http://"+ip+":"+port+"/jsonrpc"
    method = "POST"
    #data = '{"jsonrpc":"2.0","method":"Player.PlayPause","params":{"playerid":1},"id":1}'
    usingBase64 = False
    headers={}
    print(data)
    response = localRequest(resourceURI,method, headers, data, usingBase64)
    return {'status':response.status_code, 'response':response.text}

def localRequest(resourceURI,method, headers, data, usingBase64):
    if usingBase64:
        data = base64.b64decode(data)
    try:
        response = requests.post(resourceURI, data = data, headers=headers)
    except Exception as e:
        response = {'status_code': 0, 'text': e.args}
    return response

def complexActionHandler(args):
    if args.json_rpc:
        result = jsonRPC(args.ip,args.port, args.json_rpc)
    if args.send_text:
        result = sendText(args.ip,args.port, args.send_text)
    if args.get_playing:
        result = getPlaying(args.ip,args.port)
    if args.get_files:
        result = getFiles(args.ip,args.port, args.get_files, args.get_files_types)
    # if args.play_music_folder:
    #     result = playMusicFolder(args.ip,args.port, args.play_music_folder)
    return result

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--ip', help='target ip')
    parser.add_argument('--port', help='target port')
    parser.add_argument('--json-rpc', help='json rpc command like: {"jsonrpc":"2.0","method":"Player.PlayPause","params":{"playerid":1},"id":1}')#, action='store_true'
    parser.add_argument('--get-playing', help='Get details for currently playing file', action='store_true')
    parser.add_argument('--send-text', help='Send text to KODI')
    parser.add_argument('--get-files', help='Get file list that is playable.')
    parser.add_argument('--get-files-types', help='Filter "get files" by extention (a|b|c).')
    #parser.add_argument('--play-music-folder', help='Get file list that is playable.')
    args = parser.parse_args()
    print(complexActionHandler(args))
