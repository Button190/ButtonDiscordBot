# Mock the python websocket

import socket               # Websocket 
import sys                  # 
from _thread import *       # Used for multi-threading      The thread module has been renamed to _thread in Python 3.
import urllib.request       # Used to make requests
import urllib
import time                 # Used to create delays


#import functions
import os
try:
    import thread as _thread
except:
    os.system('pip install ' + 'thread')


# ******* WEBSOCKET VARIABLES *******
numberClients = 1
host = ''
PORT = 1024
# ******* WEBSOCKET VARIABLES *******




# ************************** FUNCTIONS **************************
def threaded_client(conn,address):      # receive as parameters, the connection object (conn), and the address object that contains the ip and port
    global numberClients
    conn.send(str.encode('Welcome, type your info\n'))  # data should be bytes
    numberClients = numberClients + 1

    #print ("direccion" + str(address[0]))

    #           CHECK USER USING PASSWORD OR SOMETHING
    #           CHECK USER USING PASSWORD OR SOMETHING
    #           CHECK USER USING PASSWORD OR SOMETHING
    #           CHECK USER USING PASSWORD OR SOMETHING
    #           CHECK USER USING PASSWORD OR SOMETHING
    #           CHECK USER USING PASSWORD OR SOMETHING
    while True:
        data = conn.recv(2048)
        reply = "" + 'Server output: '+ data.decode('utf-8').rstrip() + "\n"
        print(str(address[0]) + " - Clients(" + str(numberClients) + ") -> Data received: >" + data.decode('utf-8').rstrip() + "<")
        if not data:
            print("no data")
            break
        conn.sendall(str.encode(reply))     # data should be bytes
    print("Thread connection closed by client: " + address[0])
    conn.close()
    numberClients = numberClients - 1
# ************************** FUNCTIONS **************************




# ************************** SETUP **************************
print ("\n----------- Starting Websocket Python Program -----------\n")

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)   # "s" here is being returned a "socket descriptor" by socket.socket.
print(s)

# we are simply attempeting to bind a socket locally, on PORT xxxx.
try:
    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)         # reuse the port number (in case we just got an error and port was not freed)
    s.bind((host, PORT))                                            # server side - take IN connections
    print ("Server started on port " + str(PORT))
except socket.error as e:
    print(str(e))
    print('Bind failed. Error Code : ' + str(msg[0]) + ' Message ' + msg[1])
    #sys.exit()
print('Socket bind complete')

s.listen(5)     # the "5" stands for how many incoming connections we're willing to queue before denying any more.

print('Waiting for a connection.')
# ************************** SETUP **************************





# ************************** MAIN LOOP **************************
while True:
    conn, addr = s.accept()         # code will stop here whilst waiting for a new connection. Old connections will be running in the threads
    print('Connected to: '+addr[0]+':'+str(addr[1]))

    start_new_thread(threaded_client,(conn,addr))   
# ************************** MAIN LOOP **************************