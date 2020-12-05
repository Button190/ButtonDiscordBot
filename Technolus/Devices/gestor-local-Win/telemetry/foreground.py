if not ( '__platform__' in vars() ):
    __platform__ = 'windows'

def get_foreground():
    window = ''
    program = ''

    if __platform__ == 'linux':
        root = subprocess.Popen(['xprop', '-root', '_NET_ACTIVE_WINDOW'], stdout=subprocess.PIPE)
        stdout, stderr = root.communicate()
        m = re.search(b'^_NET_ACTIVE_WINDOW.* ([\w]+)$', stdout)
        
        if m != None:
            window_id = m.group(1)
            window = subprocess.Popen(['xprop', '-id', window_id, 'WM_NAME'], stdout=subprocess.PIPE)
            stdout, stderr = window.communicate()
            match = re.match(b"WM_NAME\(\w+\) = (?P<name>.+)$", stdout)

            if match != None:
                window = match.group("name").strip(b'"')
                program = '' # get process name: 'ps -o cmd= <pid>'

    elif __platform__ == 'windows': 
        import psutil
        import win32process
        from typing import Optional
        from ctypes import wintypes, windll, create_unicode_buffer
        hWnd = windll.user32.GetForegroundWindow()
        length = windll.user32.GetWindowTextLengthW(hWnd)
        buf = create_unicode_buffer(length + 1)
        windll.user32.GetWindowTextW(hWnd, buf, length + 1)      
        threadid,pid = win32process.GetWindowThreadProcessId(hWnd)  
        
        if buf.value:
            window = buf.value
            if pid>0:
                program = psutil.Process(pid).name()

    elif __platform__ == 'mac': 
        # http://stackoverflow.com/a/373310/562769
        from AppKit import NSWorkspace
        window = (NSWorkspace.sharedWorkspace().activeApplication()['NSApplicationName'])
        program = ''

    return  {'window': window, 'program': program}




    