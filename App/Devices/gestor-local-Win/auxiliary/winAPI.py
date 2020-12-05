# #https://stackoverflow.com/a/36419702

# from typing import Optional
# from ctypes import wintypes, windll, create_unicode_buffer

# def getForegroundWindowTitle() -> Optional[str]:
#     hWnd = windll.user32.GetForegroundWindow()
#     length = windll.user32.GetWindowTextLengthW(hWnd)
#     buf = create_unicode_buffer(length + 1)
#     windll.user32.GetWindowTextW(hWnd, buf, length + 1)
#     return buf.value if buf.value else None


# ##https://stackoverflow.com/a/56572696
# # import ctypes
# # from ctypes import wintypes
# # user32 = ctypes.windll.user32
# # h_wnd = user32.GetForegroundWindow()
# # pid = wintypes.DWORD()
# # user32.GetWindowThreadProcessId(h_wnd, ctypes.byref(pid))
# # print(pid.value)