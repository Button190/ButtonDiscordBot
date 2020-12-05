#!python3

# sudo nano /etc/xdg/lxsession/LXDE-pi/autostart # GLOBAL # LOCAL OVERRIDES GLOBAL: ~/.config/lxsession/ ..
## #@kodi
## @lxpanel --profile LXDE-pi
## @pcmanfm --desktop --profile LXDE-pi
## @xscreensaver -no-splash
## @python3 /home/pi/Desktop/gestor-local-RPI4/http-server/http_server.py

#Install flask-cors and shell by running:
#$ pip3 install -U flask-cors
#$ pip3 install -U shell

# NOTE:
# http://localhost:3333/?route=echo&data=hello
# http://localhost:3333/?route=shell&data=echo%20hi
# http://localhost:3333/?route=shell&data=ls%20-la
# http://localhost:3333/?route=shell&data=python3%20../torrent/torrent.py%20-h&pretty=true

# http://localhost:3333/?route=shell&data=python3%20..%2Ftorrent%2Ftorrent.py%20-p%208888%20-a%20localhost%20-s%20%22%2Fhome%2Fpi%2FDesktop%2FNicas%2F%2B%2BSeries%2F%22%20-m%20magnet%3A%3Fxt%3Durn%3Abtih%3A8b0625193050471ec3cfbb1d7e29a681738858f7%26dn%3DChicago.PD.S07E18.HDTV.x264-SVA%255Beztv%255D.mkv%255Beztv%255D%26tr%3Dudp%253A%252F%252Ftracker.coppersurfer.tk%253A80%26tr%3Dudp%253A%252F%252Fglotorrents.pw%253A6969%252Fannounce%26tr%3Dudp%253A%252F%252Ftracker.opentrackr.org%253A1337%252Fannounce%26tr%3Dudp%253A%252F%252Fexodus.desync.com%253A6969
# python3 ../torrent/torrent.py -p 8888 -a localhost -s "/home/pi/Desktop/Nicas/++Series/" -m magnet:?xt=urn:btih:8b0625193050471ec3cfbb1d7e29a681738858f7&dn=Chicago.PD.S07E18.HDTV.x264-SVA%5Beztv%5D.mkv%5Beztv%5D&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A80&tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969

import traceback
from shell import shell
from flask import Flask, request
from flask_cors import CORS, cross_origin
import urllib.parse
import json

import os, sys
os.getcwd()
os.chdir(os.path.dirname(sys.argv[0]))
os.chdir('..')

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
@cross_origin()
def home():
  route = str(request.args.get('route', default='ECHO')).upper()
  data = urllib.parse.unquote(request.args.get('data', default=''))
  pretty = request.args.get('pretty', default=False)
  
  if route == 'SHELL':
    try:
      if data != '':
        ret = '\n'.join(shell(data).output())
      else:
        ret = 'Missing shell command.'
    except Exception as e:
      ret = str(e.args[1]) # str(type(e).__name__) + ': ' + str(e.args)
  elif route == 'ECHO':
    ret = json.dumps({'route':route, 'data':data})
  else:
    ret = 'No response.'
    
  # pretty print if requested.
  if pretty != False:
    if str(pretty).upper() != 'FALSE':
      ret = '<pre>' + ret + '</pre>'
  
  return ret


try:
  app.run(host='0.0.0.0' , port=3333)
except Exception as e:
  # ret = traceback.format_exc()
  # ret = str(type(e).__name__) + ': ' + str(e.args)
  # ret = str(e.args[1])
  pass
  