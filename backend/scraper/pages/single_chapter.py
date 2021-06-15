from .json_save import file_save
from bs4 import BeautifulSoup
import requests

def get_single_chapter(link):
    try:
        soup = BeautifulSoup(requests.get(link).content, 'html.parser')
        manga_container = soup.find_all('img', {"class": "img-fluid"})
        chapter_index = soup.find("option", {"value": "0"}).text
        chapter_index = str(chapter_index[2:len(str(chapter_index))])
    except:
        print('-error-')
    for i in range(int(chapter_index)):
        if i < 10:
            link = link[:-1]
            link += str(i + 1)
        if i > 10:
            link = link[:-2]
            link += str(i + 1)
        if i > 100:
            link = link[:-3]
            link += str(i + 1)
        soup = BeautifulSoup(requests.get(link).content, 'html.parser')
        manga_container = soup.findAll('img', {"class": "img-fluid"})
        print(str(manga_container[1]['src']))
        save = manga_container
        file_save(save)