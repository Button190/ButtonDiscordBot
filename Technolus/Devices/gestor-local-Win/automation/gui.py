#NOTE: https://outline.com/hpHye9

#requires tkinter.
import tkinter as tk

def create():
    root= tk.Tk()
    canvas1 = tk.Canvas(root, width = 300, height = 300)
    canvas1.pack()
    #myButton = tk.Button(text='HELLOOOO', command=takeScreenshot, bg='#606060',fg='#666666',font= 10)
    canvas1.create_window(150, 150, window=myButton)
    root.mainloop()