from .single_chapter import get_single_chapter
from bs4 import BeautifulSoup
import requests
import re

def get_single_manga(link):
    try:
        soup = BeautifulSoup(requests.get(link).content, 'html.parser')
        try:
            volume_number = str(soup.find('p', class_='volume-name d-inline'))
            new_volume_number = [float(i) for i in re.findall(r'-?\d+\.?\d*', volume_number)]
            new_volume_number = int(new_volume_number[0])
        except:
            new_volume_number = 1
        all_volumes = soup.find_all('a', class_='chap')
        for chapter in range((len(all_volumes))):
            try:
                link = all_volumes[chapter]['href']
                link = f'{ link }/1'
                save = str(new_volume_number)
                new_volume_number -= 1
                get_single_chapter(link)
            except: 
                break
    except: 
        print('-errore-')
