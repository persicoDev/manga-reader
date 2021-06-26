# !/usr/bin/env python
# import json
import requests
from pages import single_manga, json_save
from bs4 import BeautifulSoup


if __name__ == "__main__":
    manga_save = {}
    manga_list_save = []
    i = 1
    while True:
        # try:
        manga_list = BeautifulSoup(requests.get(
            f'https://www.mangaworld.io/archive?page={ i }').content, 'html.parser')
        for manga in manga_list('div', class_='entry'):
            json_single_manga = {}
            json_single_manga['title'] = manga.find('a')['title']
            json_single_manga['preview'] = manga.find('img')['src']
            json_single_manga['bookmarked'] = 'false'
            manga_list_save.append(json_single_manga)
            manga_save = {
                "mangas": manga_list_save
            }
            json_save.file_save(manga_save)
            json_single_manga['link'] = manga.find('a')['href']
            single_manga.get_single_manga(link = json_single_manga['link'])
        i += 1
        # except:
        #     print('scraping finished')
            # break