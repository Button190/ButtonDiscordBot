#!python3

# USAGE:
# $ python3 ../torrent/torrent.py -h
# $ python3 ../torrent/torrent.py -p 8888 -a localhost -s "/home/pi/Desktop/Nicas/++Series/" -m magnet:?xt=urn:btih:8b0625193050471ec3cfbb1d7e29a681738858f7&dn=Chicago.PD.S07E18.HDTV.x264-SVA%5Beztv%5D.mkv%5Beztv%5D&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A80&tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969

import requests
import json
from requests_toolbelt.multipart.encoder import MultipartEncoder
import argparse

def requestTorrentDownload(magnet, qbittorrent_address, qbittorrent_port, savepath=""):
    url = f'http://{qbittorrent_address}:{qbittorrent_port}/api/v2/torrents/add'
    multipart_data = MultipartEncoder(
        fields = {
        'urls': magnet,
        'autoTMM': 'false',
        'savepath': savepath,
        'cookie': '',
        'rename': '',
        'category': '',
        'paused': 'false',
        'root_folder': 'true',
        'sequentialDownload': 'true',
        'firstLastPiecePrio': 'true',
        'dlLimit': '',
        'upLimit': ''
    })
    response = requests.post(url, data=multipart_data, headers = {'Content-Type': multipart_data.content_type})
    return response.status_code == 200 and response.text == "Ok."
    
if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('-m', '--magnet', required=True, help='Magnet link.')
    parser.add_argument('-a', '--address', default='localhost', help='Web UI Address.')
    parser.add_argument('-p', '--port', default='8888', help='Web UI Port.')
    parser.add_argument('-s', '--savepath', default='', help='Root folder to save files to.')
    #parser.add_argument('-v', dest='verbose', action='store_true')
    args = parser.parse_args()
    
    magnet = args.magnet
    address = args.address
    port = args.port
    savepath = args.savepath
    
    print(requestTorrentDownload(magnet, address, port, savepath))

