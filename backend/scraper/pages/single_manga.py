from .single_chapter import get_single_chapter
from bs4 import BeautifulSoup
import requests
import re

def get_single_manga(link):
    # try:
    link = link.split("/")
    i = 0
    new_link = ''
    for i in range(6):
        new_link += str(link[i])
        new_link += '/'
    link = new_link
    soup = BeautifulSoup(requests.get(link).content, 'html.parser')
    try:
        volume_number = str(soup.find('p', class_='volume-name d-inline'))
        new_volume_number = [float(i) for i in re.findall(r'-?\d+\.?\d*', volume_number)]
        new_volume_number = int(new_volume_number[0])
    except:
        new_volume_number = 1
    all_volumes = soup.find_all('a', class_='chap')
    for chapter in range((len(all_volumes))):
        link = all_volumes[chapter]['href']
        link += "/1"
        file = open('link.txt', 'a')
        save = str(new_volume_number)
        file.write(save)
        file.close()
        new_volume_number -= 1
        get_single_chapter(link)
        if new_volume_number == 0:
            break
    # except: 
    #     print('-errore-')
