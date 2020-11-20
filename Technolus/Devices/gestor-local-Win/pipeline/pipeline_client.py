
import requests
import certifi

import json


def req():
    payload = {
        'auth': 'randauth',
        'data': '-.---------------.-.-.-.-.-.----------',
        'files': []
    }
    url = 'https://am6zi5q0cb.execute-api.eu-west-2.amazonaws.com/dev/functions/api'
    #payload = {'file_id': '1234'}
    #response = requests.put(url, files=files, data=payload, verify=False)
    response = requests.get(url, verify=False)

    response_object = json.loads(response.text)

    return f'Code: {response.status_code} \nResponse: {response.text}'

print(req())

    








#--------------------------------------------------------------------
# NOTE: FOR BIGGER FILES 
# NOTE: https://stackoverflow.com/a/54857411
#
#import requests
#
##http://docs.python-requests.org/en/latest/user/quickstart/#post-a-multipart-encoded-file
#
#url = "http://localhost:5000/"
#fin = open('simple_table.pdf', 'rb')
#files = {'file': fin}
#try:
#  r = requests.post(url, files=files)
#	print r.text
#finally:
#	fin.close()
#