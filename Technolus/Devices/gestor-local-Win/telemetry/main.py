
#chcp 65001
#set PYTHONIOENCODING=utf-8


import foreground
import keypresses
import time
from datetime import datetime, timezone
import csv
import json
import re
import sys

__last_activity_time__ =  datetime.now(timezone.utc)
__previous_file__ = ''
__previous_program__ = ''
__previous_category__ = ''
__previous_keypress__ = ''
__previous_position__ = {'x':0, 'y':0}
__delta_inactivity_secs__ = 30
__inactive__ = False

def main():
    while True:
        if not eventloop():
            break
        time.sleep(0.2)

def eventloop():
    global __previous_file__
    global __previous_program__
    global __previous_category__
    global __previous_position__
    global __last_activity_time__
    global __delta_inactivity_secs__

    create_record = False 

    time_nix = datetime.now(timezone.utc)
    time_pretty = time_nix.strftime('%Y-%m-%d %H:%M:%S')

    pattern = re.compile(r"\s\s+")
    foreground_object = foreground.get_foreground()
    
    foreground_file = foreground_object['window']
    foreground_program = foreground_object['program']
    foreground_category = ''

    if keypresses.get_buttons():
        __last_activity_time__ = time_nix
    
    position = keypresses.get_mouse_position()
    if position != __previous_position__:
        __last_activity_time__ = time_nix
        __previous_position__ = position

    if (time_nix - __last_activity_time__).total_seconds() >  __delta_inactivity_secs__:
            foreground_file = 'Idle'
            foreground_program = 'Idle'
            foreground_category = 'Idle'
    
