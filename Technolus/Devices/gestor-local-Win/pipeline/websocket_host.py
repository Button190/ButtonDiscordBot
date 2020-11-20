https://websockets.readthedocs.io/en/stable/intro.html
https://www.fullstackpython.com/websockets.html
https://pypi.org/project/websocket_client/




#!/usr/bin/env python

# NOTE: to get this to run on wsl2 I needed to install websockets with: `sudo -H pip3 install websockets`

import json
import asyncio
import websockets

async def echo(websocket, path):
        async for message in websocket:
            print(json.dumps(message))
            await websocket.send(message)

asyncio.get_event_loop().run_until_complete(
    websockets.serve(echo, 'localhost', 8765))
asyncio.get_event_loop().run_forever()
