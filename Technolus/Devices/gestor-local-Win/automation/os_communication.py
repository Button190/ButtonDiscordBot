# NOTE: this will be the shell part of the "pipeline into shell":

# oInstructions = json.loads('{"use":"terminal","data":"ipconfig"}')

import sys
def get_platform():    
    if sys.platform in ['linux', 'linux2']:
        platform = 'linux'
    elif sys.platform in ['Mac', 'darwin', 'os2', 'os2emx']: 
        platform = 'mac'
    elif sys.platform in ['Windows', 'win32', 'cygwin']:
        platform = 'windows'
    else:
        platform = f'Platform unknown: sys.platform={sys.platform} (version:{sys.version}).'
    return platform

import os
from shell import shell

def shell_execute(command):
    list = shell(command).output()
    return '\n'.join(list)