#    #Refactor Excel:
#    if bool(re.search('excel', foreground_program, re.IGNORECASE)):
#        #MS VBA to VBA
#        foreground_program = re.sub(r'(Microsoft Visual Basic for Applications)', 'VBA', foreground_file)
#        foreground_program = re.sub(r' (\[running\]) ', '', foreground_file)
#        
#        #Excel windows to mirror last if posssible.
#        if not bool(re.search('( - Excel)|\(code\)\]', foreground_file, re.IGNORECASE)):
#            foreground_file = __previous_file__
#            foreground_category = __previous_category__    

    #Lake Garden Group
    if bool(re.search('Finnomena', foreground_file, re.IGNORECASE)):
        foreground_category = 'LGG - Finnomena'
    elif bool(re.search('1ktakgJVCslGxWUeby5ZJDiYR65HsTNbCLuPqrnIrjOA', foreground_file, re.IGNORECASE)):
        foreground_category = 'LGG - Spreadsheet'
    elif bool(re.search('1TIKCrAUyYoiQfdIPWq_hOiXcCogOuU_hum3BDFl7SxFtBqt0gPBjHtwc', foreground_file, re.IGNORECASE)):
        foreground_category = 'LGG - Code Editor'
    elif bool(re.search('view-source:https:\/\/www.settrade', foreground_file, re.IGNORECASE)):
        foreground_category = 'LGG - Settrade'
    elif bool(re.search('settrade.com', foreground_file, re.IGNORECASE)):
        foreground_category = 'LGG - Settrade'

    #David
    elif bool(re.search('bill.com', foreground_program, re.IGNORECASE)):
        foreground_category = 'David - Excel'
    elif bool(re.search('bill.com', foreground_file, re.IGNORECASE)):
        foreground_category = 'David - Excel'
    elif bool(re.search('master|response|survey|(member city tool)|city_of|q_answers|question__|HelpScout|Help Scout', foreground_file, re.IGNORECASE)):
        foreground_category = 'David - Excel'
    elif bool(re.search('FMPA', foreground_file, re.IGNORECASE)):
        foreground_category = 'David - Files'
    elif bool(re.search('vba', foreground_file, re.IGNORECASE)) and foreground_program == "chrome.exe":
        foreground_category = 'David - Research'
    elif bool(re.search('Payroll survey tool - joaoramos.dev@gmail.com - Gmail - Google Chrome', foreground_file, re.IGNORECASE)) and foreground_program == "chrome.exe":
        foreground_category = 'David - Email'

    #Wendy
    # #Work related:
    elif bool(re.search('Column name updates 060620.xlsx', foreground_file, re.IGNORECASE)):
        foreground_category = 'Wendy - Mockup'
    elif bool(re.search('mockup|mockups', foreground_file, re.IGNORECASE)):
        foreground_category = 'Wendy - Mockup'
    elif bool(re.search('messages', foreground_file, re.IGNORECASE)):
        foreground_category = 'Wendy - Messages' 
    elif bool(re.search('elite|OCams|CityView|smartshot|\.svg|elementor', foreground_file, re.IGNORECASE)) and foreground_program == "chrome.exe":
        foreground_category = 'Wendy - Wordpress (Browser)'
    elif bool(re.search('cPannel', foreground_file, re.IGNORECASE)) and foreground_program == "chrome.exe":
        foreground_category = 'Wendy - Wordpress (cPannel)'
    elif bool(re.search('cPannel', foreground_file, re.IGNORECASE)) and foreground_program == "chrome.exe":
        foreground_category = 'Wendy - Wordpress (cPannel)'
    elif bool(re.search('Dashboard', foreground_file, re.IGNORECASE)) and foreground_program == "chrome.exe":
        foreground_category = 'Wendy - Wordpress (LiveStack)'
    elif bool(re.search('video organizer', foreground_file, re.IGNORECASE)) and foreground_program == "chrome.exe":
        foreground_category = 'Wendy - Google Sheets'

    #Video
    elif foreground_program == "mpc-hc64.exe":
        if bool(re.search('.*?(s\d\de\d\d|720p|1080p)', foreground_file, re.IGNORECASE)):
            foreground_category = re.search('(.*?)(s\d\de\d\d|720p|1080p)', foreground_file, re.IGNORECASE).group()
            trailing = re.search('\.[0-z]+$', foreground_category, re.IGNORECASE).group()
            foreground_category = foreground_category.replace(trailing,'')
        else:
            foreground_category = 'Other - Media Player'
        __last_activity_time__ = time_nix
    

    #Personal
    elif bool(re.search('stock|NYSE', foreground_file, re.IGNORECASE)):
        foreground_category = 'Personal - Investing Research'
    elif bool(re.search('DEGIRO', foreground_file, re.IGNORECASE)):
        foreground_category = 'Personal - Investing DEGIRO'
    elif bool(re.search('gestor-windows', foreground_file, re.IGNORECASE)):
        foreground_category = 'Personal - Programming Windows'
    elif bool(re.search('gestor-linux', foreground_file, re.IGNORECASE)):
        foreground_category = 'Personal - Programming Linux'
    elif bool(re.search('Log_Analizer', foreground_file, re.IGNORECASE)):
        foreground_category = 'Personal - Excel Analysis'
    elif bool(re.search('series', foreground_file, re.IGNORECASE)) and foreground_program == "explorer.exe":
        foreground_category = 'Personal - Series Search' 
    elif bool(re.search('gestor|qbittorrent|Arrowverse\sEpisode\sOrder|RARBG|GestorSheets', foreground_file, re.IGNORECASE)) and foreground_program == "chrome.exe":
        foreground_category = 'Personal - Gestor'
    elif bool(re.search('remote control', foreground_file, re.IGNORECASE)) and foreground_program == "chrome.exe":
        foreground_category = 'Personal - Remote'
    elif bool(re.search('wikipedia', foreground_file, re.IGNORECASE)):
        foreground_category = 'Wikipedia'

    #Personal2
    elif bool(re.search('corona|virus|covid', foreground_file, re.IGNORECASE)):
        foreground_category = 'Personal - Searching covid-19'
    elif bool(re.search('regex', foreground_file, re.IGNORECASE)):
        foreground_category = 'Research - Searching Regex'
    elif bool(re.search('python', foreground_file, re.IGNORECASE)):
        foreground_category = 'Research - Searching Python'
    elif bool(re.search('php', foreground_file, re.IGNORECASE)):
        foreground_category = 'Research - Searching PHP'
    elif bool(re.search('wordpress', foreground_file, re.IGNORECASE)):
        foreground_category = 'Research - Searching Wordpress'
    # elif bool(re.search('vba', foreground_file, re.IGNORECASE)):
    #     foreground_category = 'Research - Searching vba'
    elif bool(re.search('javascript', foreground_file, re.IGNORECASE)):
        foreground_category = 'Research - Searching JavaScript'
    elif bool(re.search('powerbi', foreground_file, re.IGNORECASE)):
        foreground_category = 'Research - Searching PowerBI'
    elif bool(re.search('react', foreground_file, re.IGNORECASE)):
        foreground_category = 'Research - Searching React'
    elif bool(re.search('aws', foreground_file, re.IGNORECASE)):
        foreground_category = 'Research - Searching aws'
    elif bool(re.search('dynamodb', foreground_file, re.IGNORECASE)):
        foreground_category = 'Research - Searching DynamoDB'
    
    #Others
    elif foreground_program == "chrome.exe":
        foreground_category = 'Other - Research'
    elif foreground_program == "EXCEL.EXE":
        foreground_category = 'Other - Excel'
    elif foreground_program == "explorer.exe":
        foreground_category = 'Other - Explorer'
    elif foreground_program == "LockApp.exe":
        foreground_category = 'Lock Screen'
    elif foreground_program == "Idle":
        foreground_category = 'Idle'
    else:
        foreground_category = 'Other'
        
    
    if not foreground_file in [__previous_file__, 'None', 'New notification', 'Task Switching', '']:
        #if not foreground_file.strip() in ['Task Switching','None', '', 'New notification']:
        create_record = True
    
    if create_record:
        # classify category
        if not foreground_program  == 'Idle':
            __last_activity_time__ = time_nix
        
        __previous_position__ = position  
        __previous_file__ = foreground_file
        __previous_program__ = foreground_program
        __previous_category__ = foreground_category    

        if bool(re.search('^[\+\-]', foreground_file, re.IGNORECASE)):
            foreground_file = '\''+foreground_file
        if bool(re.search('^[\+\-]', foreground_program, re.IGNORECASE)):
            foreground_program = '\''+foreground_program
        if bool(re.search('^[\+\-]', foreground_category, re.IGNORECASE)):
            foreground_category = '\''+foreground_category


        foreground_object = pattern.sub(' ', foreground_object.__str__() )
        foreground_file = pattern.sub(' ', foreground_file.__str__() )
        foreground_program = pattern.sub(' ', foreground_program.__str__() )

        row = [
            time_pretty,
            foreground_category,
            foreground_program,
            foreground_file 
        ]
        writeCSV_safe(row)

        print("\t|\t".join(row))
    return True

def writeCSV_safe(row):
    try:
        writeCSV_unsafe(row)
    except PermissionError:
        time.sleep(5)
        writeCSV_unsafe(row)

def writeCSV_unsafe(row):
        with open('C:\\Ficheiros\\Timekeeping\\log.csv', 'a', newline='', encoding='utf-8') as csvfile:
            log = csv.writer(csvfile, delimiter=',', quoting=csv.QUOTE_ALL)
            log.writerow(row) 
            # log.writerow(to_utf8(row)) 

def to_utf8(lst):
    return [str(elem).encode('utf-8') for elem in lst] 

if __name__ == '__main__':
    main()


